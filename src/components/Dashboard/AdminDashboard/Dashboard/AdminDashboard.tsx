"use client"

import { useState } from "react"
import Image, { StaticImageData } from "next/image"
import { AlertTriangle, CheckCircle, ChevronLeft, ChevronRight, Clock, User } from "lucide-react"
import image from "@/assets/icons/sm.png"

// Define types for our data
type StatCard = {
  id: number
  title: string
  count: number
  icon: "user" | "pending" | "completed" | "expiring"
  color: "yellow" | "red"
}

type Pharmacist = {
  id: number
  name: string
  email: string
  status: "In Progress" | "Pending" | "Completed" | "Rejected"
  submitted: string
  avatar: string | StaticImageData
}

export default function AdminDashboard() {
  // Stats cards state
  const [stats, setStats] = useState<StatCard[]>([
    { id: 1, title: "Total Pharmacists", count: 1584, icon: "user", color: "yellow" },
    { id: 2, title: "Pending Requests", count: 96, icon: "pending", color: "yellow" },
    { id: 3, title: "Completed", count: 984, icon: "completed", color: "yellow" },
    { id: 4, title: "Expiring Soon", count: 32, icon: "expiring", color: "red" },
  ])

  // Current page state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 7
  
  // Search query state


  // Pharmacists state
  const [pharmacists, setPharmacists] = useState<Pharmacist[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarahjhonson@gmail.com",
      status: "In Progress",
      submitted: "March 9, 2025",
      avatar: image,
    },
    {
      id: 2,
      name: "Jack Lam",
      email: "jacklam@gmail.com",
      status: "Pending",
      submitted: "March 9, 2025",
      avatar: image,
    },
    {
      id: 3,
      name: "Tom Latham",
      email: "tomlatham@gmail.com",
      status: "In Progress",
      submitted: "March 9, 2025",
      avatar: image,
    },
    {
      id: 4,
      name: "Shen Watson",
      email: "shenwatson@gmail.com",
      status: "In Progress",
      submitted: "March 9, 2025",
      avatar: image,
    },
    {
      id: 5,
      name: "Bravo Jak",
      email: "bravojak@gmail.com",
      status: "In Progress",
      submitted: "March 9, 2025",
      avatar: image,
    },
    {
      id: 6,
      name: "Sully Mela",
      email: "sullymela@gmail.com",
      status: "In Progress",
      submitted: "March 9, 2025",
      avatar: image,
    },
    {
      id: 7,
      name: "Otha Brey",
      email: "othabrey@gmail.com",
      status: "Pending",
      submitted: "March 9, 2025",
      avatar: image,
    },
    {
      id: 8,
      name: "Michal Carry",
      email: "michalcarry@gmail.com",
      status: "Pending",
      submitted: "March 9, 2025",
      avatar: image,
    },
    {
      id: 9,
      name: "Sully Mela",
      email: "sullymela@gmail.com",
      status: "In Progress",
      submitted: "March 9, 2025",
      avatar: image,
    },
    {
      id: 10,
      name: "Otha Brey",
      email: "othabrey@gmail.com",
      status: "Pending",
      submitted: "March 9, 2025",
      avatar: image,
    },
    {
      id: 11,
      name: "Michal Carry",
      email: "michalcarry@gmail.com",
      status: "Pending",
      submitted: "March 9, 2025",
      avatar: image,
    },
  ])

  // Calculate total pages
  const totalPages = Math.ceil(pharmacists.length / itemsPerPage)

  // Get current page items
  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return pharmacists.slice(startIndex, endIndex)
  }

  // Function to update a pharmacist's status
  const updatePharmacistStatus = (id: number, newStatus: Pharmacist["status"]) => {
    setPharmacists((pharmacists) =>
      pharmacists.map((pharmacist) => (pharmacist.id === id ? { ...pharmacist, status: newStatus } : pharmacist)),
    )

    // Update stats based on new status
    updateStats(newStatus)
  }

  // Function to update stats when status changes
  const updateStats = (newStatus: Pharmacist["status"]) => {
    setStats((stats) => {
      const newStats = [...stats]

      if (newStatus === "Pending") {
        // Increment pending count
        const pendingIndex = newStats.findIndex((stat) => stat.title === "Pending Requests")
        if (pendingIndex !== -1) {
          newStats[pendingIndex] = {
            ...newStats[pendingIndex],
            count: newStats[pendingIndex].count + 1,
          }
        }
      } else if (newStatus === "Completed") {
        // Increment completed count
        const completedIndex = newStats.findIndex((stat) => stat.title === "Completed")
        if (completedIndex !== -1) {
          newStats[completedIndex] = {
            ...newStats[completedIndex],
            count: newStats[completedIndex].count + 1,
          }
        }
      }

      return newStats
    })
  }

  // Helper function to get status badge color
  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Helper function to render the appropriate icon
  const renderIcon = (iconType: string, color: string) => {
    const bgColor = color === "yellow" ? "bg-yellow-100" : "bg-red-100"
    const textColor = color === "yellow" ? "text-yellow-500" : "text-red-500"

    return (
      <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center`}>
        {iconType === "user" && <User className={`w-5 h-5 ${textColor}`} />}
        {iconType === "pending" && <Clock className={`w-5 h-5 ${textColor}`} />}
        {iconType === "completed" && <CheckCircle className={`w-5 h-5 ${textColor}`} />}
        {iconType === "expiring" && <AlertTriangle className={`w-5 h-5 ${textColor}`} />}
      </div>
    )
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 3
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-start">
                {renderIcon(stat.icon, stat.color)}
                <div className="ml-3">
                  <p className="text-lg md:text-[20px] leading-[28px] font-semibold text-gray-600">{stat.title}</p>
                  <h3 className="text-xl md:text-[40px] leading-[48px] font-semibold mt-1">{stat.count.toLocaleString()}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 md:p-6 flex justify-between items-center">
            <h2 className="text-lg md:text-[20px] leading-[28px] font-semibold">Recent Pharmacist Applications</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F9F9F9] text-left">
                <tr>
                  <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECECEC]">
                {getCurrentItems().map((pharmacist) => (
                  <tr key={pharmacist.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                          <Image
                            src={pharmacist.avatar || "/placeholder.svg"}
                            alt={pharmacist.name}
                            width={48}
                            height={48}
                            className="h-12 w-12 rounded-full"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-[18px] leading-[28px] font-medium">{pharmacist.name}</div>
                          <div className="text-[16px] leading-[26px] font-normal text-[#515050] opacity-80">{pharmacist.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full cursor-pointer ${getStatusBgColor(pharmacist.status)}`}
                        onClick={() => {
                          const statuses: Pharmacist["status"][] = ["In Progress", "Pending", "Completed", "Rejected"]
                          const currentIndex = statuses.indexOf(pharmacist.status)
                          const nextStatus = statuses[(currentIndex + 1) % statuses.length]
                          updatePharmacistStatus(pharmacist.id, nextStatus)
                        }}
                      >
                        {pharmacist.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pharmacist.submitted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, pharmacists.length)} of {pharmacists.length} entries
            </div>
            <nav className="flex items-center space-x-2" aria-label="Pagination">
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
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}