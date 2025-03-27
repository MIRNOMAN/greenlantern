"use client";

import type React from "react";

import { useState, useRef, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner"; // You may need to install this package
import uploadFormData from "@/utils/uploadFormData";
import { useFormSubmitMutation } from "@/redux/pharmacies/Pharmacies";
import { decodeJwtToken } from "@/utils/tokenDecode";

export default function InputForm() {
  const [iRSLetter, setIRSLetter] = useState("");
  const [copyOfYourW9, setcopyOfYourW9] = useState("");
  const [copyOfDEACertificateNumber, setcopyOfDEACertificateNumber] =
    useState("");
  const [copyOfPharmacyLicense, setcopyOfPharmacyLicense] = useState("");

  const [formSubmitHandle, { data, isLoading, isSuccess }] =
    useFormSubmitMutation();
  console.log({ data, isLoading, isSuccess });

  const decodedToken = decodeJwtToken();
  console.log(decodedToken?.id);

  // Form state
  const [formData, setFormData] = useState<{
    userId: string | undefined; // Add userId from decodedToken
    firstName: string;
    lastName: string;
    email: string;
    pharmacyCredentialingPointStatus: string;

    legalInfoName: string;
    doingBusinessAsName: string;
    haveFictitiousBusinessNamePermit: boolean | null;
    pharmacyIncorporated: string;
    stateOfIncorporation: string;
    stateRegistrationOrNumber: string;
    federalTaxID: string;
    IRSLetter: string;
    copyOfYourW9: string;
    haveBusinessLicenseNumber: boolean | null;
    haveWorkersCompensationInsurance: boolean | null;
    pharmacyLegalInformationStatus: string;

    mailingAddressStreet1: string;
    mailingAddressStreet2: string;
    mailingCity: string;
    mailingState: string;
    mailingZipCode5Digit: string;
    mailingZipCode4Digit: string;
    pharmacyMailingAddressStatus: string;

    billingAddressStreet1: string;
    billingAddressStreet2: string;
    billingCity: string;
    billingState: string;
    billingZipCode5Digit: string;
    billingZipCode4Digit: string;
    pharmacyBillingAddressStatus: string;

    pharmacyServiceLocation: string;
    pharmacyBusinessInformationStatus: string;

    pharmacyDEACertificateNumber: string;
    copyOfDEACertificateNumber: string;
    pharmacyLicenseNumber: string;
    copyOfPharmacyLicense: string;
    pharmacyPermitIssueDate: string;
    pharmacyNPINumber: string;
    primaryNPITaxonomyNumber: string;
    secondaryNPITaxonomyNumber: string;
    NCPDPNumber: string;
    pharmacyMalpracticeInsurancePolicyNumber: string;
    isOurHarmacCertifiedWithMedicare: boolean | null;
    pharmacyProfessionalInformationStatus: string;

    providingCareToPatients: string[];
    pharmacyStatePlanCredentialingStatus: string;
    sameAsMailing: boolean;
  }>({
    // Contact information
    userId: decodedToken?.id,
    firstName: "",
    lastName: "",
    email: "",
    pharmacyCredentialingPointStatus: "PENDING",

    // Pharmacy legal information
    legalInfoName: "",
    doingBusinessAsName: "",
    haveFictitiousBusinessNamePermit: null,
    pharmacyIncorporated: "",
    stateOfIncorporation: "",
    stateRegistrationOrNumber: "",
    federalTaxID: "",
    IRSLetter: iRSLetter,
    copyOfYourW9: copyOfYourW9,
    haveBusinessLicenseNumber: null,
    haveWorkersCompensationInsurance: null,
    pharmacyLegalInformationStatus: "PENDING",

    // Mailing address
    mailingAddressStreet1: "",
    mailingAddressStreet2: "",
    mailingCity: "",
    mailingState: "",
    mailingZipCode5Digit: "",
    mailingZipCode4Digit: "",
    pharmacyMailingAddressStatus: "PENDING",

    // Billing address
    billingAddressStreet1: "",
    billingAddressStreet2: "",
    billingCity: "",
    billingState: "",
    billingZipCode5Digit: "",
    billingZipCode4Digit: "",
    pharmacyBillingAddressStatus: "PENDING",

    // Pharmacy business information
    pharmacyServiceLocation: "Retail pharmacy with walk-in services",
    pharmacyBusinessInformationStatus: "IN_PROGRESS",

    // Professional information
    pharmacyDEACertificateNumber: "",
    copyOfDEACertificateNumber: copyOfDEACertificateNumber,
    pharmacyLicenseNumber: "",
    copyOfPharmacyLicense: copyOfPharmacyLicense,
    pharmacyPermitIssueDate: "",
    pharmacyNPINumber: "",
    primaryNPITaxonomyNumber: "",
    secondaryNPITaxonomyNumber: "",
    NCPDPNumber: "",
    pharmacyMalpracticeInsurancePolicyNumber: "",
    isOurHarmacCertifiedWithMedicare: null,
    pharmacyProfessionalInformationStatus: "PENDING",

    providingCareToPatients: [],
    pharmacyStatePlanCredentialingStatus: "PENDING",
    sameAsMailing: false,
  });

  const [date, setDate] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<{
    [key: string]: File | null;
  }>({
    copyOfDEACertificateNumber: null,
    copyOfPharmacyLicense: null,
    IRSLetter: null,
    copyOfYourW9: null,
  });
  console.log(selectedFiles)
  const [isDragging, setIsDragging] = useState<{ [key: string]: boolean }>({
    copyOfDEACertificateNumber: false,
    copyOfPharmacyLicense: false,
    IRSLetter: false,
    copyOfYourW9: false,
  });

  const [selectedState, setSelectedState] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRefs = {
    copyOfDEACertificateNumber: useRef<HTMLInputElement>(null),
    copyOfPharmacyLicense: useRef<HTMLInputElement>(null),
    IRSLetter: useRef<HTMLInputElement>(null),
    copyOfYourW9: useRef<HTMLInputElement>(null),
  };

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;

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
            billingZipCode5Digit: prev.mailingZipCode5Digit,
            billingZipCode4Digit: prev.mailingZipCode4Digit,
            pharmacyBillingAddressStatus: prev.pharmacyMailingAddressStatus,
          };
        } else {
          return {
            ...prev,
            sameAsMailing: false,
            billingAddressStreet1: "",
            billingAddressStreet2: "",
            billingCity: "",
            billingState: "",
            billingZipCode5Digit: "",
            billingZipCode4Digit: "",
            pharmacyBillingAddressStatus: "PENDING",
          };
        }
      });
    } else {
      setFormData((prev) => ({ ...prev, [id]: checked }));
    }
  };

  const handleButtonSelect = (question: string, value: string) => {
    if (value === "Yes") {
      setFormData((prev) => ({ ...prev, [question]: true }));
    } else if (value === "No") {
      setFormData((prev) => ({ ...prev, [question]: false }));
    } else {
      setFormData((prev) => ({ ...prev, [question]: value }));
    }
  };

  // Handle file changes
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData();

      formData.append("file", e.target.files[0]);

      const url = await uploadFormData(formData);
      setter(url);
    }
  };

  const handleBrowseClick = (type: string) => {
    fileInputRefs[type as keyof typeof fileInputRefs].current?.click();
  };

  const handleDragEnter = (
    e: React.DragEvent<HTMLDivElement>,
    type: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging((prev) => ({
      ...prev,
      [type]: true,
    }));
  };

  const handleDragLeave = (
    e: React.DragEvent<HTMLDivElement>,
    type: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging((prev) => ({
      ...prev,
      [type]: false,
    }));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, type: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging((prev) => ({
      ...prev,
      [type]: false,
    }));

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFiles((prev) => ({
        ...prev,
        [type]: e.dataTransfer.files[0],
      }));
      setFormData((prev) => ({ ...prev, [type]: e.dataTransfer.files![0] }));
    }
  };

  const stateAbbreviationToName: { [key: string]: string } = {
    AL: "Alabama",
    AK: "Alaska",
    AZ: "Arizona",
    AR: "Arkansas",
    CA: "California",
    CO: "Colorado",
    CT: "Connecticut",
    DE: "Delaware",
    FL: "Florida",
    GA: "Georgia",
    // Add all states
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
    const stateName = stateAbbreviationToName[e.target.value] || e.target.value;

    // Add to the states array if not already included
    if (!formData.providingCareToPatients.includes(stateName)) {
      setFormData((prev) => ({
        ...prev,
        providingCareToPatients: [...prev.providingCareToPatients, stateName],
      }));
    }
  };

  // Form submission handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create the data object to match the expected format
      const dataToSend = {
        userId: decodedToken?.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        pharmacyCredentialingPointStatus:
          formData.pharmacyCredentialingPointStatus,
        IRSLetter: iRSLetter,
        copyOfYourW9: copyOfYourW9,
        legalInfoName: formData.legalInfoName,
        doingBusinessAsName: formData.doingBusinessAsName,
        haveFictitiousBusinessNamePermit:
          formData.haveFictitiousBusinessNamePermit,
        pharmacyIncorporated: formData.pharmacyIncorporated,
        stateOfIncorporation: formData.stateOfIncorporation,
        stateRegistrationOrNumber: formData.stateRegistrationOrNumber,
        federalTaxID: formData.federalTaxID,
        haveBusinessLicenseNumber: formData.haveBusinessLicenseNumber,
        haveWorkersCompensationInsurance:
          formData.haveWorkersCompensationInsurance,
        pharmacyLegalInformationStatus: formData.pharmacyLegalInformationStatus,
        copyOfDEACertificateNumber: copyOfDEACertificateNumber,
        copyOfPharmacyLicense: copyOfPharmacyLicense,

        mailingAddressStreet1: formData.mailingAddressStreet1,
        mailingAddressStreet2: formData.mailingAddressStreet2,
        mailingCity: formData.mailingCity,
        mailingState: formData.mailingState,
        mailingZipCode5Digit: formData.mailingZipCode5Digit,
        mailingZipCode4Digit: formData.mailingZipCode4Digit,
        pharmacyMailingAddressStatus: formData.pharmacyMailingAddressStatus,

        billingAddressStreet1: formData.billingAddressStreet1,
        billingAddressStreet2: formData.billingAddressStreet2,
        billingCity: formData.billingCity,
        billingState: formData.billingState,
        billingZipCode5Digit: formData.billingZipCode5Digit,
        billingZipCode4Digit: formData.billingZipCode4Digit,
        pharmacyBillingAddressStatus: formData.pharmacyBillingAddressStatus,

        pharmacyServiceLocation: formData.pharmacyServiceLocation,
        pharmacyBusinessInformationStatus:
          formData.pharmacyBusinessInformationStatus,

        pharmacyDEACertificateNumber: formData.pharmacyDEACertificateNumber,
        pharmacyLicenseNumber: formData.pharmacyLicenseNumber,
        pharmacyPermitIssueDate: date ? new Date(date).toISOString() : "",
        pharmacyNPINumber: formData.pharmacyNPINumber,
        primaryNPITaxonomyNumber: formData.primaryNPITaxonomyNumber,
        secondaryNPITaxonomyNumber: formData.secondaryNPITaxonomyNumber,
        NCPDPNumber: formData.NCPDPNumber,
        pharmacyMalpracticeInsurancePolicyNumber:
          formData.pharmacyMalpracticeInsurancePolicyNumber,
        isOurHarmacCertifiedWithMedicare:
          formData.isOurHarmacCertifiedWithMedicare,
        pharmacyProfessionalInformationStatus:
          formData.pharmacyProfessionalInformationStatus,

        providingCareToPatients: formData.providingCareToPatients,
        pharmacyStatePlanCredentialingStatus:
          formData.pharmacyStatePlanCredentialingStatus,
      };

      // Use the mutation from Redux toolkit if available

      await formSubmitHandle(dataToSend);

      // Optionally redirect to a success page
      // window.location.href = '/submission-success';
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            Contact information for who is completing this form if
            Scripted&apos;s team has follow-up questions
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
            <label
              htmlFor="legalInfoName"
              className="block text-sm md:text-[16px] leading-[26px] font-normal"
            >
              Pharmacy Legal Name <span className="text-[#F5E663]">*</span>
            </label>
            <input
              id="legalInfoName"
              type="text"
              className="w-full p-2 rounded-lg border border-[#ECECEC] border-gray-300"
              required
              value={formData.legalInfoName}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="doingBusinessAsName"
              className="block text-sm md:text-[16px] leading-[26px] font-normal"
            >
              Doing Business As (DBA) Name
            </label>
            <input
              id="doingBusinessAsName"
              type="text"
              className="w-full p-2 border-gray-300 rounded-lg border border-[#ECECEC]"
              value={formData.doingBusinessAsName}
              onChange={handleInputChange}
            />
            <p className="text-xs text-gray-500">
              If different from Legal Name
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="block text-sm md:text-[16px] leading-[26px] font-normal">
            Do you have a fictitious business name permit?{" "}
            <span className="text-[#F5E663]">*</span>
          </p>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() =>
                handleButtonSelect("haveFictitiousBusinessNamePermit", "Yes")
              }
              className={`px-4 py-2 rounded-lg border border-[#ECECEC] transition-all duration-200 
                ${
                  formData.haveFictitiousBusinessNamePermit === true
                    ? "bg-black text-white"
                    : "bg-white text-black border-gray-300"
                }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() =>
                handleButtonSelect("haveFictitiousBusinessNamePermit", "No")
              }
              className={`px-4 py-2 rounded-lg border border-[#ECECEC] transition-all duration-200 
                ${
                  formData.haveFictitiousBusinessNamePermit === false
                    ? "bg-black text-white"
                    : "bg-white text-black border-gray-300"
                }`}
            >
              No
            </button>
          </div>
        </div>

        <div className="space-y-8 text-sm md:text-[16px] leading-[26px] font-normal text-gray-700">
          <p>
            A fictitious business permit is a legal document that allows a
            business to operate under a name other than the owner&apos;s name in
            states that require it.
          </p>
          <p>
            Other terms used include: assumed name, doing business as (DBA), or
            trade name.
          </p>
          <p>
            The process of adopting an assumed name varies by where you operate,
            but registrations are typically filed with the secretary of state or
            at the county level.
          </p>
        </div>

        <div className="grid md:grid-cols-2 pt-5 gap-4">
          <div className="space-y-1">
            <label
              htmlFor="pharmacyIncorporated"
              className="block text-sm md:text-[16px] leading-[26px] font-normal"
            >
              How is your pharmacy incorporated?{" "}
              <span className="text-[#F5E663]">*</span>
            </label>
            <input
              id="pharmacyIncorporated"
              type="text"
              className="w-full p-2 border-gray-300 rounded-lg border border-[#ECECEC]"
              value={formData.pharmacyIncorporated}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="stateOfIncorporation"
              className="block text-sm md:text-[16px] leading-[26px] font-normal"
            >
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
            <label
              htmlFor="stateRegistrationOrNumber"
              className="block text-sm md:text-[16px] leading-[26px] font-normal"
            >
              State Registration or Corporate Number{" "}
              <span className="text-[#F5E663]">*</span>
            </label>
            <input
              id="stateRegistrationOrNumber"
              type="text"
              className="w-full p-2 border-gray-300 rounded-lg border border-[#ECECEC]"
              value={formData.stateRegistrationOrNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="federalTaxID"
              className="block text-sm md:text-[16px] leading-[26px] font-normal"
            >
              Federal Tax ID/EIN <span className="text-[#F5E663]">*</span>
            </label>
            <input
              id="federalTaxID"
              type="text"
              className="w-full p-2 border-gray-300 rounded-lg border border-[#ECECEC]"
              value={formData.federalTaxID}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-6 pt-8">
          <div className="space-y-1">
            <div className="space-y-2">
              <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">
                Upload copy of the IRS letter with your federal tax ID/EIN{" "}
                <span className="text-[#F5E663]">*</span>
              </div>
              <div
                className={`rounded-lg border border-[#ECECEC] p-6 bg-gray-50 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  isDragging.IRSLetter ? "border-amber-400 bg-amber-50" : ""
                }`}
                onClick={() => handleBrowseClick("IRSLetter")}
                onDragEnter={(e) => handleDragEnter(e, "IRSLetter")}
                onDragLeave={(e) => handleDragLeave(e, "IRSLetter")}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "IRSLetter")}
              >
                <input
                  type="file"
                  className="hidden"
                  ref={fileInputRefs.IRSLetter}
                  onChange={(e) => handleFileChange(e, setIRSLetter)}
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
                <p className="text-sm text-gray-500">
                  Drag and drop files here
                </p>
            
                  <div className="mt-2 text-sm text-amber-600">
                    {iRSLetter}
                  </div>
            
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
                  isDragging.copyOfYourW9 ? "border-amber-400 bg-amber-50" : ""
                }`}
                onClick={() => handleBrowseClick("copyOfYourW9")}
                onDragEnter={(e) => handleDragEnter(e, "copyOfYourW9")}
                onDragLeave={(e) => handleDragLeave(e, "copyOfYourW9")}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "copyOfYourW9")}
              >
                <input
                  type="file"
                  className="hidden"
                  ref={fileInputRefs.copyOfYourW9}
                  onChange={(e) => handleFileChange(e, setcopyOfYourW9)}
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
                <p className="text-sm text-gray-500">
                  Drag and drop files here
                </p>
             
                  <div className="mt-2 text-sm text-amber-600">
                    {copyOfYourW9}
                  </div>
             
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-5">
            <p className="block text-sm md:text-[16px] leading-[26px] font-normal">
              Does your pharmacy have a Business License Number?{" "}
              <span className="text-[#F5E663]">*</span>
            </p>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() =>
                  handleButtonSelect("haveBusinessLicenseNumber", "Yes")
                }
                className={`px-4 py-2 rounded-lg border border-[#ECECEC] transition-all duration-200 
                  ${
                    formData.haveBusinessLicenseNumber === true
                      ? "bg-black text-white"
                      : "bg-white text-black border-gray-300"
                  }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() =>
                  handleButtonSelect("haveBusinessLicenseNumber", "No")
                }
                className={`px-4 py-2 rounded-lg border border-[#ECECEC] transition-all duration-200 
                  ${
                    formData.haveBusinessLicenseNumber === false
                      ? "bg-black text-white"
                      : "bg-white text-black border-gray-300"
                  }`}
              >
                No
              </button>
            </div>
          </div>

          <div className="space-y-2 py-2 text-sm md:text-[16px] leading-[26px] font-normal text-gray-700">
            <p>
              Your pharmacy may not have a business license depending on its
              municipality.
            </p>
          </div>

          <div className="space-y-2">
            <p className="block text-sm md:text-[16px] leading-[26px] font-normal">
              Does your pharmacy have Workers&apos; Compensation Insurance?{" "}
              <span className="text-[#F5E663]">*</span>
            </p>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() =>
                  handleButtonSelect("haveWorkersCompensationInsurance", "Yes")
                }
                className={`px-4 py-2 rounded-lg border border-[#ECECEC] transition-all duration-200 
                  ${
                    formData.haveWorkersCompensationInsurance === true
                      ? "bg-black text-white"
                      : "bg-white text-black border-gray-300"
                  }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() =>
                  handleButtonSelect("haveWorkersCompensationInsurance", "No")
                }
                className={`px-4 py-2 rounded-lg border border-[#ECECEC] transition-all duration-200 
                  ${
                    formData.haveWorkersCompensationInsurance === false
                      ? "bg-black text-white"
                      : "bg-white text-black border-gray-300"
                  }`}
              >
                No
              </button>
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
              <p className="text-[13px] text-[#515050] opacity-70 text-gray-500">
                E.g., 123 Main Street
              </p>
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
              <p className="text-[13px] text-[#515050] opacity-70 text-gray-500">
                E.g., Apt / Unit / Bldg / Suite
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label
                htmlFor="mailingCity"
                className="block text-sm md:text-[16px] leading-[26px] font-normal"
              >
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
              <label
                htmlFor="mailingState"
                className="block text-sm md:text-[16px] leading-[26px] font-normal"
              >
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
              <label
                htmlFor="mailingZipCode5Digit"
                className="block text-sm md:text-[16px] leading-[26px] font-normal"
              >
                Zip Code 5 Digit <span className="text-[#F5E663]">*</span>
              </label>
              <input
                id="mailingZipCode5Digit"
                type="text"
                className="w-full p-2 border-gray-300 rounded-lg border border-[#ECECEC]"
                value={formData.mailingZipCode5Digit}
                onChange={handleInputChange}
                maxLength={5}
              />
              <p className="text-[13px] text-[#515050] opacity-70 text-gray-500">
                5 Digit Zip Code
              </p>
            </div>
            <div className="space-y-1">
              <label
                htmlFor="mailingZipCode4Digit"
                className="block text-sm md:text-[16px] leading-[26px] font-normal"
              >
                Zip Code Plus 4 <span className="text-[#F5E663]">*</span>
              </label>
              <input
                id="mailingZipCode4Digit"
                type="text"
                className="w-full p-2 border-gray-300 rounded-lg border border-[#ECECEC]"
                value={formData.mailingZipCode4Digit}
                onChange={handleInputChange}
                maxLength={4}
              />
              <p className="text-[13px] text-[#515050] opacity-70 text-gray-500">
                Zip Code 4 Additional Digits
              </p>
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
            <label
              htmlFor="sameAddress"
              className="text-sm md:text-[16px] leading-[26px] font-normal"
            >
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
                  <p className="text-[13px] text-[#515050] opacity-70 text-gray-500">
                    E.g., 123 Main Street
                  </p>
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
                  <p className="text-[13px] text-[#515050] opacity-70 text-gray-500">
                    E.g., Apt / Unit / Bldg / Suite
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label
                    htmlFor="billingCity"
                    className="block text-sm md:text-[16px] leading-[26px] font-normal"
                  >
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
                  <label
                    htmlFor="billingState"
                    className="block text-sm md:text-[16px] leading-[26px] font-normal"
                  >
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
                  <label
                    htmlFor="billingZipCode5Digit"
                    className="block text-sm md:text-[16px] leading-[26px] font-normal"
                  >
                    Zip Code 5 Digit <span className="text-[#F5E663]">*</span>
                  </label>
                  <input
                    id="billingZipCode5Digit"
                    type="text"
                    className="w-full p-2 border-gray-300 rounded-lg border border-[#ECECEC]"
                    value={formData.billingZipCode5Digit}
                    onChange={handleInputChange}
                    maxLength={5}
                  />
                  <p className="text-[13px] text-[#515050] opacity-70 text-gray-500">
                    5 Digit Zip Code
                  </p>
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="billingZipCode4Digit"
                    className="block text-sm md:text-[16px] leading-[26px] font-normal"
                  >
                    Zip Code Plus 4 <span className="text-[#F5E663]">*</span>
                  </label>
                  <input
                    id="billingZipCode4Digit"
                    type="text"
                    className="w-full p-2 border-gray-300 rounded-lg border border-[#ECECEC]"
                    value={formData.billingZipCode4Digit}
                    onChange={handleInputChange}
                    maxLength={4}
                  />
                  <p className="text-[13px] text-[#515050] opacity-70 text-gray-500">
                    Zip Code 4 Additional Digits
                  </p>
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
              Do you own or lease/rent your pharmacy&apos;s service location?{" "}
              <span className="text-[#F5E663]">*</span>
            </p>
            <div className="flex space-x-4">
              {["Own", "Lease/Rent"].map((label, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    handleButtonSelect("pharmacyServiceLocation", label)
                  }
                  className={`px-4 py-2 rounded-lg border border-[#ECECEC] transition-all duration-200 
                    ${
                      formData.pharmacyServiceLocation === label
                        ? "bg-black text-white"
                        : "bg-white text-black border-gray-300"
                    }`}
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
            Pharmacy Professional Information{" "}
            <span className="text-[#F5E663]">*</span>
          </h2>
        </div>

        <div className="bg-[#ECECEC] h-[1px] my-[40px]" />

        <div className="pt-2">
          <h3 className="text-xl md:text-[24px] leading-[32px] font-semibold text-[#682D70]">
            DEA Certificate Information{" "}
            <span className="text-[#F5E663]">*</span>
          </h3>
        </div>

        <div className="space-y-4 pt-6">
          <div className="space-y-1 md:w-[49%]">
            <label
              htmlFor="pharmacyDEACertificateNumber"
              className="block text-sm md:text-[16px] leading-[26px] font-normal"
            >
              Pharmacy DEA Certificate Number{" "}
              <span className="text-[#F5E663]">*</span>
            </label>
            <input
              id="pharmacyDEACertificateNumber"
              type="text"
              className="w-full p-2 pt-2 border-gray-300 rounded-lg border border-[#ECECEC]"
              required
              value={formData.pharmacyDEACertificateNumber}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-2 pt-5">
          <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">
            Upload copy of DEA Certificate Number{" "}
            <span className="text-[#F5E663]">*</span>
          </div>
          <div
            className={`rounded-lg border border-[#ECECEC] p-6 bg-gray-50 flex flex-col items-center justify-center cursor-pointer transition-colors ${
              isDragging.copyOfDEACertificateNumber ? "bg-amber-50" : ""
            }`}
            onClick={() => handleBrowseClick("copyOfDEACertificateNumber")}
            onDragEnter={(e) =>
              handleDragEnter(e, "copyOfDEACertificateNumber")
            }
            onDragLeave={(e) =>
              handleDragLeave(e, "copyOfDEACertificateNumber")
            }
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "copyOfDEACertificateNumber")}
          >
            <input
              type="file"
              className="hidden"
              ref={fileInputRefs.copyOfDEACertificateNumber}
              onChange={(e) =>
                handleFileChange(e, setcopyOfDEACertificateNumber)
              }
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
          
              <div className="mt-2 text-sm text-amber-600">
                {copyOfDEACertificateNumber}
              </div>
        
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
            Upload copy of Pharmacy License{" "}
            <span className="text-[#F5E663]">*</span>
          </div>
          <div
            className={`rounded-lg border border-[#ECECEC] p-6 bg-gray-50 flex flex-col items-center justify-center cursor-pointer transition-colors ${
              isDragging.copyOfPharmacyLicense ? "bg-amber-50" : ""
            }`}
            onClick={() => handleBrowseClick("copyOfPharmacyLicense")}
            onDragEnter={(e) => handleDragEnter(e, "copyOfPharmacyLicense")}
            onDragLeave={(e) => handleDragLeave(e, "copyOfPharmacyLicense")}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "copyOfPharmacyLicense")}
          >
            <input
              type="file"
              className="hidden"
              ref={fileInputRefs.copyOfPharmacyLicense}
              onChange={(e) => handleFileChange(e, setcopyOfPharmacyLicense)}
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
           
              <div className="mt-2 text-sm text-amber-600">
                {copyOfPharmacyLicense}
              </div>
         
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
                setDate(e.target.value);
                setFormData((prev) => ({
                  ...prev,
                  pharmacyPermitIssueDate: e.target.value,
                }));
              }}
            />
          </div>
          <p className="text-xs text-gray-500">
            Original (or most recent date if you&apos;ve renewed)
          </p>
        </div>

        <div className="space-y-2 md:w-[49%] pt-3">
          <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">
            Pharmacy NPI Number <span className="text-[#F5E663]">*</span>
          </div>
          <input
            id="pharmacyNPINumber"
            type="text"
            className="w-full px-3 py-2 rounded-lg border border-[#ECECEC] focus:outline-none focus:ring-2 focus:ring-black"
            value={formData.pharmacyNPINumber}
            onChange={handleInputChange}
          />
          <p className="text-xs text-gray-500">
            10 digit Facility National Provider Number
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
          <div className="space-y-2">
            <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">
              Primary DEA Taxonomy Number{" "}
              <span className="text-[#F5E663]">*</span>
            </div>
            <input
              id="primaryNPITaxonomyNumber"
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-[#ECECEC] focus:outline-none focus:ring-2 focus:ring-black"
              value={formData.primaryNPITaxonomyNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">
              Secondary DEA Taxonomy Number{" "}
              <span className="text-[#F5E663]">*</span>
            </div>
            <input
              id="secondaryNPITaxonomyNumber"
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-[#ECECEC] focus:outline-none focus:ring-2 focus:ring-amber-400"
              value={formData.secondaryNPITaxonomyNumber}
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
            id="NCPDPNumber"
            type="text"
            className="w-full px-3 py-2 rounded-lg border border-[#ECECEC] focus:outline-none focus:ring-2 focus:ring-black"
            value={formData.NCPDPNumber}
            onChange={handleInputChange}
          />
          <p className="text-[13px] text-[#515050] opacity-70 text-gray-500">
            National Council for Prescription Drug Programs (NCPDP) Pharmacy
            Identifier Number
          </p>
        </div>

        <div className="space-y-2 pt-5 md:w-[49%]">
          <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">
            Pharmacy&apos;s Malpractice Insurance Policy Number{" "}
            <span className="text-[#F5E663]">*</span>
          </div>
          <input
            id="pharmacyMalpracticeInsurancePolicyNumber"
            type="text"
            className="w-full px-3 py-2 rounded-lg border border-[#ECECEC] focus:outline-none focus:ring-2 focus:ring-black"
            value={formData.pharmacyMalpracticeInsurancePolicyNumber}
            onChange={handleInputChange}
          />
        </div>

        <div className="bg-[#ECECEC] h-[1px] my-[40px]" />

        <div className="space-y-3 pt-5">
          <div className="text-sm md:text-[16px] leading-[26px] font-normal mb-1">
            Is your pharmacy certified with Medicare?{" "}
            <span className="text-[#F5E663]">*</span>
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() =>
                handleButtonSelect("isOurHarmacCertifiedWithMedicare", "Yes")
              }
              className={`px-4 py-2 rounded-lg border border-[#ECECEC] transition-all duration-200 
                ${
                  formData.isOurHarmacCertifiedWithMedicare === true
                    ? "bg-black text-white"
                    : "bg-white text-black border-gray-300"
                }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() =>
                handleButtonSelect("isOurHarmacCertifiedWithMedicare", "No")
              }
              className={`px-4 py-2 rounded-lg border border-[#ECECEC] transition-all duration-200 
                ${
                  formData.isOurHarmacCertifiedWithMedicare === false
                    ? "bg-black text-white"
                    : "bg-white text-black border-gray-300"
                }`}
            >
              No
            </button>
          </div>
          <div className="pl-6 pt-5 text-sm text-gray-500">
            <p className="text-sm md:text-[16px] leading-[26px] font-normal">
              Medicare-certified can mean:
            </p>
            <p className="list-disc text-sm md:text-[16px] leading-[26px] font-normal space-y-1">
              <p>
                In-network pharmacy - has a contract with a specific Medicare
                Part D plan
              </p>
              <p>
                Medicare Provider - able to bill Medicare directly for services
                (less common)
              </p>
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
              In what state(s) will you be providing care to patients?{" "}
              <span className="text-[#F5E663]">*</span>
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
              To select more than one state, hold Control (CTRL) or Command (⌘)
              while clicking
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
  );
}
