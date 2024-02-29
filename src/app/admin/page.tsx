"use client";

import useRole from "@/hooks/useRole";
import { getRequest } from "@/lib/axios";
import {
  ArrowDownOnSquareIcon,
  CalculatorIcon,
  DocumentArrowDownIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import AppTitle from "@/components/AppTitle";
import { useInstallPWA } from "@/hooks/useInstallPWA";

export default function Home() {
  const [prompt, promptToInstall] = useInstallPWA();
  const { isAdmin } = useRole();
  const [isVisible, setVisibleState] = useState(false);

  const hide = () => setVisibleState(false);

  return (
    <>
      <div className="flex justify-between items-center mb-3 md:mb-6">
        <AppTitle title="Shop Savio" />
      </div>

      <h1>Dashboard</h1>

      {isVisible ? (
        <div
          onClick={hide}
          className="bg-[#0a0a0a] fixed bottom-0 left-0 right-0 py-4 z-50 flex-col flex items-center md:w-80 md:rounded-lg md:left-auto md:bottom-4 md:right-4"
        >
          <p className="text-sm text-center opacity-70 mb-4">
            Click to add the app to homescreen
          </p>
          <div className="w-1/2 md:w-36">
            <button
              className="button flex gap-2 justify-center"
              onClick={promptToInstall}
            >
              <ArrowDownOnSquareIcon className="h-5 w-5" />
              Install
            </button>
          </div>
          <button onClick={hide} className="text-center w-full text-sm  mt-6">
            Cancel
          </button>
        </div>
      ) : null}
    </>
  );
}
