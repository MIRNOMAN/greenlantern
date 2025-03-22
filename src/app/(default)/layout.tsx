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

  // Define paths where Navber and Footer should be hidden
  const hideLayoutRoutes = ["/user/dashboard"];

  const shouldHideLayout = hideLayoutRoutes.includes(pathname);

  return (
    <div>
      {/* Conditionally render Navber and Footer */}
      {!shouldHideLayout && <Navber />}
      <main style={{ minHeight: "calc(100vh - 360px)" }}>{children}</main>
      {!shouldHideLayout && <Footer />}
    </div>
  );
};

export default Layout;
