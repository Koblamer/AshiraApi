const bcrypt = require("bcryptjs");
const prisma = require("../models/prisma");
const { signUpSchema, signInSchema } = require("../validators/auth-validator");
const createError = require("../utils/create-error");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res, next) => {
  try {
    const { value, error } = signUpSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    value.password = await bcrypt.hash(value.password, 12);

    const user = await prisma.user.create({
      data: {
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        mobile: value.mobile,
        password: value.password,
        role: "CUSTOMER",
      },
    });
    res.status(200).json({ message: "Sing Up complete" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { value, error } = signInSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const user = await prisma.user.findFirst({
      where: {
        email: value.email,
      },
    });

    if (!user) {
      return next(createError("invalid credential", 400));
    }

    const isMatch = await bcrypt.compare(value.password, user.password);
    if (!isMatch) {
      return next(createError("invalid credential", 400));
    }

    console.log("PROCESS ENV", process.env.JWT_SECRET_KEY);
    const payload = { userId: user.id };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "kjhkjhk54sksjkdhaskljdldtyf79",

      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
    delete user.password;
    res.status(200).json({ accessToken, user });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getUser = (req, res) => {
  res.status(200).json({ user: req.user });
};
