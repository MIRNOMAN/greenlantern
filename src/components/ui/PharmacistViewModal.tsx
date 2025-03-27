"use client"


import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image";
import { useState } from "react";



interface PharmacistViewModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PharmacistViewModal({  isOpen, onClose }: PharmacistViewModalProps) {
  // Helper function to get status badge color

  const dynamicData = {
    firstName: 'David',
    lastName: 'Carry',
    email: 'davidcarrydemo@gmail.com',
    roles: ['Pharmacy Contact', 'Admin', 'Billing', 'Support'] // dynamic select options
  };

  const [contactRole, setContactRole] = useState('');

  // This function handles the change whenever a role is selected
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = e.target.value;
    setContactRole(selectedRole);
    // Optionally, handle any side effects, like sending data to a server
    console.log(`Selected Role: ${selectedRole}`);
  };


  const [formData, setFormData] = useState({
    pharmacyLegalName: 'Pharmacy XYZ',
    dbaName: 'Pharmacy ABC',
    hasFictitiousNamePermit: 'Yes',
    incorporationStatus: 'LLC',
    stateOfIncorporation: 'California',
    stateRegistrationNumber: '1234567890',
    federalTaxID: '987654321',
    businessLicenseNumber: 'BL123456',
    workersCompInsurance: 'Yes',
  });

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const [BillingformData, BillingsetFormData] = useState({
    addressStreet1: 'text1',
    addressStreet2: 'text1',
    city: 'text1',
    state: 'text1',
    zipCode5: 'text1',
    zipCodePlus4: 'text1'
  });

  const handleBillingSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    BillingsetFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const [MailingformData, setMailingFormData] = useState({
    isBillingSame: false,
    addressStreet1: '',
    addressStreet2: '',
    city: '',
    state: '',
    zipCode5: '',
    zipCodePlus4: ''
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setMailingFormData((prevData) => ({
      ...prevData,
      isBillingSame: checked,
    }));

    // If the billing address is the same, you can copy values from mailing address
    if (checked) {
      // Example: copying mailing address values to billing address (this could be dynamic based on another part of the form)
      setFormData((prevData) => ({
        ...prevData,
        addressStreet1: 'Mailing Address Street 1', // Replace with dynamic mailing address if needed
        addressStreet2: 'Mailing Address Street 2', // Replace with dynamic mailing address if needed
        city: 'Mailing City', // Replace with dynamic mailing city
        state: 'Mailing State', // Replace with dynamic mailing state
        zipCode5: '12345', // Replace with dynamic mailing zip code
        zipCodePlus4: '6789' // Replace with dynamic mailing zip code
      }));
    }
  };

  const handleMailingChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Dialog  open={isOpen} onOpenChange={(open) => !open && onClose()} >
      <DialogContent className=" max-w-7xl bg-white overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Pharmacist Details</DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4  text-xl"
          >
          
          </button>
        </DialogHeader>
        <div className="space-y-6">
         
         {/* 1st part */}
        <div className="  w-full ">
      <div className="flex items-center p-6 bg-white rounded-lg shadow-md border border-[#ECECEC]">
        <div className="w-5 h-5 bg-yellow-400 rounded-full flex justify-center items-center mr-3">
          <span role="img" aria-label="hourglass">⏳</span>
        </div>
       <div>
       <span className="text-3xl font-semibold">Pending Requests</span>
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
            value={contactRole}
            onChange={handleRoleChange} // Handle role change
            className="mt-1 block w-full px-4 py-2 border border-[#ECECEC] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#682D70]"
          >
            <option value="" disabled>Please select</option>
            {dynamicData.roles.map((role, index) => (
              <option key={index} value={role}>{role}</option>
            ))}
          </select>
        </div>
   </div>
      <p className="text-[14px] text-[#1b1b1b] opacity-80 mb-6">
        Contact information for who is completing this form if Scripted&#39;s team has follow-up questions
      </p>
      <div className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">First Name <span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{dynamicData.firstName}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Last Name <span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{dynamicData.lastName}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email <span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{dynamicData.email}</p>
        </div>

       

        {contactRole && (
          <div className="mt-4 text-[14px] text-[#151515] opacity-80">
            <p>You selected: <span className="font-semibold">{contactRole}</span></p>
          </div>
        )}
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
            value={contactRole}
            onChange={handleSelectChange} // Handle role change
            className="mt-1 block w-full px-4 py-2 border border-[#ECECEC] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#682D70]"
          >
            <option value="" disabled>Please select</option>
            {dynamicData.roles.map((role, index) => (
              <option key={index} value={role}>{role}</option>
            ))}
          </select>
        </div>
   </div>
      
      <div className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Pharmacy Legal Name <span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{formData.pharmacyLegalName}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Doing Business As (DBA) Name <span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{formData.dbaName}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Do you have a fictitious business name permit? <span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{formData.hasFictitiousNamePermit}</p>
        </div>

       <p>A fictitious business permit is a legal document that allows a business to operate under a name other than the owner&#39;s name in states that require it.</p>
       <p>Other terms used include: assumed name, doing business as (DBA), or trade name.</p>
       <p>The process of adopting an assumed name varies by where you operate, but registrations are typically filed with the secretary of state or at the county level. </p>

       <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">How is your pharmacy incorporated?  <span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{formData.incorporationStatus}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">State of Incorporation  <span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{formData.stateOfIncorporation}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">State Registration or Corporate Number  <span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{formData.stateRegistrationNumber}</p>
        </div>
        <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Federal Tax ID/EIN   <span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{formData.federalTaxID}</p>
        </div>

       <div className="mb-4">
       <label className="block text-sm font-medium text-gray-700">Upload copy of the IRS letter with your federal tax ID/EIN  <span className="text-yellow-200">*</span></label>
       <div className="border border-[#ECECEC] md:h-[130px] h-[80px] w-[120px] md:w-[200px]">
          <Image src="" alt="picture" height={600} width={600} className=""/>
        </div>
       </div>

       <div className="mb-4">
       <label className="block text-sm font-medium text-gray-700">Upload copy of your W9 <span className="text-yellow-200">*</span></label>
       <div className="border border-[#ECECEC] md:h-[130px] h-[80px] w-[120px] md:w-[200px]">
          <Image src="" alt="picture" height={600} width={600} className=""/>
        </div>
       </div>

       
       <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Does your pharmacy have a Business License Number?<span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{formData.businessLicenseNumber}</p>
        </div>
        <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Does your pharmacy have Workers&#39; Compensation insurance?<span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{formData.workersCompInsurance}</p>
        </div>





        {contactRole && (
          <div className="mt-4 text-gray-800">
            
            <p>You selected: <span className="font-semibold">{contactRole}</span></p>
          </div>
        )}
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
            value={contactRole}
            onChange={handleBillingSelectChange} // Handle role change
            className="mt-1 block w-full px-4 py-2 border border-[#ECECEC] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#682D70]"
          >
            <option value="" disabled>Please select</option>
            {dynamicData.roles.map((role, index) => (
              <option key={index} value={role}>{role}</option>
            ))}
          </select>
        </div>
   </div>
      
      <div className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Address Street 1 <span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{BillingformData.addressStreet1}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Address Street <span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{BillingformData.addressStreet2}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">City <span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{BillingformData.city}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700"> State<span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{BillingformData.state}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Zip Code 5 Digit  <span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{BillingformData.zipCode5}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Zip Code Plus 4  <span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{BillingformData.zipCodePlus4}</p>
        </div>

       

        {contactRole && (
          <div className="mt-4 text-[14px] text-[#151515] opacity-80">
            <p>You selected: <span className="font-semibold">{contactRole}</span></p>
          </div>
        )}
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
            value={contactRole}
            onChange={handleMailingChange} // Handle role change
            className="mt-1 block w-full px-4 py-2 border border-[#ECECEC] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#682D70]"
          >
            <option value="" disabled>Please select</option>
            {dynamicData.roles.map((role, index) => (
              <option key={index} value={role}>{role}</option>
            ))}
          </select>
        </div>
   </div>
      
      <div className="space-y-4">
      
        <label className="flex items-center">
        <input
          type="checkbox"
          checked={MailingformData.isBillingSame}
          onChange={handleCheckboxChange}
        />
        <p className="pl-3">Pharmacy Billing Address is the same as Pharmacy Mailing Address</p>
      </label>
      <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Address Street 1 <span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{BillingformData.addressStreet1}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Address Street <span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{BillingformData.addressStreet2}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">City <span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{BillingformData.city}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700"> State<span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{BillingformData.state}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Zip Code 5 Digit  <span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{BillingformData.zipCode5}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Zip Code Plus 4  <span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{BillingformData.zipCodePlus4}</p>
        </div>

       

        {contactRole && (
          <div className="mt-4 text-[14px] text-[#151515] opacity-80">
            <p>You selected: <span className="font-semibold">{contactRole}</span></p>
          </div>
        )}
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
            value={contactRole}
            onChange={handleMailingChange} // Handle role change
            className="mt-1 block w-full px-4 py-2 border border-[#ECECEC] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#682D70]"
          >
            <option value="" disabled>Please select</option>
            {dynamicData.roles.map((role, index) => (
              <option key={index} value={role}>{role}</option>
            ))}
          </select>
        </div>
   </div>
      
      <div className="space-y-4">
      
      <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Do you own or lease/rent your pharmacy&#39;s service location? <span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{BillingformData.addressStreet1}</p>
        </div>
        {contactRole && (
          <div className="mt-4 text-[14px] text-[#151515] opacity-80">
            <p>You selected: <span className="font-semibold">{contactRole}</span></p>
          </div>
        )}
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
            value={contactRole}
            onChange={handleSelectChange} // Handle role change
            className="mt-1 block w-full px-4 py-2 border border-[#ECECEC] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#682D70]"
          >
            <option value="" disabled>Please select</option>
            {dynamicData.roles.map((role, index) => (
              <option key={index} value={role}>{role}</option>
            ))}
          </select>
        </div>
   </div>
   <h2 className="text-2xl font-semibold mb-5 text-[#682D70] ">
   DEA Certificate Information
      </h2>
      <div className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Pharmacy DEA Certificate Number <span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{formData.pharmacyLegalName}</p>
        </div>
         
        <div className="mb-4">
       <label className="block text-sm font-medium mb-3 text-gray-700">Upload copy of DEA Certificate Number <span className="text-yellow-200">*</span></label>
       <div className="border border-[#ECECEC] md:h-[130px] h-[80px] w-[120px] md:w-[200px]">
          <Image src="" alt="picture" height={600} width={600} className=""/>
        </div>
       </div>
        
       <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Pharmacy License Number <span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{formData.dbaName}</p>
        </div>

       <div className="mb-4">
       <label className="block mb-3 text-sm font-medium text-gray-700">Upload copy of Pharmacy License <span className="text-yellow-200">*</span></label>
       <div className="border border-[#ECECEC] md:h-[130px] h-[80px] w-[120px] md:w-[200px]">
          <Image src="" alt="picture" height={600} width={600} className=""/>
        </div>
       </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Pharmacy Permit&#39;s Issue Date  <span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{formData.dbaName}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Pharmacy NPI Number <span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{formData.hasFictitiousNamePermit}</p>
        </div>

       <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Primary NPI Taxonomy Number <span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{formData.incorporationStatus}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Secondary NPI Taxonomy Number <span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{formData.stateOfIncorporation}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">NCPDP Number  <span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{formData.stateRegistrationNumber}</p>
        </div>
        <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Pharmacy&#39;s Malpractice Insurance Policy Number <span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{formData.federalTaxID}</p>
        </div>

       <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Is your pharmacy certified with Medicare? <span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{formData.businessLicenseNumber}</p>
        </div>
        
        <p className="text-[14px] ">Medicare certified can mean: </p>
        <p className="text-[14px]">In-network pharmacy - has a contract with a specific Medicare Part D plan;</p>
        <p className="text-[14px]">Medicare Provider - able to bill Medicare directly for services (less common)</p>



        {contactRole && (
          <div className="mt-4 text-gray-800">
            
            <p>You selected: <span className="font-semibold">{contactRole}</span></p>
          </div>
        )}
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
            value={contactRole}
            onChange={handleMailingChange} // Handle role change
            className="mt-1 block w-full px-4 py-2 border border-[#ECECEC] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#682D70]"
          >
            <option value="" disabled>Please select</option>
            {dynamicData.roles.map((role, index) => (
              <option key={index} value={role}>{role}</option>
            ))}
          </select>
        </div>
   </div>
      
      <div className="space-y-4">
      
      <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">In what state(s) will you be providing care to patients? *<span className="text-yellow-200">*</span></label>
          <p className="text-[14px] text-[#151515] opacity-80">{BillingformData.addressStreet1}</p>
        </div>
        {contactRole && (
          <div className="mt-4 text-[14px] text-[#151515] opacity-80">
            <p>You selected: <span className="font-semibold">{contactRole}</span></p>
          </div>
        )}
      </div>
    </div>


        </div>
      </DialogContent>
    </Dialog>
  )
}
