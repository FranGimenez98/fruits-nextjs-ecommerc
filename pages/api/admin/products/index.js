import db from "../../../../utils/db";
import Product from "../../../../models/Product";

const handler = (req, res) => {
  if (req.method === "POST") {
    return postHandler(req, res);
  } else if (req.method === "GET") {
    return getHandler(req, res);
  } else {
    return res.status(400).send({ message: "Invalid method" });
  }
};

const postHandler = async (req, res) => {
  await db.connect();

  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getHandler = async (req, res) => {
  await db.connect();

  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (err) {
    console.log(err)
    await db.disconnect();
    res.status(500).json(err);
  }
};

export default handler;
