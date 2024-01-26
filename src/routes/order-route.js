const express = require("express");
const orderController = require("../controllers/order-controller");
const authenticateMiddleware = require("../middlewares/authticate");

const router = express.Router();

router.get("/", authenticateMiddleware, orderController.getAllOrderDetail);
router.get("/:id", authenticateMiddleware, orderController.getOrderById);
router.get(
  "/userId/:userId",
  authenticateMiddleware,
  orderController.getOrderByUserId
);
router.get(
  "/search/:orderNumber",
  authenticateMiddleware,
  orderController.getItemByOrderNumber
);
router.post("/add", authenticateMiddleware, orderController.addOrderDetail);
router.patch("/:id", authenticateMiddleware, orderController.updateOrder);

module.exports = router;
