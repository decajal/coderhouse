require("dotenv/config");
const router = require("express").Router();
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: process.env.DATABASE_URL,
});

const db = admin.database();

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/new-contact", (req, res) => {
  const newContact = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
  };
  db.ref("contacts").push(newContact);
  res.send("Received");
});

module.exports = router;
