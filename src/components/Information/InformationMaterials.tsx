"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function InformationMaterials() {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="flex justify-center  md:pt-[160px] p-4">
      <div className="md:max-w-4xl w-full border-none border-[#ECECEC]  bg-[#F9F9F9]  p-8  rounded-lg">
        <h1 className="text-purple-800 text-2xl md:text-[40px] md:leading-[48px] font-semibold mb-4">
          Required information and materials
        </h1>

        <p className="text-[#343333] text-base md:text-[18px] leading-[28px] font-medium  mb-2">
          Make sure to have scanned copies of the following required materials,
          as you will be asked to upload them as part of the application
          process.
        </p>

        <p className="text-[#343333] text-base md:text-[18px] leading-[28px] font-medium  mb-6">
          Gathering these documents can sometimes take a few hours, but it will
          make it easier to complete once you&apos;re ready.
        </p>

        <ul className="space-y-2 mb-6">
          <li className="flex items-start">
            <span className="text-yellow-400 mr-4 w-3 bg-[#F5E663] rounded-full h-3 mt-1"></span>
            <span className="text-[#343333] text-base md:text-[18px] leading-[28px] font-medium ">
              Your pharmacy/company&apos;s articles of incorporation
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-400 mr-4 w-3 bg-[#F5E663] rounded-full h-3 mt-1"></span>
            <span className="text-[#343333] text-base md:text-[18px] leading-[28px] font-medium ">
              Federal Tax ID/EIN (W-9 Form)
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-400 mr-4 w-3 bg-[#F5E663] rounded-full h-3 mt-1"></span>
            <span className="text-[#343333] text-base md:text-[18px] leading-[28px] font-medium ">
              Business License Number issued by the city/local government (if
              you have one)
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-400 mr-4 w-3 bg-[#F5E663] rounded-full h-3 mt-1"></span>
            <span className="text-[#343333] text-base md:text-[18px] leading-[28px] font-medium ">
              Workers&apos; Compensation Insurance (if you have one)
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-400 mr-4 w-3 bg-[#F5E663] rounded-full h-3 mt-1"></span>
            <span className="text-[#343333] text-base md:text-[18px] leading-[28px] font-medium ">
              A copy of your pharmacy&apos;s lease/rental agreement (if
              applicable)
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-400 mr-4 w-3 bg-[#F5E663] rounded-full h-3 mt-1"></span>
            <span className="text-[#343333] text-base md:text-[18px] leading-[28px] font-medium ">
              Pharmacy DEA Certificate Number
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-400 mr-4 w-3 bg-[#F5E663] rounded-full h-3 mt-1"></span>
            <span className="text-[#343333] text-base md:text-[18px] leading-[28px] font-medium ">
              A copy of your pharmacy&apos;s license
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-400 mr-4 w-3 bg-[#F5E663] rounded-full h-3 mt-1"></span>
            <span className="text-[#343333] text-base md:text-[18px] leading-[28px] font-medium ">
              Your pharmacy&apos;s organizational NPI number
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-400 mr-4 w-3 bg-[#F5E663] rounded-full h-3 mt-1"></span>
            <span className="text-[#343333] text-base md:text-[18px] leading-[28px] font-medium ">
              NCPDP Number
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-400 mr-4 w-3 bg-[#F5E663] rounded-full h-3 mt-1"></span>
            <span className="text-[#343333] text-base md:text-[18px] leading-[28px] font-medium ">
              If your pharmacy plans on providing Diabetes Prevention Program
              Services, you would need:
            </span>
          </li>
          <li className="flex items-start ml-6">
            <span className="text-[#343333] text-base md:text-[18px] leading-[28px] font-medium ">
              01. A CDC Recognition Letter/Certificate
            </span>
          </li>
          <li className="flex items-start ml-6">
            <span className="text-[#343333] text-base md:text-[18px] leading-[28px] font-medium ">
              02. A list of peer coaches, and their SSNs, individual NPIs, and
              DOBs
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-400 mr-4 w-3 bg-[#F5E663] rounded-full h-3 mt-1"></span>
            <span className="text-[#343333] text-base md:text-[18px] leading-[28px] font-medium ">
              A copy of your pharmacy&apos;s malpractice insurance policy
            </span>
          </li>
        </ul>

        <div className="bg-white p-4 rounded-lg mb-6">
          <div className="flex items-start mb-3">
            <span className="text-yellow-400 mr-4 w-5 bg-[#F5E663] rounded-full h-5  mt-1"></span>
            <h2 className="font-medium text-base">
              Before you begin: Create account to save progress
            </h2>
          </div>

          <p className="text-[#343333] text-base md:text-[18px] leading-[28px] font-medium  mb-3">
            If you get interrupted or need to stop and gather some of the
            requested information, you have the option to save your place with a
            link that you can copy or email to yourself, but you first have to
            create a platform account to identify you.
          </p>

          <p className="text-[#343333] text-base md:text-[18px] leading-[28px] font-medium  mb-3">
            Clicking the &quot;Save for Later&quot; button should prompt you to
            create an account.
          </p>

          <p className="text-[#343333] text-base md:text-[18px] leading-[28px] font-medium  mb-3">
            If you don&apos;t see this prompt or get an error, try opening the
            form in a new window.
          </p>

          <p className="text-[#343333] text-base md:text-[18px] leading-[28px] font-medium ">
            Once you have an account and are logged in, click the &quot;Save For
            Later&quot; button again any time you&apos;d like to stop and save
            your place.
          </p>
        </div>

        <div className="flex  gap-2 items-center">
          <div className="relative flex items-start">
            <input
              type="checkbox"
              id="consent"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="h-5 w-5 rounded   border-[#DC2626] border  "
            />
          </div>
          <label
            htmlFor="consent"
            className="text-[#343333] text-base md:text-[18px] leading-[28px] font-medium   text-gray-700 cursor-pointer"
          >
            I am ready with the required information and digital/scanned
            materials
          </label>
        </div>
        {!isChecked && (
          <div className=" border w-[170px] mt-3 p-1 bg-red-600 text-white rounded-lg">
            <span className="text-sm  flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
              This field is required.
            </span>
          </div>
        )}

        <div className="flex mt-8 justify-between">
          <Link href={"/credentialing-information"}>
            <button className="border  border-1 bg-white text-black border-yellow-5 00 px-6 py-2 rounded-full">
              Back
            </button>
          </Link>

          <Link href={isChecked ? "/create-form" : "#"}>
            <button
              className={`px-6 py-2 rounded-full ${
                isChecked
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
              disabled={!isChecked}
            >
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
