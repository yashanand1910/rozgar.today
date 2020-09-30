import { Profile } from '@auth/models';

export interface SignupContext {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: Profile['phoneNumber'];
  phoneCode: Profile['phoneCode'];
  password: string;
  confirmPassword: string;
  country: Profile['country'];
  preferredCities: Profile['preferredCities'];
  lastSalary: Profile['lastSalary'];
}

export interface LoginContext {
  email: string;
  password: string;
  remember: boolean;
}

export interface ForgotPasswordContext {
  email: string;
}

export interface ResetPasswordContext {
  password: string;
  confirmPassword: string;
}
