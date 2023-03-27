import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import vhCheck from "vh-check";
vhCheck("vh-check");
import "../styles/Login.css";
import { BarLoader } from "react-spinners";
import { calenderSetDarkTheme, calenderSetLightTheme } from "../helpers";

interface Props {
  setFireRedirect: any;
  pwdRef: any;
  setStorePwdRef: any;
  setLoginMode: any;
  changeLoginMode: any;
  setStoreUserIDRef: any;
}
function UserLogin(props: Props) {
  const invalidPwdMsgRef = useRef<HTMLInputElement>(null);
  const [isPwdDisabled, setPwdDisabled] = useState(false);
  const [isModeLoaded, setIsModeLoaded] = useState(false);
  const userIDRef = useRef<HTMLInputElement>(null);
  const onSubmitPwd = () => {
    if (!props.pwdRef.current!.value || !userIDRef.current!.value) return;
    const hash = props.pwdRef.current!.value;
    const userID = userIDRef.current!.value;
    setPwdDisabled(true);
    axios
      .post("http://localhost:4000/userLogin/", { userID, hash })
      .then((res) => {
        props.setStorePwdRef(hash);
        props.setStoreUserIDRef(userID);
        props.setFireRedirect(true);
        setPwdDisabled(false);
      })
      .catch((err) => {
        setPwdDisabled(false);
        invalidPwdMsgRef.current!.style.display = "block";
        setTimeout(() => {
          document.getElementById("pwdInput")?.focus();
        }, 0);
      });
  };

  const onEnterPressed = (e: any) => {
    if (e.keyCode === 13) onSubmitPwd();
  };

  const onChangeHideInvalidPwdMsg = () => {
    if ((invalidPwdMsgRef.current!.style.display = "block"))
      invalidPwdMsgRef.current!.style.display = "none";
  };

  useEffect(() => {
    (async () => {
      await configureDarkLightMode();
    })();
  }, []);

  const configureDarkLightMode = async () => {
    try {
      let mode: string = localStorage.getItem("mode") as string;
      mode === "light"
        ? await calenderSetLightTheme()
        : await calenderSetDarkTheme();
      setIsModeLoaded(true);
    } catch (error) {
      console.error("ungültiger Wert im localStorage");
    }
  };

  return (
    <>
      {isModeLoaded ? (
        <div className="hero is-fullheight ">
          {isPwdDisabled ? (
            <BarLoader id="top-barloader" color={"#00d1b2"} width={"100%"} />
          ) : null}
          <div className="hero-body  is-justify-content-center is-align-items-center">
            <div className="columns is-half is-flex-direction-column box">
              <div className="column is-flex is-justify-content-center">
                <h1 className="is-size-5">Campus Dual Stundenplan</h1>
              </div>
              <div className="column">
                <input
                  id="pwdInput"
                  ref={userIDRef}
                  disabled={isPwdDisabled}
                  autoFocus
                  onChange={onChangeHideInvalidPwdMsg}
                  onKeyUp={onEnterPressed}
                  className="input is-primary"
                  placeholder="Matrikelnummer"
                />
              </div>
              <div className="column">
                <input
                  id="pwdInput"
                  ref={props.pwdRef}
                  disabled={isPwdDisabled}
                  onChange={onChangeHideInvalidPwdMsg}
                  onKeyUp={onEnterPressed}
                  className="input is-primary"
                  type="password"
                  placeholder="Hashwert"
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
                  disabled={isPwdDisabled}
                  className="button is-primary is-fullwidth"
                  type="submit"
                >
                  Login
                </button>
              </div>
              <div className="has-text-centered">
                <p className="is-size-7">
                  <a onClick={props.changeLoginMode} className="has-text-link">
                    General Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default UserLogin;
