import React, { useState } from "react";
import GeneralLogin from "./GeneralLogin";
import UserLogin from "./UserLogin";
import { LoginProps } from "../global/types";

function Login(props: LoginProps) {
  const [loginErrorMsg, setLoginErrorMsg] = useState<string>("This password or username is invalid");

  const changeLoginMode = () => {
    props.setLoginMode(!props.loginMode);
    localStorage.setItem("loginMode", props.loginMode ? "" : String(props.loginMode) )
  };

  return props.loginMode ? (
    <GeneralLogin
      setFireRedirect={props.setFireRedirect}
      pwdRef={props.pwdRef}
      setStorePwdRef={props.setStorePwdRef}
      setLoginMode={props.setLoginMode}
      changeLoginMode={changeLoginMode}
      loginErrorMsg={loginErrorMsg}
      setLoginErrorMsg={setLoginErrorMsg}

    />
  ) : (
    <UserLogin
      setFireRedirect={props.setFireRedirect}
      pwdRef={props.pwdRef}
      setStorePwdRef={props.setStorePwdRef}
      setLoginMode={props.setLoginMode}
      changeLoginMode={changeLoginMode}
      setStoreUserIDRef={props.setStoreUserIDRef}
      loginErrorMsg={loginErrorMsg}
      setLoginErrorMsg={setLoginErrorMsg}

    />
  );
}

export default Login;
