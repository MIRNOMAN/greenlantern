// "use client"


// import { motion } from "framer-motion"
// import Image from "next/image"

// export default function ApplicationsTable() {
//   const { applications, loading } = useDashboard()

//   const container = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.05,
//       },
//     },
//   }

//   const item = {
//     hidden: { opacity: 0, x: -20 },
//     show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } },
//   }

//   const getStatusBadge = (status: string) => {
//     if (status === "In Progress") {
//       return <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">{status}</span>
//     } else if (status === "Pending") {
//       return <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">{status}</span>
//     }
//     return <span>{status}</span>
//   }

//   // Mobile card view for each application
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const renderMobileCard = (app: any) => (
//     <motion.div key={app.id} className="p-4 border-b last:border-b-0" variants={item}>
//       <div className="flex items-center mb-3">
//         <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
//           <Image
//             src={app.avatar || "/placeholder.svg?height=40&width=40"}
//             alt={app.name}
//             className="h-full w-full object-cover"
//           />
//         </div>
//         <div className="ml-3">
//           <div className="font-medium">{app.name}</div>
//           <div className="text-xs text-gray-500">{app.email}</div>
//         </div>
//       </div>
//       <div className="flex justify-between items-center text-sm">
//         <div>
//           <span className="text-gray-500 mr-2">Status:</span>
//           {getStatusBadge(app.status)}
//         </div>
//         <div className="text-gray-500">{app.submitted}</div>
//       </div>
//     </motion.div>
//   )

//   return (
//     <div className="overflow-hidden">
//       <div className="p-4 md:p-6 border-b">
//         <h2 className="text-lg font-semibold">Recent Pharmacist Applications</h2>
//       </div>

//       {/* Mobile View */}
//       <div className="md:hidden">
//         <motion.div variants={container} initial="hidden" animate="show">
//           {loading
//             ? Array(3)
//                 .fill(0)
//                 .map((_, i) => (
//                   <div key={i} className="p-4 border-b">
//                     <div className="flex items-center mb-3">
//                       <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
//                       <div className="ml-3">
//                         <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
//                         <div className="h-3 w-40 bg-gray-200 animate-pulse rounded mt-2"></div>
//                       </div>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-full"></div>
//                       <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
//                     </div>
//                   </div>
//                 ))
//             : applications.map(renderMobileCard)}
//         </motion.div>
//       </div>

//       {/* Desktop View */}
//       <div className="hidden md:block overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             <tr className="border-b text-left text-xs uppercase text-gray-500">
//               <th className="px-6 py-3 font-medium">Name</th>
//               <th className="px-6 py-3 font-medium">Status</th>
//               <th className="px-6 py-3 font-medium">Submitted</th>
//             </tr>
//           </thead>
//           <motion.tbody variants={container} initial="hidden" animate="show">
//             {loading
//               ? Array(5)
//                   .fill(0)
//                   .map((_, i) => (
//                     <tr key={i} className="border-b">
//                       <td className="px-6 py-4">
//                         <div className="flex items-center">
//                           <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
//                           <div className="ml-4">
//                             <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
//                             <div className="h-3 w-40 bg-gray-200 animate-pulse rounded mt-2"></div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-full"></div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
//                       </td>
//                     </tr>
//                   ))
//               : applications.map((app) => (
//                   <motion.tr
//                     key={app.id}
//                     className="border-b hover:bg-gray-50 transition-colors"
//                     variants={item}
//                     whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
//                   >
//                     <td className="px-6 py-4">
//                       <div className="flex items-center">
//                         <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
//                           <Image
//                             src={app.avatar || "/placeholder.svg?height=40&width=40"}
//                             alt={app.name}
//                             className="h-full w-full object-cover"
//                           />
//                         </div>
//                         <div className="ml-4">
//                           <div className="font-medium">{app.name}</div>
//                           <div className="text-sm text-gray-500">{app.email}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">{getStatusBadge(app.status)}</td>
//                     <td className="px-6 py-4 text-sm text-gray-500">{app.submitted}</td>
//                   </motion.tr>
//                 ))}
//           </motion.tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

