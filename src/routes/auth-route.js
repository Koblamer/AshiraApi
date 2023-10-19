const express = require("express");
const authController = require("../controllers/auth-controller");
// const authenticateMiddleware = require("../middlewares/authenticate");
const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
// router.get("/member", auththenticateMiddleware.authController.getMember);

module.exports = router;
