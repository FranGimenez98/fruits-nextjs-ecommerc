import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/solid";
import axios from "axios";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

export const ProductCard = ({ product, addToCart }) => {
  const { data: session } = useSession();

  const handleAddToFav = async (idUser, idProduct) => {
    if (!session) {
      toast.error("Login or register to add to favorites");
    } else {
      try {
        await axios.post("/api/favorite", { idUser, idProduct });
        toast.success(`${product.name} added to favorites`);
      } catch (err) {
        // toast.error('Already added to favorites')
        toast.error(`${product.name} already added to favorites`);
      }
    }
  };

  // const handleDeleteFav = (id) => {
  //   axios.delete(`api/favorite/${id}`);
  // };

  return (
    <div className="card p-4 relative">
      <div
        onClick={() => {
          handleAddToFav(session?.user._id, product._id);
        }}
        className="absolute top-2 right-2 flex justify-center items-center bg-red-200 md:hover:bg-red-300 p-1 rounded-md md:cursor-pointer"
      >
        <HeartIcon className="h-4 text-red-500" />
      </div>
      <Link href={`product/${product.slug}`}>
        <a>
          <img src={product.image} alt={product.name} className="md:h-44" />
        </a>
      </Link>
      <div className="w-full flex flex-col items-center">
        <h2 className="font-semibold md:mb-1">{product.name}</h2>
        <h2 className="font-semibold text-[#e36414] my-1">${product.price}</h2>
        <div>
          <button
            className="button md:my-3 flex items-center justify-center gap-1"
            onClick={() => addToCart(product)}
          >
            Add to cart <ShoppingBagIcon className="h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
