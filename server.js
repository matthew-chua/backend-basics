const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

//Route files
const bootcamps = require("./routes/bootcamps");

//load env
dotenv.config({ path: "./config/config.env" });

const app = express();

//using middleware only if in dev 
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}

//Mount router
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server running", PORT));
