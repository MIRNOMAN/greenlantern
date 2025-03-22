"use client"

import { useState } from "react"
import Image, { StaticImageData } from "next/image"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import image from "@/assets/icons/sm.png"


// Define types for our data
type Pharmacist = {
  id: number
  name: string
  email: string
  status: "In Progress" | "Pending" | "Completed" | "Rejected" | "Expiring Soon"
  submitted: string
  avatar: string | StaticImageData
}

type StatCard = {
  id: number
  title: string
  count: number
  icon: string
  color: string
}

export default function ExpiringSoon() {
  // Stats cards state
const stats: StatCard[] = [
    { id: 1, title: "Expiring Soon", count: 32, icon: "user", color: "yellow" },
  ]

  // Search query state
  const [searchQuery, setSearchQuery] = useState("")

  // Current page state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 7

  // All pharmacists data
  const [allPharmacists, setAllPharmacists] = useState<Pharmacist[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarahjhonson@gmail.com",
      status: "Expiring Soon",
      submitted: "March 9, 2025",
      avatar: "/placeholder.svg?height=48&width=48",
    },
    {
      id: 2,
      name: "Jack Lam",
      email: "jacklam@gmail.com",
      status: "Expiring Soon",
      submitted: "March 9, 2025",
      avatar: image
    },
    {
      id: 3,
      name: "Tom Latham",
      email: "tomlatham@gmail.com",
      status: "Expiring Soon",
      submitted: "March 9, 2025",
      avatar: image
    },
    {
      id: 4,
      name: "Shen Watson",
      email: "shenwatson@gmail.com",
      status: "Expiring Soon",
      submitted: "March 9, 2025",
      avatar: image
    },
    {
      id: 5,
      name: "Bravo Jak",
      email: "bravojak@gmail.com",
      status: "Expiring Soon",
      submitted: "March 9, 2025",
      avatar: image
    },
    {
      id: 6,
      name: "Sully Mela",
      email: "sullymela@gmail.com",
      status: "Expiring Soon",
      submitted: "March 9, 2025",
      avatar: image
    },
    {
      id: 7,
      name: "Otha Brey",
      email: "othabrey@gmail.com",
      status: "Expiring Soon",
      submitted: "March 9, 2025",
      avatar: image
    },
    {
      id: 8,
      name: "Michal Carry",
      email: "michalcarry@gmail.com",
      status: "Expiring Soon",
      submitted: "March 9, 2025",
      avatar: image
    },
    {
      id: 9,
      name: "John Smith",
      email: "johnsmith@gmail.com",
      status: "Expiring Soon",
      submitted: "March 9, 2025",
      avatar: image
    },
    {
      id: 10,
      name: "Emma Wilson",
      email: "emmawilson@gmail.com",
      status: "Expiring Soon",
      submitted: "March 9, 2025",
      avatar: image
    },
    {
      id: 11,
      name: "David Brown",
      email: "davidbrown@gmail.com",
      status: "Expiring Soon",
      submitted: "March 9, 2025",
      avatar: image
    },
    {
      id: 12,
      name: "Lisa Chen",
      email: "lisachen@gmail.com",
      status: "Expiring Soon",
      submitted: "March 9, 2025",
      avatar: image
    },
    {
      id: 13,
      name: "Michael Davis",
      email: "michaeldavis@gmail.com",
      status: "Expiring Soon",
      submitted: "March 9, 2025",
      avatar: image
    },
    {
      id: 14,
      name: "Sophia Kim",
      email: "sophiakim@gmail.com",
      status: "Expiring Soon",
      submitted: "March 9, 2025",
      avatar: image
    },
    {
      id: 15,
      name: "Robert Taylor",
      email: "roberttaylor@gmail.com",
      status: "Expiring Soon",
      submitted: "March 9, 2025",
      avatar: image
    },
    {
      id: 16,
      name: "Jennifer Lee",
      email: "jenniferlee@gmail.com",
      status: "Expiring Soon",
      submitted: "March 9, 2025",
      avatar: image
    },
    {
      id: 17,
      name: "Daniel Martin",
      email: "danielmartin@gmail.com",
      status: "Expiring Soon",
      submitted: "March 9, 2025",
      avatar: image
    },
    {
      id: 18,
      name: "Olivia Garcia",
      email: "oliviagarcia@gmail.com",
      status: "Expiring Soon",
      submitted: "March 9, 2025",
      avatar: image
    },
    {
      id: 19,
      name: "William Rodriguez",
      email: "williamrodriguez@gmail.com",
      status: "Expiring Soon",
      submitted: "March 9, 2025",
      avatar: image
    },
    {
      id: 20,
      name: "Emily White",
      email: "emilywhite@gmail.com",
      status: "Expiring Soon",
      submitted: "March 9, 2025",
      avatar: image
    },
    {
      id: 21,
      name: "James Johnson",
      email: "jamesjohnson@gmail.com",
      status: "Expiring Soon",
      submitted: "March 9, 2025",
      avatar: image
    },
  ])


    // Function to update a pharmacist's status
    const updatePharmacistStatus = (id: number) => {
        setAllPharmacists((pharmacists) =>
          pharmacists.map((pharmacist) => {
            if (pharmacist.id === id) {
              const statuses: Pharmacist["status"][] = ["Expiring Soon"]
              const currentIndex = statuses.indexOf(pharmacist.status)
              const nextStatus = statuses[(currentIndex + 1) % statuses.length]
              return { ...pharmacist, status: nextStatus }
            }
            return pharmacist
          }),
        )
      }
    


    


