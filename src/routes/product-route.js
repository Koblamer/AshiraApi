const express = require("express");
const productController = require("../controllers/product-controller");
const authenticateMiddleware = require("../middlewares/authticate");
const router = express.Router();

router.get("/", authenticateMiddleware, productController.getAllProducts);
router.get("/:id", authenticateMiddleware, productController.getProductById);
router.post("/add", authenticateMiddleware, productController.addProduct);
router.patch("/:id", authenticateMiddleware, productController.updateProduct);
router.delete("/:id", authenticateMiddleware, productController.deleteProduct);

// router.post("/login", authController.login);
// router.get("/me", authenticateMiddleware, authController.getMe);

module.exports = router;
