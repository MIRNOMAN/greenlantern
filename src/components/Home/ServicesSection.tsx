import Image from "next/image";
import { Star } from "lucide-react";

import picturer_1 from "@/assets/Home/service/3147.jpg";
import picturer_2 from "@/assets/Home/service/2149285451.jpg";
import picturer_3 from "@/assets/Home/service/2149178663.jpg";
import picturer_4 from "@/assets/Home/service/2148888835.jpg";
import picturer_5 from "@/assets/Home/service/2148888824.jpg";
import picturer_6 from "@/assets/Home/service/2148888813.jpg";

const serviceImages = [picturer_1, picturer_2, picturer_3, picturer_4, picturer_5, picturer_6];

const services = serviceImages.map((image, index) => ({
  image,
  name: `Service Name ${index + 1}`,
  price: "$450,000",
  rating: "4.9",
  duration: "20+ 45min",
  lessons: "24 Lessons",
}));

export default function ServicesSection() {
  return (
    <section className="py-[100px] bg-[#F9F9F9]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex w-[100px] mx-auto border-[#ECECEC] border items-center rounded-2xl justify-center gap-2 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5722]"></span>
            <span className="text-[#FF5722] font-medium">Services</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-3xl md:text-[56px] font-semibold text-[#151515] md:leading-[64px] md:px-[400px]">We Provide Best Services</h2>
            
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* Image Container */}
              <div className="relative ">
                <div className="">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.name}
                  width={400}
                  height={300}
                  className="w-full h-[272px] p-[16px] rounded-3xl object-cover"
                />
                </div>
                {/* Rating Badge */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#FF5722] text-[#FF5722]" />
                  <span className="text-sm font-medium">{service.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex font-geist justify-between md:text-[24px] font-semibold text-[#030712] md:leading-[32px]  items-start mb-4">
                  <h3 className="font-semibold  text-gray-900">{service.name}</h3>
                  <span className="font-bold text-gray-900">{service.price}</span>
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-4 mt-[24px] text-sm text-gray-500">
                  <div className="flex text-[#515050] items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {service.duration}
                  </div>
                  <div className="flex text-[#515050] items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    {service.lessons}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
