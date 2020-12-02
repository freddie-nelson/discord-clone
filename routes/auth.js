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
  let emailError = null;
  const emailExists = await User.findOne({ email: req.body.email })
    .then(doc => {
      if (doc) {
        return true;
      } else {
        return false;
      }
    })
    .catch(err => {
      emailError = err;
    });

  if (emailExists === true) {
    return res.status(409).send("User with that email already exists.");
  } else if (emailError) {
    return res
      .status(500)
      .send("Could not register user at this time: " + emailError);
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Save user in db
  const user = new User({
    userId: uuid().slice(0, 16),
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  });

  try {
    await user.save();
    res.status(201).send("Account created successfully.");
  } catch (err) {
    res.status(500).send("Internal server error occurred.");
  }
});

router.post("/login", async (req, res) => {
  // Check if user exists
  const document = await User.findOne({ email: req.body.email })
    .then(doc => {
      if (doc) {
        return doc;
      } else {
        res.status(404).send("User not found.");
        return null;
      }
    })
    .catch(err => {
      res.status(500).send("Internal server error.");
      return "error";
    })

  if (document === "error" || document === null) {
    return;
  } else {
    const comparePasswords = await bcrypt
      .compare(req.body.password, document.password)
      .catch(() => {
        res.status(500).send("Internal server error.");
        return false;
      });

    if (comparePasswords === true) {
      const token = jwt.sign(
        { userId: document.userId },
        process.env.TOKEN_SECRET
      );

      res.cookie("token", token, {
        expires: new Date(Date.now() + 1209600000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
      });

      return res.status(200).send("Successfully signed in.");
    } else {
      return res.status(401).send("Details incorrect.");
    }
  }
});

module.exports = router;
