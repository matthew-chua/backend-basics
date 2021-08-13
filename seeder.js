const fs = require("fs");
const mongoose = require("mongoose");
const colors = require('colors');
const dotenv = require("dotenv");

//load env
dotenv.config({ path: "./config/config.env" });

//load models
const Bootcamp = require("./models/bootcampModel");
const Course = require("./models/CourseModel");
const User = require("./models/UserModel");

//connect to mongo
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

//read json files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, `utf-8`));
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, `utf-8`));
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, `utf-8`));



//import data into DB
const importData = async () => {
    try{
        await Bootcamp.create(bootcamps);
        await Course.create(courses);
        await User.create(users);


        console.log("data imported".green.inverse);
        process.exit();
    } catch(err) {
        console.error(err);
    }
}

//delete data
const deleteData = async () => {
    try{
        await Bootcamp.deleteMany();
        await Course.deleteMany();
        await User.deleteMany();

        console.log("data deleted".red.inverse);
        process.exit();
    } catch(err) {
        console.error(err);
    }
}

if (process.argv[2] === `-i`) {
    importData();
} else if (process.argv[2] === `-d`) {
    deleteData();
}