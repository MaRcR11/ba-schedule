import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Calendar from "./Calendar";
import LoadingAnim from "./LoadingAnim";
import Login from "./Login";
import { ScheduleData } from "../global/types";
import { useCookies } from "react-cookie";

function App() {
  const [fetched, setFetched] = useState<boolean>(false);
  const pwdRef = useRef<HTMLInputElement>(null);
  const [storePwdRef, setStorePwdRef] = useState<string>("");
  const [fireRedirect, setFireRedirect] = useState<boolean>(false);
  const [apiAvailable, setApiAvailable] = useState<boolean>(true);
  const [loginMode, setLoginMode] = useState<boolean>(Boolean(localStorage.getItem("loginMode")));
  const [storeUserIDRef, setStoreUserIDRef] = useState<string>("");
  const [scheduleData, setScheduleData] = useState<ScheduleData[]>([]);
  const [cookies, setCookie] = useCookies(["token"]);

  useEffect(() => {
    fireRedirect
      ? axios
          .get(
            `http://localhost:4000/api/getData?` +
              new URLSearchParams({
                pwd: storePwdRef,
                userID: loginMode ? "" : `${storeUserIDRef}`,
              }),
          )
          .then((res) => {
            setScheduleData(JSON.parse(res.data));
            setFetched(true);
          })
          .catch(() => {
            setApiAvailable(true);
          })
      : null;
  }, [fireRedirect]);

  useEffect(() => {
    axios
      .post("http://localhost:4000/login/", { token: cookies.token })
      .then((res) => {
        if (res.data.isValid && res.data.key) {
          setFetched(true);
          setTimeout(() => {
            setFireRedirect(true);
          }, 0);
          setStorePwdRef(res.data.key);
        }
      })
      .catch(() => {});
    axios
      .post("http://localhost:4000/userLogin/", { token: cookies.token })
      .then((res) => {
        if (res.data.isValid && res.data.key) {
          setTimeout(() => {
            setFireRedirect(true);
          }, 0);
          setStorePwdRef(res.data.key);
          setStoreUserIDRef(res.data.userID);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      {fireRedirect ? (
        fetched ? (
          <Calendar scheduleData={scheduleData} />
        ) : (
          <LoadingAnim apiAvailable={apiAvailable} />
        )
      ) : (
        <Login
          setFireRedirect={setFireRedirect}
          pwdRef={pwdRef}
          setStorePwdRef={setStorePwdRef}
          setStoreUserIDRef={setStoreUserIDRef}
          loginMode={loginMode}
          setLoginMode={setLoginMode}
        />
      )}
    </>
  );
}

export default App;
