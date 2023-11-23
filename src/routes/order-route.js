const express = require("express");
const orderController = require("../controllers/order-controller");

const router = express.Router();

router.get("/", orderController.getAllOrderDetail);
router.get("/:orderNumber", orderController.getItemByOrderNumber);
router.post(
  "/add",

  orderController.addOrderDetail
);
router.patch("/update", orderController.getAllOrderDetail);

module.exports = router;
