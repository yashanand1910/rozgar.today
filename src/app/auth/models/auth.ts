export interface SignupContext {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  phoneNumberPrefix: string;
  password: string;
  confirmPassword: string;
  country: string;
  preferredCities: string[];
  lastSalary: number;
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
