"use client";
import Nav from "@/components/nav";
import useRole from "@/hooks/useRole";
import { ROLE } from "@/lib/axios";
import { createContext, useState } from "react";

const defaultLayout = {
  menuOpen: false,
};
export const LayoutContext = createContext<any>(null);

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin } = useRole();
  const [layoutProps, setLayoutProps] = useState(defaultLayout);

  return (
    <LayoutContext.Provider value={[layoutProps, setLayoutProps]}>
      <main className="flex">
        {isAdmin ? <Nav /> : null}

        <div className="flex-1 px-4 md:px-8 py-6 max-h-screen overflow-y-auto h-screen">
          {children}
        </div>
      </main>
    </LayoutContext.Provider>
  );
}
