"use client";

// import Image from "next/image";
// import hi from "@/assets/icons/Logo (5).png";


import Link from "next/link";
import { useGetMeQuery } from "@/redux/api/authApi";
import { Bell } from "lucide-react";

const Topbar: React.FC<{ onHamburgerClick: () => void }> = ({ onHamburgerClick }) => {
  const { data } = useGetMeQuery({});
  const userInformation = data?.data;

  return (
    <header className="bg-white shadow py-4 px-6 lg:px-16  w-full">
      <div className="flex justify-between items-center flex-wrap">
        {/* Hamburger Icon for Mobile */}
        <button
          className="lg:hidden text-2xl text-gray-700"
          onClick={onHamburgerClick}
        >
            {/* <Image className="w-6 h-6 sm:w-8" src={hi} alt="welcome image" /> */}
        </button>

        {/* Welcome Message */}
        <h1 className="text-[#161616] flex items-center gap-2 text-[16px] sm:text-[20px] font-medium">
          Welcome, {userInformation?.firstName || "User"} {userInformation?.lastName || ""}
      
        </h1>

        <Link href="/" className="" ><Bell /></Link>
      </div>
    </header>
  );
};

export default Topbar;
