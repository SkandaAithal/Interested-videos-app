import { Dispatch } from "react";

export interface UserAuthenticationProps {
  type: string;
  isLogin: boolean;
  setIsLogin: Dispatch<boolean>;
}

export interface FormErrorsType {
  nameError?: string;
  emailError?: string;
  passwordError?: string;
}

export interface UserInputsTypes {
  name?: string;
  email: string;
  password: string;
}