//   // Function to add a new pharmacist
//   const addPharmacist = () => {
//     const newId = allPharmacists.length + 1
//     const newPharmacist: Pharmacist = {
//       id: newId,
//       name: `New Pharmacist ${newId}`,
//       email: `pharmacist${newId}@example.com`,
//       status: "Pending",
//       submitted: "March 9, 2025",
//       avatar: "/placeholder.svg?height=48&width=48",
//     }

//     setAllPharmacists([...allPharmacists, newPharmacist])
//     setTotalPharmacists((prev) => prev + 1)
//   }

  // Filter pharmacists based on search query
  const filteredPharmacists = allPharmacists.filter(
    (pharmacist) =>
      pharmacist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pharmacist.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Calculate total pages
  const totalPages = Math.ceil(filteredPharmacists.length / itemsPerPage)

  // Get current page items
  const currentItems = filteredPharmacists.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Helper function to get status badge color
  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "Expiring Soon":
        return "bg-red-100 text-red-800"
      
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className=" mx-auto space-y-6">
        {/* Total Pharmacists Card */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-start">
            <div className="w-14 h-14 rounded-full bg-yellow-100 p-3 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M30.7733 20.4397L20 3.42634C19.0933 2.11967 17.5866 1.33301 16 1.33301C14.4133 1.33301 12.9066 2.10634 11.96 3.46634L1.23997 20.413C-0.120034 22.3597 -0.373367 24.693 0.573299 26.493C1.50663 28.293 3.46663 29.3197 5.91997 29.3197H26.08C28.5466 29.3197 30.4933 28.293 31.4266 26.493C32.36 24.693 32.1066 22.373 30.7733 20.4397ZM14.6666 9.33301C14.6666 8.59967 15.2666 7.99967 16 7.99967C16.7333 7.99967 17.3333 8.59967 17.3333 9.33301V17.333C17.3333 18.0663 16.7333 18.6663 16 18.6663C15.2666 18.6663 14.6666 18.0663 14.6666 17.333V9.33301ZM16 25.333C14.8933 25.333 14 24.4397 14 23.333C14 22.2263 14.8933 21.333 16 21.333C17.1066 21.333 18 22.2263 18 23.333C18 24.4397 17.1066 25.333 16 25.333Z" fill="#F5E663"/>
                    </svg>
                        </div>
            <div className="ml-3">
              <p className="text-lg md:text-[20px] leading-[28px] font-semibold text-gray-600">Expiring Soon</p>
              <h3 className="text-xl md:text-[40px] leading-[48px] font-semibold mt-1">{stats[0].count.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        {/* Pharmacist List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-lg md:text-[20px] leading-[28px] font-semibold text-gray-600">All Pharmacist</h2>
            <div className="relative w-full sm:w-64">
              <div className="absolute  inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4  text-[#a3a0a0]" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-[#ECECEC] rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1) // Reset to first page on search
                }}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECECEC]">
                {currentItems.map((pharmacist) => (
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
                        onClick={() => updatePharmacistStatus(pharmacist.id)}
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
          <div className="px-6 py-4 flex items-center justify-center sm:justify-end">
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
          </div>
        </div>

        
      </div>
    </div>
  )
}

