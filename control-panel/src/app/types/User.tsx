export type UserRole = 'Admin' | 'Employee' | 'Client' | 'Partner';

export interface User {
  id: number;
  fistName: string;
  lastName: string;
  image: string;
  name: string;
  role: UserRole;
  phone: string;
  status: string;
  type: UserRole;
  gender?: string; 
  email?: string; 
  countryId: number;
  designationId?: number;
  active: boolean;
}


export interface ApiUser {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    phoneNumber: string;
    disabled: number;
    main_image: string;
    country: number; // Country ID as an integer
    designation?: string; // Optional
  }
  