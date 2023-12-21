const express = require("express");
const addressController = require("../controllers/address-controller");

const router = express.Router();

router.get("/:id", addressController.getAddressByUserId);
router.post("/add", addressController.addAddress);
router.patch("/:id", addressController.updateAddress);

module.exports = router;
