import React from 'react';
import crawler from "./crawler/crawler";
import axios from "axios";
function App() {

    crawler.run(['https://crawlee.dev']).then(res => console.log(res))

    return (
        <div></div>
    );
}

export default App;