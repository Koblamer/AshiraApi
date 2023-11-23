const express = require("express");
const paymentController = require("../controllers/payment-controller");
const uploadMiddleware = require("../middlewares/upload");

const router = express.Router();

router.post(
  "/uploadSlip",
  uploadMiddleware.single("image"),
  paymentController.uploadSlipPayment
);

module.exports = router;
