import React, { useState } from "react";
import GeneralLogin from "./GeneralLogin";
import UserLogin from "./UserLogin";

interface Props {
  setFireRedirect: any;
  pwdRef: any;
  setStorePwdRef: any;

  setStoreUserIDRef: any;

  setLoginMode: any;

  loginMode: any;
}

function Login(props: Props) {
  const [errroText, setErrorText] = useState("This password or username is invalid")

  const changeLoginMode = () => {
    props.setLoginMode(!props.loginMode);
  };

  return props.loginMode ? (
    <GeneralLogin
      setFireRedirect={props.setFireRedirect}
      pwdRef={props.pwdRef}
      setStorePwdRef={props.setStorePwdRef}
      setLoginMode={props.setLoginMode}
      changeLoginMode={changeLoginMode}
    />
  ) : (
    <UserLogin
      setFireRedirect={props.setFireRedirect}
      pwdRef={props.pwdRef}
      setStorePwdRef={props.setStorePwdRef}
      setLoginMode={props.setLoginMode}
      changeLoginMode={changeLoginMode}
      setStoreUserIDRef={props.setStoreUserIDRef}
      errorText={errroText}
      setErrorText={setErrorText}
    />
  );
}

export default Login;
