import { useState } from "react";
import { Mail } from "lucide-react";
import icons from "@/assets/Backround/Logo (4).png"
import Image from "next/image";
import Marquee from "react-fast-marquee";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-[#682D70] text-white py-10  ">
      <div className=" mx-auto ">
        <div className="flex justify-between md:py-[105px] items-center md:text-[56px] text-[14px] md:leading-[64px] font-semibold">
        <Marquee>
          <div className="flex items-center gap-8 md:gap-20">
          <h1>Privacy Policy</h1> 
          <Image src={icons} alt="Logo1" width={600} height={600} className="h-[40px] w-[40px] md:h-[80px] md:w-[80px]"/>
          </div>
         <div className="flex items-center mx-7 md:mx-20 gap-8 md:gap-20">
         <h1>Documents</h1>
         <Image src={icons} alt="Logo1" width={600} height={600} className="h-[40px] w-[40px] md:h-[80px] md:w-[80px]" />
         <h1>Secured</h1>
         </div>
         
         <div className="flex items-center mx-7 md:mx-20 gap-8 md:gap-20">
         <Image src={icons} alt="Logo1" width={600} height={600} className="h-[40px] w-[40px] md:h-[80px] md:w-[80px]" />
         <h1 className="left-20">24/7 Support</h1>
         <Image src={icons} alt="Logo1" width={600} height={600} className="h-[40px] w-[40px] md:h-[80px] md:w-[80px]" />
         </div>
          </Marquee>
        </div>
        <div className="container">
        <div className="md:flex mx-5 md:mx-0 gap-8">
          <div className="md:w-1/2">
            <h3 className="md:text-[32px] text-[25px] md:leading-[40px] mt-6 md:mt-0 font-semibold">Stay Updated with the Latest</h3>
            <p className="md:text-[16px] md:w-[424px] text-[12px] md:leading-[26px] font-light text-[#FFF] opacity-80 py-[16px]">
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
            </p>
            <div className="flex border-b md:w-[424px] w-[324px] p-5 border-[#D0D5DD] pb-2 pt-5">
              <Mail className="text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Your email"
                className="ml-2 flex-1 text-[15px]  text-[#9D9FA1] bg-[#682D70] focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="font-medium">Subscribe</button>
            </div>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0 flex justify-between ">
          <div>
            <h3 className="md:text-[20px] text-[14px] md:leading-[28px] font-semibold">Pages</h3>
            <ul className="md:text-[16px] text-[13px] md:leading-[26px] font-light text-[#FFF] opacity-95 space-y-2 mt-3">
              <li><Link href="/" className="hover:text-black">Home</Link></li>
              <li><Link href="/shop" className="hover:text-black">About</Link></li>
              <li><Link href="service" className="hover:text-black">Services</Link></li>
              <li><Link href="contact" className="hover:text-black">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="md:text-[20px] text-[14px] md:leading-[28px] font-semibold">Services</h3>
            <ul className="md:text-[16px] text-[13px] md:leading-[26px] font-light text-[#FFF] opacity-95 space-y-2 mt-3">
              <li><Link href="/service/CrediPharm" className="hover:text-black">Credi Pharm</Link></li>
              <li><Link href="/service/PharmaEnroll" className="hover:text-black">Pharma Enroll</Link></li>
              <li><Link href="/service/CredentCare"className="hover:text-black">Credent Care</Link></li>
              <li><Link href="/service/PharmaTrack" className="hover:text-black">Pharma Track</Link></li>
              <li><Link href="/service/EnrollEase" className="hover:text-black">Enroll Ease</Link></li>
              <li><Link href="/service/QuickCred" className="hover:text-black">Quick Cred</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="md:text-[20px] text-[14px] md:leading-[28px] font-semibold">Social</h3>
            <ul className="md:text-[16px] text-[13px] md:leading-[26px] font-light text-[#FFF] opacity-95 space-y-2 mt-3">
              <li><Link href="https://www.instagram.com" className="hover:text-black">Instagram</Link></li>
              <li><Link href="https://x.com/i/flow/login" className="hover:text-black">Twitter</Link></li>
              <li><Link href="https://www.linkedin.com" className="hover:text-black">LinkedIn</Link></li>
              <li><Link href="https://web.whatsapp.com" className="hover:text-black">WhatsApp</Link></li>
       
            </ul>
          </div>
          </div>
        </div>
        <div className="border-t border-[#D0D5DD] mt-8 pt-4 md:text-[15px] text-[12px] mx-3 md:mx-0 text-gray-500 flex justify-between">
          <span>&copy; 2025 Copyright Pharmacists</span>
          <div className="md:text-[15px] text-[13px] md:leading-[26px] font-normal text-white flex space-x-4">
            <Link href="/credentialing-information" className="hover:text-black">Privacy Policy</Link>
            <Link href="/information-materials" className="hover:text-black">Terms & Conditions</Link>
          </div>
        </div>
        </div>
      </div>
    </footer>
  )
}
