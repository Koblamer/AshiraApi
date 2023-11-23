const prisma = require("../models/prisma");

exports.addAddress = async (req, res, next) => {
  try {
    const { body } = req;

    const createAddress = await prisma.address.create({
      data: {
        userId: body?.userId,
        address: body?.address,
        province: body?.province,
        district: body?.district,
        sub_district: body?.sub_district,
        post_code: +body?.post_code,
      },
    });
    res
      .status(201)
      .json({ message: "Add address complete", address: createAddress });
  } catch (err) {
    next(err);
  }
};
