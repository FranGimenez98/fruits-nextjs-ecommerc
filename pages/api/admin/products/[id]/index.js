import Product from "../../../../../models/Product";
import db from "../../../../../utils/db";

const handler = async (req, res) => {

  if (req.method === "GET") {
    return getHandler(req, res);
  } else if (req.method === "DELETE") {
    return deleteHandler(req, res);
  }  else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};

const getHandler = async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();
  res.send(product);
};

const deleteHandler = async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  if (product) {
    await product.remove();
    await db.disconnect();
    res.send({ message: "Product removed successfully" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Product not found" });
  }
};

export default handler;
