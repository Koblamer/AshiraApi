const prisma = require("../models/prisma");

exports.getAllProducts = async (req, res, next) => {
  try {
    const { query } = req;
    console.log(query);
    let products;
    if (query.department === "allproducts") {
      products = await prisma.Product.findMany({
        where: {
          category: query?.category?.toUpperCase(),
        },
      });
    } else {
      console.log(query.category);
      console.log(query.department);
      products = await prisma.Product.findMany({
        where: {
          category: query.category.toUpperCase(),
          department: query.department.toUpperCase(),
        },
      });
    }
    console.log(products);

    res.status(201).json({ products });
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { params } = req;
    console.log("req =", req.params.id);

    let product;

    product = await prisma.Product.findFirst({
      where: {
        id: +params.id,
      },
    });

    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    const { body } = req;

    let product;

    product = await prisma.Product.create({
      data: {
        ...body,
        price: +body?.price,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { body, params } = req;

    console.log("updateProduct body =", body);
    console.log("updateProduct params =", params);

    let product;

    product = await prisma.Product.update({
      data: body,
      where: {
        id: +params?.id,
      },
    });

    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { params } = req;

    const product = await prisma.product.delete({
      where: {
        id: +params.id,
      },
    });

    res.status(201).json({ message: "Delete product complete", product });
  } catch (err) {
    next(err);
  }
};
