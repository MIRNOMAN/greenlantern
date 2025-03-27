export type TPharmasit = {
  createdAt: string; // ISO 8601 format date string
  email: string; // Email address as a string
  firstName: string; // First name as a string
  id: string; // Unique identifier for the user (string, since it appears to be a UUID)
  lastName: string; // Last name as a string
  role: "USER" | "ADMIN"; // Role can be either "USER" or "ADMIN" (assuming it's a limited set)
  status: "ACTIVATE" | "DEACTIVATE"; // Status can be either "ACTIVATE" or "DEACTIVATE" (assuming this is the possible status)
  updatedAt: string; // ISO 8601 format date string
};


export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    photoUrl: string | null;
    role: string;
    userId: string;
  }
  
  export interface PharmacyInfo {
    IRSLetter: string;
    NCPDPNumber: string;
    billingAddressStreet1: string;
    billingAddressStreet2: string;
    billingCity: string;
    billingState: string;
    billingZipCode4Digit: string;
    billingZipCode5Digit: string;
    copyOfDEACertificateNumber: string;
    copyOfPharmacyLicense: string;
    copyOfYourW9: string;
    createdAt: string;
    doingBusinessAsName: string;
    email: string;
    federalTaxID: string;
    firstName: string;
    haveBusinessLicenseNumber: boolean;
    haveFictitiousBusinessNamePermit: boolean;
    haveWorkersCompensationInsurance: boolean;
    id: string;
    isOurHarmacCertifiedWithMedicare: boolean;
    lastName: string;
    legalInfoName: string;
    mailingAddressStreet1: string;
    mailingAddressStreet2: string;
    mailingCity: string;
    mailingState: string;
    mailingZipCode4Digit: string;
    mailingZipCode5Digit: string;
    pharmacyBillingAddressStatus: string;
    pharmacyBusinessInformationStatus: string;
    pharmacyCredentialingPointStatus: string;
    pharmacyDEACertificateNumber: string;
    pharmacyIncorporated: string;
    pharmacyLegalInformationStatus: string;
    pharmacyLicenseNumber: string;
    pharmacyMailingAddressStatus: string;
    pharmacyMalpracticeInsurancePolicyNumber: string;
    pharmacyNPINumber: string;
    pharmacyPermitIssueDate: string;
    pharmacyProfessionalInformationStatus: string;
    pharmacyServiceLocation: string;
    pharmacyStatePlanCredentialingStatus: string;
    primaryNPITaxonomyNumber: string;
    providingCareToPatients: string[];
    secondaryNPITaxonomyNumber: string;
    stateOfIncorporation: string;
    stateRegistrationOrNumber: string;
    updatedAt: string;
    user: User;
  }
  

  export type UserTokenPayload = {
    id: string;
    name: string;
    email: string;
    role: 'USER' | 'SUPERADMIN' ;
    iat: number; // Issued at (timestamp)
    exp: number; // Expiry time (timestamp)
  };