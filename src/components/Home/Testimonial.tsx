"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowLeft ,ArrowRight, Star } from "lucide-react"
import Testimonial_man_1 from "@/assets/Testimonial/Ellipse 4 (1).png"
import Testimonial_man_2 from "@/assets/Testimonial/Image (17).png"
import Testimonial_man_3 from "@/assets/Testimonial/Rectangle 38.png"
import Testimonial_icon from "@/assets/Testimonial/Vector.png"


import { StaticImageData } from "next/image"

interface TestimonialProps {
  image: string | StaticImageData
  name: string
  role: string
  review: string
  rating: number
  platformLogo: string | StaticImageData
}

const testimonials: TestimonialProps[] = [
  {
    image: Testimonial_man_1,
    name: "David Warner",
    role: "Online service agency",
    review:
      "FlowFix exceeded my expectations! Their team installed my new AC system quickly and efficiently. Professional, friendly, and reasonably priced. Highly recommend!",
    rating: 5.0,
  
    platformLogo: Testimonial_icon,
  },
  {
    image: Testimonial_man_2,
    name: "David Warner",
    role: "Online service agency",
    review:
      "FlowFix exceeded my expectations! Their team installed my new AC system quickly and efficiently. Professional, friendly, and reasonably priced. Highly recommend!",
    rating: 5.0,
  
    platformLogo: Testimonial_icon,
  },
  {
    image: Testimonial_man_3,
    name: "David Warner",
    role: "Online service agency",
    review:
      "FlowFix exceeded my expectations! Their team installed my new AC system quickly and efficiently. Professional, friendly, and reasonably priced. Highly recommend!",
    rating: 5.0,
  
    platformLogo: Testimonial_icon,
  },
  {
    image: Testimonial_man_1,
    name: "David Warner",
    role: "Online service agency",
    review:
      "FlowFix exceeded my expectations! Their team installed my new AC system quickly and efficiently. Professional, friendly, and reasonably priced. Highly recommend!",
    rating: 5.0,
  
    platformLogo: Testimonial_icon,
  },
]

export default function Testimonial() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [visibleCount, setVisibleCount] = useState(3)
  
    // Update visible count based on screen size
    
  const updateVisibleCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) {
        setVisibleCount(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2)
      } else {
        setVisibleCount(3)
      }
    }
  }

  useEffect(() => {
    updateVisibleCount()
    window.addEventListener("resize", updateVisibleCount)
    return () => window.removeEventListener("resize", updateVisibleCount)
  }, [])

    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + visibleCount >= testimonials.length ? 0 : prevIndex + 1))
    }
  
    const prevSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - visibleCount : prevIndex - 1))
    }
  return (
    <div className=" bg-[#F9F9F9]">
    <div className="container bg-[#F9F9F9] mx-auto md:px-0 px-4 py-[50px] md:py-[100px]">
        {/* Header */}
    <div className=" mb-12 text-center">
      <div className="flex items-center mx-auto border w-[110px] p-1 justify-center border-[#ECECEC] rounded-2xl mb-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#FF5722] mr-2"></div>
        <span className="text-black text-sm font-medium">Testimonial</span>
      </div>
      <div className="">
      <h2 className=" mt-[16px] text-center text-3xl md:mx-[10%] md:text-[56px]  md:px-[20%] tracking-[-2%] font-semibold md:leading-[64px]   text-[#151515]  ">
        We Provide Best Services
      </h2>
      </div>
    </div>

    {/* Testimonials Carousel */}
    <div className="  relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            width: `${(testimonials.length / visibleCount) * 100}%`,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="px-4" style={{ width: `${100 / testimonials.length}%` }}>
              <div className="bg-white p-6 rounded-lg border md:w-[384px] md:h-[320px]` border-[#ECECEC] shadow-sm">
                <div className="flex items-start gap-4 mb-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-[24px] tracking-[-2%] leading-8 text-[#151515]">{testimonial.name}</h3>
                    <p className="font-normal text-[16px] tracking-[-2%] leading-6 text-[#515050]">{testimonial.role}</p>
                  </div>
                </div>
                <p className="font-normal text-[18px] tracking-[-2%] leading-7 mt-[16px] text-start text-[#343333]">{testimonial.review}</p>
                <div className="flex items-center mt-[48px] justify-between">
                  <Image
                    src={testimonial.platformLogo || "/placeholder.svg"}
                    alt="Platform logo"
                    width={700}
                    height={700}
                    className="w-[30%]"
                  />
                  <div className="flex  items-center gap-1">
                    <span className="font-semibold">{testimonial.rating.toFixed(1)}</span>
                    <Star className="w-4 h-4 fill-[#FF5722] text-[#FF5722]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-[64px]">
        <button
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-[#FFE5DE] hover:bg-[#FF5722] text-[#FF5722] hover:text-white transition-colors flex items-center justify-center"
          aria-label="Previous slide"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-[#FF5722] text-white hover:bg-[#E64A19] transition-colors flex items-center justify-center"
          aria-label="Next slide"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
    </div>
  </div>
  )
}
