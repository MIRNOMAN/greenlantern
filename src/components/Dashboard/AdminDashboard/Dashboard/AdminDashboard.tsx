"use client";

import staticAvatar from "@/assets/user.jpg";
import { useGetPharmaciesQuery } from "@/redux/pharmacies/Pharmacies";
import { PharmacyInfo } from "@/types/interface";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
// Define types for our data

export default function AdminDashboard() {
  // Stats cards state
  const { isLoading, data } = useGetPharmaciesQuery(undefined);
  const pharmacists = data?.data?.data || [];

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

  // Helper function to render the appropriate icon

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto">
        {/* Stats Cards */}

        {/* Recent Applications */}
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden ">
            <div className="p-4 md:p-6 flex  w-full">
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Total Pharmacists */}
                <div className="flex w-full items-center gap-4 p-8 rounded-md shadow-sm border border-[#ECECEC] bg-white">
                  <div className="bg-yellow-100  p-2 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_598_5768)">
                        <path
                          d="M24 6.66667H8V0H24V6.66667ZM24 12H21.32L21.3333 9.33333H10.7307L10.6667 12H8C6.93913 12 5.92172 12.4214 5.17157 13.1716C4.42143 13.9217 4 14.9391 4 16V32H28V16C28 14.9391 27.5786 13.9217 26.8284 13.1716C26.0783 12.4214 25.0609 12 24 12ZM21.3333 22.6667H17.3333V26.6667H14.6667V22.6667H10.6667V20H14.6667V16H17.3333V20H21.3333V22.6667Z"
                          fill="#F5E663"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_598_5768">
                          <rect width="32" height="32" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm md:text-3xl font-semibold text-gray-600">
                      Total Pharmacists
                    </div>
                    <div className="text-sm md:text-3xl font-semibold">1,584</div>
                  </div>
                </div>

                {/* Pending Requests */}
                <div className="flex items-center gap-4 p-4 rounded-md shadow-sm border border-[#ECECEC] bg-white">
                  <div className="bg-yellow-100 p-2 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_598_5775)">
                        <path
                          d="M16 0C12.8355 0 9.74207 0.938384 7.11088 2.69649C4.4797 4.45459 2.42894 6.95345 1.21793 9.87707C0.00693258 12.8007 -0.309921 16.0177 0.307443 19.1214C0.924806 22.2251 2.44866 25.0761 4.6863 27.3137C6.92394 29.5514 9.77487 31.0752 12.8786 31.6926C15.9823 32.3099 19.1993 31.9931 22.1229 30.7821C25.0466 29.5711 27.5454 27.5203 29.3035 24.8891C31.0616 22.2579 32 19.1645 32 16C32 11.7565 30.3143 7.68687 27.3137 4.68629C24.3131 1.68571 20.2435 0 16 0ZM17.3333 16.5773L10.596 20.8L9.18134 18.5333L14.6667 15.1V8H17.3333V16.5773Z"
                          fill="#F5E663"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_598_5775">
                          <rect width="32" height="32" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm md:text-3xl font-semibold text-gray-600">
                      Pending Requests
                    </div>
                    <div className="text-sm md:text-3xl font-semibold">96</div>
                  </div>
                </div>

                {/* Completed */}
                <div className="flex items-center gap-4 p-4 rounded-md shadow-sm border border-[#ECECEC] bg-white">
                  <div className="bg-yellow-100 p-2 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M29.3332 16.0003C29.3332 8.63653 23.3636 2.66699 15.9998 2.66699C8.63604 2.66699 2.6665 8.63653 2.6665 16.0003C2.6665 23.3641 8.63604 29.3337 15.9998 29.3337C23.3636 29.3337 29.3332 23.3641 29.3332 16.0003Z"
                        fill="#F5E663"
                        stroke="#F5E663"
                        stroke-width="1.5"
                      />
                      <path
                        d="M10.6665 17.0003C10.6665 17.0003 12.7998 18.217 13.8665 20.0003C13.8665 20.0003 17.0665 13.0003 21.3332 10.667"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm md:text-3xl font-semiboldtext-gray-600">Completed</div>
                    <div className="text-sm md:text-3xl font-semibold">984</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F9F9F9] text-left">
                  <tr>
                    <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECECEC]">
                  {pharmacists?.map((pharmacist: PharmacyInfo) => (
                    <tr key={pharmacist.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                            <Image
                              src={pharmacist?.user?.photoUrl || staticAvatar}
                              alt={pharmacist.firstName}
                              width={48}
                              height={48}
                              className="h-12 w-12 rounded-full"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-[18px] leading-[28px] font-medium">
                              {pharmacist.firstName} {pharmacist.lastName}
                            </div>
                            <div className="text-[16px] leading-[26px] font-normal text-[#515050] opacity-80">
                              {pharmacist.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full cursor-pointer ${getStatusBgColor(
                            pharmacist?.status
                          )}`}
                        >
                          {pharmacist?.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(pharmacist.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {/* <div className="px-6 py-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, pharmacists.length)} of{" "}
              {pharmacists.length} entries
            </div>
            <nav
              className="flex items-center space-x-2"
              aria-label="Pagination"
            >
              <button
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" />
              </button>

              {getPageNumbers().map((pageNumber) => (
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
              ))}

              <button
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div> */}
          </div>
        )}
      </div>
    </div>
  );
}
