
import { services } from "@/app/(default)/service/service"
import Image from "next/image"
import Link from "next/link"




export default function AllProducts() {
  return (
    <section className="container md:py-[100px] px-3 dark:text-black md:px-0 py-[30px]">
       <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6">
                 {services.map((service, index) => (
                   <Link href={`/service/${service.name}`} key={index}>
                   <div
                     key={index}
                     className="border border-[#ECECEC] shadow-md rounded-2xl overflow-hidden  hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-[#F5E663] cursor-pointer"
                   >
                     {/* Image Container */}
                     <div className="p-4">
                       <div className="overflow-hidden rounded-xl">
                         <Image
                           src={service.imageUrl || "/placeholder.svg?height=272&width=400"}
                           alt={service.name}
                           width={400}
                           height={272}
                           className="w-full h-[270px] object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                         />
                       </div>
                     </div>
       
                     {/* Content */}
                     <div className="md:p-6 p-3 pt-2">
                       <h3 className="md:text-[24px] text-[20px] font-semibold leading-[32px] text-center text-[#151515] mb-3">{service.name}</h3>
                       <p className="text-[18px] font-normal leading-[28px] text-center text-[#343333]">{service.description}</p>
                     </div>
                   </div>
                   </Link>
                 ))}
               </div>
    </section>
  )
}
