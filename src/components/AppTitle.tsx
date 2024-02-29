import { LayoutContext } from "@/app/admin/layout";
import useRole from "@/hooks/useRole";
import { Bars3Icon, HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useContext } from "react";

const AppTitle = ({ title }: { title: string }) => {
  const { isAdmin } = useRole();
  const [layoutProps, setLayoutProps] = useContext(LayoutContext);

  const toggleSideMenu = () => {
    setLayoutProps({
      menuOpen: !layoutProps.menuOpen,
    });
  };

  return (
    <h1 className="text-2xl font-bold flex items-center">
      {isAdmin ? (
        <button
          onClick={toggleSideMenu}
          className={`inline-flex md:hidden items-center justify-center w-10 h-10 mr-3 rounded-md bg-[#1f2a37] text-[#14b8a6]`}
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      ) : (
        <Link
          className={`inline-flex items-center justify-center w-10 h-10 mr-3 rounded-md bg-[#1f2a37] text-[#14b8a6]`}
          href="/admin"
        >
          <HomeIcon className="h-6 w-6" />
        </Link>
      )}{" "}
      {title}
    </h1>
  );
};

export default AppTitle;
