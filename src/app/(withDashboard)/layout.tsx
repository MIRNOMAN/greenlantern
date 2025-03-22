"use client";
import Sidebar from "@/components/Dashboard/AdminDashboard/Sidebar/Sidebar";
import Topbar from "@/components/Dashboard/AdminDashboard/Tobbar/Topbar";
import icons from "@/assets/admin/icons/mage_dashboard-2-fill.png"

import { useState } from "react";
import Image from "next/image";


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-[#F6F6F6] font-inter ">
      <div className="flex flex-row lg:flex-row ">
        {/* Sidebar */}
        <div
          className={`lg:w-72 w-full lg:static fixed top-0 left-0 z-[60] transform bg-white transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          <Sidebar onCloseClick={toggleSidebar} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-scroll">
          <Topbar onHamburgerClick={toggleSidebar} />

          {/* Content */}
          <main className="flex-1 p-4 sm:p-6 bg-gray-100  font-inter ">
            {children}
          </main>
        </div>

          {/* Overlay for Mobile Sidebar */}
      {!isSidebarOpen && (
        <div
          className="fixed inset-0  text-black   lg:hidden"

         
        >
          <button  onClick={toggleSidebar}>
            <Image  src={icons}  alt="mobile icons" width={600} height={600} className="h-8 w-8 mt-3 ml-3"/>
          </button>
           </div>
      )}
      </div>

    
    </div>
  );
};

export default Layout;
