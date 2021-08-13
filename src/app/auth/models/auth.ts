import { Profile } from '@auth/models';

export interface SignupContext extends Profile {
  password: string;
  confirmPassword: string;
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
