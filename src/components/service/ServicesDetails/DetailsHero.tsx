"use client"


import Image from "next/image"

import heroBanner from "@/assets/Home/3147.jpg"
import { notFound, useParams } from "next/navigation";
import { services } from "@/app/(default)/service/service";

export default function DetailsHero() {
    const {id} = useParams()
    const service = services.find((s) => s.name === id);
  
    if (!service) {
      notFound();
    }
  return (
    <section className="relative md:h-[420px]  w-full">
    {/* Background Image */}
    <div className="absolute inset-0 z-0">
      <Image
        src={heroBanner}
        alt="Classroom background"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
    </div>

    {/* Content */}
    <div className="relative z-10 container mx-auto px-4  pb-16  flex flex-col justify-center">
      
      <div className=" md:pt-[200px] pt-[130px]">
        {/* Heading */}
        <div className="flex border w-[150px] justify-center p-1 border-[#ECECEC] rounded-2xl items-center">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F5E663]"></span>
            <span className="ml-2 text-white font-medium">Service Details</span>
          </div>
        <h1 className="text-4xl md:text-[80px] md:pt-[20px] pt-[30px] font-semibold md:leading-[88px] text-white mb-6">
        {service.name}
        </h1>

        

       

        {/* Satisfied Clients */}
        {/* <div className="md:mt-[130px] mt-10">
          <p className="text-white md:text-[16px]  font-normal md:leading-[26px] mb-3">Satisfied clients</p>
          <div className="flex items-center md:w-[18%] w-[70%] p-1 rounded-full bg-white/15 border border-[#FCFCF433]/20 backdrop-blur-md mt-[12px]"> */}
            {/* Avatar Stack */}
            {/* <div className="flex -space-x-2 mr-4">
              <Image
                src={man_image1}
                alt="Client"
                width={32}
                height={32}
                className="rounded-full border-2 border-white"
              />
              <Image
                src={man_image2}
                alt="Client"
                width={32}
                height={32}
                className="rounded-full border-2 border-white"
              />
              <Image
                src={man_image3}
                alt="Client"
                width={32}
                height={32}
                className="rounded-full border-2 border-white"
              />
               <Image
                src={man_image1}
                alt="Client"
                width={32}
                height={32}
                className="rounded-full border-2 border-white"
              />
            </div> */}

            {/* Rating */}
            {/* <div className="flex items-center">
              <span className="text-white md:text-[18px]  font-normal md:leading-[28px] mr-2">4.9</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-[#FF5722] text-[#FF5722]" />
                ))}
              </div>
            </div> */}
          {/* </div>
        </div> */}
      </div>
    </div>
  </section>
  )
}
