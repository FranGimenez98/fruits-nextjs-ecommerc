import {
  ArrowSmLeftIcon,
  CubeIcon,
  HeartIcon,
  ShoppingBagIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import Layout from "../../components/Layout";
import { ProductCard } from "../../components/ProductCard";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, favs: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "DELETE":
      return { ...state, loading: false, favs: action.payload };
    default:
      state;
  }
}

function FavoriteScreen() {
  const [favorites, setFavorites] = useState([]);
  console.log("favorites", favorites);
  const { query } = useRouter();
  const favsId = query.id;
  console.log(favsId);

  const [{ loading, error, favs }, dispatch] = useReducer(reducer, {
    loading: true,
    favs: [],
    error: "",
  });

  useEffect(() => {
    const fetchFavs = async () => {
      const { data } = await axios.get(`/api/favorite/${favsId}`);
      setFavorites(data);
    };
    fetchFavs();
  }, [favsId]);

  const handleDeleteFav = async (id) => {
    setFavorites(favorites.filter((fav) => fav.product._id !== id));
    return await axios.delete(`/api/favorite/${id}`);
  };

  return (
    <Layout title={`Favorites ${favsId}`}>
      <div className="min-h-screen m-auto flex flex-col mt-[4rem]">
      <div>
        <Link href="/">
          <button ><ArrowSmLeftIcon className="h-10 w-10 text-[#6bbd99]"/></button>
        </Link>
      </div>
        <h2 className="justify-self-start">Favorites</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favorites.length > 0 &&
            favorites.map((item, index) => (
              <div className="card p-4 relative" key={index}>
                <div
                  onClick={() => handleDeleteFav(item.product._id)}
                  className="absolute top-2 right-2 flex justify-center items-center bg-red-200 md:hover:bg-red-300 p-1 rounded-md md:cursor-pointer"
                >
                  <TrashIcon className="h-4 text-red-500" />
                </div>
                <Link href={`product/${item.product.slug}`}>
                  <a>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="md:h-44"
                    />
                  </a>
                </Link>
                <div className="w-full flex flex-col items-center">
                  <h2 className="font-semibold mb-1">{item.product.name}</h2>
                  <h2 className="font-semibold text-[#e36414]">
                    ${item.product.price}
                  </h2>
                  <div>
                    <button className="button my-3 flex items-center justify-center gap-1">
                      Add to cart <ShoppingBagIcon className="h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
}

FavoriteScreen.auth = true;
export default FavoriteScreen;
