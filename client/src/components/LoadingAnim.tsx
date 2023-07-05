import { BarLoader } from "react-spinners";
import "../styles/LoadingAnim.css";
import { loadingMessages } from "../helpers/";
import { useEffect, useState } from "react";
import { LoadingAnimProps } from "../global/types";

function LoadingAnim(props: LoadingAnimProps) {
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    setInterval(() => {
      setMsg(loadingMessages() as any);
    }, 2000);
  }, []);
  return (
    <>
      <div className="LoadingAnim">
        <p
          id="loadingHeadline"
          style={{
            userSelect: "none",
          }}
        >
          ba-schedule
        </p>

        <BarLoader id="barLoader" color={"#00d1b2"} />

        {props.apiAvailable ? (
          <p
            id="randomLoadingMessages"
            style={{
              userSelect: "none",
              fontWeight: "lighter",
              fontStyle: "italic",
            }}
          >
            {loadingMessages()}
          </p>
        ) : (
          <p
            id="randomLoadingMessages"
            style={{
              userSelect: "none",
              fontWeight: "lighter",
              fontStyle: "italic",
            }}
          >
            {" "}
            Campus Dual is not responding...{" "}
          </p>
        )}
      </div>
    </>
  );
}

export default LoadingAnim;
