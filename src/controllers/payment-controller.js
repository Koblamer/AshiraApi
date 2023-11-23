const prisma = require("../models/prisma");
const fs = require("fs/promises");
const { upload } = require("../utils/cloudinary-service");

exports.uploadSlipPayment = async (req, res, next) => {
  try {
    const { message } = req.body;
    if ((!message || !message.trim()) && !req.file) {
      return next(createError("message or image is required", 400));
    }

    console.log("req.file =", req.file);

    let image = null;
    if (req.file) {
      image = await upload(req.file.path);
    }
    res.status(201).json({ message: "upload payment slip", imageUrl: image });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlink(req.file.path);
    }
  }
};
