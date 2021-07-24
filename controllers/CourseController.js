//import course model
const Course = require("../models/CourseModel");
const Bootcamp = require("../models/BootcampModel");
const colors = require('colors');


//import error class
const ErrorResponse = require("../utils/errorResponse");

const asyncHandler = require("../middleware/async");

// @desc        GET courses
// @route       GET /api/v1/courses
// @route       GET /api/v1/bootcamps/:bootcampId/courses
// @access      public
exports.getCourses = asyncHandler(async(req,res,next) => {
    let query;

    if (req.params.bootcampId) {
        query = Course.find({ bootcamp: req.params.bootcampId });
    } else {
        query = Course.find().populate({
            path: 'bootcamp',
            select: 'name description'
        });
    }

    const courses = await query;
    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    })
})

// @desc        GET single courses
// @route       GET /api/v1/courses/:id
// @access      public
exports.getSingleCourse = asyncHandler(async(req,res,next) => {
    const course = await Course.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
    });

    if (!course) {
        return next( new ErrorReponse(`No course with the id of ${req.params.id}`), 404)
    }
    res.status(200).json({
        success: true,
        data: course
    })
})

// @desc        Add course
// @route       POST /api/v1/bootcamps/:bootcampId/courses
// @access      private
exports.addCourse = asyncHandler(async(req,res,next) => {
    
    req.body.bootcampId = req.params.bootcampId;
    console.log("jere", req.body)
    
    const bootcamp = await Bootcamp.findById(req.params.bootcampId)

    if (!bootcamp) {
        return next( new ErrorReponse(`No bootcamp with id of ${req.params.bootcampId}`, 404))
    }
    
    const course = await Course.create(req.body);
    
    
    res.status(200).json({
        success: true,
        data: course
    })
})

// @desc        Update course
// @route       PUT /api/v1/courses/:id
// @access      private
exports.updateCourse = asyncHandler(async(req,res,next) => {
    
    
    let course = await Course.findById(req.params.id);

    if (!course) {
        return next( new ErrorReponse(`No course with id of ${req.params.bootcampId}`, 404))
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });


    res.status(200).json({
        success: true,
        data: course
    })
})

// @desc        Delete course
// @route       DELETE /api/v1/courses/:id
// @access      private
exports.deleteCourse = asyncHandler(async(req,res,next) => {
    
    
    const course = await Course.findById(req.params.id);

    if (!course) {
        return next( new ErrorReponse(`No course with id of ${req.params.bootcampId}`, 404))
    }

await course.remove();


    res.status(200).json({
        success: true,
        data: {}
    })
})