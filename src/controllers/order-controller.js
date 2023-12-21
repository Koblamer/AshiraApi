const { PAYMENT_STATUS } = require("../constant");
const prisma = require("../models/prisma");

exports.getAllOrderDetail = async (req, res, next) => {
  try {
    const orders = await prisma.orderDetails.findMany({});
    // const payment = await prisma.paymentDetail.findMany({
    //   include: {
    //     orderDetails: true,
    //   },
    // });

    res.status(201).json({ orders });
  } catch (err) {
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const { params } = req;
    console.log("req =", req.params.id);

    let order;

    order = await prisma.orderDetails.findFirst({
      where: {
        id: +params.id,
      },
    });

    const paymentDetail = await prisma.paymentDetail.findFirst({
      where: {
        orderDetailId: +params.id,
      },
    });

    const paymentReciept = await prisma.paymentReceiptDetail.findFirst({
      where: {
        paymentDetailId: +paymentDetail.id,
      },
    });

    res.status(201).json({ order, paymentDetail, paymentReciept });
  } catch (err) {
    next(err);
  }
};

exports.getItemByOrderNumber = async (req, res, next) => {
  try {
    const { params } = req;

    console.log("getItemByOrderNumber params =", params);

    const orderDetail = await prisma.orderDetails.findFirst({
      where: {
        orderNumber: params.orderNumber,
      },
    });

    console.log("orderDetail =", orderDetail);

    const orderItems = await prisma.orderItems.findMany({
      where: {
        orderDetailId: orderDetail?.id,
      },
      include: {
        product: true,
      },
    });

    const payment = await prisma.paymentDetail.findFirst({
      where: {
        orderDetailId: orderDetail?.id,
      },
    });

    res.status(201).json({ orderDetail, orderItems, payment });
  } catch (err) {
    next(err);
  }
};

exports.addOrderDetail = async (req, res, next) => {
  try {
    const { body } = req;

    let slipPaymentUrl = null;
    if (body.slipPayment) {
      slipPaymentUrl = body.slipPayment;
    }

    // Create OrderDetail
    const createOrderDetail = await prisma.orderDetails.create({
      data: {
        orderNumber: body.orderNumber,
        userId: +body.userId,
        total: +body.total,
        createdAt: new Date(),
        updatedAt: new Date(),
        orderStatus: body.orderStatus,
      },
    });

    if (createOrderDetail) {
      // Create PaymentDetail
      const createPayment = await prisma.paymentDetail.create({
        data: {
          orderDetailId: createOrderDetail?.id,
          totalPrice: body.total,
          paymentStatus: PAYMENT_STATUS.PENDING,
          slipURL: slipPaymentUrl,
          createdAt: new Date(),
          updatedAt: new Date(),
          modified_at: new Date(),
        },
      });

      if (createPayment) {
        const createPaymentReceiptDetail =
          await prisma.paymentReceiptDetail.create({
            data: {
              paymentDetailId: +createPayment?.id,
              destinationBank: body?.destinationBank,
              sourceBank: body?.sourceBank,
              senderAccountNumber: +body?.senderAccountNumber,
              transactionDate: body.transactionDate,
              amount: +body?.amount,
            },
          });
      }

      const orderItemList = [];
      // Create OrderItems by products
      body.products.forEach(async (p) => {
        const createOrderItem = await prisma.orderItems.create({
          data: {
            orderDetailId: createOrderDetail.id,
            productId: p.id,
            quantity: p.qty,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });

        orderItemList.push(createOrderItem);

        console.log("createOrderItem =", createOrderItem);
      });

      res.status(200).json({
        status: 200,
        message: "Add OrderDetail complete",
        orderDetail: createOrderDetail,
        payment: createPayment,
        orderItems: orderItemList,
      });
    } else {
      res.status(200).json({
        message: "Add OrderDetail fail",
        orderDetail: createOrderDetail,
        payment: createPayment,
        orderItems: orderItemList,
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const { body, params } = req;

    let orderDetail;
    let paymentDetail;

    orderDetail = await prisma.orderDetails.update({
      data: {
        orderStatus: body.orderStatus,
        updatedAt: new Date(),
      },
      where: {
        id: +params?.id,
      },
    });

    const payment = await prisma.paymentDetail.findFirst({
      where: {
        orderDetailId: +params?.id,
      },
    });

    paymentDetail = await prisma.paymentDetail.update({
      data: {
        paymentStatus: body.paymentStatus,
      },
      where: {
        id: payment.id,
      },
    });

    res.status(201).json({ orderDetail, paymentDetail });
  } catch (err) {
    next(err);
  }
};
