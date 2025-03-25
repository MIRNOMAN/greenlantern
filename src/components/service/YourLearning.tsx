
import Image from "next/image";
import backround_image from "@/assets/Backround/Bright Classroom Setup 1.png";
import backround_icon from "@/assets/Backround/Logo (4).png";
import Link from "next/link";

export default function YourLearning() {
  return (
    <div className="container px-4 md:px-0 py-[50px] ">
        <div className="relative md:mt-[50px] md:rounded-[60px] rounded-3xl overflow-hidden">
        <Image
          src={backround_image}
          alt="Classroom"
          width={900}
          height={900}
          className="w-full object-cover  "
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
          <div className="absolute top-[30%] left-1/2 -translate-x-1/2  -translate-y-1/2 md:h-[80px] md:w-[80px]  h-[30] w-[30] rounded-full  flex items-center justify-center">
            <div className="">
              <Image
                src={backround_icon}
                alt="Classroom"
                className=" "
              />
            </div>
          </div>
          <h2 className="text-lg md:font-semibold md:text-[80px] md:px-[20%] text-center md:leading-[88px] tracking-[-2%] md:mb-4 mt-14 md:mt-8">
          Simplify Your
          Credentialing Today!
          </h2>
          <Link href="/contact">
          <button className="mt-4 md:px-8 px-4 md:py-3 py-1 bg-[#F5E663] text-black rounded-full hover:bg-[#F5E663] transition-colors">
          Contact Us
          </button>
          </Link>
        </div>
      </div> 
    </div>
  )
}
