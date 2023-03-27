import React, { useState } from "react";
import GeneralLogin from "./GeneralLogin";
import UserLogin from "./UserLogin";

interface Props {
  setFireRedirect: any;
  pwdRef: any;
  setStorePwdRef: any;

  setStoreUserIDRef: any;
}

function Login(props: Props) {
  const [loginMode, setLoginMode] = useState<boolean>(false);

  const changeLoginMode = () => {
    setLoginMode(!loginMode);
  };

  return loginMode ? (
    <GeneralLogin
      setFireRedirect={props.setFireRedirect}
      pwdRef={props.pwdRef}
      setStorePwdRef={props.setStorePwdRef}
      setLoginMode={setLoginMode}
      changeLoginMode={changeLoginMode}
    />
  ) : (
    <UserLogin
      setFireRedirect={props.setFireRedirect}
      pwdRef={props.pwdRef}
      setStorePwdRef={props.setStorePwdRef}
      setLoginMode={setLoginMode}
      changeLoginMode={changeLoginMode}
      setStoreUserIDRef={props.setStoreUserIDRef}
    />
  );
}

export default Login;
