// WEB

const path = require("path");
const dire = path.join(__dirname, "/.env");
console.log(dire);
require("dotenv").config(dire);



const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const userAgent = require("express-useragent")
const rateLimit = require("express-rate-limit");

//dict con config variables
// const { configDic } = require("./secure/config");
// mongoose.connect(configDic.DATABASE_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("CONNECT TO DB");
// }).catch((err) => {
//     console.log(err);
// })

const app = express();
// const router = require("./routes/api");
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, //1min
    max: 20
});


const direStatic = path.join(__dirname, "public");
app.use(express.static(direStatic));

app.use(userAgent.express())
app.use(helmet());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));
// app.use("/api/", apiLimiter);
// app.use("/api", router);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(3000, () => {
    console.log("APP runnning on port 3000");
});