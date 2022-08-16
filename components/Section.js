import { Splide, SplideSlide } from "@splidejs/react-splide";
import React from "react";
import { ProductCard } from "./ProductCard";
import "@splidejs/react-splide/css";

export default function Section({ productsFruits, productsVegetables }) {
  return (
    <div className="min-h-screen flex flex-col justify-center ">
      <h2 className="text-xl font-bold my-4 uppercase">Our popular options</h2>
      <div>
        <h2 className="font-semibold mb-1">Popular Fruits</h2>

        <div className=" grid-cols-1 md:grid-cols-4 gap-4 hidden md:grid">
          {productsFruits.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}{" "}
        </div>
        <div className="md:hidden">
          <Splide
            options={{
              arrows: false,
              pagination: false,
              perPage: 5,
              gap: "1rem",
              breakpoints: {
                1200: { perPage: 2, gap: "50px" },
                640: { perPage: 2, gap: "10px" },
              },
            }}
          >
            {productsFruits?.map((product, index) => (
              <SplideSlide key={index}>
                <ProductCard product={product} key={product._id} />
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
      <div>
        <h2 className="font-semibold mb-1">Popular Vegetables</h2>
        <div className="md:hidden">
          <Splide options={{
              arrows: false,
              pagination: false,
              perPage: 5,
              gap: "1rem",
              breakpoints: {
                1200: { perPage: 2, gap: "50px" },
                640: { perPage: 2, gap: "10px" },
              },
            }}>
            {productsVegetables.map((product) => (
              <SplideSlide key={product._id}>
                <ProductCard product={product} />
              </SplideSlide>
            ))}{" "}
          </Splide>
        </div>
        <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-4">
          {productsVegetables.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}{" "}
        </div>
      </div>
    </div>
  );
}
