import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Calendar from "./Calendar";
import LoadingAnim from "./LoadingAnim";
function App() {
  const testRef = useRef<any>(null);
  const [fetched, setFetched] = useState(false);
  const [scheduleData, setScheduleData] = useState<
    {
      start: number;
      end: number;
      description: string;
      remarks: string;
      title: string;
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
        console.log(err);
      });
  }, []);

  return (
    <>{fetched ? <Calendar scheduleData={scheduleData} /> : <LoadingAnim />}</>
  );
}

export default App;
