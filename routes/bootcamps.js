const express = require("express");
const {
  getBootcamps,
  getSingleBootcamp,
  createBootcamp,
  editBootcamp,
  delBootcamp,
  getBootcampsInRadius,
} = require("../controllers/BootcampController");

const { protect, authorize } = require("../middleware/auth");

//include other resource routers
const courseRouter = require("./courses");

const router = express.Router();

//re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route("/").get(getBootcamps).post(protect, authorize("publisher", "admin"), createBootcamp);

router
  .route("/:id")
  .get(getSingleBootcamp)
  .put(protect, authorize("publisher", "admin"), editBootcamp)
  .delete(protect, authorize("publisher", "admin"), delBootcamp);

module.exports = router;
