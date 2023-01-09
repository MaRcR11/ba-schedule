import { BarLoader } from "react-spinners";
import "../styles/LoadingAnim.css";
import randomLoadingMessage from "../helpers/loadingMessages";
import { useEffect, useState } from "react";

interface Props {
  apiAvailable: boolean;
}
function LoadingAnim(props: Props) {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setInterval(() => {
      setMsg(randomLoadingMessage());
    }, 2000);
  }, []);
  return (
    <>
      <div className="LoadingAnim"></div>
      <p
        style={{
          position: "fixed",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "Trebuchet MS,  sans-serif",
          fontSize: "1.2rem",
          userSelect: "none",
        }}
      >
        CS21-2 Stundenplan
      </p>
      {props.apiAvailable ? (
        <p
          id="randomLoadingMessages"
          style={{
            position: "fixed",
            zIndex: "-1",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "Trebuchet MS,  sans-serif",
            userSelect: "none",
            fontWeight: "lighter",
            fontStyle: "italic",
          }}
        >
          {randomLoadingMessage()}
        </p>
      ) : (
        <p
          id="randomLoadingMessages"
          style={{
            position: "fixed",
            zIndex: "-1",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "Trebuchet MS,  sans-serif",
            userSelect: "none",
            fontWeight: "lighter",
            fontStyle: "italic",
          }}
        >
          {" "}
          Campus Dual is not responding...{" "}
        </p>
      )}

      <div
        className="sweet-loading"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <BarLoader color={"#747BFF"} width="20vw" />
      </div>
    </>
  );
}

export default LoadingAnim;
