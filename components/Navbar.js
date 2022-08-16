import React, { useContext } from "react";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import DropdownLink from "./DropdownLink";
import { HomeIcon, ShoppingBagIcon } from "@heroicons/react/solid";
import Cookies from "js-cookie";
import { Store } from "../utils/Store";
import { signOut } from "next-auth/react";

export default function Navbar({ cartItems, session, status }) {
  const { dispatch } = useContext(Store);

  const handleLogout = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };

  return (
    <header className=" w-full flex items-center justify-center">
      <nav className="flex container md:max-w-[900px] h-16   justify-between items-center px-4 bg-[#fafafa] top-0 fixed z-50">
        <Link href="/">
          <a className="text-xl font-bold text-[#6bbd99] hover:text-[#87c9ac]">
            FRUITS
          </a>
        </Link>
        <div className="flex items-center gap-2 relative">
          <Link href="/products">
            <a className="text-[#6bbd99] hover:text-[#87c9ac] w-8 h-8">
              <HomeIcon />
            </a>
          </Link>
          <Link href="/cart">
            <a className="p-1">
              <ShoppingBagIcon className="text-[#6bbd99] hover:text-[#87c9ac] w-8 h-8" />
              {cartItems > 0 && (
                <span className="ml-1 absolute top-0 right-[5.5rem] rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                  {cartItems}
                </span>
              )}
            </a>
          </Link>

          {status === "loading" ? (
            <div>Loading...</div>
          ) : session?.user ? (
            <Menu as="div" className="relative inline-block">
              <Menu.Button className="text-white bg-[#6bbd99] hover:bg-[#87c9ac] font-semibold rounded-lg flex items-center justify-center py-1 px-2">
                {session.user.name}
              </Menu.Button>
              <Menu.Items className="p-1 absolute right-0 min-w-[10rem] origin-top-right bg-white rounded-md shadow-lg mt-1">
                
                <Menu.Item>
                  <DropdownLink
                    className="dropdown-link"
                    href={`/favorites/${session?.user._id}`}
                  >
                    Favorites
                  </DropdownLink>
                </Menu.Item>
                <Menu.Item>
                  <DropdownLink
                    className="dropdown-link"
                    href="/order-history"
                  >
                    Order History
                  </DropdownLink>
                </Menu.Item>
                {session.user.isAdmin && (
                  <Menu.Item>
                    <DropdownLink
                      className="dropdown-link"
                      href="/admin/dashboard"
                    >
                      Admin Dashboard
                    </DropdownLink>
                  </Menu.Item>
                )}
                <Menu.Item>
                  <a className="dropdown-link" href="#" onClick={handleLogout}>
                    Logout
                  </a>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <div>
              <Link href="/login">
                <a>
                  <button className="button">Login</button>
                </a>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
