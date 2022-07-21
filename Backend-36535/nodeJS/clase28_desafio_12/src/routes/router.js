const { Router } = require("express");
const router = new Router();
const passport = require("passport");
const controllerAuth = require("../controllers/controllerAuth");
const controllerUtils = require("../controllers/controllerUtils");

const checkSessions = require("./checkSessions");

router.get("/", controllerAuth.getLogin);
// Login
router.get("/login", controllerAuth.getLogin);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/failLogin",
  }),
  controllerAuth.postLogin
);
router.get("/failLogin", controllerAuth.getFailLogin);

// Signup
router.get("/signup", controllerAuth.getSignup);
router.post("/signup", controllerAuth.postSignup);

// Dashboard
router.get("/dashboard", checkSessions, controllerAuth.getDashBoard);

// Logout
router.post("/logout", controllerAuth.getLogout);

// Info
router.get("/info", controllerUtils.getInfo);

router.get("/api/randoms", controllerUtils.getRandoms);

module.exports = router;
