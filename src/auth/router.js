const express = require("express");

const router = express.Router();

const basicAuth = require("./middleware/basic");

const UserSchema = require("./models/users-model");

router.get("/users", async (req, res) => {
  const data = await UserSchema.find({});
  res.status(200).send({ data });
});

router.post("/signup", async (req, res) => {
  const newUser = new UserSchema(req.body);
  const data = await newUser.save();
  res.status(200).send({ data });
});

router.post("/signin", basicAuth, async (req, res) => {
  const { user, isValid } = req;
  if (isValid) {
    const authUser = new UserSchema({ username: user.username });
    const token = await authUser.generateToken();
    res.status(200).send({ user, token });
  } else {
    res.status(401).send({ msg: "username/password is incorrect" });
  }
});

module.exports = router;
