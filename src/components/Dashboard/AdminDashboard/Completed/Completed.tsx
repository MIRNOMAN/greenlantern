"use client";

import Image from "next/image";

import staticAvatar from "@/assets/user.jpg";
import { useGetPharmaciesQuery } from "@/redux/pharmacies/Pharmacies";
import { PharmacyInfo } from "@/types/interface";
import { formatDate } from "@/utils/formatDate";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Completed() {
  const [page, setPage] = useState(1);

  const { isLoading, data } = useGetPharmaciesQuery([
    { name: "page", value: page },
    { name: "status", value: "COMPLETED" },
  ]);

  const totallData = data?.data?.data || [];

  const meta = data?.data?.meta;

  const totalPages = meta ? Math.ceil(meta.total / meta.limit) : 1;
  const isFirstPage = page === 1;
  const isLastPage = page >= totalPages;

  const handlePrevPage = () => {
    if (!isFirstPage) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (!isLastPage) setPage((prev) => prev + 1);
  };

  const pendingPharmacists = totallData.filter(
    (pharmacist: PharmacyInfo) => pharmacist.status === "COMPLETED"
  );

  const totalComplete = totallData.filter(
    (pharmacist: PharmacyInfo) => pharmacist.status === "COMPLETED"
  ).length;

  // Helper function to get status badge color
  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {isLoading ? (
        <div>Loading</div>
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
                  <g clipPath="url(#clip0_387_708)">
                    <path
                      d="M16 0C12.8355 0 9.74207 0.938384 7.11088 2.69649C4.4797 4.45459 2.42894 6.95345 1.21793 9.87707C0.00693258 12.8007 -0.309921 16.0177 0.307443 19.1214C0.924806 22.2251 2.44866 25.0761 4.6863 27.3137C6.92394 29.5514 9.77487 31.0752 12.8786 31.6926C15.9823 32.3099 19.1993 31.9931 22.1229 30.7821C25.0466 29.5711 27.5454 27.5203 29.3035 24.8891C31.0616 22.2579 32 19.1645 32 16C32 11.7565 30.3143 7.68687 27.3137 4.68629C24.3131 1.68571 20.2435 0 16 0ZM17.3333 16.5773L10.596 20.8L9.18134 18.5333L14.6667 15.1V8H17.3333V16.5773Z"
                      fill="#F5E663"
                    />
                  </g>
                  <defs>
                    <rect width="32" height="32" fill="white" />
                  </defs>
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-lg md:text-[20px] leading-[28px] font-semibold text-gray-600">
                  Completed
                </p>
                <h3 className="text-xl md:text-[40px] leading-[48px] font-semibold mt-1">
                  {totalComplete}
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECECEC]">
                  {pendingPharmacists?.map((pharmacist: PharmacyInfo) => (
                    <tr key={pharmacist.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                            <Image
                              src={pharmacist?.user?.photoUrl || staticAvatar}
                              alt={pharmacist.user.firstName}
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 flex items-center justify-between">
              <nav
                className="flex items-center space-x-2"
                aria-label="Pagination"
              >
                <button
                  onClick={handlePrevPage}
                  disabled={isFirstPage}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-sm text-gray-700">
                  Page {meta?.page} of {Math.ceil(meta?.total / meta?.limit)}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={isLastPage}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
