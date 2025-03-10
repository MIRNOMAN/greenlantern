"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navber() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <header className="absolute container md:rounded-[16px]  top-6 left-0 right-0 z-50 bg-black/30 backdrop-blur-sm">
    <div className=" mx-auto  px-4 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <div className=" w-8 h-8 flex items-center justify-center rounded-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
<path d="M16 7.72418C17.4841 8.79858 18.9932 10.0823 20.4555 11.5445C21.9177 13.0067 23.2015 14.5159 24.2759 16.0001M16 7.72418C14.5159 8.79858 13.0068 10.0823 11.5446 11.5445C10.0823 13.0068 8.7986 14.5159 7.72418 16.0001M16 7.72418C20.7599 4.27838 25.2629 2.98544 27.1388 4.86125C29.0145 6.73708 27.7216 11.2402 24.2759 16.0001M24.2759 16.0001C27.7216 20.7599 29.0144 25.2629 27.1387 27.1388C25.7479 28.5295 22.9131 28.1784 19.6 26.4996M24.2759 16.0001C23.2015 17.4843 21.9177 18.9933 20.4556 20.4555C18.9933 21.9177 17.4841 23.2015 16 24.2759M7.72418 16.0001C8.79857 17.4843 10.0823 18.9933 11.5445 20.4555C13.0067 21.9177 14.5159 23.2015 16 24.2759M7.72418 16.0001C4.27846 20.7599 2.98556 25.2629 4.86136 27.1388C6.73716 29.0145 11.2402 27.7216 16 24.2759M7.72418 16.0001C4.27837 11.2402 2.98542 6.73706 4.86124 4.86124C6.252 3.47048 9.08694 3.82159 12.4 5.5005" stroke="#FF510E" stroke-width="2.5" stroke-linecap="round"/>
<path d="M16 18.6667C17.4728 18.6667 18.6667 17.4728 18.6667 16C18.6667 14.5273 17.4728 13.3333 16 13.3333C14.5273 13.3333 13.3334 14.5273 13.3334 16C13.3334 17.4728 14.5273 18.6667 16 18.6667Z" stroke="#FF510E" stroke-width="2.5"/>
</svg>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        <Link href="/" className="text-[#FF5722] font-medium">
          Home
        </Link>
        <Link href="/shop" className="text-white hover:text-[#FF5722] transition-colors">
          Shop
        </Link>
        <Link href="/product" className="text-white hover:text-[#FF5722] transition-colors">
          Product
        </Link>
        <Link href="/pages" className="text-white hover:text-[#FF5722] transition-colors">
          Pages
        </Link>
      </nav>

      {/* Login Button */}
      <Link
        href="/login"
        className="hidden md:flex bg-[#FF5722] text-white px-5 py-2 rounded-full font-medium hover:bg-[#E64A19] transition-colors"
      >
        Log In
      </Link>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </div>

    {/* Mobile Menu */}
    {isMenuOpen && (
      <div className="md:hidden bg-black/95 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <Link href="/" className="text-[#FF5722] font-medium py-2" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link
            href="/shop"
            className="text-white hover:text-[#FF5722] transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Shop
          </Link>
          <Link
            href="/product"
            className="text-white hover:text-[#FF5722] transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Product
          </Link>
          <Link
            href="/pages"
            className="text-white hover:text-[#FF5722] transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Pages
          </Link>
          <Link
            href="/login"
            className="bg-[#FF5722] text-white px-5 py-2 rounded-full font-medium hover:bg-[#E64A19] transition-colors w-fit"
            onClick={() => setIsMenuOpen(false)}
          >
            Log In
          </Link>
        </div>
      </div>
    )}
  </header>
  );
}
