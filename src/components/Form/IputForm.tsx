"use client"

import { useState, useRef } from "react"
import { ChevronDown } from "lucide-react"
import Link from "next/link";

export default function IputForm() {
 
    const [date, setDate] = useState<string>("")
    const [active, setActive] = useState<string | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: File | null }>({
      dea: null,
      license: null,
    })
    const [isDragging, setIsDragging] = useState<{ [key: string]: boolean }>({
      dea: false,
      license: false,
    })
   
    const [selectedState, setSelectedState] = useState<string>("")
  
    const fileInputRefs = {
      dea: useRef<HTMLInputElement>(null),
      license: useRef<HTMLInputElement>(null),
    }
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
      if (e.target.files && e.target.files[0]) {
        setSelectedFiles((prev) => ({
          ...prev,
          [type]: e.target.files![0],
        }))
      }
    }
  
    const handleBrowseClick = (type: string) => {
      fileInputRefs[type as keyof typeof fileInputRefs].current?.click()
    }
  
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, type: string) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging((prev) => ({
        ...prev,
        [type]: true,
      }))
    }
  
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>, type: string) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging((prev) => ({
        ...prev,
        [type]: false,
      }))
    }
  
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
    }
  
    const handleDrop = (e: React.DragEvent<HTMLDivElement>, type: string) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging((prev) => ({
        ...prev,
        [type]: false,
      }))
  
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        setSelectedFiles((prev) => ({
          ...prev,
          [type]: e.dataTransfer.files[0],
        }))
      }
    }
  
 
  
    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedState(e.target.value)
    }
  return (
    <div className="md:max-w-5xl mx-auto  md:my-[140px] py-[90px] border-none border-[#ECECEC]  bg-[#F9F9F9]  p-8 rounded-lg">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl md:text-[24px] leading-[32px] font-semibold text-[#682D70]">Pharmacy Credentialing Point of Contact</h1>
          <p className="text-sm md:text-[16px] leading-[26px] font-normal mt-1">
            Contact information for who is completing this form if Scripted&apos;s team has follow-up questions
          </p>
        </div>
         
        <div className='bg-[#ECECEC] h-[1px] my-[40px]' />

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-sm font-medium">
              First Name <span className="text-[#F5E663]">*</span>
            </label>
            <input id="firstName" type="text" className="w-full p-2 border  border-[#ECECEC] border-gray-300 rounded-lg" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="block text-sm font-medium">
              Last Name <span className="text-[#F5E663]">*</span>
            </label>
            <input id="lastName" type="text" className="w-full p-2 border border-[#ECECEC] rounded-lg border-gray-300 " required />
          </div>
        </div>

        <div className="space-y-2  md:w-[49%]">
          <label htmlFor="email" className="block text-sm font-medium">
            Email <span className="text-[#F5E663]">*</span>
          </label>
          <input id="email" type="email" className="w-full p-2 rounded-lg border border-[#ECECEC] border-gray-300 " required />
        </div>

        <div className='bg-[#ECECEC] h-[1px] my-[40px]' />

        <div className="pt-4">
          <h2 className="text-xl md:text-[24px] leading-[32px] font-semibold text-[#682D70]">Pharmacy Legal Information</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="pharmacyLegalName" className="block text-sm md:text-[16px] leading-[26px] font-normal">
              Pharmacy Legal Name <span className="text-[#F5E663]">*</span>
            </label>
            <input id="pharmacyLegalName" type="text" className="w-full p-2 rounded-lg border border-[#ECECEC] border-gray-300 " required />
          </div>
          <div className="space-y-1">
            <label htmlFor="dbaName" className="block text-sm md:text-[16px] leading-[26px] font-normal">
              Doing Business As (DBA) Name
            </label>
            <input id="dbaName" type="text" className="w-full p-2  border-gray-300 rounded-lg border border-[#ECECEC]" />
            <p className="text-xs text-gray-500">If different from Legal Name</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="block text-sm md:text-[16px] leading-[26px] font-normal">Do you have a fictitious business name permit? <span className="text-[#F5E663]">*</span></p>
          <div className="flex space-x-4">
      {["Yes", "No"].map((label, index) => (
        <button
          key={index}
          onClick={() => setActive(label)}
          className={`px-4 py-2 rounded-lg border border-[#ECECEC] transition-all duration-200 
            ${active === label ? "bg-black text-white" : "bg-white text-black border-gray-300"}`}
        >
          {label}
        </button>
      ))}
    </div>
        </div>

        <div className="space-y-8 text-sm md:text-[16px] leading-[26px] font-normal text-gray-700">
          <p>
            A fictitious business permit is a legal document that allows a business to operate under a name other than
            the owner&apos;s name in states that require it.
          </p>
          <p>Other terms used include: assumed name, doing business as (DBA), or trade name.</p>
          <p>
            The process of adopting an assumed name varies by where you operate, but registrations are typically filed
            with the secretary of state or at the county level.
          </p>
        </div>

        <div className="grid md:grid-cols-2 pt-5 gap-4">
          <div className="space-y-1">
            <label htmlFor="incorporation" className="block text-sm md:text-[16px] leading-[26px] font-normal">
              How is your pharmacy incorporated? <span className="text-[#F5E663]">*</span>
            </label>
            <input id="incorporation" type="text" className="w-full p-2  border-gray-300 rounded-lg border border-[#ECECEC]" />
          </div>
          <div className="space-y-1">
            <label htmlFor="stateOfIncorporation" className="block text-sm md:text-[16px] leading-[26px] font-normal">
              State of Incorporation <span className="text-[#F5E663]">*</span>
            </label>
            <div className="relative">
              <select
                id="stateOfIncorporation"
                className="w-full p-2 rounded-lg border border-[#ECECEC] border-gray-300  appearance-none pr-8"
                defaultValue=""
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                {/* Add all states here */}
                <option value="WY">Wyoming</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-[#c9c4c4]" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 pt-5 gap-4">
          <div className="space-y-1">
            <label htmlFor="stateRegistration" className="block text-sm md:text-[16px] leading-[26px] font-normal">
              State Registration or Corporate Number <span className="text-[#F5E663]">*</span>
            </label>
            <input id="stateRegistration" type="text" className="w-full p-2  border-gray-300 rounded-lg border border-[#ECECEC]" />
          </div>
          <div className="space-y-1">
            <label htmlFor="federalTaxId" className="block text-sm md:text-[16px] leading-[26px] font-normal">
              Federal Tax ID/EIN <span className="text-[#F5E663]">*</span>
            </label>
            <input id="federalTaxId" type="text" className="w-full p-2  border-gray-300 rounded-lg border border-[#ECECEC]" />
          </div>
        </div>
        <div className="space-y-6 pt-8">
          <div className="space-y-1">
          <div className="space-y-2">
          <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">Upload copy of the IRS letter with your federal tax ID/EIN <span className="text-[#F5E663]">*</span></div>
          <div
            className={`rounded-lg border border-[#ECECEC] p-6 bg-gray-50 flex flex-col items-center justify-center cursor-pointer transition-colors ${
              isDragging.license ? "border-amber-400 bg-amber-50" : ""
            }`}
            onClick={() => handleBrowseClick("license")}
            onDragEnter={(e) => handleDragEnter(e, "license")}
            onDragLeave={(e) => handleDragLeave(e, "license")}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "license")}
          >
            <input
              type="file"
              className="hidden"
              ref={fileInputRefs.license}
              onChange={(e) => handleFileChange(e, "license")}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            <div className="w-10 h-10  border border-[#ECECEC] rounded-full bg-amber-50 flex items-center justify-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-amber-300"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>
            <div className="font-medium">Browse Files</div>
            <p className="text-sm text-gray-500">Drag and drop files here</p>
            {selectedFiles.license && <div className="mt-2 text-sm text-amber-600">{selectedFiles.license.name}</div>}
          </div>
        </div>
          </div>

          <div className="space-y-1 mt-4">
          <div className="space-y-2">
          <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">Upload copy of your W9 <span className="text-[#F5E663]">*</span></div>
          <div
            className={`rounded-lg border border-[#ECECEC] p-6 bg-gray-50 flex flex-col items-center justify-center cursor-pointer transition-colors ${
              isDragging.license ? "border-amber-400 bg-amber-50" : ""
            }`}
            onClick={() => handleBrowseClick("license")}
            onDragEnter={(e) => handleDragEnter(e, "license")}
            onDragLeave={(e) => handleDragLeave(e, "license")}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "license")}
          >
            <input
              type="file"
              className="hidden"
              ref={fileInputRefs.license}
              onChange={(e) => handleFileChange(e, "license")}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-amber-300"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>
            <div className="font-medium">Browse Files</div>
            <p className="text-sm text-gray-500">Drag and drop files here</p>
            {selectedFiles.license && <div className="mt-2 text-sm text-amber-600">{selectedFiles.license.name}</div>}
          </div>
        </div>
          </div>

          <div className="space-y-2 pt-5">
            <p className="block text-sm md:text-[16px] leading-[26px] font-normal">Does your pharmacy have a Business License Number? <span className="text-[#F5E663]">*</span></p>
            <div className="flex space-x-4">
      {["Yes", "No"].map((label, index) => (
        <button
          key={index}
          onClick={() => setActive(label)}
          className={`px-4 py-2 rounded-lg border border-[#ECECEC] transition-all duration-200 
            ${active === label ? "bg-black text-white" : "bg-white text-black border-gray-300"}`}
        >
          {label}
        </button>
      ))}
    </div>
          </div>

          <div className="space-y-2 py-2 text-sm md:text-[16px] leading-[26px] font-normal text-gray-700">
            <p>Your pharmacy may not have a business license depending on its municipality.</p>
          </div>

          <div className="space-y-2">
            <p className="block text-sm md:text-[16px] leading-[26px] font-normal">Does your pharmacy have Workers&apos; Compensation Insurance? <span className="text-[#F5E663]">*</span></p>
            <div className="flex space-x-4">
      {["Yes", "No"].map((label, index) => (
        <button
          key={index}
          onClick={() => setActive(label)}
          className={`px-4 py-2 rounded-lg border border-[#ECECEC] transition-all duration-200 
            ${active === label ? "bg-black text-white" : "bg-white text-black border-gray-300"}`}
        >
          {label}
        </button>
      ))}
    </div>
          </div>

          <div className='bg-[#ECECEC] h-[1px] my-[40px]' />

          <div className="pt-4">
            <h2 className="text-xl md:text-[24px] leading-[32px] font-semibold text-[#682D70]">Pharmacy Mailing Address</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="addressStreet1" className="block text-sm md:text-[16px] leading-[26px] font-normal">
                Address Street 1 <span className="text-[#F5E663]">*</span>
              </label>
              <input
                id="addressStreet1"
                type="text"
                className="w-full p-2  border-gray-300 rounded-lg border border-[#ECECEC]"
               
              />
             <p className="text-[13px] text-[#515050] opacity-70 text-gray-500">
             E.g., 123 Main Street
          </p>
            </div>
            <div className="space-y-1">
              <label htmlFor="addressStreet2" className="block text-sm md:text-[16px] leading-[26px] font-normal">
                Address Street 2  <span className="text-[#F5E663]">*</span>
              </label>
              <input
                id="addressStreet2"
                type="text"
                className="w-full p-2 rounded-lg border border-[#ECECEC] border-gray-300 "
            
              />
              <p className="text-[13px] text-[#515050] opacity-70 text-gray-500">
              E.g., Apt / Unit / Bldg / Suite
          </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="city" className="block text-sm md:text-[16px] leading-[26px] font-normal">
                City <span className="text-[#F5E663]">*</span>
              </label>
              <input id="city" type="text" className="w-full p-2  border-gray-300 rounded-lg border border-[#ECECEC]" />
            </div>
            <div className="space-y-1">
              <label htmlFor="state" className="block text-sm md:text-[16px] leading-[26px] font-normal">
                State <span className="text-[#F5E663]">*</span>
              </label>
              <div className="relative">
                <select
                  id="state"
                  className="w-full p-2 rounded-lg border border-[#ECECEC] border-gray-300  appearance-none pr-8"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Please select
                  </option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  {/* Add all states here */}
                  <option value="WY">Wyoming</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-[#bbb8b8]" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="zipCode5" className="block text-sm md:text-[16px] leading-[26px] font-normal">
                Zip Code 5 Digit <span className="text-[#F5E663]">*</span>
              </label>
              <input
                id="zipCode5"
                type="text"
                className="w-full p-2  border-gray-300 rounded-lg border border-[#ECECEC]"
              
                maxLength={5}
              />
               <p className="text-[13px] text-[#515050] opacity-70 text-gray-500">
               5 Digit Zip Code
          </p>
            </div>
            <div className="space-y-1">
              <label htmlFor="zipCode4" className="block text-sm md:text-[16px] leading-[26px] font-normal">
                Zip Code Plus 4 <span className="text-[#F5E663]">*</span>
              </label>
              <input
                id="zipCode4"
                type="text"
                className="w-full p-2  border-gray-300 rounded-lg border border-[#ECECEC]"
             
                maxLength={4}
              />
              <p className="text-[13px] text-[#515050] opacity-70 text-gray-500">
              Zip Code 4 Additional Digits
          </p>
            </div>
          </div>
        </div>

        <div className='bg-[#ECECEC] h-[1px] my-[40px]' />

        <div className="pt-4">
            <h2 className="text-xl md:text-[24px] leading-[32px] font-semibold text-[#682D70]">Pharmacy Billing Address</h2>
          </div>


          <div className='bg-[#ECECEC] h-[1px] my-[40px]' />

          <div className="space-y-4">
            <div className="flex items-center">
              <input id="sameAddress" type="checkbox" className="mr-2 h-4 w-4" />
              <label htmlFor="sameAddress" className="text-sm md:text-[16px] leading-[26px] font-normal">
                Pharmacy Billing Address is the same as Pharmacy Mailing Address
              </label>
            </div>

         
            <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="addressStreet1" className="block text-sm md:text-[16px] leading-[26px] font-normal">
                Address Street 1 <span className="text-[#F5E663]">*</span>
              </label>
              <input
                id="addressStreet1"
                type="text"
                className="w-full p-2  border-gray-300 rounded-lg border border-[#ECECEC]"
               
              />
              <p className="text-[13px] text-[#515050] opacity-70 text-gray-500">
             E.g., 123 Main Street
          </p>
            </div>
            <div className="space-y-1">
              <label htmlFor="addressStreet2" className="block text-sm md:text-[16px] leading-[26px] font-normal">
                Address Street 2 <span className="text-[#F5E663]">*</span>
              </label>
              <input
                id="addressStreet2"
                type="text"
                className="w-full p-2 rounded-lg border border-[#ECECEC] border-gray-300 "
            
              />
               <p className="text-[13px] text-[#515050] opacity-70 text-gray-500">
              E.g., Apt / Unit / Bldg / Suite
          </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="city" className="block text-sm md:text-[16px] leading-[26px] font-normal">
                City <span className="text-[#F5E663]">*</span>
              </label>
              <input id="city" type="text" className="w-full p-2  border-gray-300 rounded-lg border border-[#ECECEC]" />
            </div>
            <div className="space-y-1">
              <label htmlFor="state" className="block text-sm md:text-[16px] leading-[26px] font-normal">
                State <span className="text-[#F5E663]">*</span>
              </label>
              <div className="relative">
                <select
                  id="state"
                  className="w-full p-2 rounded-lg border border-[#ECECEC] border-gray-300  appearance-none pr-8"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Please select
                  </option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  {/* Add all states here */}
                  <option value="WY">Wyoming</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-[#bbb8b8]" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="zipCode5" className="block text-sm md:text-[16px] leading-[26px] font-normal">
                Zip Code 5 Digit <span className="text-[#F5E663]">*</span>
              </label>
              <input
                id="zipCode5"
                type="text"
                className="w-full p-2  border-gray-300 rounded-lg border border-[#ECECEC]"
              
                maxLength={5}
              />
               <p className="text-[13px] text-[#515050] opacity-70 text-gray-500">
               5 Digit Zip Code
          </p>
            </div>
            <div className="space-y-1">
              <label htmlFor="zipCode4" className="block text-sm md:text-[16px] leading-[26px] font-normal">
                Zip Code Plus 4 <span className="text-[#F5E663]">*</span>
              </label>
              <input
                id="zipCode4"
                type="text"
                className="w-full p-2  border-gray-300 rounded-lg border border-[#ECECEC]"
             
                maxLength={4}
              />
                <p className="text-[13px] text-[#515050] opacity-70 text-gray-500">
              Zip Code 4 Additional Digits
          </p>
            </div>
          </div>
          </div>

          <div className='bg-[#ECECEC] h-[1px] my-[40px]' />

          <div className="pt-4">
            <h2 className="text-xl md:text-[24px] leading-[32px] font-semibold text-[#682D70]">Pharmacy Business Information</h2>
          </div>

          <div className='bg-[#ECECEC] h-[1px] my-[40px]' />

          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <p className="block text-sm md:text-[16px] leading-[26px] font-normal">Do you own or lease/rent your pharmacy&apos;s service location? <span className="text-[#F5E663]">*</span></p>
              <div className="flex space-x-4">
      {["Own", "Lease/Rent"].map((label, index) => (
        <button
          key={index}
          onClick={() => setActive(label)}
          className={`px-4 py-2 rounded-lg border border-[#ECECEC] transition-all duration-200 
            ${active === label ? "bg-black text-white" : "bg-white text-black border-gray-300"}`}
        >
          {label}
        </button>
      ))}
    </div>
            </div>
          </div>

          <div className='bg-[#ECECEC] h-[1px] my-[40px]' />

          <div className="pt-4">
            <h2 className="text-xl md:text-[24px] leading-[32px] font-semibold text-[#682D70]">Pharmacy Professional Information <span className="text-[#F5E663]">*</span></h2>
          </div>

          <div className='bg-[#ECECEC] h-[1px] my-[40px]' />

          <div className="pt-2">
            <h3 className="text-xl md:text-[24px] leading-[32px] font-semibold text-[#682D70]">DEA Certificate Information <span className="text-[#F5E663]">*</span></h3>
          </div>

          <div className="space-y-4 pt-6">
            <div className="space-y-1 md:w-[49%]">
              <label htmlFor="deaCertificateNumber" className="block text-sm md:text-[16px] leading-[26px] font-normal">
                Pharmacy DEA Certificate Number <span className="text-[#F5E663]">*</span>
              </label>
              <input
                id="deaCertificateNumber"
                type="text"
                className="w-full p-2 pt-2 border-gray-300 rounded-lg border border-[#ECECEC]"
                required
              />
            </div>
          </div>
      

        <div className="space-y-2 pt-5">
          <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">Upload copy of DEA Certificate Number <span className="text-[#F5E663]">*</span></div>
          <div
            className={`rounded-lg border border-[#ECECEC] p-6 bg-gray-50 flex flex-col items-center justify-center cursor-pointer transition-colors ${
              isDragging.dea ? " bg-amber-50" : ""
            }`}
            onClick={() => handleBrowseClick("dea")}
            onDragEnter={(e) => handleDragEnter(e, "dea")}
            onDragLeave={(e) => handleDragLeave(e, "dea")}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "dea")}
          >
            <input
              type="file"
              className="hidden"
              ref={fileInputRefs.dea}
              onChange={(e) => handleFileChange(e, "dea")}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-amber-300"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>
            <div className="font-medium">Browse Files</div>
            <p className="text-sm text-gray-500">Drag and drop files here</p>
            {selectedFiles.dea && <div className="mt-2 text-sm text-amber-600">{selectedFiles.dea.name}</div>}
          </div>
        </div>

        <div className="space-y-2 pt-5 md:w-[49%]">
          <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">Pharmacy License Number <span className="text-[#F5E663]">*</span></div>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-lg border border-[#ECECEC] focus:outline-none focus:ring-2 focus:ring-black"
        
          />
        </div>

        <div className="space-y-2">
          <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">Upload copy of Pharmacy License <span className="text-[#F5E663]">*</span></div>
          <div
            className={`rounded-lg border border-[#ECECEC] p-6 bg-gray-50 flex flex-col items-center justify-center cursor-pointer transition-colors ${
              isDragging.license ? " bg-amber-50" : ""
            }`}
            onClick={() => handleBrowseClick("license")}
            onDragEnter={(e) => handleDragEnter(e, "license")}
            onDragLeave={(e) => handleDragLeave(e, "license")}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "license")}
          >
            <input
              type="file"
              className="hidden"
              ref={fileInputRefs.license}
              onChange={(e) => handleFileChange(e, "license")}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-amber-300"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>
            <div className="font-medium">Browse Files</div>
            <p className="text-sm text-gray-500">Drag and drop files here</p>
            {selectedFiles.license && <div className="mt-2 text-sm text-amber-600">{selectedFiles.license.name}</div>}
          </div>
        </div>

        <div className="space-y-2 pt-5 md:w-[49%]">
          <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">Pharmacy Permit Issue Date <span className="text-[#F5E663]">*</span></div>
          <div className="relative">
            <input
              type="date"
              className="w-full px-3 py-2 rounded-lg border border-[#ECECEC]  "
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <p className="text-xs text-gray-500">Original (or most recent date if you&apos;ve renewed)</p>
        </div>

        <div className="space-y-2 md:w-[49%] pt-3">
          <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">Pharmacy NPI Number <span className="text-[#F5E663]">*</span></div>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-lg border border-[#ECECEC] focus:outline-none focus:ring-2 focus:ring-black"
            
          />
           <p className="text-xs text-gray-500">10 digit Facility National Provider Number</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
          <div className="space-y-2">
            <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">Primary DEA Taxonomy Number <span className="text-[#F5E663]">*</span></div>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-[#ECECEC] focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="space-y-2">
            <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">Secondary DEA Taxonomy Number <span className="text-[#F5E663]">*</span></div>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-[#ECECEC] focus:outline-none focus:ring-2 focus:ring-amber-400"
           
            />
             <p className="text-xs text-gray-500">Optional - if applicable</p>
          </div>
        </div>

        <div className='bg-[#ECECEC] h-[1px] my-[40px]' />

        <div className="space-y-2 pt-5 md:w-[49%]">
          <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">NCPDP Number <span className="text-[#F5E663]">*</span></div>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-lg border border-[#ECECEC] focus:outline-none focus:ring-2 focus:ring-black"
          />
          <p className="text-[13px] text-[#515050] opacity-70 text-gray-500">
            National Council for Prescription Drug Programs (NCPDP) Pharmacy Identifier Number
          </p>
        </div>

        <div className="space-y-2 pt-5 md:w-[49%]">
          <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">Pharmacy&apos;s Malpractice Insurance Policy Number <span className="text-[#F5E663]">*</span></div>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-lg border border-[#ECECEC] focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className='bg-[#ECECEC] h-[1px] my-[40px]' />

        <div className="space-y-3 pt-5">
          <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">Is your pharmacy certified with Medicare? <span className="text-[#F5E663]">*</span></div>
          <div className="flex space-x-4">
          <div className="flex space-x-4">
      {["Yes", "No"].map((label, index) => (
        <button
          key={index}
          onClick={() => setActive(label)}
          className={`px-4 py-2 rounded-lg border border-[#ECECEC] transition-all duration-200 
            ${active === label ? "bg-black text-white" : "bg-white text-black border-gray-300"}`}
        >
          {label}
        </button>
      ))}
    </div>
          </div>
          <div className="pl-6 pt-5 text-sm text-gray-500">
            <p className="text-sm md:text-[16px] leading-[26px] font-normal">Medicare-certified can mean:</p>
            <p className="list-disc  text-sm md:text-[16px] leading-[26px] font-normal space-y-1">
              <p>In-network pharmacy - has a contract with a specific Medicare Part D plan</p>
              <p>Medicare Provider - able to bill Medicare directly for services (less common)</p>
            </p>
          </div>
        </div>
        
        <div className='bg-[#ECECEC] h-[1px] my-[50px]' />

        <div className="pt-5  border-gray-200">
          <h2 className="text-xl md:text-[24px] leading-[32px] font-semibold text-[#682D70] mb-4">State Plan Credentialing</h2>
          <div className='bg-[#ECECEC] h-[1px] my-[40px]' />
          <div className="space-y-2 pt-5">
            <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">In what state(s) will you be providing care to patients? <span className="text-[#F5E663]">*</span></div>
            <div className="relative md:w-[49%]" >
              <select
                className="w-full px-3 py-2 rounded-lg border border-[#ECECEC] focus:outline-none focus:ring-2 focus:ring-amber-400 appearance-none"
                value={selectedState}
                onChange={handleStateChange}
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="al">Alabama</option>
                <option value="ak">Alaska</option>
                <option value="az">Arizona</option>
                <option value="ar">Arkansas</option>
                <option value="ca">California</option>
                <option value="co">Colorado</option>
                <option value="ct">Connecticut</option>
                <option value="de">Delaware</option>
                <option value="fl">Florida</option>
                <option value="ga">Georgia</option>
                {/* Add more states as needed */}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500">To select more than one state, hold Control (CTRL) while clicking</p>
          </div>
        </div>
         
        <div className='bg-[#ECECEC] h-[1px] my-[50px]' />

        <div className="flex justify-between pt-6">
            <Link href="/information-materials">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
            Back
          </button>
          </Link>
          <Link href="/pharmacy-ownership">
          <button
            type="submit"
            className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            Submit Now
          </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
