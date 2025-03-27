"use client";

import Image from "next/image";
import { AlertTriangle, CheckCircle, Clock, User } from "lucide-react";
import { useGetpharmaciesQuery } from "@/redux/pharmacies/Pharmacies";
import { PharmacyInfo, TPharmasit } from "@/types/interface";
import staticAvatar from "@/assets/user.jpg";
import { formatDate } from "@/utils/formatDate";
// Define types for our data

export default function AdminDashboard() {
  // Stats cards state
  const { isLoading, data, error } = useGetpharmaciesQuery(undefined);
  const pharmacists = data?.data?.data || [];

  //   // Update stats based on new status
  //   updateStats(newStatus)
  // }

  // // Function to update stats when status changes
  // const updateStats = (newStatus: Pharmacist["status"]) => {
  //   setStats((stats) => {
  //     const newStats = [...stats]

  //     if (newStatus === "Pending") {
  //       // Increment pending count
  //       const pendingIndex = newStats.findIndex((stat) => stat.title === "Pending Requests")
  //       if (pendingIndex !== -1) {
  //         newStats[pendingIndex] = {
  //           ...newStats[pendingIndex],
  //           count: newStats[pendingIndex].count + 1,
  //         }
  //       }
  //     } else if (newStatus === "Completed") {
  //       // Increment completed count
  //       const completedIndex = newStats.findIndex((stat) => stat.title === "Completed")
  //       if (completedIndex !== -1) {
  //         newStats[completedIndex] = {
  //           ...newStats[completedIndex],
  //           count: newStats[completedIndex].count + 1,
  //         }
  //       }
  //     }

  //     return newStats
  //   })
  // }

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
  const renderIcon = (iconType: string, color: string) => {
    const bgColor = color === "yellow" ? "bg-yellow-100" : "bg-red-100";
    const textColor = color === "yellow" ? "text-yellow-500" : "text-red-500";

    return (
      <div
        className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center`}
      >
        {iconType === "user" && <User className={`w-5 h-5 ${textColor}`} />}
        {iconType === "pending" && <Clock className={`w-5 h-5 ${textColor}`} />}
        {iconType === "completed" && (
          <CheckCircle className={`w-5 h-5 ${textColor}`} />
        )}
        {iconType === "expiring" && (
          <AlertTriangle className={`w-5 h-5 ${textColor}`} />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto">
        {/* Stats Cards */}

        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 md:p-6 flex justify-between items-center">
            <h2 className="text-lg md:text-[20px] leading-[28px] font-semibold">
              Recent Pharmacist Applications
            </h2>
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
      </div>
    </div>
  );
}
