import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import vhCheck from "vh-check";
import { useCookies } from "react-cookie";
vhCheck("vh-check");
import "../styles/Login.css";
import { BarLoader } from "react-spinners";
import { calenderSetDarkTheme, calenderSetLightTheme } from "../helpers";
import { GeneralLoginProps } from "../global/types";

function GeneralLogin(props: GeneralLoginProps) {
  const invalidPwdMsgRef = useRef<HTMLInputElement>(null);
  const [isPwdDisabled, setPwdDisabled] = useState<boolean>(false);
  const [isModeLoaded, setIsModeLoaded] = useState<boolean>(false);
  const [policyAccepted, setPolicyAccepted] = useState<boolean>(Boolean(localStorage.getItem("privacyPolicyAccepted")));
  const [cookies, setCookie] = useCookies(["token"]);

  const onSubmitPwd = () => {
    if (!policyAccepted) {
      props.setLoginErrorMsg("You must agree to the privacy policy!");
      invalidPwdMsgRef.current!.style.display = "block";
      return;
    }
    if (!props.pwdRef.current!.value) return;
    const pwd = props.pwdRef.current!.value;
    setPwdDisabled(true);
    axios
      .post("http://localhost:4000/login/", { pwd })
      .then((res) => {
        props.setStorePwdRef(pwd);
        props.setFireRedirect(true);
        setPwdDisabled(false);
        setCookie("token", res.data.token);
      })
      .catch((error) => {
        setPwdDisabled(false);
        if (error.response.status === 429) props.setLoginErrorMsg(error.response.statusText);
        else {
          props.setLoginErrorMsg("This password is invalid");
        }
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
    if ((invalidPwdMsgRef.current!.style.display = "block")) invalidPwdMsgRef.current!.style.display = "none";
  };

  useEffect(() => {
    (async () => {
      await configureDarkLightMode();
    })();
  }, []);

  const configureDarkLightMode = async () => {
    try {
      let mode: string = localStorage.getItem("mode") as string;
      mode === "light" ? await calenderSetLightTheme() : await calenderSetDarkTheme();
      setIsModeLoaded(true);
    } catch (error) {
      console.error("ungültiger Wert im localStorage");
    }
  };

  return (
    <>
      {isModeLoaded ? (
        <div className="hero is-fullheight ">
          {isPwdDisabled ? <BarLoader id="top-barloader" color={"#00d1b2"} width={"100%"} /> : null}
          <div className="hero-body  is-justify-content-center is-align-items-center">
            <div className="columns is-half is-flex-direction-column box">
              <div className="column is-flex is-justify-content-center">
                <h1 className="is-size-5">CS21-2 Stundenplan</h1>
              </div>
              <div className="column">
                <input
                  id="pwdInput"
                  ref={props.pwdRef}
                  disabled={isPwdDisabled}
                  autoFocus
                  onChange={onChangeHideInvalidPwdMsg}
                  onKeyUp={onEnterPressed}
                  className="input is-primary"
                  type="password"
                  placeholder="Password"
                />
                <p ref={invalidPwdMsgRef} style={{ display: "none" }} className="help is-danger">
                  {props.loginErrorMsg}
                </p>
              </div>
              <div className="column policy">
                <input
                  type="checkbox"
                  defaultChecked={policyAccepted}
                  onChange={() => {
                    setPolicyAccepted(!policyAccepted);
                  }}
                />
                I agree to the{" "}
                <a className="policyLink" href="https://ba-schedule.de/privacy-policy" target="_blank">
                  privacy policy
                </a>
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
                  <a
                    tabIndex={0}
                    onClick={props.changeLoginMode}
                    className="has-text-link"
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        props.changeLoginMode();
                      }
                    }}
                  >
                    User Login
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

export default GeneralLogin;
