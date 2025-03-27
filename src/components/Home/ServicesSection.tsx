import { services } from "@/app/(default)/service/service"
import Image from "next/image"


import Link from "next/link"



export default function ServicesSection() {
  return (
    <section className="py-[100px] bg-[#682D70] dark:text-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex w-[100px] mx-auto border-[#ECECEC] border items-center rounded-full justify-center gap-2 mb-4 py-1 px-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F5E663]"></span>
            <span className="text-white font-medium">Services</span>
          </div>
          <div className="flex items-center justify-center">
            <h2 className="text-3xl md:text-[56px] font-semibold text-[#F5E663] md:leading-[64px] md:max-w-xl mx-auto">
              We Provide Best Services
            </h2>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link href={`/service/${service.name}`} key={index}>
            <div
              key={index}
              className="border border-[#ECECEC] bg-[#682D70] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-[#F5E663] cursor-pointer"
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
                <h3 className="md:text-[24px] text-[20px] font-semibold leading-[32px] text-center text-[#F5E663] mb-3">{service.name}</h3>
                <p className="text-[18px] font-normal leading-[28px] text-center text-white">{service.description}</p>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

