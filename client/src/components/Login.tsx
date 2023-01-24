import React, { useRef } from "react";
import axios from "axios";

interface Props {
  setFireRedirect: any;
  pwdRef: any;

  setStorePwdRef: any;
}
function Login(props: Props) {
  const invalidPwdMsgRef = useRef<HTMLInputElement>(null);

  const onSubmitPwd = () => {
    const pwd = props.pwdRef.current!.value;
    axios
      .post("http://localhost:4959/login/", { pwd })
      .then((res) => {
        props.setStorePwdRef(pwd);
        props.setFireRedirect(true);
      })
      .catch((err) => {
        invalidPwdMsgRef.current!.style.display = "block";
      });
  };

  const onEnterPressed = (e: any) => {
    if (e.code === "Enter") onSubmitPwd();
  };

  const onChangeHideInvalidPwdMsg = () => {
    if (!props.pwdRef.current!.value)
      invalidPwdMsgRef.current!.style.display = "none";
  };

  return (
    <div className="hero is-fullheight">
      <div className="hero-body  is-justify-content-center is-align-items-center">
        <div className="columns is-half is-flex-direction-column box">
          <div className="column is-flex is-justify-content-center">
            <h1 className="is-size-5">CS21-2 Stundenplan</h1>
          </div>
          <div className="column">
            <input
              ref={props.pwdRef}
              autofocus
              onChange={onChangeHideInvalidPwdMsg}
              onKeyDown={onEnterPressed}
              className="input is-primary"
              type="password"
              placeholder="Password"
            />
            <p
              ref={invalidPwdMsgRef}
              style={{ display: "none" }}
              className="help is-danger"
            >
              This password is invalid
            </p>
          </div>
          <div className="column">
            <button
              onClick={onSubmitPwd}
              className="button is-primary is-fullwidth"
              type="submit"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
