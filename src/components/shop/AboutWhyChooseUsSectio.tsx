import React from 'react'
import Image from "next/image"
import choose_icon from "@/assets/icons/Frame (3).png"
import man_image1 from "@/assets/Home/icons/Ellipse 3.png"
import man_image2 from "@/assets/Home/icons/Ellipse 4.png"
import man_image3 from "@/assets/Home/icons/Ellipse 5.png"
import choose_image_1 from "@/assets/Home/2149178697.jpg"
import choose_image_2 from "@/assets/Home/15871.jpg"
import { Star } from 'lucide-react'
import Link from 'next/link'

export default function AboutWhyChooseUsSectio() {
  return (
    <div className="container mx-auto px-4 dark:text-black md:py-[100px] py-10 flex flex-col lg:flex-row md:gap-12">
      {/* Left side images */}
      <div className="relative flex-1 min-h-[500px]">
        {/* Top left image - team collaborating */}
        <div className="absolute top-0 left-0 md:w-[75%] md:h-[70%] w-[48%] h-[60%] rounded-lg overflow-hidden z-10">
          <Image
            src={choose_image_2}
            alt="Team collaborating in person"
            width={900}
            height={900}
            className="w-[320px] h-full object-cover "
          />
        </div>

        {/* Middle - satisfied clients box */}
        <div className="absolute  md:right-[90px] right-0 w-[50%] md:w-[38%] bg-white p-2 md:p-6 rounded-lg border border-[#ECECEC] z-20">
          {/* Satisfied Clients */}
          <div className=" ">
            <p className="text-[#515050] text-center md:text-[16px]  font-normal md:leading-[26px] mb-3">Satisfied clients</p>
            <div className="flex items-center mt-[12px]">
              {/* Avatar Stack */}
              <div className="flex -space-x-2 mr-4">
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
              </div>

              {/* Rating */}
              <div className="flex items-center">
                <span className="text-black md:text-[18px]  font-normal md:leading-[28px] mr-2">4.9</span>
                <Star  className="w-4 h-4 fill-[#F5E663] text-[#F5E663]" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom right - laptop with video call */}
        <div className="absolute md:top-[25%] top-[19%] md:right-[13%] right-0 md:w-[55%] w-[60%] md:h-[70%] h-[50%] rounded-lg overflow-hidden shadow-md z-10">
          <Image
            src={choose_image_1}
            alt="Video conference call on laptop"
            width={900}
            height={900}
            className="[320px] h-full object-cover"
          />
        </div>
      </div>

      {/* Right side content */}
      <div className="flex-1">
        <div className="mb-2 flex border w-[180px]  justify-center p-1 rounded-2xl border-[#ECECEC] items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#F5E663] mr-2"></div>
          <span className="text-black text-base font-normal leading-4">Why Choose Us</span>
        </div>

        <h2 className=" mt-[14px] text-3xl md:mr-[20%] md:text-[56px] font-semibold md:leading-[64px]   text-[#682D70] ">
        Why Choose Us?
        </h2>

        <p className=" md:text-[18px] text-[#343333] font-normal md:mr-[15%] mt-[24px] tracking-[-2%] md:leading-[28px] leading-relaxed">
        Credentialing can be a long and complex process, but we are here to change that. Our platform streamlines every step, from data collection to manual submission, all while keeping you updated with a real-time tracker. With a focus on compliance and transparency.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 md:mr-[20%] mt-[40px] border border-[#ECECEC] rounded-2xl p-[32px] gap-x-6 gap-y-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#FFF2EE] flex items-center justify-center flex-shrink-0">
            <Image
                src={choose_icon}
                alt="Client 1"
                width={700}
                height={700}
                className="rounded-full"
              />
            </div>
            <span className="text-gray-700 text-sm">Streamlined Process</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#FFF2EE] flex items-center justify-center flex-shrink-0">
            <Image
               src={choose_icon}
                alt="Client 1"
                width={700}
                height={700}
                className="rounded-full"
              />
            </div>
            <span className="text-gray-700 text-sm">No Hidden Fees</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#FFF2EE] flex items-center justify-center flex-shrink-0">
              <Image
               src={choose_icon}
                alt="Client 1"
                width={700}
                height={700}
                className="rounded-full"
              />
            </div>
            <span className="text-gray-700 text-sm">No Paperwork Hassles</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#FFF2EE] flex items-center justify-center flex-shrink-0">
            <Image
               src={choose_icon}
                alt="Client 1"
                width={700}
                height={700}
                className="rounded-full"
              />
            </div>
            <span className="text-gray-700 text-sm">Easy Document Upload</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#FFF2EE] flex items-center justify-center flex-shrink-0">
            <Image
              src={choose_icon}
                alt="Client 1"
                width={700}
                height={700}
                className="rounded-full"
              />
            </div>
            <span className="text-gray-700 text-sm">Dedicated Account Manager</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#FFF2EE] flex items-center justify-center flex-shrink-0">
            <Image
               src={choose_icon}
                alt="Client 1"
                width={800}
                height={800}
                className="rounded-full"
              />
            </div>
            <span className="text-gray-700 text-sm">Expert Credentialing Team</span>
          </div>
        </div>

       <Link href="/contact">
       <button className="bg-[#F5E663] text-black font-medium py-3 px-8 rounded-full hover:bg-[#d3c862] transition-colors text-sm">
        Contact Us
        </button>
       </Link>
      </div>
    </div>
  )
}
