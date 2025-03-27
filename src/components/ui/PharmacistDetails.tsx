"use client";

import {
  useGetSinglePharmacyQuery,
  useUpdatePharmaciesMutation,
} from "@/redux/pharmacies/Pharmacies";
import { PharmacyInfo } from "@/types/interface";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";

export function PharmacistDetails({ pharmacyId }: { pharmacyId: string }) {
  // Helper function to get status badge color

  console.log({ pharmacyId });

  const { data, isLoading } = useGetSinglePharmacyQuery(pharmacyId, {
    skip: !pharmacyId,
  });

  const [updatePharmacies, { isLoading: updateLoading }] =
    useUpdatePharmaciesMutation();

  const dynamicData: PharmacyInfo = data?.data;

  const handleAppliedSectionStatus = (field: string, value: string) => {
    console.log({ field, value });
    updatePharmacies({
      id: pharmacyId,
      data: {
        [field]: value,
      },
    });
  };

  const progressSelectStatus = ["PENDING", "IN_PROGRESS", "COMPLETED"];

  return (
    <div>
      <div className="  bg-white  dark:text-black ">
        <div>
          <div className="text-xl font-semibold">Pharmacist Details</div>
        </div>
        {isLoading || updateLoading ? (
          <div>loading</div>
        ) : (
          <div className="space-y-6">
            {/* 1st part */}
            <div className="  w-full ">
              <div className="flex items-center p-6 bg-white rounded-lg shadow-md border border-[#ECECEC]">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex justify-center items-center mr-3">
                  <span role="img" aria-label="hourglass">
                    ⏳
                  </span>
                </div>
                <div>
                  <span className="text-3xl font-semibold">
                    Pending Requests
                  </span>
                  {/* <span className="text-2xl font-bold ml-2">{count}</span> */}
                  <h1 className="text-4xl font-bold ml-2">1714</h1>
                </div>
              </div>
            </div>

            {/* 2nd part */}
            <div className=" mx-auto p-6 bg-white shadow-lg rounded-lg">
              <div className="flex justify-between">
                <h2 className="text-2xl font-semibold text-[#682D70] ">
                  Pharmacy Credentialing Point of Contact
                </h2>
                <div className="">
                  <select
                    value={dynamicData?.pharmacyCredentialingPointStatus}
                    onChange={(e) =>
                      e.target.value &&
                      handleAppliedSectionStatus(
                        "pharmacyCredentialingPointStatus",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full px-4 py-2 border border-[#ECECEC] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#682D70]"
                  >
                    <option value="" disabled>
                      Please select
                    </option>
                    {progressSelectStatus.map((value, index) => (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="text-[14px] text-[#1b1b1b] opacity-80 mb-6">
                Contact information for who is completing this form if
                Scripted&#39;s team has follow-up questions
              </p>
              <div className="space-y-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    First Name <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData?.user?.firstName}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData?.user?.lastName}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData?.user?.email}
                  </p>
                </div>

                {/* {contactRole && (
                <div className="mt-4 text-[14px] text-[#151515] opacity-80">
                  <p>
                    You selected:{" "}
                    <span className="font-semibold">{contactRole}</span>
                  </p>
                </div>
              )} */}
              </div>
            </div>

            {/* 3rd part */}
            <div className=" mx-auto p-6 bg-white shadow-lg rounded-lg">
              <div className="flex justify-between">
                <h2 className="text-2xl font-semibold text-[#682D70] ">
                  Pharmacy Legal Information
                </h2>
                <div className="">
                  <select
                    value={dynamicData?.pharmacyLegalInformationStatus}
                    onChange={(e) =>
                      e.target.value &&
                      handleAppliedSectionStatus(
                        "pharmacyLegalInformationStatus",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full px-4 py-2 border border-[#ECECEC] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#682D70]"
                  >
                    <option value="" disabled>
                      Please select
                    </option>
                    {progressSelectStatus?.map((value, index) => (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Pharmacy Legal Name{" "}
                    <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData.legalInfoName}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Doing Business As (DBA) Name{" "}
                    <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData.doingBusinessAsName}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Do you have a fictitious business name permit?{" "}
                    <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData.haveFictitiousBusinessNamePermit
                      ? "Yes"
                      : "No"}
                  </p>
                </div>

                <p>
                  A fictitious business permit is a legal document that allows a
                  business to operate under a name other than the owner&#39;s
                  name in states that require it.
                </p>
                <p>
                  Other terms used include: assumed name, doing business as
                  (DBA), or trade name.
                </p>
                <p>
                  The process of adopting an assumed name varies by where you
                  operate, but registrations are typically filed with the
                  secretary of state or at the county level. 
                </p>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    How is your pharmacy incorporated?{" "}
                    <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData.pharmacyIncorporated}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    State of Incorporation{" "}
                    <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData.stateOfIncorporation}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    State Registration or Corporate Number{" "}
                    <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData.stateRegistrationOrNumber}
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Federal Tax ID/EIN{" "}
                    <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData.federalTaxID}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Upload copy of the IRS letter with your federal tax ID/EIN{" "}
                    <span className="text-yellow-200">*</span>
                  </label>
                  <div className="border border-[#ECECEC] md:h-[130px] h-[80px] w-[120px] md:w-[200px]">
                    <Image
                      src={dynamicData.IRSLetter}
                      alt="picture"
                      height={600}
                      width={600}
                      className="w-full h-full"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Upload copy of your W9{" "}
                    <span className="text-yellow-200">*</span>
                  </label>
                  <div className="border border-[#ECECEC] md:h-[130px] h-[80px] w-[120px] md:w-[200px]">
                    <Image
                      src={dynamicData.copyOfYourW9}
                      alt="picture"
                      height={600}
                      width={600}
                      className="w-full h-full"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Does your pharmacy have a Business License Number?
                    <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData.haveBusinessLicenseNumber ? "Yes" : "No"}
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Does your pharmacy have Workers&#39; Compensation insurance?
                    <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {"formData.workersCompInsurance"}
                  </p>
                </div>

                {/* {contactRole && (
                <div className="mt-4 text-gray-800">
                  <p>
                    You selected:{" "}
                    <span className="font-semibold">{contactRole}</span>
                  </p>
                </div>
              )} */}
              </div>
            </div>

            {/* 4nd part */}
            <div className=" mx-auto p-6 bg-white shadow-lg rounded-lg">
              <div className="flex justify-between">
                <h2 className="text-2xl font-semibold text-[#682D70] ">
                  Pharmacy Mailing Address
                </h2>
                <div className="">
                  <select
                    value={dynamicData?.pharmacyMailingAddressStatus}
                    onChange={(e) =>
                      e.target.value &&
                      handleAppliedSectionStatus(
                        "pharmacyMailingAddressStatus",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full px-4 py-2 border border-[#ECECEC] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#682D70]"
                  >
                    <option value="" disabled>
                      Please select
                    </option>
                    {progressSelectStatus.map((value, index) => (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Address Street 1 <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData?.mailingAddressStreet1}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Address Street <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData?.mailingAddressStreet2}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    City <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData?.mailingCity}
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    {" "}
                    State<span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData?.mailingState}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Zip Code 5 Digit <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData?.mailingZipCode5Digit}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Zip Code Plus 4 <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData?.mailingZipCode4Digit}
                  </p>
                </div>

                {/* {contactRole && (
                <div className="mt-4 text-[14px] text-[#151515] opacity-80">
                  <p>
                    You selected:{" "}
                    <span className="font-semibold">{contactRole}</span>
                  </p>
                </div>
              )} */}
              </div>
            </div>

            {/* 5nd part */}
            <div className=" mx-auto p-6 bg-white shadow-lg rounded-lg">
              <div className="flex justify-between">
                <h2 className="text-2xl font-semibold text-[#682D70] ">
                  Pharmacy Billing Address
                </h2>
                <div className="">
                  <select
                    value={dynamicData?.pharmacyBillingAddressStatus}
                    onChange={(e) =>
                      e.target.value &&
                      handleAppliedSectionStatus(
                        "pharmacyBillingAddressStatus",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full px-4 py-2 border border-[#ECECEC] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#682D70]"
                  >
                    <option value="" disabled>
                      Please select
                    </option>
                    {progressSelectStatus.map((value, index) => (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Address Street 1 <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData?.billingAddressStreet1}
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Address Street <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData?.billingAddressStreet2}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    City <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData?.billingCity}
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    {" "}
                    State<span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData?.billingState}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Zip Code 5 Digit <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData?.billingZipCode5Digit}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Zip Code Plus 4 <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData?.billingZipCode4Digit}
                  </p>
                </div>

                {/* {contactRole && (
                <div className="mt-4 text-[14px] text-[#151515] opacity-80">
                  <p>
                    You selected:{" "}
                    <span className="font-semibold">{contactRole}</span>
                  </p>
                </div>
              )} */}
              </div>
            </div>

            {/* 6nd part */}
            <div className=" mx-auto p-6 bg-white shadow-lg rounded-lg">
              <div className="flex justify-between">
                <h2 className="text-2xl font-semibold text-[#682D70] ">
                  Pharmacy Business Information
                </h2>
                <div className="">
                  <select
                    value={dynamicData?.pharmacyBusinessInformationStatus}
                    onChange={(e) =>
                      e.target.value &&
                      handleAppliedSectionStatus(
                        "pharmacyBusinessInformationStatus",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full px-4 py-2 border border-[#ECECEC] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#682D70]"
                  >
                    <option value="" disabled>
                      Please select
                    </option>
                    {progressSelectStatus.map((value, index) => (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Do you own or lease/rent your pharmacy&#39;s service
                    location? <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData.pharmacyServiceLocation}
                  </p>
                </div>
                {/* {contactRole && (
                <div className="mt-4 text-[14px] text-[#151515] opacity-80">
                  <p>
                    You selected:{" "}
                    <span className="font-semibold">{contactRole}</span>
                  </p>
                </div>
              )} */}
              </div>
            </div>

            {/* 7rd part */}
            <div className=" mx-auto p-6 bg-white shadow-lg rounded-lg">
              <div className="flex justify-between">
                <h2 className="text-2xl font-semibold text-[#682D70] ">
                  Pharmacy Professional Information
                </h2>
                <div className="">
                  <select
                    value={dynamicData?.pharmacyProfessionalInformationStatus}
                    onChange={(e) =>
                      e.target.value &&
                      handleAppliedSectionStatus(
                        "pharmacyProfessionalInformationStatus",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full px-4 py-2 border border-[#ECECEC] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#682D70]"
                  >
                    <option value="" disabled>
                      Please select
                    </option>
                    {progressSelectStatus.map((value, index) => (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <h2 className="text-2xl font-semibold mb-5 text-[#682D70] ">
                DEA Certificate Information
              </h2>
              <div className="space-y-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Pharmacy DEA Certificate Number{" "}
                    <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData.pharmacyDEACertificateNumber}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-3 text-gray-700">
                    Upload copy of DEA Certificate Number{" "}
                    <span className="text-yellow-200">*</span>
                  </label>
                  <div className="border border-[#ECECEC] md:h-[130px] h-[80px] w-[120px] md:w-[200px]">
                    <Image
                      src={dynamicData.copyOfDEACertificateNumber}
                      alt="picture"
                      height={600}
                      width={600}
                      className="w-full h-full"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Pharmacy License Number{" "}
                    <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData.pharmacyLicenseNumber}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block mb-3 text-sm font-medium text-gray-700">
                    Upload copy of Pharmacy License{" "}
                    <span className="text-yellow-200">*</span>
                  </label>
                  <div className="border border-[#ECECEC] md:h-[130px] h-[80px] w-[120px] md:w-[200px]">
                    <Image
                      src={dynamicData.copyOfPharmacyLicense}
                      alt="picture"
                      height={600}
                      width={600}
                      className=" w-full h-full"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Pharmacy Permit&#39;s Issue Date{" "}
                    <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {formatDate(dynamicData.pharmacyPermitIssueDate)}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Pharmacy NPI Number{" "}
                    <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData.pharmacyNPINumber}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Primary NPI Taxonomy Number{" "}
                    <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData.primaryNPITaxonomyNumber}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Secondary NPI Taxonomy Number{" "}
                    <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData.secondaryNPITaxonomyNumber}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    NCPDP Number <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData.NCPDPNumber}
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Pharmacy&#39;s Malpractice Insurance Policy Number{" "}
                    <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData.pharmacyMalpracticeInsurancePolicyNumber}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Is your pharmacy certified with Medicare?{" "}
                    <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData.isOurHarmacCertifiedWithMedicare
                      ? "Yes"
                      : "No"}
                  </p>
                </div>

                <p className="text-[14px] ">Medicare certified can mean: </p>
                <p className="text-[14px]">
                  In-network pharmacy - has a contract with a specific Medicare
                  Part D plan;
                </p>
                <p className="text-[14px]">
                  Medicare Provider - able to bill Medicare directly for
                  services (less common)
                </p>

                {/* {contactRole && (
                <div className="mt-4 text-gray-800">
                  <p>
                    You selected:{" "}
                    <span className="font-semibold">{contactRole}</span>
                  </p>
                </div>
              )} */}
              </div>
            </div>

            {/* 8nd part */}
            <div className=" mx-auto p-6 bg-white shadow-lg rounded-lg">
              <div className="flex justify-between">
                <h2 className="text-2xl font-semibold text-[#682D70] ">
                  State Plan Credentialing
                </h2>
                <div className="">
                  <select
                    value={dynamicData?.pharmacyStatePlanCredentialingStatus}
                    onChange={(e) =>
                      e.target.value &&
                      handleAppliedSectionStatus(
                        "pharmacyStatePlanCredentialingStatus",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full px-4 py-2 border border-[#ECECEC] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#682D70]"
                  >
                    <option value="" disabled>
                      Please select
                    </option>
                    {progressSelectStatus?.map((value, index) => (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    In what state(s) will you be providing care to patients? *
                    <span className="text-yellow-200">*</span>
                  </label>
                  <p className="text-[14px] text-[#151515] opacity-80">
                    {dynamicData.providingCareToPatients.join(", ")}
                  </p>
                </div>
                {/* {contactRole && (
                <div className="mt-4 text-[14px] text-[#151515] opacity-80">
                  <p>
                    You selected:{" "}
                    <span className="font-semibold">{contactRole}</span>
                  </p>
                </div>
              )} */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
