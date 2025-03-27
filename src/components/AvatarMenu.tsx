"use client";


import React, { useState, useRef, useEffect } from 'react';
import { User } from 'lucide-react';
import Image from 'next/image';
import avatar_pictur from "@/assets/icons/sm.png"
import Link from 'next/link';
import { decodeJwtToken } from '@/utils/tokenDecode';


export default function AvatarMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const token = decodeJwtToken();
console.log(token?.role);
;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 focus:outline-none"
      >
        <div className="relative">
          <Image
            src={avatar_pictur}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-semibold text-white">{token?.name}</div>
          <div className="text-xs text-white">{token?.email}</div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 border border-gray-100">
         

          <div className="py-1">
          {token?.role === "SUPERADMIN" && (
            <Link href="/admin/dashboard">
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
            </Link>
          )}
          
          {token?.role === "USER" && (
            <Link href="/user/dashboard">
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
            </Link>
          )}
          </div>

        
        </div>
      )}
    </div>
  );
}