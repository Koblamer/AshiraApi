const express = require("express");
const orderController = require("../controllers/order-controller");

const router = express.Router();

router.get("/", orderController.getAllOrderDetail);
router.get("/:id", orderController.getOrderById);
router.get("/search/:orderNumber", orderController.getItemByOrderNumber);
router.post(
  "/add",

  orderController.addOrderDetail
);
router.patch("/:id", orderController.updateOrder);

module.exports = router;
