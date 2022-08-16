import { ArrowSmLeftIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useContext } from "react";
import Layout from "../../components/Layout";
import Product from "../../models/Product";
import db from "../../utils/db";
import { Store } from "../../utils/Store";
import { toast } from "react-toastify";

export default function ProductScreen(props) {
  const { data: session } = useSession();
  const router = useRouter();
  const { product } = props;
  const { state, dispatch } = useContext(Store);

  const handleAddToCart = () => {
    if (!session) {
      toast.error("Login or register to add to cart");
    } else {
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === product.slug
      );
      const quantity = existItem ? existItem.quantity + 1 : 1;

      if (product.countInStock < quantity) {
        alert("No hay stock");
        return;
      }
      dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
      router.push("/cart");
    }
  };

  if (!product) {
    return <Layout title="Produt Not Found">Produt Not Found</Layout>;
  }

  return (
    <Layout title={product.name}>
      <div className="mt-[3rem] mb-[1rem]">
        <Link href="/">
          <button>
            <ArrowSmLeftIcon className="h-10 w-10 text-[#6bbd99]" />
          </button>
        </Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2 bg-white mb-2 rounded-md p-3">
          <img className="" src={product.image} alt={product.name} />

          <ul>
            <li>
              <h1 className="text-xl font-bold">{product.name}</h1>
            </li>
            <li className="text-lg">
              <span className="font-semibold">Category:</span>{" "}
              {product.category}
            </li>
            <li className="text-lg">
              <span className="font-semibold">Description:</span>{" "}
              {product.description}
            </li>
          </ul>
        </div>

        <div></div>
        <div>
          <div className="card p-5">
            <div>
              
            </div>
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? "In stock" : "Unavailable"}</div>
            </div>
            
            <button className="button w-full" onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>
        </div>
        <div></div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.docToObject(product) : null,
    },
  };
};
