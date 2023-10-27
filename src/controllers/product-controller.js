const prisma = require("../models/prisma");

exports.getAllProducts = async (req, res, next) => {
  try {
    const { query } = req;
    console.log(query);
    let products;
    if (query.department === "allproducts") {
      products = await prisma.Product.findMany({
        where: {
          category: query.category.toUpperCase(),
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
