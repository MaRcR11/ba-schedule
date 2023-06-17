import React from "react";

export interface ScheduleData {
  start: number;
  end: number;
  description: string;
  remarks: string;
  title: string;
  instructor: string;
  sroom: string;
}

export interface GeneralLoginProps {
  setFireRedirect: React.Dispatch<React.SetStateAction<boolean>>;
  pwdRef: React.RefObject<HTMLInputElement>;
  setStorePwdRef: React.Dispatch<React.SetStateAction<string>>;
  setLoginMode: React.Dispatch<React.SetStateAction<boolean>>;
  changeLoginMode: () => void;
  loginErrorMsg: string;
  setLoginErrorMsg: React.Dispatch<React.SetStateAction<string>>;
}
export interface UserLoginProps {
  setFireRedirect: React.Dispatch<React.SetStateAction<boolean>>;
  pwdRef: React.RefObject<HTMLInputElement>;
  setStorePwdRef: React.Dispatch<React.SetStateAction<string>>;
  setLoginMode: React.Dispatch<React.SetStateAction<boolean>>;
  changeLoginMode: () => void;
  setStoreUserIDRef: React.Dispatch<React.SetStateAction<string>>;
  loginErrorMsg: string;
  setLoginErrorMsg: React.Dispatch<React.SetStateAction<string>>;
}
export interface LoginProps {
  setFireRedirect: React.Dispatch<React.SetStateAction<boolean>>;
  pwdRef: React.RefObject<HTMLInputElement>;
  setStorePwdRef: React.Dispatch<React.SetStateAction<string>>;
  setStoreUserIDRef: React.Dispatch<React.SetStateAction<string>>;
  setLoginMode: React.Dispatch<React.SetStateAction<boolean>>;
  loginMode: boolean;
}

export interface LoadingAnimProps {
  apiAvailable: boolean;
}

export interface FormattedScheduleData {
  EndTime: Date;
  StartTime: Date;
  Subject: string;
  Location: string;
}
