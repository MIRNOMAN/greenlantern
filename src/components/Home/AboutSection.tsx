import React from 'react'
import Image from "next/image"
import bg_image_1 from "@/assets/Home/2148888815.jpg"
import bg_image_2 from "@/assets/Home/2149178644.jpg"
import image_icon from "@/assets/Home/Frame (1).png"

export default function AboutSection() {
  return (
    <section className="md:py-[100px] dark:text-black py-[30px] md:px-0 px-5 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div className='flex items-end  gap-5 justify-center'>
               <div>
                 {/* Image */}
                 <Image
                  src={bg_image_2}
                  alt="About Section Background"
                  width={900}
                  height={900}
                  className="object-cover md:w-[284px] w-[224px] h-[300px] md:h-[440px] rounded-lg shadow-md"
                />
  
               </div>
               <div>
                 {/* Icon */}
                 <Image
                  src={image_icon}
                  alt="About Section Icon"
                  width={128}
                  height={128}
                  className="object-contain  mx-auto"
                />
                
                  {/* Image */}
                <Image
                  src={bg_image_1}
                  alt="About Section Background"
                  width={480}
                  height={320}
                  className="object-cover md:w-[284px] w-[224px] h-[200px] md:h-[300px] rounded-lg shadow-md"
                />
  
               </div>
            </div>

          {/* Right side - Content */}
          <div className="space-y-6 md:mr-[120px]">
            {/* About label */}
            <div className="flex border w-[80px] justify-center border-[#ECECEC] rounded-2xl items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F5E663]"></span>
              <span className="ml-2 text-black font-medium">About</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-[56px] text-[#682D70] font-semibold md:leading-[64px] mt-[22px]  text-gray-900 ">Pharmacist Credentialing Simplify</h2>

            {/* Description */}
            <p className="font-Roboto md:text-[18px] text-[#343333] font-[400] tracking-[-0.36px] md:leading-[28px] leading-relaxed">
            We specialize in simplifying the credentialing and enrollment process for pharmacists, ensuring they can bill insurance companies without the administrative burden. Our goal is to streamline this complex process.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              {/* Stat 1 */}
              <div className="border text-center border-[#ECECEC] rounded-lg p-[20px]">
                <h3 className="text-3xl font-bold text-gray-900">16+</h3>
                <p className="text-gray-600 text-[18px] font-light leading-[21px] opacity-80 mt-1">Year experience</p>
              </div>

              {/* Stat 2 */}
              <div className="border text-center border-[#ECECEC] rounded-lg p-[20px]">
                <h3 className="text-3xl font-bold text-gray-900">1M+</h3>
                <p className="text-gray-600 text-[18px] font-light leading-[21px] opacity-80 mt-1">Happy client</p>
              </div>

              {/* Stat 3 */}
              <div className="border text-center border-[#ECECEC] rounded-lg p-[20px]">
                <h3 className="text-3xl font-bold text-gray-900">60+</h3>
                <p className="text-gray-600 text-[18px] font-light leading-[21px] opacity-80 mt-1">Our Team</p>
              </div>

              {/* Stat 4 */}
              <div className="border text-center border-[#ECECEC] rounded-lg p-[20px]">
                <h3 className="text-3xl font-bold text-gray-900">12+</h3>
                <p className="text-gray-600 text-[18px] font-light leading-[21px] opacity-80 mt-1">Awarded</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
