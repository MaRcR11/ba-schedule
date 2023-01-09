import React, { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "./Calendar";
import LoadingAnim from "./LoadingAnim";
function App() {
  const [fetched, setFetched] = useState(false);
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
    axios
      .get("http://localhost:8001/api/getData")
      .then((res) => {
        setScheduleData(JSON.parse(res.data));
        setFetched(true);
      })
      .catch((err) => {
        setapiAvailable(false);
      });
  }, []);

  return (
    <>
      {fetched ? (
        <Calendar scheduleData={scheduleData} />
      ) : (
        <LoadingAnim apiAvailable={apiAvailable} />
      )}
    </>
  );
}

export default App;
