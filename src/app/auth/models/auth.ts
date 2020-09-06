export interface SignupContext {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  phoneNumberPrefix: string;
  password: string;
}

export interface LoginContext {
  email: string;
  password: string;
  remember: boolean;
}
