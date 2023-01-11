import React, { useEffect, useRef, useState } from "react";
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
          .get(`http://localhost:3000/api/getData/${storePwdRef}`)
          .then((res) => {
            console.log("jsdsdsdsds");
            setScheduleData(JSON.parse(res.data));
            setFetched(true);
          })
          .catch((err) => {
            setapiAvailable(false);
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
        />
      )}
    </>
  );
}

export default App;
