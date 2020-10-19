const router = require("express").Router();
const User = require("../model/User");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateUser = require("../validation/userValidation");

router.post("/register", async (req, res) => {
  // validate data before continuting
  const validate = validateUser(req.body);

  if (validate.error) {
    return res.status(400).send(validate.error.details[0].message);
  }

  // check if User with that email already exists
  const emailExists = await User.findOne({ email: req.body.email })
    .then(doc => {
      if (doc) {
        return true;
      } else {
        return false;
      }
    })
    .catch(() => {
      return "error";
    });

  if (emailExists === true) {
    return res.send("User with that email already exists.");
  } else if (emailExists === "error") {
    return res
      .status(500)
      .send("Internal Server Error: Could not register user.");;
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Save user in db
  const user = new User({
    userId: uuid(),
    displayName: req.body.email.split("@")[0],
    email: req.body.email,
    password: hashedPassword
  });

  try {
    user.save();
    res.send("User registered!");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/login", async (req, res) => {
  // Check if user exists
  const document = await User.findOne({ email: req.body.email })
    .then(doc => {
      if (doc) {
        return doc;
      } else {
        res.status(400).send("user not found");
        return null;
      }
    })
    .catch(err => {
      res.status(500).send(err);
      return "error";
    })

  if (document === "error" || document === null) {
    return;
  } else {
    const comparePasswords = await bcrypt
      .compare(req.body.password, document.password)
      .catch(() => {
        res.status(500).send("internal server error");
        return false;
      });

    if (comparePasswords === true) {
      const token = jwt.sign(
        { userId: document.userId },
        process.env.TOKEN_SECRET
      );

      res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" ? true : false });
      return res.send("logged in");
    } else {
      return res.send("password incorrect");
    }
  }
});

module.exports = router;
