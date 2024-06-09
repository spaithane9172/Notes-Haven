const express = require("express");
const router = express.Router();
const User = require("../modules/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/featchUser");

const JWT_SECRETE = "rajuthedone";

//end point for creating a new user
router.post(
  "/create",
  //request data validation
  [
    body("name", "enter correct name").isLength({ min: 3 }),
    body("email", "enter correct email").isEmail(),
    body("password", "enter correct password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    try {
      // data validation error handling
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ error });
      }

      //checking if user already exists or not
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "account with this email already exists." });
      }

      //Securing password or hashing password using bcryptjs
      const salt = bcrypt.genSaltSync(10);
      let secPassword = bcrypt.hashSync(req.body.password, salt);

      //creating new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });

      //jwt payload data
      const data = {
        user: {
          id: user.id,
        },
      };
      //generating jwt token using jsonwebtoken
      const authtoken = jwt.sign(data, JWT_SECRETE);

      res.status(200).json({ authtoken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
);

//end point for user login
router.post(
  "/login",
  [
    //login creadentials validation conditions
    body("email", "login with correct creadentials.").isEmail(),
    body("password", "login with correct creadentials.").isLength({ min: 8 }),
  ],
  async (req, res) => {
    try {
      //validating req data
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
      }

      //destructuring req data
      const { email, password } = req.body;

      //fetching user from DB
      const user = await User.findOne({ email });

      //if user not found
      if (!user) {
        return res
          .status(400)
          .json({ error: "Login with correct creadentials." });
      }

      //if user found then compare the password
      const passwordCompare = await bcrypt.compare(password, user.password);

      //if password not match throw error
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Login with correct creadentials." });
      }

      //jwt payload data
      const data = {
        user: {
          id: user.id,
        },
      };

      //generating jwt token
      const authtoken = jwt.sign(data, JWT_SECRETE);
      res.status(200).json({ authtoken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
);

//fetch user data
router.post("/getUser", fetchUser, async (req, res) => {
  try {
    //after middleware below code is exicuted

    //fetchin user from DB without password
    const user = await User.findById(req.user.id).select("-password");

    //sending user with response
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
