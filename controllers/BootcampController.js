//import bootcamp model
const Bootcamp = require("../models/BootcampModel");

// @desc        GET all bootcamps
// @route       GET /api/v1/bootcamps
// @access      public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc        GET single bootcamp
// @route       GET /api/v1/bootcamps/:id
// @access      public
exports.getSingleBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      //add this return statement to exit the block
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc        Create bootcamp
// @route       POST /api/v1/bootcamps
// @access      private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (err) {
    res.status(400).json({ succes: false });
  }
};

// @desc        Edit bootcamp
// @route       PUT /api/v1/bootcamps/:id
// @access      private
exports.editBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc        Delete bootcamp
// @route       DELETE /api/v1/bootcamps/:id
// @access      private
exports.delBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
