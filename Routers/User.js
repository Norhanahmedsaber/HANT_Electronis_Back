const express = require("express");
const User = require("../Models/User");
const router = new express.Router();
const auth = require("../Middleware/auth");

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.login(username, password);

  if (user) {
    res.status(200).send(user);
  } else {
    res.status(400).send({ message: "Username or Password Incorrect" });
  }
});
router.post("/signup", async (req, res) => {
  const user = req.body;
  await User.create(user);
  res.send({ Data: "Done" });
});
router.get("/users/:id", auth, async (req, res) => {
  const id = req.params.id;
  const user = await User.getById(id);
  res.send(user);
});

router.get("/users", async (req, res) => {
  const users = await User.getAll();
  res.send(users);
});

router.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  await User.deletee(id);
  res.send("Deleted");
});
router.get("/i", auth, (req, res) => {
  const user = req.user;
  console.log(user);
  res.send(user);
});

router.post("/users/guest", async (req, res) => {
  const user = await User.addGuest();
  res.send(user);
});

module.exports = router;
