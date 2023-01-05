const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = 8001 || process.env.PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server at ${PORT}`);
});
app.get("/", async (req, res) => {
    fetch("https://selfservice.campus-dual.de/room/json?userid=5002080&hash=a0f51c26573dbf74502666d418252988&start=1648418400&end=1649023200&_=1648473223770").then(res => {
        console.log(res)
    })

});

