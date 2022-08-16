import db from "../../../utils/db";
import Favorite from "../../../models/Favorite";

const handler = (req, res) => {
  if (req.method === "POST") {
    return postFavorite(req, res);
  } else {
    return res.status(400).send({ message: "Invalid method" });
  }
};

const postFavorite = async (req, res) => {
  await db.connect();
  const { idUser, idProduct } = req.body;

  try {
    const product = await Favorite.find({
      user: idUser,
      product: idProduct,
    });
    console.log('producto', product);
    if (product.length === 0) {
      const favorite = await Favorite.create({ user: idUser, product: idProduct });
      console.log('favorite', favorite);
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
