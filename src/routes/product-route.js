const express = require("express");
const productController = require("../controllers/product-controller");
// const authenticateMiddleware = require('../middlewares/authenticate');
const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

// router.post("/login", authController.login);
// router.get("/me", authenticateMiddleware, authController.getMe);

module.exports = router;
