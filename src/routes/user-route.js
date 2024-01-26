const express = require("express");
const userController = require("../controllers/user-controller");
const authenticateMiddleware = require("../middlewares/authticate");
const router = express.Router();

router.get("/:id", authenticateMiddleware, userController.getUserById);
router.patch("/:id", authenticateMiddleware, userController.updateUserById);

module.exports = router;
