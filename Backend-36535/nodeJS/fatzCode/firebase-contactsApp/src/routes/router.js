require("dotenv/config");
const router = require("express").Router();
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
});

const db = admin.database();

router.get("/", (req, res) => {
  db.ref("contacts").once("value", (snapshot) => {
    const data = snapshot.val();
    res.render("dashboard", { contacts: data });
  });
});

router.post("/new-contact", (req, res) => {
  const newContact = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
  };
  db.ref("contacts").push(newContact);
  res.redirect("/");
});

router.get("/delete-contact/:id", (req, res) => {
  db.ref("contacts/" + req.params.id).remove();
  res.redirect("/");
});

module.exports = router;
