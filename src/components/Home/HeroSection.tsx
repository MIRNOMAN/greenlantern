import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import heroBanner from "@/assets/Backround/Bright Classroom Setup 1.png"
import man_image1 from "@/assets/Home/icons/Ellipse 3.png"
import man_image2 from "@/assets/Home/icons/Ellipse 4.png"
import man_image3 from "@/assets/Home/icons/Ellipse 5.png"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen dark:text-black w-full">
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
      <div className="relative z-10 container mx-auto px-4  pb-16 min-h-screen flex flex-col justify-center">
        <div className="">
          {/* Heading */}
          <h1 className="text-3xl md:text-[80px]   md:pr-[40%] md:pt-[180px] pt-[100px]  font-semibold md:leading-[88px] text-white mb-6">
          Provider Credentialing & Enrollment Services
          </h1>

          {/* Subtext */}
          <p className="text-white/90 text-base md:text-[18px]   font-normal md:leading-[28px] tracking-[-0.36px] mb-8 max-w-2xl">
          Pharmacists in certain states can now bill insurance companies for their services, but
          before they can do so, they must complete a complex credentialing process.
          </p>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="inline-block bg-[#F5E663] text-black md:text-[16px] leading-[18px] px-[32px] font-semibold py-[16px] mt-[32px] rounded-full  hover:bg-[#F5E663] transition-colors"
          >
            Contact Us
          </Link>

          {/* Satisfied Clients */}
          <div className="md:mt-[160px] mt-10">
            <p className="text-white md:text-[16px]  font-normal md:leading-[26px] mb-3">Satisfied clients</p>
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
                <span className="text-white md:text-[18px]  font-normal md:leading-[28px] mr-2">4.9</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-[#F5E663] text-[#F5E663]" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
