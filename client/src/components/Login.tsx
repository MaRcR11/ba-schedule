import React, { useRef } from "react";
import axios from "axios";

interface Props {
  setFireRedirect: any;
}
function Login(props: Props) {
  const pwdRef = useRef<HTMLInputElement>(null);

  const onSubmitPwd = () => {
    const pwd = pwdRef.current!.value;
    console.log(pwd);
    axios
      .post("http://localhost:3000/login", { pwd })
      .then((res) => {
        console.log("passt");
        props.setFireRedirect(true);
      })
      .catch((err) => {
        console.log("pass nicht");
      });
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
              ref={pwdRef}
              className="input is-primary"
              type="password"
              placeholder="Password"
            />
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
