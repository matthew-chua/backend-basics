const express = require("express");
const {
  getBootcamps,
  getSingleBootcamp,
  createBootcamp,
  editBootcamp,
  delBootcamp,
  getBootcampsInRadius,
} = require("../controllers/BootcampController");

//include other resource routers
const courseRouter = require("./courses");

const router = express.Router();

//re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route("/").get(getBootcamps).post(createBootcamp);

router
  .route("/:id")
  .get(getSingleBootcamp)
  .put(editBootcamp)
  .delete(delBootcamp);

module.exports = router;
