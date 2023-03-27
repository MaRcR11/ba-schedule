import React, { useState } from "react";
import GeneralLogin from "./GeneralLogin";
import UserLogin from "./UserLogin";

interface Props {
  setFireRedirect: any;
  pwdRef: any;
  setStorePwdRef: any;
}

function Login(props: Props) {
  const [loginMode, setLoginMode] = useState<boolean>(true);

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
    />
  );
}

export default Login;
