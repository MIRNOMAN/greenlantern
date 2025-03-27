"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import Testimonial_man_1 from "@/assets/Testimonial/Ellipse 4 (1).png";
import Testimonial_man_2 from "@/assets/Testimonial/Image (17).png";
import Testimonial_man_3 from "@/assets/Testimonial/Rectangle 38.png";
import Testimonial_icon from "@/assets/Testimonial/Vector.png";
import { StaticImageData } from "next/image";

interface TestimonialProps {
  image: string | StaticImageData;
  name: string;
  role: string;
  review: string;
  rating: number;
  platformLogo: string | StaticImageData;
}

const testimonials: TestimonialProps[] = [
  {
    image: Testimonial_man_1,
    name: "David Warner",
    role: "Online service agency",
    review:
      "I was overwhelmed with the process of getting credentialed, but this service took care of everything. The real-time tracker kept me updated every step of the way.",
    rating: 5.0,
    platformLogo: Testimonial_icon,
  },
  {
    image: Testimonial_man_2,
    name: "David Warner",
    role: "Online service agency",
    review:
      "As a pharmacy with multiple locations, managing credentialing for pharmacist was a nightmare. This platform saved us so much time and effort, and the automated.",
    rating: 5.0,
    platformLogo: Testimonial_icon,
  },
  {
    image: Testimonial_man_3,
    name: "David Warner",
    role: "Online service agency",
    review:
      "From document collection to submission, everything was handled professionally. I appreciated the ongoing communication and how easy it was to monitor.",
    rating: 5.0,
    platformLogo: Testimonial_icon,
  },
  {
    image: Testimonial_man_1,
    name: "David Warner",
    role: "Online service agency",
    review:
      "I was overwhelmed with the process of getting credentialed, but this service took care of everything. The real-time tracker kept me updated every step of the way.",
    rating: 5.0,
    platformLogo: Testimonial_icon,
  },
  {
    image: Testimonial_man_2,
    name: "David Warner",
    role: "Online service agency",
    review:
      "As a pharmacy with multiple locations, managing credentialing for pharmacist was a nightmare. This platform saved us so much time and effort, and the automated.",
    rating: 5.0,
    platformLogo: Testimonial_icon,
  },
  {
    image: Testimonial_man_3,
    name: "David Warner",
    role: "Online service agency",
    review:
      "From document collection to submission, everything was handled professionally. I appreciated the ongoing communication and how easy it was to monitor.",
    rating: 5.0,
    platformLogo: Testimonial_icon,
  },
];

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  const updateVisibleCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    }
  };

  useEffect(() => {
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1 >= testimonials.length ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  return (
    <div className="bg-[#6ACAD3]">
      <div className="container mx-auto px-4 dark:text-black py-12 md:py-20">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center mx-auto border w-[110px] p-1 justify-center border-[#ECECEC] rounded-2xl mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#F5E663] mr-2"></div>
            <span className="text-white text-sm font-medium">Testimonial</span>
          </div>
          <h2 className="mt-4 text-center text-3xl md:text-5xl md:mx-[35%] font-semibold text-[#F5E663]">
          What Our Clients Are Saying
          </h2>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex-shrink-0 w-full px-4" style={{ width: `${100 / visibleCount}%` }}>
                <div className="bg-white p-6 rounded-lg border border-[#ECECEC] shadow-sm">
                  <div className="flex items-start gap-4 mb-8">
                    <Image src={testimonial.image} alt={testimonial.name} width={60} height={60} className=" rounded-full" />
                    <div>
                      <h3 className="font-semibold text-lg text-[#151515]">{testimonial.name}</h3>
                      <p className="text-[16px] font-normal leading-[28px] text-[#515050]">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-[18px] leading-[28px] font-normal text-[#343333] ">{testimonial.review}</p>
                  <div className="flex items-start justify-start mt-10">
                    
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">{testimonial.rating.toFixed(1)}</span>
                      <Star className="w-4 h-4 fill-[#F5E663] text-[#F5E663]" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 md:mt-16 mt-8">
          <button onClick={prevSlide} className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-black" />
          </button>
          <button onClick={nextSlide} className="w-10 h-10 rounded-full bg-[#F5E663] flex items-center justify-center text-black">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
