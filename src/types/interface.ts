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

export interface PharmacyInfo {
  id: string;
  userId: string;
  status: string;
  firstName: string;
  lastName: string;
  email: string;
  pharmacyCredentialingPointStatus: string;
  legalInfoName: string;
  doingBusinessAsName: string;
  haveFictitiousBusinessNamePermit: boolean;
  pharmacyIncorporated: string;
  stateOfIncorporation: string;
  stateRegistrationOrNumber: string;
  federalTaxID: string;
  IRSLetter: string;
  copyOfYourW9: string;
  haveBusinessLicenseNumber: boolean;
  haveWorkersCompensationInsurance: boolean;
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
  isOurHarmacCertifiedWithMedicare: boolean;
  pharmacyProfessionalInformationStatus: string;
  providingCareToPatients: string[];
  pharmacyStatePlanCredentialingStatus: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    photoUrl: string;
    phone: string;
  };
}

export type UserTokenPayload = {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  role: "USER" | "SUPERADMIN";
  iat: number; // Issued at (timestamp)
  exp: number; // Expiry time (timestamp)
};
