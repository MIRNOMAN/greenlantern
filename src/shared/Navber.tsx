"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import AvatarMenu from "@/components/AvatarMenu";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) return;

    const fetchUser = async () => {
      try {
        const response = await fetch("http://10.0.10.65:4563/api/v1/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch user");

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
    window.location.reload(); // Or redirect if needed
  };

  const getLinkClass = (path: string) => {
    return pathname === path
      ? "text-[#F5E663] font-medium"
      : "text-white hover:text-[#F5E663] transition-colors";
  };

  return (
    <header className="absolute container md:rounded-[16px] md:top-6 left-0 right-0 z-50 bg-black/30 backdrop-blur-sm">
      <div className="mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="w-8 h-8 flex items-center justify-center rounded-sm">
            {/* SVG Logo */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M16 7.72418C17.4841 8.79858 18.9932 10.0823 20.4555 11.5445C21.9177 13.0067 23.2015 14.5159 24.2759 16.0001..."
                stroke="#F5E663"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M16 18.6667C17.4728 18.6667 18.6667 17.4728 18.6667 16..."
                stroke="#F5E663"
                strokeWidth="2.5"
              />
            </svg>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-[48px]">
          <nav className="hidden md:flex items-center space-x-[32px]">
            <Link href="/" className={getLinkClass("/")}>Home</Link>
            <Link href="/shop" className={getLinkClass("/shop")}>About</Link>
            <Link href="/service" className={getLinkClass("/service")}>Service</Link>
            <Link href="/contact" className={getLinkClass("/contact")}>Contact</Link>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <AvatarMenu />
                <button
                  onClick={handleLogout}
                  className="bg-[#F5E663] text-black px-5 py-2 rounded-full font-medium hover:opacity-90 transition"
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-[#F5E663] text-black px-5 py-2 rounded-full font-medium hover:opacity-90 transition"
              >
                Log In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link href="/" className={getLinkClass("/")} onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/shop" className={getLinkClass("/shop")} onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link href="/service" className={getLinkClass("/service")} onClick={() => setIsMenuOpen(false)}>Service</Link>
            <Link href="/contact" className={getLinkClass("/contact")} onClick={() => setIsMenuOpen(false)}>Contact</Link>

            {user ? (
              <>
                <AvatarMenu />
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="bg-[#F5E663] text-black px-5 py-2 rounded-full font-medium hover:opacity-90 transition w-fit"
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-[#F5E663] text-black px-5 py-2 rounded-full font-medium hover:opacity-90 transition w-fit"
                onClick={() => setIsMenuOpen(false)}
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
