const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const colors = require('colors');
const errorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");

//Route files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");

const { connect } = require("./routes/bootcamps");

//load env
dotenv.config({ path: "./config/config.env" });

//connect to Mongo
connectDB();

const app = express();

//body parser
//this allows you to console.log body.req
app.use(express.json());

//cookie parser middleware
app.use(cookieParser())

//using middleware only if in dev 
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}

//Mount router
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);

//middleware for error handling should be inserted after router is mounted
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`server running on port ${PORT}`.yellow.bold));

//handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Err: ${err.message}`.red);

    //close server and exit process
    server.close(() => {
        process.exitCode(1)
    })
})