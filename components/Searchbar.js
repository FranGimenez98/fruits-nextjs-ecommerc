import { Combobox } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Searchbar({ products }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filterPoducts = query
    ? products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div>
      <Combobox
        as="div"
        className="relative mx-auto max-w rounded-md bg-white shadow-sm"
        onChange={(product) => {
          router.push(`/product/${product.slug}`);
        }}
      >
        <div className="flex items-center px-1">
          <div className=" rounded-md h-[2rem] w-[2rem] flex items-center justify-center">
             <SearchIcon className="h-[1.4rem] md:h-[1.5rem] text-[#87c9ac]" />
          </div>
         
          <Combobox.Input
            placeholder="Search..."
            className="border-none outline-hidden w-[85%] outline-0 focus:ring-0 placeholder-gay-400"
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />
        </div>
        {filterPoducts.length > 0 && (
          <Combobox.Options className="bg-white max-h-40 text-sm overflow-y-auto rounded-b-md py-3 absolute z-20 shadow-md w-full top-[2.27rem]">
            {filterPoducts.map((x, index) => (
              <Combobox.Option key={index} className="px-2 mx-1 my-1 py-2 rounded-md cursor-default hover:bg-gray-100 transition" value={x}>
                {x.name}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
        {query && filterPoducts.length === 0 && (
          <p className="p-4 text-sm text-gray-400 bg-white max-h-40 overflow-y-auto rounded-b-md py-3 absolute z-20 shadow-md w-full top-[2.27rem]">
            No results find...
          </p>
        )}
      </Combobox>
    </div>
  );
}
