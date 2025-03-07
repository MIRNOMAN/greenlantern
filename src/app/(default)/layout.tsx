"use client";

import Footer from "@/shared/Footer";
import Navber from "@/shared/Navber";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();

  // Define paths where TopBar should be hidden
  const hideTopBarRoutes = [
    "/our-services",
    "/credit-card-liquidation",
    "/group-economics",
    "/red-card",
    "/get-the-book",
    "/about-us",
  ];

  return (
    <div>
      {/* Conditionally render TopBar */}
      {!hideTopBarRoutes.includes(pathname)}

      <Navber />
      <main style={{ minHeight: "calc(100vh - 360px)" }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
