const prisma = require("../models/prisma");

exports.getUserById = async (req, res, next) => {
  try {
    const { params } = req;
    console.log("req =", req.params.id);

    let user;

    user = await prisma.User.findFirst({
      where: {
        id: +params.id,
      },
    });

    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

exports.updateUserById = async (req, res, next) => {
  try {
    const { body, params } = req;

    console.log("updateUserById body =", body);
    console.log("updateUserById params =", params);

    let user;

    user = await prisma.User.update({
      data: {
        firstName: body?.firstName,
        lastName: body?.lastName,
        mobile: body?.mobile,
      },
      where: {
        id: +params?.id,
      },
    });

    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};
