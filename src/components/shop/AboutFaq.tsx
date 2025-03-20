"use client";

import Image from "next/image";
import { ArrowUp, ArrowRight } from "lucide-react";
import { useState } from "react";
import backround_image from "@/assets/Backround/Bright Classroom Setup 1.png";
import backround_icon from "@/assets/Backround/Logo (3).png";



export default function AboutFaq() {
  return (
    <div className=" mx-auto px-4 md:py-[100px] py-10">
      <div className="flex container mx-auto border w-[80px] justify-center border-[#ECECEC] rounded-2xl items-center">
        <span className="h-1.5 w-1.5 rounded-full bg-[#F5E663]"></span>
        <span className="ml-2 text-black font-normal-">FAQ</span>
      </div>
      <div className="text-center container mb-12">
        <h2 className=" mt-[16px] text-center text-3xl md:mx-[10%] md:text-[56px]  md:px-[20%] tracking-[-2%] font-semibold md:leading-[64px]   text-[#682D70]  ">
          Frequently Asked Questions
        </h2>
      </div>

      <FAQSection />
  

      <div className="relative container md:mt-[100px] rounded-lg overflow-hidden">
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
          <button className="mt-4 md:px-8 px-4 md:py-3 py-1 bg-[#F5E663] text-black rounded-full hover:bg-[#F5E663]transition-colors">
          Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqItems = [
    {
      id: 1,
      question: "Is there any option for online appointment ?",
      answer:
        "Relume ipsum offers 2,000 trial words to new users, but after requires subscription. View our pricing plans to learn more. If anyone can your complete Honors in just 4 years from National University.",
    },
    {
      id: 2,
      question: "Is there any option for online appointment ?",
      answer:
        "Yes, we offer online appointments through our scheduling system. You can book a time that works for you directly from our website.",
    },
    {
      id: 3,
      question: "Do I have to pay first ?",
      answer:
        "No, payment is only required after your initial consultation when you decide to proceed with our services.",
    },
    {
      id: 4,
      question: "Do I need to sign any document?",
      answer:
        "Yes, you will need to sign a standard agreement form before we begin working together.",
    },
    {
      id: 5,
      question: "How will the follow up process?",
      answer:
        "Our team will contact you within 24-48 hours after your initial session to discuss next steps and answer any questions.",
    },
  ];

  return (
    <div className="space-y-4 mx-4 md:mx-[15%]">
      {faqItems.map((item, index) => (
        <div key={item.id} className="border-b border-[#ECECEC] py-5 md:py-[32px] ">
          <button
            className="w-full flex justify-between items-center text-left"
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
          >
            <span className="text-[16px] md:text-[24px] md:leading-[32px] font-semibold tracking-[-2%] text-[#151515]">
              <span className="mr-2 text-[16px] md:text-[24px] md:leading-[32px] font-semibold tracking-[-2%]">
                {String(item.id).padStart(2, "0")}.
              </span>
              {item.question}
            </span>
            {openIndex === index ? (
              <ArrowUp className="w-7 h-7 text-gray-500" />
            ) : (
              <ArrowRight className="w-7 h-7 text-[#ECECEC]" />
            )}
          </button>

          {openIndex === index && (
            <div className="mt-2 text-[12px] md:text-[18px] md:leading-[28px] font-light tracking-[-2%] text-[#282A25]">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
