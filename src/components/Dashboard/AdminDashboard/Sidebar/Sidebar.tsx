import Link from "next/link";
import { usePathname } from "next/navigation";
import adminlogo from "@/assets/icons/Logo (5).png";
import Image from "next/image";
import { LogOut } from "lucide-react";
import avatar from "@/assets/icons/sm.png";



import { AiOutlineClose } from "react-icons/ai";
import icons_1 from "@/assets/admin/icons/mage_dashboard-2-fill.png"
import icons_2 from "@/assets/admin/icons/Layer_1.png"

import icons_4 from "@/assets/admin/icons/Layer_1 (1).png"
import icons_5 from "@/assets/admin/icons/Frame (4).png"
import Cookies from 'js-cookie';
import { decodeJwtToken } from "@/utils/tokenDecode";

interface SidebarProps {
  onCloseClick: () => void;
}

const Sidebar = ({ onCloseClick }: SidebarProps) => {
  const pathname = usePathname();

    const token = decodeJwtToken();
  
  ;

  const menuItems = [
    {
      href: "/admin/dashboard",
      icon: icons_1,
      label: "Dashboard",
    //   roles: ["ADMIN"],
    },
    {
      href: "/admin/total-pharmacists",
      icon: icons_2,
      label: "Total Pharmacists",
    //   roles: ["ADMIN",  "USER"],
    },
    {
      href: "/admin/pending-requests",
      icon: icons_4,
      label: "Pending Requests",
    //   roles: ["ADMIN"],
    },
    {
      href: "/admin/completed",
      icon: icons_5,
      label: "Completed",
    //   roles: ["ADMIN"],
    },
    
    
  ];



const handleLogout = () => {
  Cookies.remove('userToken'); // Remove the cookie
  window.location.reload(); // Or redirect if needed
};

  return (
    <div className="flex ">
      {/* Sidebar */}
      <aside className="md:w-72 bg-white dark:text-black max-h-screen px-2 z[100]">
        <div className="py-7 pl-6 text-xl font-bold flex items-center space-x-2 justify-between">
          <div className="w-12 flex items-center justify-center gap-2">
            <Image src={adminlogo} alt="logo" />
         
          </div>
          <AiOutlineClose onClick={onCloseClick} className="md:hidden flex" />
        </div>

       <div className="flex flex-col items-center justify-between h-screen">
       <nav className="mt-6">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                onClick={onCloseClick}
                  href={item.href}
                  className={`block px-4 py-2 mb-3 ${
                    pathname === item.href
                      ? "bg-white py-3 text-[#151515] opacity-80 border border-gray  rounded-[8px] text-base md:text-[16px] font-medium"
                      : ""
                  }`}
                >
                  <span className="flex items-center  space-x-2  space-y-3">
                    <Image src={item.icon} alt={item.label} width={600} height={600} className="text-[24px] h-6 w-6 mt-2 font-bold" />
                    <span>{item.label}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="bg-white rounded-lg shadow-sm w-full max-w-sm p-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-red-100 overflow-hidden">
            <Image
              src={avatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* User Info */}
          <div className="flex-1">
            <h2 className="text-gray-900 font-medium">{token?.name}</h2>
            <p className="text-gray-500 text-sm">{token?.email}</p>
          </div>
        </div>

        {/* Logout Button */}
        <button 
  onClick={handleLogout}
  className="mt-4 w-full flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
>
  <LogOut size={18} />
  <span>Log out</span>
</button>
      </div>
       </div>
      </aside>
    </div>
  );
};

export default Sidebar;
