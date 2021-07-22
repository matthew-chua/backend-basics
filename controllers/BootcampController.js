//import bootcamp model
const Bootcamp = require("../models/BootcampModel");

//import error class
const ErrorResponse = require("../utils/errorResponse");

const asyncHandler = require("../middleware/async");


// @desc        GET all bootcamps
// @route       GET /api/v1/bootcamps
// @access      public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  
    const bootcamps = await Bootcamp.find();
    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps });
  
});

// @desc        GET single bootcamp
// @route       GET /api/v1/bootcamps/:id
// @access      public
exports.getSingleBootcamp =  asyncHandler(async (req, res, next) => {
  
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      //add this return statement to exit the block
      return next(
        new ErrorResponse(`Bootcamp of ID ${req.params.id} not found.`, 404)
      );
    }
    res.status(200).json({ success: true, data: bootcamp });
 
});

// @desc        Create bootcamp
// @route       POST /api/v1/bootcamps
// @access      private
exports.createBootcamp =  asyncHandler(async (req, res, next) => {
  
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp,
    });
 
  
});

// @desc        Edit bootcamp
// @route       PUT /api/v1/bootcamps/:id
// @access      private
exports.editBootcamp =  asyncHandler(async (req, res, next) => {
 
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp of ID ${req.params.id} not found.`, 404)
      );
    }
    res.status(200).json({ success: true, data: bootcamp });
 
});

// @desc        Delete bootcamp
// @route       DELETE /api/v1/bootcamps/:id
// @access      private
exports.delBootcamp =  asyncHandler(async (req, res, next) => {
  
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp of ID ${req.params.id} not found.`, 404)
      );
    }
    res.status(200).json({ success: {} });
 
});
