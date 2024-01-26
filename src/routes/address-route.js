const express = require("express");
const addressController = require("../controllers/address-controller");
const authenticateMiddleware = require("../middlewares/authticate");

const router = express.Router();

router.get(
  "/:id",
  authenticateMiddleware,
  addressController.getAddressByUserId
);
router.post("/add", authenticateMiddleware, addressController.addAddress);
router.patch("/:id", authenticateMiddleware, addressController.updateAddress);

module.exports = router;
