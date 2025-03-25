"use client"

import type React from "react"

import { useState, useRef, type FormEvent } from "react"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner" // You may need to install this package

export default function InputForm() {
  // Form state
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    pharmacyLegalName: string;
    dbaName: string;
    hasFictitiousBusinessPermit: string | null;
    incorporation: string;
    stateOfIncorporation: string;
    stateRegistration: string;
    federalTaxId: string;
    hasBusinessLicense: string | null;
    hasWorkersCompensation: string | null;
    mailingAddressStreet1: string;
    mailingAddressStreet2: string;
    mailingCity: string;
    mailingState: string;
    mailingZipCode5: string;
    mailingZipCode4: string;
    sameAsMailing: boolean;
    billingAddressStreet1: string;
    billingAddressStreet2: string;
    billingCity: string;
    billingState: string;
    billingZipCode5: string;
    billingZipCode4: string;
    ownershipType: string | null;
    deaCertificateNumber: string;
    pharmacyLicenseNumber: string;
    pharmacyPermitIssueDate: string;
    pharmacyNpiNumber: string;
    primaryDeaTaxonomyNumber: string;
    secondaryDeaTaxonomyNumber: string;
    ncpdpNumber: string;
    malpracticeInsuranceNumber: string;
    isMedicareCertified: string | null;
    statesProvidingCare: string[];
  }>({
    // Contact information
    firstName: "",
    lastName: "",
    email: "",

    // Pharmacy legal information
    pharmacyLegalName: "",
    dbaName: "",
    hasFictitiousBusinessPermit: null,
    incorporation: "",
    stateOfIncorporation: "",
    stateRegistration: "",
    federalTaxId: "",

    // Business information
    hasBusinessLicense: null,
    hasWorkersCompensation: null,

    // Mailing address
    mailingAddressStreet1: "",
    mailingAddressStreet2: "",
    mailingCity: "",
    mailingState: "",
    mailingZipCode5: "",
    mailingZipCode4: "",

    // Billing address
    sameAsMailing: false,
    billingAddressStreet1: "",
    billingAddressStreet2: "",
    billingCity: "",
    billingState: "",
    billingZipCode5: "",
    billingZipCode4: "",

    // Pharmacy business information
    ownershipType: null,

    // Professional information
    deaCertificateNumber: "",
    pharmacyLicenseNumber: "",
    pharmacyPermitIssueDate: "",
    pharmacyNpiNumber: "",
    primaryDeaTaxonomyNumber: "",
    secondaryDeaTaxonomyNumber: "",
    ncpdpNumber: "",
    malpracticeInsuranceNumber: "",
    isMedicareCertified: null,

    // State plan credentialing
    statesProvidingCare: [],
  })

  const [date, setDate] = useState<string>("")
  const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: File | null }>({
    dea: null,
    license: null,
    irsLetter: null,
    w9: null,
  })
  const [isDragging, setIsDragging] = useState<{ [key: string]: boolean }>({
    dea: false,
    license: false,
    irsLetter: false,
    w9: false,
  })

  const [selectedState, setSelectedState] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [active, setActive] = useState<string>("")



  const fileInputRefs = {
    dea: useRef<HTMLInputElement>(null),
    license: useRef<HTMLInputElement>(null),
    irsLetter: useRef<HTMLInputElement>(null),
    w9: useRef<HTMLInputElement>(null),
  }

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target

    if (id === "sameAddress") {
      setFormData((prev) => {
        if (checked) {
          return {
            ...prev,
            sameAsMailing: true,
            billingAddressStreet1: prev.mailingAddressStreet1,
            billingAddressStreet2: prev.mailingAddressStreet2,
            billingCity: prev.mailingCity,
            billingState: prev.mailingState,
            billingZipCode5: prev.mailingZipCode5,
            billingZipCode4: prev.mailingZipCode4,
          }
        } else {
          return {
            ...prev,
            sameAsMailing: false,
          }
        }
      })
    } else {
      setFormData((prev) => ({ ...prev, [id]: checked }))
    }
  }

  // Handle button selection (Yes/No questions)
  const handleButtonSelect = (question: string, value: string) => {
    setActive(value)
    setFormData((prev) => ({ ...prev, [question]: value }))
  }

  // Handle file changes
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

    // Add to the states array if not already included
    if (!formData.statesProvidingCare.includes(e.target.value)) {
      setFormData((prev) => ({
        ...prev,
        statesProvidingCare: [...prev.statesProvidingCare, e.target.value],
      }))
    }
  }

  // Form submission handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create FormData object for file uploads
      const formDataToSend = new FormData()

      // Add all form fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          // Handle arrays (like statesProvidingCare)
          value.forEach((item) => formDataToSend.append(`${key}[]`, item))
        } else if (value !== null) {
          formDataToSend.append(key, String(value))
        }
      })

      // Add files to FormData if they exist
      Object.entries(selectedFiles).forEach(([key, file]) => {
        if (file) {
          formDataToSend.append(key, file)
        }
      })

      // Add date field
      if (date) {
        formDataToSend.append("pharmacyPermitIssueDate", date)
      }

      // Send data to the API
      const response = await fetch("http://10.0.10.65:4563/api/v1/users/upload", {
        method: "POST",
        body: formDataToSend,
        // Don't set Content-Type header when using FormData, the browser will set it with the boundary
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const result = await response.json()
      toast.success("Form submitted successfully!")
      console.log("Submission successful:", result)

      // Optionally redirect to a success page
      // window.location.href = '/submission-success'
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Failed to submit form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="md:max-w-5xl mx-auto md:my-[140px] py-[90px] border-none border-[#ECECEC] bg-[#F9F9F9] p-8 rounded-lg"
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-xl md:text-[24px] leading-[32px] font-semibold text-[#682D70]">
            Pharmacy Credentialing Point of Contact
          </h1>
          <p className="text-sm md:text-[16px] leading-[26px] font-normal mt-1">
            Contact information for who is completing this form if Scripted&apos;s team has follow-up questions
          </p>
        </div>

        <div className="bg-[#ECECEC] h-[1px] my-[40px]" />

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-sm font-medium">
              First Name <span className="text-[#F5E663]">*</span>
            </label>
            <input
              id="firstName"
              type="text"
              className="w-full p-2 border border-[#ECECEC] border-gray-300 rounded-lg"
              required
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="block text-sm font-medium">
              Last Name <span className="text-[#F5E663]">*</span>
            </label>
            <input
              id="lastName"
              type="text"
              className="w-full p-2 border border-[#ECECEC] rounded-lg border-gray-300"
              required
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-2 md:w-[49%]">
          <label htmlFor="email" className="block text-sm font-medium">
            Email <span className="text-[#F5E663]">*</span>
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-2 rounded-lg border border-[#ECECEC] border-gray-300"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="bg-[#ECECEC] h-[1px] my-[40px]" />

        <div className="pt-4">
          <h2 className="text-xl md:text-[24px] leading-[32px] font-semibold text-[#682D70]">
            Pharmacy Legal Information
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="pharmacyLegalName" className="block text-sm md:text-[16px] leading-[26px] font-normal">
              Pharmacy Legal Name <span className="text-[#F5E663]">*</span>
            </label>
            <input
              id="pharmacyLegalName"
              type="text"
              className="w-full p-2 rounded-lg border border-[#ECECEC] border-gray-300"
              required
              value={formData.pharmacyLegalName}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="dbaName" className="block text-sm md:text-[16px] leading-[26px] font-normal">
              Doing Business As (DBA) Name
            </label>
            <input
              id="dbaName"
              type="text"
              className="w-full p-2 border-gray-300 rounded-lg border border-[#ECECEC]"
              value={formData.dbaName}
              onChange={handleInputChange}
            />
            <p className="text-xs text-gray-500">If different from Legal Name</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="block text-sm md:text-[16px] leading-[26px] font-normal">
            Do you have a fictitious business name permit? <span className="text-[#F5E663]">*</span>
          </p>
          <div className="flex space-x-4">
            {["Yes", "No"].map((label, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleButtonSelect("hasFictitiousBusinessPermit", label)}
                className={`px-4 py-2 rounded-lg border border-[#ECECEC] transition-all duration-200 
                  ${formData.hasFictitiousBusinessPermit === label ? "bg-black text-white" : "bg-white text-black border-gray-300"}`}
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
            <input
              id="incorporation"
              type="text"
              className="w-full p-2 border-gray-300 rounded-lg border border-[#ECECEC]"
              value={formData.incorporation}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="stateOfIncorporation" className="block text-sm md:text-[16px] leading-[26px] font-normal">
              State of Incorporation <span className="text-[#F5E663]">*</span>
            </label>
            <div className="relative">
              <select
                id="stateOfIncorporation"
                className="w-full p-2 rounded-lg border border-[#ECECEC] border-gray-300 appearance-none pr-8"
                value={formData.stateOfIncorporation}
                onChange={handleInputChange}
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
            <input
              id="stateRegistration"
              type="text"
              className="w-full p-2 border-gray-300 rounded-lg border border-[#ECECEC]"
              value={formData.stateRegistration}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="federalTaxId" className="block text-sm md:text-[16px] leading-[26px] font-normal">
              Federal Tax ID/EIN <span className="text-[#F5E663]">*</span>
            </label>
            <input
              id="federalTaxId"
              type="text"
              className="w-full p-2 border-gray-300 rounded-lg border border-[#ECECEC]"
              value={formData.federalTaxId}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-6 pt-8">
          <div className="space-y-1">
            <div className="space-y-2">
              <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">
                Upload copy of the IRS letter with your federal tax ID/EIN <span className="text-[#F5E663]">*</span>
              </div>
              <div
                className={`rounded-lg border border-[#ECECEC] p-6 bg-gray-50 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  isDragging.irsLetter ? "border-amber-400 bg-amber-50" : ""
                }`}
                onClick={() => handleBrowseClick("irsLetter")}
                onDragEnter={(e) => handleDragEnter(e, "irsLetter")}
                onDragLeave={(e) => handleDragLeave(e, "irsLetter")}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "irsLetter")}
              >
                <input
                  type="file"
                  className="hidden"
                  ref={fileInputRefs.irsLetter}
                  onChange={(e) => handleFileChange(e, "irsLetter")}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <div className="w-10 h-10 border border-[#ECECEC] rounded-full bg-amber-50 flex items-center justify-center mb-2">
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
                {selectedFiles.irsLetter && (
                  <div className="mt-2 text-sm text-amber-600">{selectedFiles.irsLetter.name}</div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-1 mt-4">
            <div className="space-y-2">
              <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">
                Upload copy of your W9 <span className="text-[#F5E663]">*</span>
              </div>
              <div
                className={`rounded-lg border border-[#ECECEC] p-6 bg-gray-50 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  isDragging.w9 ? "border-amber-400 bg-amber-50" : ""
                }`}
                onClick={() => handleBrowseClick("w9")}
                onDragEnter={(e) => handleDragEnter(e, "w9")}
                onDragLeave={(e) => handleDragLeave(e, "w9")}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "w9")}
              >
                <input
                  type="file"
                  className="hidden"
                  ref={fileInputRefs.w9}
                  onChange={(e) => handleFileChange(e, "w9")}
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
                {selectedFiles.w9 && <div className="mt-2 text-sm text-amber-600">{selectedFiles.w9.name}</div>}
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-5">
            <p className="block text-sm md:text-[16px] leading-[26px] font-normal">
              Does your pharmacy have a Business License Number? <span className="text-[#F5E663]">*</span>
            </p>
            <div className="flex space-x-4">
              {["Yes", "No"].map((label, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleButtonSelect("hasBusinessLicense", label)}
                  className={`px-4 py-2 rounded-lg border border-[#ECECEC] transition-all duration-200 
                    ${formData.hasBusinessLicense === label ? "bg-black text-white" : "bg-white text-black border-gray-300"}`}
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
            <p className="block text-sm md:text-[16px] leading-[26px] font-normal">
              Does your pharmacy have Workers&apos; Compensation Insurance? <span className="text-[#F5E663]">*</span>
            </p>
            <div className="flex space-x-4">
              {["Yes", "No"].map((label, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleButtonSelect("hasWorkersCompensation", label)}
                  className={`px-4 py-2 rounded-lg border border-[#ECECEC] transition-all duration-200 
                    ${formData.hasWorkersCompensation === label ? "bg-black text-white" : "bg-white text-black border-gray-300"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#ECECEC] h-[1px] my-[40px]" />

          <div className="pt-4">
            <h2 className="text-xl md:text-[24px] leading-[32px] font-semibold text-[#682D70]">
              Pharmacy Mailing Address
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label
                htmlFor="mailingAddressStreet1"
                className="block text-sm md:text-[16px] leading-[26px] font-normal"
              >
                Address Street 1 <span className="text-[#F5E663]">*</span>
              </label>
              <input
                id="mailingAddressStreet1"
                type="text"
                className="w-full p-2 border-gray-300 rounded-lg border border-[#ECECEC]"
                value={formData.mailingAddressStreet1}
                onChange={handleInputChange}
              />
              <p className="text-[13px] text-[#515050] opacity-70 text-gray-500">E.g., 123 Main Street</p>
            </div>
            <div className="space-y-1">
              <label
                htmlFor="mailingAddressStreet2"
                className="block text-sm md:text-[16px] leading-[26px] font-normal"
              >
                Address Street 2 <span className="text-[#F5E663]">*</span>
              </label>
              <input
                id="mailingAddressStreet2"
                type="text"
                className="w-full p-2 rounded-lg border border-[#ECECEC] border-gray-300"
                value={formData.mailingAddressStreet2}
                onChange={handleInputChange}
              />
              <p className="text-[13px] text-[#515050] opacity-70 text-gray-500">E.g., Apt / Unit / Bldg / Suite</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="mailingCity" className="block text-sm md:text-[16px] leading-[26px] font-normal">
                City <span className="text-[#F5E663]">*</span>
              </label>
              <input
                id="mailingCity"
                type="text"
                className="w-full p-2 border-gray-300 rounded-lg border border-[#ECECEC]"
                value={formData.mailingCity}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="mailingState" className="block text-sm md:text-[16px] leading-[26px] font-normal">
                State <span className="text-[#F5E663]">*</span>
              </label>
              <div className="relative">
                <select
                  id="mailingState"
                  className="w-full p-2 rounded-lg border border-[#ECECEC] border-gray-300 appearance-none pr-8"
                  value={formData.mailingState}
                  onChange={handleInputChange}
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
              <label htmlFor="mailingZipCode5" className="block text-sm md:text-[16px] leading-[26px] font-normal">
                Zip Code 5 Digit <span className="text-[#F5E663]">*</span>
              </label>
              <input
                id="mailingZipCode5"
                type="text"
                className="w-full p-2 border-gray-300 rounded-lg border border-[#ECECEC]"
                value={formData.mailingZipCode5}
                onChange={handleInputChange}
                maxLength={5}
              />
              <p className="text-[13px] text-[#515050] opacity-70 text-gray-500">5 Digit Zip Code</p>
            </div>
            <div className="space-y-1">
              <label htmlFor="mailingZipCode4" className="block text-sm md:text-[16px] leading-[26px] font-normal">
                Zip Code Plus 4 <span className="text-[#F5E663]">*</span>
              </label>
              <input
                id="mailingZipCode4"
                type="text"
                className="w-full p-2 border-gray-300 rounded-lg border border-[#ECECEC]"
                value={formData.mailingZipCode4}
                onChange={handleInputChange}
                maxLength={4}
              />
              <p className="text-[13px] text-[#515050] opacity-70 text-gray-500">Zip Code 4 Additional Digits</p>
            </div>
          </div>
        </div>

        <div className="bg-[#ECECEC] h-[1px] my-[40px]" />

        <div className="pt-4">
          <h2 className="text-xl md:text-[24px] leading-[32px] font-semibold text-[#682D70]">
            Pharmacy Billing Address
          </h2>
        </div>

        <div className="bg-[#ECECEC] h-[1px] my-[40px]" />

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              id="sameAddress"
              type="checkbox"
              className="mr-2 h-4 w-4"
              checked={formData.sameAsMailing}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="sameAddress" className="text-sm md:text-[16px] leading-[26px] font-normal">
              Pharmacy Billing Address is the same as Pharmacy Mailing Address
            </label>
          </div>

          {!formData.sameAsMailing && (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label
                    htmlFor="billingAddressStreet1"
                    className="block text-sm md:text-[16px] leading-[26px] font-normal"
                  >
                    Address Street 1 <span className="text-[#F5E663]">*</span>
                  </label>
                  <input
                    id="billingAddressStreet1"
                    type="text"
                    className="w-full p-2 border-gray-300 rounded-lg border border-[#ECECEC]"
                    value={formData.billingAddressStreet1}
                    onChange={handleInputChange}
                  />
                  <p className="text-[13px] text-[#515050] opacity-70 text-gray-500">E.g., 123 Main Street</p>
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="billingAddressStreet2"
                    className="block text-sm md:text-[16px] leading-[26px] font-normal"
                  >
                    Address Street 2 <span className="text-[#F5E663]">*</span>
                  </label>
                  <input
                    id="billingAddressStreet2"
                    type="text"
                    className="w-full p-2 rounded-lg border border-[#ECECEC] border-gray-300"
                    value={formData.billingAddressStreet2}
                    onChange={handleInputChange}
                  />
                  <p className="text-[13px] text-[#515050] opacity-70 text-gray-500">E.g., Apt / Unit / Bldg / Suite</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="billingCity" className="block text-sm md:text-[16px] leading-[26px] font-normal">
                    City <span className="text-[#F5E663]">*</span>
                  </label>
                  <input
                    id="billingCity"
                    type="text"
                    className="w-full p-2 border-gray-300 rounded-lg border border-[#ECECEC]"
                    value={formData.billingCity}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="billingState" className="block text-sm md:text-[16px] leading-[26px] font-normal">
                    State <span className="text-[#F5E663]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="billingState"
                      className="w-full p-2 rounded-lg border border-[#ECECEC] border-gray-300 appearance-none pr-8"
                      value={formData.billingState}
                      onChange={handleInputChange}
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
                  <label htmlFor="billingZipCode5" className="block text-sm md:text-[16px] leading-[26px] font-normal">
                    Zip Code 5 Digit <span className="text-[#F5E663]">*</span>
                  </label>
                  <input
                    id="billingZipCode5"
                    type="text"
                    className="w-full p-2 border-gray-300 rounded-lg border border-[#ECECEC]"
                    value={formData.billingZipCode5}
                    onChange={handleInputChange}
                    maxLength={5}
                  />
                  <p className="text-[13px] text-[#515050] opacity-70 text-gray-500">5 Digit Zip Code</p>
                </div>
                <div className="space-y-1">
                  <label htmlFor="billingZipCode4" className="block text-sm md:text-[16px] leading-[26px] font-normal">
                    Zip Code Plus 4 <span className="text-[#F5E663]">*</span>
                  </label>
                  <input
                    id="billingZipCode4"
                    type="text"
                    className="w-full p-2 border-gray-300 rounded-lg border border-[#ECECEC]"
                    value={formData.billingZipCode4}
                    onChange={handleInputChange}
                    maxLength={4}
                  />
                  <p className="text-[13px] text-[#515050] opacity-70 text-gray-500">Zip Code 4 Additional Digits</p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="bg-[#ECECEC] h-[1px] my-[40px]" />

        <div className="pt-4">
          <h2 className="text-xl md:text-[24px] leading-[32px] font-semibold text-[#682D70]">
            Pharmacy Business Information
          </h2>
        </div>

        <div className="bg-[#ECECEC] h-[1px] my-[40px]" />

        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <p className="block text-sm md:text-[16px] leading-[26px] font-normal">
              Do you own or lease/rent your pharmacy&apos;s service location? <span className="text-[#F5E663]">*</span>
            </p>
            <div className="flex space-x-4">
              {["Own", "Lease/Rent"].map((label, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleButtonSelect("ownershipType", label)}
                  className={`px-4 py-2 rounded-lg border border-[#ECECEC] transition-all duration-200 
                    ${formData.ownershipType === label ? "bg-black text-white" : "bg-white text-black border-gray-300"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#ECECEC] h-[1px] my-[40px]" />

        <div className="pt-4">
          <h2 className="text-xl md:text-[24px] leading-[32px] font-semibold text-[#682D70]">
            Pharmacy Professional Information <span className="text-[#F5E663]">*</span>
          </h2>
        </div>

        <div className="bg-[#ECECEC] h-[1px] my-[40px]" />

        <div className="pt-2">
          <h3 className="text-xl md:text-[24px] leading-[32px] font-semibold text-[#682D70]">
            DEA Certificate Information <span className="text-[#F5E663]">*</span>
          </h3>
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
              value={formData.deaCertificateNumber}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-2 pt-5">
          <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">
            Upload copy of DEA Certificate Number <span className="text-[#F5E663]">*</span>
          </div>
          <div
            className={`rounded-lg border border-[#ECECEC] p-6 bg-gray-50 flex flex-col items-center justify-center cursor-pointer transition-colors ${
              isDragging.dea ? "bg-amber-50" : ""
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
          <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">
            Pharmacy License Number <span className="text-[#F5E663]">*</span>
          </div>
          <input
            id="pharmacyLicenseNumber"
            type="text"
            className="w-full px-3 py-2 rounded-lg border border-[#ECECEC] focus:outline-none focus:ring-2 focus:ring-black"
            value={formData.pharmacyLicenseNumber}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">
            Upload copy of Pharmacy License <span className="text-[#F5E663]">*</span>
          </div>
          <div
            className={`rounded-lg border border-[#ECECEC] p-6 bg-gray-50 flex flex-col items-center justify-center cursor-pointer transition-colors ${
              isDragging.license ? "bg-amber-50" : ""
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
          <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">
            Pharmacy Permit Issue Date <span className="text-[#F5E663]">*</span>
          </div>
          <div className="relative">
            <input
              type="date"
              id="pharmacyPermitIssueDate"
              className="w-full px-3 py-2 rounded-lg border border-[#ECECEC]"
              value={date}
              onChange={(e) => {
                setDate(e.target.value)
                setFormData((prev) => ({ ...prev, pharmacyPermitIssueDate: e.target.value }))
              }}
            />
          </div>
          <p className="text-xs text-gray-500">Original (or most recent date if you&apos;ve renewed)</p>
        </div>

        <div className="space-y-2 md:w-[49%] pt-3">
          <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">
            Pharmacy NPI Number <span className="text-[#F5E663]">*</span>
          </div>
          <input
            id="pharmacyNpiNumber"
            type="text"
            className="w-full px-3 py-2 rounded-lg border border-[#ECECEC] focus:outline-none focus:ring-2 focus:ring-black"
            value={formData.pharmacyNpiNumber}
            onChange={handleInputChange}
          />
          <p className="text-xs text-gray-500">10 digit Facility National Provider Number</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
          <div className="space-y-2">
            <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">
              Primary DEA Taxonomy Number <span className="text-[#F5E663]">*</span>
            </div>
            <input
              id="primaryDeaTaxonomyNumber"
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-[#ECECEC] focus:outline-none focus:ring-2 focus:ring-black"
              value={formData.primaryDeaTaxonomyNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">
              Secondary DEA Taxonomy Number <span className="text-[#F5E663]">*</span>
            </div>
            <input
              id="secondaryDeaTaxonomyNumber"
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-[#ECECEC] focus:outline-none focus:ring-2 focus:ring-amber-400"
              value={formData.secondaryDeaTaxonomyNumber}
              onChange={handleInputChange}
            />
            <p className="text-xs text-gray-500">Optional - if applicable</p>
          </div>
        </div>

        <div className="bg-[#ECECEC] h-[1px] my-[40px]" />

        <div className="space-y-2 pt-5 md:w-[49%]">
          <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">
            NCPDP Number <span className="text-[#F5E663]">*</span>
          </div>
          <input
            id="ncpdpNumber"
            type="text"
            className="w-full px-3 py-2 rounded-lg border border-[#ECECEC] focus:outline-none focus:ring-2 focus:ring-black"
            value={formData.ncpdpNumber}
            onChange={handleInputChange}
          />
          <p className="text-[13px] text-[#515050] opacity-70 text-gray-500">
            National Council for Prescription Drug Programs (NCPDP) Pharmacy Identifier Number
          </p>
        </div>

        <div className="space-y-2 pt-5 md:w-[49%]">
          <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">
            Pharmacy&apos;s Malpractice Insurance Policy Number <span className="text-[#F5E663]">*</span>
          </div>
          <input
            id="malpracticeInsuranceNumber"
            type="text"
            className="w-full px-3 py-2 rounded-lg border border-[#ECECEC] focus:outline-none focus:ring-2 focus:ring-black"
            value={formData.malpracticeInsuranceNumber}
            onChange={handleInputChange}
          />
        </div>

        <div className="bg-[#ECECEC] h-[1px] my-[40px]" />

        <div className="space-y-3 pt-5">
          <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">
            Is your pharmacy certified with Medicare? <span className="text-[#F5E663]">*</span>
          </div>
          <div className="flex space-x-4">
            {["Yes", "No"].map((label, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleButtonSelect("isMedicareCertified", label)}
                className={`px-4 py-2 rounded-lg border border-[#ECECEC] transition-all duration-200 
                  ${formData.isMedicareCertified === label ? "bg-black text-white" : "bg-white text-black border-gray-300"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="pl-6 pt-5 text-sm text-gray-500">
            <p className="text-sm md:text-[16px] leading-[26px] font-normal">Medicare-certified can mean:</p>
            <p className="list-disc text-sm md:text-[16px] leading-[26px] font-normal space-y-1">
              <p>In-network pharmacy - has a contract with a specific Medicare Part D plan</p>
              <p>Medicare Provider - able to bill Medicare directly for services (less common)</p>
            </p>
          </div>
        </div>

        <div className="bg-[#ECECEC] h-[1px] my-[50px]" />

        <div className="pt-5 border-gray-200">
      <h2 className="text-xl md:text-[24px] leading-[32px] font-semibold text-[#682D70] mb-4">
        State Plan Credentialing
      </h2>
      <div className="bg-[#ECECEC] h-[1px] my-[40px]" />
      <div className="space-y-2 pt-5">
        <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">
          In what state(s) will you be providing care to patients? <span className="text-[#F5E663]">*</span>
        </div>
        <div className="relative md:w-[49%]">
          <select
            className="w-full px-3 py-2 rounded-lg border border-[#ECECEC] focus:outline-none"
            value={selectedState}
            onChange={handleStateChange}
          
          >
            <option value="" disabled>
              Please select
            </option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            {/* Add more states as needed */}
          </select>
        </div>
        <p className="text-xs text-gray-500">
          To select more than one state, hold Control (CTRL) or Command (⌘) while clicking
        </p>
      </div>
    </div>

        <div className="bg-[#ECECEC] h-[1px] my-[50px]" />

        <div className="flex justify-between pt-6">
          <Link href="/information-materials">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              Back
            </button>
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Now"}
          </button>
        </div>
      </div>
    </form>
  )
}

