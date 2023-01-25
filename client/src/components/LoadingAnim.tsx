import { BarLoader } from "react-spinners";
import "../styles/LoadingAnim.css";
import {loadingMessages} from "../helpers/";
import { useEffect, useState } from "react";

interface Props {
  apiAvailable: boolean;
}
function LoadingAnim(props: Props) {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setInterval(() => {
      setMsg(loadingMessages());
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
          CS21-2 Stundenplan
        </p>

        <BarLoader id="barLoader" color={"#747BFF"} />

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
