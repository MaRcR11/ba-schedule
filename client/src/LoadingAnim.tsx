import { BarLoader } from "react-spinners";
import "./LoadingAnim.css";
function LoadingAnim() {
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
        }}
      >
        CS21-2 Stundenplan
      </p>
      <div
        className="sweet-loading"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <BarLoader color={"#747BFF"} />
      </div>
    </>
  );
}

export default LoadingAnim;
