//import bootcamp model
const User = require("../models/UserModel");

//import error class
const ErrorResponse = require("../utils/errorResponse");

const asyncHandler = require("../middleware/async");

// @desc        Register new user
// @route       POST /api/v1/auth/register
// @access      public

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //create a user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sendTokenResponse(user, 200, res);
});

// @desc        Login
// @route       GET /api/v1/auth/login
// @access      public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //validate email and password
  if (!email || !password) {
    return next(new ErrorResponse("Please enter an email and password", 400));
  }

  //check if user exists
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  const validated = await user.matchPassword(password);

  if (!validated) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  sendTokenResponse(user, 200, res);
});

//get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  //create token
  const token = user.getSignedJwtToken();

  const options = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 3600 * 1000 ),
        httpOnly: true
  };

  //set cookie secure field to true if in production
  if (process.env.NODE_ENV ==='production') {
      options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
      success: true,
      token
  })
};

// @desc        Get current logged in user
// @route       POST /api/v1/auth/me
// @access      private

exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        data: user
    })
  });
