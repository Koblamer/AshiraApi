const prisma = require("../models/prisma");

exports.getAddressByUserId = async (req, res, next) => {
  try {
    const { params } = req;

    let address;

    address = await prisma.address.findFirst({
      where: {
        userId: +params.id,
      },
    });

    console.log("address =", address);

    res.status(201).json({ address });
  } catch (err) {
    next(err);
  }
};

exports.addAddress = async (req, res, next) => {
  try {
    const { body } = req;

    console.log("body address =", body);

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

exports.updateAddress = async (req, res, next) => {
  try {
    const { body, params } = req;

    let user;
    let address;

    user = await prisma.user.findFirst({
      where: {
        id: +params?.id,
      },
    });

    address = await prisma.address.update({
      data: {
        address: body.address,
        province: body.province,
        district: body.district,
        sub_district: body.sub_district,
        post_code: +body.post_code,
        userId: body.userId,
      },
      where: {
        id: +params?.id,
      },
    });

    res.status(201).json({ address });
  } catch (err) {
    next(err);
  }
};
