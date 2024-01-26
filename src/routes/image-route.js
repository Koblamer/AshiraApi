const express = require("express");
const imageController = require("../controllers/image-controller");
const uploadMiddleware = require("../middlewares/upload");
const authenticateMiddleware = require("../middlewares/authticate");

const router = express.Router();

router.post(
  "/upload",
  uploadMiddleware.single("image"),
  imageController.uploadImage
);

module.exports = router;
