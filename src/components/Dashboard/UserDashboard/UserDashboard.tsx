"use client"


import Image from "next/image"
import {  Circle } from "lucide-react"
import logo from "@/assets/icons/Logo (5).png"
import image_picture from "@/assets/icons/sm.png"
import { useState } from "react"
import { Check } from "lucide-react";


// Define types for our data
type ProgressStep = {
    id: number
    name: string
    completed: boolean
  }
  
  type Document = {
    id: number
    name: string
    expiresIn: number
    status: "Active" | "Renewal Soon" | "Expired"
  }
  
  type InsuranceCompany = {
    id: number
    name: string
    description: string
    status: "In Progress" | "Renewal Soon" | "Completed" | "Pending"
  }
  
  type Activity = {
    id: number
    description: string
    timeAgo: string
  }
  

export default function UserDashboard() {
 

     // Progress steps state
  const [progressSteps, setProgressSteps] = useState<ProgressStep[]>([
    { id: 1, name: "Application Submitted", completed: true },
    { id: 2, name: "Documents Verified", completed: true },
    { id: 3, name: "Paperwork Processing", completed: true },
    { id: 4, name: "Insurance Review", completed: false },
    { id: 5, name: "Completion", completed: false },
  ])

  // Document status state
  const [documents, setDocuments] = useState<Document[]>([
    { id: 1, name: "Pharmacy License", expiresIn: 25, status: "Active" },
    { id: 2, name: "DEA Registration", expiresIn: 89, status: "Renewal Soon" },
    { id: 3, name: "CPR Certification", expiresIn: 412, status: "Active" },
  ])

  // Insurance companies state
  const [insuranceCompanies, setInsuranceCompanies] = useState<InsuranceCompany[]>([
    { id: 1, name: "Blue Cross Blue Shield", description: "Application in review", status: "In Progress" },
    { id: 2, name: "United Healthcare", description: "Documents pending", status: "Renewal Soon" },
    { id: 3, name: "Aetna", description: "Credentialing complete", status: "Completed" },
  ])

  // Recent activity state
  const [activities, setActivities] = useState<Activity[]>([
    { id: 1, description: "License renewal document uploaded", timeAgo: "2 hours ago" },
    { id: 2, description: "BCBS application review completed", timeAgo: "1 day ago" },
    { id: 3, description: "Additional documentation requested for UHC", timeAgo: "2 days ago" },
  ])

  // Calculate progress percentage
  const progressPercentage = (progressSteps.filter((step) => step.completed).length / progressSteps.length) * 100

  // Function to update a document status
  const updateDocumentStatus = (id: number, newStatus: Document["status"]) => {
    setDocuments((docs) => docs.map((doc) => (doc.id === id ? { ...doc, status: newStatus } : doc)))
  }

  // Function to update an insurance company status
  const updateInsuranceStatus = (id: number, newStatus: InsuranceCompany["status"]) => {
    setInsuranceCompanies((companies) =>
      companies.map((company) => (company.id === id ? { ...company, status: newStatus } : company)),
    )
  }

  // Function to add a new activity
  const addActivity = (description: string) => {
    const newActivity = {
      id: activities.length + 1,
      description,
      timeAgo: "Just now",
    }
    setActivities([newActivity, ...activities])
  }

  // Function to complete a progress step
  const completeProgressStep = (id: number) => {
    setProgressSteps((steps) => {
      const updatedSteps = steps.map((step) => {
        if (step.id === id && !step.completed) {
          addActivity(`${step.name} step completed`)
          return { ...step, completed: true }
        }
        return step
      })
      return updatedSteps
    })
  }

  // Helper function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
      case "Completed":
        return "text-green-700 bg-green-100"
      case "Renewal Soon":
        return "text-yellow-700 bg-[#FCFAC2]"
      case "In Progress":
        return "text-blue-700 bg-blue-50"
      case "Expired":
        return "text-red-700 bg-red-50"
      default:
        return "text-gray-700 bg-gray-50"
    }
  }


   
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b  border-gray py-4 px-6">
        <div className="flex justify-between items-center">
          <div className="w-10 h-10">
            <div className="w-12 h-12  rounded-md flex items-center justify-center">
              <Image src={logo} alt="logo" width={500} height={500} className="" />
            </div>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={image_picture}
              alt="User avatar"
              width={300}
              height={300}
              className="rounded-full"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className=" mx-auto p-6 space-y-8">
        {/* Progress Section */}
        <section className="bg-white rounded-lg px-[4%] py-[2%] border border-[#ECECEC] ">
          <h2 className="text-lg font-medium mb-4">Credentialing Progress</h2>
          <div className="relative">
            {/* Progress Bar */}
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-yellow-400 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-between mt-2">
              {progressSteps.map((step) => (
                <div
                  key={step.id}
                  className="flex justify-center gap-2 items-center cursor-pointer"
                  onClick={() => completeProgressStep(step.id)}
                >
                  {step.completed ? (
                    <Check className="w-5 p-1 h-5 bg-yellow-300 text-white rounded-full flex items-center justify-center shadow-md hover:bg-yellow-400 transition" />
                  ) : (
                    <Circle className="w-5  h-5"/>
                  )}
                  <span className="text-base leading-[26px] font-normal text-[#515050] opacity-80 mt-1 text-center">{step.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Document Status */}
          <section className="bg-white border border-[#ECECEC] rounded-lg p-6 shadow-sm">
            <h2 className="text-lg md:text-[20px] leading-[28px] font-semibold my-4">Document Status</h2>
            <div className="space-y-6">
              {documents.map((document) => (
                <div key={document.id} className="flex py-3 px-5 rounded-xl bg-[#F9F9F9] justify-between items-center">
                  <div>
                    <h3 className="text-[18px] leading-[28px] font-medium">{document.name}</h3>
                    <p className="text-[16px] leading-[26px] font-normal text-[#515050] opacity-80">Expires in {document.expiresIn} days</p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs ${getStatusColor(document.status)} rounded-full cursor-pointer`}
                    onClick={() => {
                      const nextStatus =
                        document.status === "Active"
                          ? "Renewal Soon"
                          : document.status === "Renewal Soon"
                            ? "Expired"
                            : "Active"
                      updateDocumentStatus(document.id, nextStatus)
                      addActivity(`${document.name} status changed to ${nextStatus}`)
                    }}
                  >
                    {document.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Insurance Companies */}
          <section className="bg-white border border-[#ECECEC] rounded-lg p-6 shadow-sm">
            <h2 className="text-lg md:text-[20px] leading-[28px] font-semibold mb-4">Insurance Companies</h2>
            <div className="space-y-6">
              {insuranceCompanies.map((company) => (
                <div key={company.id} className="flex py-3 px-5 rounded-xl bg-[#F9F9F9] justify-between items-center">
                  <div>
                    <h3 className="text-[18px] leading-[28px] font-medium">{company.name}</h3>
                    <p className="text-[16px] leading-[26px] font-normal text-[#515050] opacity-80">{company.description}</p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs ${getStatusColor(company.status)} rounded-full cursor-pointer`}
                    onClick={() => {
                      const statuses: InsuranceCompany["status"][] = [
                        "In Progress",
                        "Renewal Soon",
                        "Completed",
                        "Pending",
                      ]
                      const currentIndex = statuses.indexOf(company.status)
                      const nextStatus = statuses[(currentIndex + 1) % statuses.length]
                      updateInsuranceStatus(company.id, nextStatus)
                      addActivity(`${company.name} status changed to ${nextStatus}`)
                    }}
                  >
                    {company.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Recent Activity */}
        <section className="bg-white border border-[#ECECEC] rounded-lg p-6 shadow-sm">
          <h2 className="text-lg md:text-[20px] leading-[28px] font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="mt-1 ">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <g clip-path="url(#clip0_498_39)">
                    <path d="M18.3337 9.99984C18.3337 5.39746 14.6027 1.6665 10.0003 1.6665C5.39795 1.6665 1.66699 5.39746 1.66699 9.99984C1.66699 14.6022 5.39795 18.3332 10.0003 18.3332C14.6027 18.3332 18.3337 14.6022 18.3337 9.99984Z" fill="#F5E663" stroke="#F5E663" stroke-width="1.5"/>
                    <path d="M6.66699 10.6248C6.66699 10.6248 8.00033 11.3853 8.66699 12.4998C8.66699 12.4998 10.667 8.12484 13.3337 6.6665" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_498_39">
                    <rect width="24" height="24" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>
                                    </div>
                <div>
                  <p className="text-[18px] leading-[28px] font-medium">{activity.description}</p>
                  <p className="text-[16px] leading-[26px] font-normal text-[#515050] opacity-80">{activity.timeAgo}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

