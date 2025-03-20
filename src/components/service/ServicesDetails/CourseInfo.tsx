"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import picturer_2 from "@/assets/Home/service/2149285451.jpg";
import picturer_icons from "@/assets/icons/Frame (3).png";
import { StaticImageData } from "next/image";


interface CourseFeature {
  id: number
  text: string
}

interface CourseData {
  title: string
  description: string
  features: CourseFeature[]
  buttonText: string
  imageUrl: StaticImageData
  imageAlt: string
}


export default function CourseInfo() {
    const [courseData, setCourseData] = useState<CourseData>({
        title: "About Services",
        description:
          "CrediPharm is designed to make the complex process of pharmacist credentialing simple, efficient, and transparent. We help pharmacists navigate the requirements of insurance companies, ensuring they are credentialed quickly and accurately. Here’s how CrediPharm works for you:",
        features: [
          { id: 1, text: "36 LIVE Classes (50 min)" },
          { id: 2, text: "2 Complete Mock Test" },
          { id: 3, text: "8 Practice Reading Mock" },
          { id: 4, text: "10 Full Mock Test" },
          { id: 5, text: "8 Practice Listening" },
          { id: 6, text: "Consultation Session" },
          { id: 7, text: "Facebook Support Group" },
          { id: 8, text: "Course Validity 12 Month" },
        ],
        buttonText: "Buy The Cource",
        imageUrl: picturer_2,
        imageAlt: "Students studying with instructor",
      })
    
      // Simulate fetching data from an API
      useEffect(() => {
        // This would be replaced with an actual API call
        const fetchData = async () => {
          try {
            // Simulating API response delay
            await new Promise((resolve) => setTimeout(resolve, 500))
    
            // In a real application, you would fetch data from an API here
            // const response = await fetch('/api/course-data')
            // const data = await response.json()
            setCourseData({
              title: "About Services",
              description: "CrediPharm is designed to make the complex process of pharmacist credentialing simple, efficient, and transparent. We help pharmacists navigate the requirements of insurance companies, ensuring they are credentialed quickly and accurately. Here’s how CrediPharm works for you:",
              features: [
                { id: 1, text: "Data Collection Management" },
                { id: 2, text: "Insurance Carrier Approvals" },
                { id: 3, text: "Real-Time Tracking" },
                { id: 4, text: "Manual Submission" },
                { id: 5, text: "Automated Reminders" },
                { id: 6, text: "24/7 Support" },
              ],
              buttonText: "Get Started",
              imageUrl: picturer_2,
              imageAlt: "Updated image alt text",
            })
          } catch (error) {
            console.error("Error fetching course data:", error)
          }
        }
    
        fetchData()
      }, [])
  return (
    <div className="container mx-auto md:py-[105px] px-3 md:px-0 py-[50px] bg-white">
      <div className="flex flex-col md:flex-row md:gap-28 gap-10 items-start">
        <div className="w-full md:w-2/5 lg:w-5/12">
          <div className="rounded-lg  overflow-hidden">
            <Image
              src={courseData.imageUrl || "/placeholder.svg"}
              alt={courseData.imageAlt}
              width={900}
              height={900}
              className="w-full md:h-[538px]   object-cover"
            />
          </div>
        </div>

        <div className="w-full md:w-3/5 md:mt-4 lg:w-7/12">
          <h2 className="text-2xl  md:text-[40px] text-[25px] tracking-[-2%] md:leading-[48px] font-semibold mb-6">{courseData.title}</h2>

          <p className="md:text-[18px] text-[15px] tracking-[-2%] md:leading-[28px] font-normal text-[#343333] mb-8">{courseData.description}</p>

          <div className="mb-12 border p-[32px] border-[#ECECEC] rounded-2xl">
            <h3 className="md:text-[20px] text-[16px] tracking-[-2%] md:leading-[28px] font-semibold text-[#343333] mb-6">What&apos;s in this Course:</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {courseData.features.map((feature) => (
                <div key={feature.id} className="flex items-center gap-2">
                  <div className="flex-shrink-0 h-7 w-7 rounded-full  p-1">
                  <Image
              src={picturer_icons || "/placeholder.svg"}
              alt={courseData.imageAlt}
              width={900}
              height={900}
              className="w-full h-auto object-cover"
            />
                  </div>
                  <span className="md:text-[18px] text-[14px] tracking-[-2%] md:leading-[28px] font-medium text-[#343333]">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          <button className="bg-[#F5E663]  hover:bg-[#F5E663] text-black px-5 md:px-8 md:py-4 py-3  rounded-full">
            {courseData.buttonText}
          </button>
        </div>
      </div>
    </div>
  )
}
