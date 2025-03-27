"use client";

import { services } from "@/app/(default)/service/service";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

// Define TypeScript interfaces


const features = [
  { id: 1, text: "Data Collection Management" },
  { id: 2, text: "Insurance Carrier Approvals" },
  { id: 3, text: "Real-Time Tracking" },
  { id: 4, text: "Manual Submission" },
  { id: 5, text: "Automated Reminders" },
  { id: 6, text: "24/7 Support" },
];



export default function ServiceDetails() {
  const {id} = useParams()
  const service = services.find((s) => s.name === id);

  if (!service) {
    notFound();
  }

  return (
    <div className="container mx-auto md:py-[105px] dark:text-black px-3 md:px-0 py-[50px] bg-white">
      <div className="flex flex-col md:flex-row md:gap-28 gap-10 items-start">
        <div className="w-full md:w-2/5 lg:w-5/12">
          <div className="rounded-lg overflow-hidden">
            <Image
              src={service.imageUrl || "/placeholder.svg?height=900&width=900"}
              alt={service.id.toString()}
              width={900}
              height={900}
              className="w-full md:h-[538px] object-cover"
              priority
            />
          </div>
        </div>

        <div className="w-full md:w-3/5 md:mt-4 lg:w-7/12">
          <h2 className="text-2xl md:text-[40px] text-[25px] tracking-[-2%] md:leading-[48px] font-semibold mb-6">
            {service.name}
          </h2>

          <p className="md:text-[18px] text-[15px] tracking-[-2%] md:leading-[28px] font-normal text-[#343333] mb-8">
            {service.description}
          </p>

          <div className="mb-12 border p-[32px] border-[#ECECEC] rounded-2xl">
            <h3 className="md:text-[20px] text-[16px] tracking-[-2%] md:leading-[28px] font-semibold text-[#343333] mb-6">
              What&apos;s in this Service:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.map((feature) => (
                <div key={feature.id} className="flex items-center gap-2">
                  <div className="flex-shrink-0 h-7 w-7 rounded-full bg-[#F5E663] text-white flex items-center justify-center">
                    <svg
                      width="14"
                      height="14"
                      className="text-white"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.6667 3.5L5.25 9.91667L2.33333 7"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="md:text-[18px] text-[14px] tracking-[-2%] md:leading-[28px] font-medium text-[#343333]">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Link href="/credentialing-information">
          <button className="bg-[#F5E663] hover:bg-[#e6d85d] transition-colors text-black px-5 md:px-8 md:py-4 py-3 rounded-full font-medium">
          Get Started
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}