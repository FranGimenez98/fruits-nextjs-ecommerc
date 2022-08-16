import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Francisco",
      email: "isadmin@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "Franciscop",
      email: "isnotadmin@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],

  products: [
    {
      name: "Champignon",
      slug: "champignon",
      category: "Mushroom",
      image: "/images/champignon.jpg",
      description: "Tasty Mushroom",
      price: 10,
      countInStock: 100,
    },
    {
      name: "Dragon Fruit",
      slug: "dragon-fruit",
      category: "Fruit",
      image: "/images/dragon-fruit.jpg",
      description: "Tasty Fruit",
      price: 10,
      countInStock: 100,
    },
    {
      name: "Coconut",
      slug: "coconut",
      category: "Fruit",
      image: "/images/coconut.jpg",
      description: "Tasty Fruit",
      price: 10,
      countInStock: 100,
    },
    {
      name: "Letuce",
      slug: "letuce",
      category: "Vegetable",
      image: "/images/letuce.jpg",
      description: "Healthy Vegetable",
      price: 10,
      countInStock: 100,
    },
  ],
};

export default data;
