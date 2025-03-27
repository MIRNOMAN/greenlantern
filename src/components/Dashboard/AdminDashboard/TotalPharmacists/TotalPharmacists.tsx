"use client";

import { useGetPharmaciesQuery } from "@/redux/pharmacies/Pharmacies";
import { PharmacyInfo } from "@/types/interface";
import { formatDate } from "@/utils/formatDate";
import { Search, View } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Define types for our data

export default function TotalPharmacists() {
  // Search query state
  const [searchQuery, setSearchQuery] = useState("");

  // All pharmacists data
  const { isLoading, data } = useGetPharmaciesQuery(undefined);
  console.log(data);

  // // Filter pharmacists based on search query
  // const filteredPharmacists = allPharmacists.filter(
  //   (pharmacist) =>
  //     pharmacist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     pharmacist.email.toLowerCase().includes(searchQuery.toLowerCase()),
  // )

  // // Calculate total pages
  // const totalPages = Math.ceil(filteredPharmacists.length / itemsPerPage)

  // // Get current page items
  // const currentItems = filteredPharmacists.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Helper function to get status badge color
  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className=" mx-auto space-y-6">
          {/* Total Pharmacists Card */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-start">
              <div className="w-14 h-14 rounded-full bg-yellow-100 p-3 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <g clipPath="url(#clip0_387_527)">
                    <path
                      d="M24 6.66667H8V0H24V6.66667ZM24 12H21.32L21.3333 9.33333H10.7307L10.6667 12H8C6.93913 12 5.92172 12.4214 5.17157 13.1716C4.42143 13.9217 4 14.9391 4 16V32H28V16C28 14.9391 27.5786 13.9217 26.8284 13.1716C26.0783 12.4214 25.0609 12 24 12ZM21.3333 22.6667H17.3333V26.6667H14.6667V22.6667H10.6667V20H14.6667V16H17.3333V20H21.3333V22.6667Z"
                      fill="#F5E663"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_387_527">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-lg md:text-[20px] leading-[28px] font-semibold text-gray-600">
                  Total Pharmacists
                </p>
                <h3 className="text-xl md:text-[40px] leading-[48px] font-semibold mt-1">
                  {data?.data?.meta?.total}
                </h3>
              </div>
            </div>
          </div>

          {/* Pharmacist List */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-lg md:text-[20px] leading-[28px] font-semibold text-gray-600">
                All Pharmacist
              </h2>
              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-[#a3a0a0]" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-[#ECECEC] rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      DOCUMENT
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECECEC]">
                  {data?.data?.data?.map((pharmacist: PharmacyInfo) => (
                    <tr key={pharmacist.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                            <Image
                              src={
                                pharmacist?.user.photoUrl || "/placeholder.svg"
                              }
                              alt={pharmacist?.user.firstName}
                              width={48}
                              height={48}
                              className="h-12 w-12 rounded-full"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-[18px] leading-[28px] font-medium">
                              {pharmacist.user.firstName +
                                " " +
                                pharmacist.user.lastName}
                            </div>
                            <div className="text-[16px] leading-[26px] font-normal text-[#515050] opacity-80">
                              {pharmacist.user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full cursor-pointer ${getStatusBgColor(
                            pharmacist.status
                          )}`}
                        >
                          {pharmacist.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(pharmacist.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Link
                          href={`/admin/total-pharmacists/${pharmacist.id}`}
                          // onClick={() => handleViewPharmacist(pharmacist)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <View className="h-5 w-5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {/* <div className="px-6 py-4 flex items-center justify-center sm:justify-end">
            <nav className="flex items-center space-x-2" aria-label="Pagination">
              <button
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" />
              </button>

              {Array.from({ length: Math.min(totalPages, 3) }).map((_, index) => {
                // Show first page, current page, and last page
                let pageNumber = index + 1

                // If we have more than 3 pages and we're not on page 1 or 2
                if (totalPages > 3 && currentPage > 2 && index === 0) {
                  pageNumber = currentPage - 1
                }
                if (totalPages > 3 && currentPage > 2 && index === 1) {
                  pageNumber = currentPage
                }
                if (totalPages > 3 && currentPage > 2 && index === 2) {
                  pageNumber = Math.min(currentPage + 1, totalPages)
                }

                return (
                  <button
                    key={pageNumber}
                    className={`px-4 py-2 text-sm rounded-md ${
                      pageNumber === currentPage
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                )
              })}

              <button
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div> */}
          </div>
        </div>
      )}

      {/* Pharmacist View Modal */}
      {/* <PharmacistViewModal
        pharmacyId={selectedPharmacyId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> */}
    </div>
  );
}
