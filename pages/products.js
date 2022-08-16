import { Listbox } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { ProductCard } from "../components/ProductCard";
import Product from "../models/Product";
import db from "../utils/db";
import { useContext } from "react";
import { Store } from "../utils/Store";
import Searchbar from "../components/Searchbar";

export default function ProductsScreen({ products }) {
  const orderValues = ["Asc", "Desc"];

  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [prods, setProds] = useState(products);
  const [order, setOrder] = useState("");
  console.log(order);
  const { state, dispatch } = useContext(Store);

  console.log("selectedCategory", selectedCategory);
  console.log("productsd", prods);

  const handleAddToCart = (product) => {
    const existItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      alert("No hay stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
  };

  useEffect(() => {
    const getCategorys = () => {
      const category = products.map((product) => product.category);
      const uniqueCategory = [...new Set(category)];
      setCategory(uniqueCategory);
    };

    getCategorys();
  }, [products]);

  const filteredProduct = (name) => {
    const productsX =
      name === ""
        ? products
        : products.filter((product) => product.category.includes(name));
    setProds(productsX);
  };

  const sortProducts = (name) => {
    const sort =
      name === "Asc"
        ? products.sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            } else if (a.name < b.name) {
              return -1;
            } else {
              return 0;
            }
          })
        : products.sort((a, b) => {
            if (a.name > b.name) {
              return -1;
            } else if (a.name < b.name) {
              return 1;
            } else {
              return 0;
            }
          });

    setProds(sort);
  };

  return (
    <Layout title="Products">
      <div className="min-h-screen flex flex-col mt-[4rem] lg:mt-[4rem]">
        <h2 className="text-xl font-semibold my-2">Products</h2>
        <Searchbar products={products} />
        <div className="w-full flex items-center justify-between">
          <div>
            <span className="font-semibold">{products.length} Products</span>
          </div>
          <div className="flex items-center gap-1 my-2">
            <div>
              <Listbox
                as="div"
                value={category}
                onChange={setSelectedCategory}
                className="bg-[#87c9ac] relative p-2 rounded-md shadow-lg min-w-[6rem]"
              >
                <Listbox.Button className="font-semibold text-white">
                  {selectedCategory?.length > 0
                    ? selectedCategory + "s"
                    : "Categories"}
                </Listbox.Button>
                <Listbox.Options
                  as="ul"
                  className="bg-[#87c9ac] text-white absolute z-10 right-0 origin-top-right w-full rounded-b-md shadow-lg py-1 px-2 "
                >
                  <Listbox.Option
                    as="li"
                    name="All"
                    onClick={() => filteredProduct("")}
                    className="w-full text-sm cursor-pointer"
                  >
                    All
                  </Listbox.Option>
                  {category.map((name, index) => (
                    <Listbox.Option
                      as="li"
                      key={index}
                      value={name}
                      onClick={() => filteredProduct(name)}
                      className="w-full text-sm cursor-pointer"
                    >
                      {name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>
            <div>
              <Listbox
                as="div"
                className="bg-[#87c9ac] text-white relative p-2 rounded-md shadow-lg min-w-[3rem]"
                value={order}
                onChange={setOrder}
              >
                <Listbox.Button className="font-semibold">Sort</Listbox.Button>
                <Listbox.Options
                  as="ul"
                  className="bg-[#87c9ac] text-white absolute z-10 right-0 origin-top-right w-full rounded-b-md shadow-lg py-1 px-2 text-start"
                >
                  {orderValues.map((name) => (
                    <Listbox.Option
                      as="li"
                      key={name}
                      value={name}
                      className="w-full text-sm cursor-pointer"
                      onClick={() => sortProducts(name)}
                    >
                      {name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {prods.map((product) => (
            <ProductCard
              product={product}
              key={product._id}
              addToCart={handleAddToCart}
            />
          ))}{" "}
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  await db.connect();
  const products = await Product.find().lean();

  return {
    props: {
      products: products.map(db.docToObject),
    },
  };
};
