import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Calendar from "./Calendar";
import LoadingAnim from "./LoadingAnim";
import Login from "./Login";

function App() {
  const [fetched, setFetched] = useState(false);
  const pwdRef = useRef<HTMLInputElement>(null);
  const [storePwdRef, setStorePwdRef] = useState("");
  const [fireRedirect, setFireRedirect] = useState(false);
  const [apiAvailable, setapiAvailable] = useState(true);
  const [loginMode, setLoginMode] = useState<boolean>(false);
  const [storeUserIDRef, setStoreUserIDRef] = useState("");
  const [scheduleData, setScheduleData] = useState<
    {
      start: number;
      end: number;
      description: string;
      remarks: string;
      title: string;
      instructor: string;
      sroom: string;
    }[]
  >([]);

  useEffect(() => {
    fireRedirect
      ? axios
          .get(
            `http://localhost:4000/api/getData?` +
              new URLSearchParams({
                pwd: storePwdRef,
                userID: loginMode ? "" : `${storeUserIDRef}`,
              })
          )
          .then((res) => {
            setScheduleData(JSON.parse(res.data));
            setFetched(true);
          })
          .catch((err) => {
            setapiAvailable(true);
          })
      : null;
  }, [fireRedirect]);

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
