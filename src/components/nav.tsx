"use client";

import {
  ArrowLeftOnRectangleIcon,
  CalculatorIcon,
  Cog8ToothIcon,
  DocumentArrowDownIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  RectangleStackIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useContext } from "react";
import { usePathname } from "next/navigation";
import { CubeTransparentIcon } from "@heroicons/react/24/solid";
import { LayoutContext } from "@/app/admin/layout";

const LinkItem = ({ href, children }: any) => {
  const pathname = usePathname();
  const [layoutProps, setLayoutProps] = useContext(LayoutContext);

  const toggleSideMenu = () => {
    setLayoutProps({
      menuOpen: !layoutProps.menuOpen,
    });
  };

  return (
    <Link
      className={`flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-[#232529] hover:text-[#14b8a6] ${
        pathname === href ? "bg-[#232529] text-[#14b8a6]" : ""
      }`}
      href={href}
      onClick={toggleSideMenu}
    >
      {children}
    </Link>
  );
};

const Nav = () => {
  const [layoutProps] = useContext(LayoutContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.replace(window.location.origin + "/login");
  };

  return (
    <aside
      className={`fixed z-10 md:left-0 md:relative flex flex-col items-center w-16 h-screen overflow-hidden text-gray-400 bg-[#17191c] duration-300 ${
        layoutProps.menuOpen ? "left-0" : "-left-16"
      } `}
    >
      <a className="flex items-center justify-center mt-3" href="#">
        <CubeTransparentIcon className="h-7 w-7 text-[#14b8a6]" />
      </a>

      <div className="flex flex-col items-center mt-3 border-t border-gray-700">
        <LinkItem href="/admin">
          <HomeIcon className="h-6 w-6" />
        </LinkItem>

        <LinkItem href="/admin/billing">
          <CalculatorIcon className="h-6 w-6" />
        </LinkItem>

        <LinkItem href="/admin/orders">
          <RectangleStackIcon className="h-6 w-6" />
        </LinkItem>

        <LinkItem href="/admin/expenses">
          <DocumentArrowDownIcon className="h-6 w-6" />
        </LinkItem>

        <LinkItem href="/admin/products">
          <ShoppingBagIcon className="h-6 w-6" />
        </LinkItem>
      </div>
      <div className="flex flex-col items-center mt-2 border-t border-gray-700">
        <LinkItem href="#">
          <MagnifyingGlassIcon className="h-6 w-6" />
        </LinkItem>

        <LinkItem href="#">
          <Cog8ToothIcon className="h-6 w-6" />
        </LinkItem>
      </div>
      <button
        className="flex items-center justify-center w-16 h-16 mt-auto bg-[#151619] hover:bg-gray-700 hover:text-gray-300"
        onClick={handleLogout}
      >
        <ArrowLeftOnRectangleIcon className="h-6 w-6" />
      </button>
    </aside>
  );
};

export default Nav;
