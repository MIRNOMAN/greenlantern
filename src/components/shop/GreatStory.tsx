import Image from "next/image"
import story_picture from "@/assets/shop/image (18).png"
import Link from "next/link"

export default function GreatStory() {
  return (
    <div className="container mx-auto px-4 py-[40px] ">
      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <div className="border rounded-lg p-6 border-[#ECECEC] text-center">
          <h3 className="md:text-[32px] text-[25px] md:leading-[40px] font-semibold">16+</h3>
          <p className="text-sm text-muted-foreground">Year experience</p>
        </div>
        <div className="border rounded-lg border-[#ECECEC] p-6 text-center">
          <h3 className="md:text-[32px] text-[25px] md:leading-[40px] font-semibold">1M+</h3>
          <p className="text-sm text-muted-foreground">Happy client</p>
        </div>
        <div className="border rounded-lg border-[#ECECEC] p-6 text-center">
          <h3 className="md:text-[32px] text-[25px] md:leading-[40px] font-semibold">60+</h3>
          <p className="text-sm text-muted-foreground">Our Team</p>
        </div>
        <div className="border rounded-lg border-[#ECECEC] p-6 text-center">
          <h3 className="md:text-[32px] text-[25px] md:leading-[40px] font-semibold">12+</h3>
          <p className="text-sm text-muted-foreground">Awarded</p>
        </div>
      </div>

      {/* Our Story Label */}
      <div className="flex justify-center mb-4">
      <div className="flex border w-[110px] p-[2px] justify-center border-[#ECECEC] rounded-2xl items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F5E663]"></span>
              <span className="ml-2 text-black font-medium">Our Story</span>
            </div>
      </div>

      {/* Main Heading */}
      <div className="text-center mb-16">
        <h2 className="md:text-[56px] text-[24px] md:leading-[64px] md:px-[30%] px-[17%] font-semibold text-[#682D70]">
        Discover Our Story,
        Mission & Vision
        </h2>
      </div>

      {/* Content Section */}
      <div className="grid md:grid-cols-12 gap-16  ">
        {/* Navigation */}
        <div className="md:col-span-4 space-y-8 md:mt-[100px]">
          <div className="flex items-center gap-3  text-[#343333]">
            <span className="text-[#F5E663] md:text-[32px] text-[17px] md:leading-[40px]  font-semibold">01</span>
            <span className="md:text-[32px] text-[17px] md:leading-[40px]  font-semibold">—Our Story</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="md:text-[32px] text-[17px] md:leading-[40px]  font-semibold">02</span>
            <span className="md:text-[32px] text-[17px] md:leading-[40px]  font-semibold">—Mission</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="md:text-[32px] text-[17px] md:leading-[40px]  font-semibold">03</span>
            <span className="md:text-[32px] text-[17px] md:leading-[40px]  font-semibold">—Vision</span>
          </div>
        </div>

        {/* Image */}
        <div className="md:col-span-3">
          <div className="rounded-lg overflow-hidden">
            <Image
              src={story_picture}
              alt="Two people working together"
              width={600}
              height={600}
              className="w-[300px] h-[340px] object-cover"
            />
          </div>
        </div>

        {/* Description */}
        <div className="md:col-span-5 md:mt-[50px]">
          <div className="space-y-4 ">
            <p className="md:text-[20px] text-[15px] md:leading-[24px]  tracking-wide  font-light ">
            We started with a simple goal: to make the credentialing process easier for pharmacists. What began as a solution to a complex challenge has now become a trusted service that helps pharmacists streamline their enrollment with insurance companies. Our journey is rooted in the belief that pharmacists should spend less time on paperwork and more time on patient care.
            </p>
            <div className="pt-4">
              <Link href="/credentialing-information">
              <button className="bg-[#F5E663]  hover:bg-[#F5E663] text-black rounded-full py-3 md:py-4 px-5 md:px-10">
              Get Started
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
