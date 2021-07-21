// @desc        GET all bootcamps
// @route       GET /api/v1/bootcamps       
// @access      public
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({ success: "true", message: "get all bootcamps"})
}

// @desc        GET single bootcamp
// @route       GET /api/v1/bootcamps/:id    
// @access      public
exports.getSingleBootcamp = (req, res, next) => {
    res.status(200).json({ success: "true", message: `show bootcamp ${req.params.id}`})
}

// @desc        Create bootcamp
// @route       POST /api/v1/bootcamps       
// @access      private
exports.createBootcamp = (req, res, next) => {
    res.status(200).json({ success: "true", message: "create a new bootcamp"})
}

// @desc        Edit bootcamp
// @route       PUT /api/v1/bootcamps/:id       
// @access      private
exports.editBootcamp = (req, res, next) => {
    res.status(200).json({ success: "true", message: `update bootcamp ${req.params.id}`})
}


// @desc        Delete bootcamp
// @route       DELETE /api/v1/bootcamps/:id       
// @access      private
exports.delBootcamp = (req, res, next) => {
    res.status(200).json({ success: "true", message: `deleted bootcamp ${req.params.id}`})
}