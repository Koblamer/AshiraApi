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
      products = await prisma.Product.findMany({
        where: {
          category: query.category.toUpperCase(),
          department: query.department,
        },
      });
    }
    console.log(products);

    res.status(201).json({ products });
  } catch (err) {
    next(err);
  }
};
