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
              zIndex: "-1",
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
              zIndex: "-1",
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
