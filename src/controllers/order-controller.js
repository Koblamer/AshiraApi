const prisma = require("../models/prisma");

exports.getAllOrderDetail = async (req, res, next) => {
  try {
    const orders = await prisma.orderDetails.findMany({});

    res.status(201).json({ orders });
  } catch (err) {
    next(err);
  }
};

exports.addOrderDetail = async (req, res, next) => {
  try {
    const { body } = req;

    // Create OrderDetail
    const orderDetail = await prisma.orderDetails.create({
      data: {
        userId: body.userId,
        total: body.total,
        createdAt: new Date(),
        updatedAt: new Date(),
        orderStatus: body.orderStatus,
      },
    });

    // Create PaymentDetail
    const payment = await prisma.paymentDetail.create({
      data: {
        orderDetailId: 1,
        totalPrice: body.total,
        paymentStatus: "PAID",
        slipURL: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        modified_at: new Date(),
      },
    });

    // Create OrderItems by products
    body.products.forEach(async (p) => {
      const orderItem = await prisma.orderItems.create({
        data: {
          orderDetailId: orderDetail.id,
          productId: p.id,
          quantity: p.qty,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    });

    res.status(200).json({ message: "Add OrderDetail complete" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
