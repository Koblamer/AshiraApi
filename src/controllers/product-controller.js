const prisma = require("../models/prisma");

exports.getAllProducts = async (req, res, next) => {
  try {
    console.log("req =", req);
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
        //validate ไม่ให้ราคาติดลบ
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
      data: {
        id: body?.id,
        SKU: body?.SKU,
        name: body?.name,
        desc: body?.desc,
        dimensions: body?.dimensions,
        category: body?.category,
        department: body?.department,
        price: +body?.price,
        imageUrl: body?.imageUrl,
        vdoUrl: body?.vdoUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
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

    console.log("params =", params);
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
