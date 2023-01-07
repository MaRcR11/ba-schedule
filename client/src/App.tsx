import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Calendar from "./Calendar";
function App() {
  const testRef = useRef<any>(null);
  const [scheduleData, setScheduleData] = useState<
    { start: number; end: number }[]
  >([]);

  useEffect(() => {
    axios
      .get("http://localhost:8001/api/getData")
      .then((res) => {
        setScheduleData(JSON.parse(res.data));
        console.log(scheduleData);
      })
      .catch((err) => {
        console.log(err);
      });
    // fetch("http://localhost:8001/api/getData").then(res => res.json()).then(data => {
    //     setScheduleData(data)
    // }).catch(err => console.log(err))
  }, []);

  return (
    <>
      {scheduleData.map((e, i) => {
        console.log(e);
      })}

      <Calendar scheduleData={scheduleData} />
    </>
  );
}

export default App;
