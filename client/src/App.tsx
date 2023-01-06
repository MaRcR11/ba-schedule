import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
function App() {
    const testRef = useRef<any>(null);
    const [data, setData] = useState([])

    useEffect(() => {
        // axios.get("https://umrecheninator.de/api/getAll").then(res => {
        //
        //     console.log(res.data)
        // }).catch(err => {
        //     console.log(err)
        // })
        fetch("http://localhost:8001/api/getData").then(res => res.json()).then(data => {
            console.log(data)
            setData(data)
        }).catch(err => console.log(err))

    }, [])

    return (
        <>
            hi
            {data}
        </>
    );
}

export default App;