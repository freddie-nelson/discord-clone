const router = require("express").Router();
const tokenValidation = require("../validation/tokenValidation");
const User = require("../model/User");
const Theme = require("../model/Theme");
const themeValidation = require("../validation/themeValidation");

router.get("/get", async (req, res) => {
  // check authentication
  if (req.headers.cookie) {
    const token = req.headers.cookie.split("=")[1];
    const payload = tokenValidation(token);

    if (!payload) {
      return res.status(401).send("unauthorized");
    }
  } else {
    return res.status(401).send("unauthorized");
  }

  // get themes base on filter
  const filter = req.body.filter;

  if (filter === "top") {
    const themes = await Theme.find(
      {},
      "name description creator type downloads colors"
    )
      .sort({ downloads: -1 })
      .limit(30)
      .catch(() => res.status(505).send("internal server error"));

    if (themes) {
      return res.send(themes);
    }
  } else if (filter === "featured") {
    const themes = await Theme.find(
      { featured: true },
      "name description creator type downloads colors"
    )
      .sort({ downloads: -1 })
      .limit(30)
      .catch(() => res.status(505).send("internal server error"));

    if (themes) {
      return res.send(themes);
    }
  } else if (filter === "new") {
    const themes = await Theme.find(
      {},
      "name description creator type downloads colors"
    )
      .sort({ dateCreated: -1 }) 
      .skip(req.body.skip) // skip themes the user has already fetched
      .limit(30) // get next 30 themes after the skipped themes
      .catch(() => res.status(505).send("internal server error"));

    if (themes) {
      return res.send(themes);
    }
  }
});

router.post("/create", async (req, res) => {
  // check authentication
  let payload;
  if (req.headers.cookie) {
    const token = req.headers.cookie.split("=")[1];
    payload = tokenValidation(token);

    if (!payload) {
      return res.status(401).send("unauthorized");
    }
  } else {
    return res.status(401).send("unauthorized");
  }

  const theme = req.body;

  const validateTheme = await themeValidation(theme)
    .then(async () => {
      // Find the user doc of the user who is trying to create a theme
      const doc = await User.findOne({ userId: payload.userId })
        .then(doc =>
          doc
            ? doc
            : { valid: false, code: 404, message: "user does not exist" }
        )
        .catch(() => {
          return {
            valid: false,
            code: 500,
            message: "internal server error"
          };
        });

      if (doc.valid === false) return doc; // return if user not found

      // Check if theme name is already taken
      const themeExists = await Theme.findOne({ name: theme.name })
        .then(theme => {
          if (theme) {
            return {
              valid: false,
              code: 400,
              message: "theme exists"
            };
          } else {
            return { valid: true };
          }
        })
        .catch(err => {
          return {
            valid: false,
            code: 500,
            message: err
          };
        });

      if (themeExists.valid === false) return themeExists; // return if found theme or error

      if (theme.creatorId !== payload.userId) {
        return {
          valid: false,
          code: 401,
          message: "unauthorized"
        };
      } else {
        theme.creator = doc.displayName;
      }

      return { valid: true };
    })
    .catch(err => {
      return {
        valid: false,
        code: 400,
        message: err.details ? err.details[0].message : err
      };
    });

  if (validateTheme.valid === false) {
    return res.status(validateTheme.code).send(validateTheme.message);
  }

  const themeDoc = new Theme({ ...theme });

  try {
    await themeDoc.save();
    res.status(201).send("theme created");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
