import db from "../../../utils/db";
import Favorite from "../../../models/Favorite";
import { getSession } from "next-auth/react";

const handler = (req, res) => {
  if (req.method === "POST") {
    return postFavorite(req, res);
  } else if (req.method === "GET") {
    return getUserFavorites(req, res);
  } else {
    return res.status(400).send({ message: "Invalid method" });
  }
};

const getUserFavorites = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: "signin required" });
  }

  const { user } = session;
  await db.connect();
  const favorites = await Favorite.find({ user: user._id }).populate("product");
  await db.disconnect();
  res.json(favorites);
};

const postFavorite = async (req, res) => {
  await db.connect();
  const { idUser, idProduct } = req.body;

  try {
    const product = await Favorite.find({
      user: idUser,
      product: idProduct,
    });
    console.log("producto", product);
    if (product.length === 0) {
      const favorite = await Favorite.create({
        user: idUser,
        product: idProduct,
      });
      console.log("favorite", favorite);
      res
        .status(200)
        .json({ message: "Favorite added successfully", favorite });
    } else {
      res
        .status(400)
        .json({ message: "This publication has already in favorites" });
    }
  } catch (err) {
    res.status(422).json({ msg: "Error adding favorite" });
    console.log(err);
  }
};

export default handler;
