import Image from 'next/image'
import React from 'react'
import choose_icon from "@/assets/icons/Frame (3).png"
import Link from 'next/link'

export default function CredentialingInformations() {
  return (
    <div className="flex justify-center md:pt-[140px] pt-[70px] items-center min-h-screen bg-white p-4">
    <div className="w-full max-w-4xl border-none border-[#ECECEC]  bg-[#F9F9F9]  p-8 rounded-md">
      <h1 className="text-purple-800 text-2xl md:text-[40px] md:leading-[48px] font-semibold mb-4">
        Scripted Pharmacy Facility Credentialing Information
      </h1>

      <p className="text-[#343333] text-base md:text-[18px] leading-[28px] font-medium  mb-6">
        Secure form to capture information that will enable Scripted to credential a pharmacy facility with medical
        billing payer / insurance contracts. In most cases a pharmacy administrator or owner will be completing this
        form.
      </p>

      <div className='bg-[#ECECEC] h-[1px] my-[40px]' />

      <div className="space-y-6">
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-5 h-5 rounded-full  flex items-center justify-center mt-1">
          <div className="w-6 h-6 rounded-full  flex items-center justify-center flex-shrink-0">
              <Image
               src={choose_icon}
                alt="Client 1"
                width={700}
                height={700}
                className="rounded-full"
              />
            </div>
          </div>
          <p className="text-[#343333] text-base md:text-[18px] leading-[28px] font-medium">
            You will be asked to provide information and upload documentation required for pharmacy credentialing for
            general payers and also state-specific payers based on where you are operating.
          </p>
        </div>

        <div className="flex gap-3">
          <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-1">
          <div className="w-6 h-6 rounded-full  flex items-center justify-center flex-shrink-0">
              <Image
               src={choose_icon}
                alt="Client 1"
                width={700}
                height={700}
                className="rounded-full"
              />
            </div>
          </div>
          <p className="text-[#343333] text-base md:text-[18px] leading-[28px] font-medium">
            We recommend you complete this form on a computer for the best experience
          </p>
        </div>

        <div className='bg-[#ECECEC] h-[1px] my-[40px]' />

        <div className="flex gap-3">
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-yellow-300 flex items-center justify-center mt-1">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <div>
            <p className="text-[#151515] text-[18px] md:text-[24px] leading-[32px] font-semibold">Before you begin: Create account to save progress</p>
            <p className="text-[#343333] text-base md:text-[18px] leading-[28px] font-normal mt-2">
              If you get interrupted or need to stop and gather some of the requested information, you have the option
              to save your place with a link that you can copy or email to yourself, but you first have to create a
              platform account to identify you.
            </p>
            <p className="text-[#343333] text-base md:text-[18px] leading-[28px] font-normalt mt-2">
              Clicking the &quot;Save for Later&quot; button should prompt you to create an account.
            </p>
            <p className="text-[#343333] text-base md:text-[18px] leading-[28px] font-normal mt-2">
              If you don&apos;t see the prompt or get an error, try opening the form in a new window.
            </p>
            <p className="text-[#343333] text-base md:text-[18px] leading-[28px] font-normal mt-2">
              Once you have an account and are logged in, click the &quot;Save For Later&quot; button again any time you&apos;d like
              to stop and save your place.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Link href={'/information-materials'}>      
        <button className="bg-yellow-300 text-gray-800 px-6 py-2 rounded-full text-sm font-medium">Next</button>
        
        </Link>
      </div>
    </div>
  </div>
  )
}
