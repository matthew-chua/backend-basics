const express = require("express");

const {
  getCourses,
  getSingleCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/CourseController");

const { protect, authorize } = require("../middleware/auth");


const router = express.Router({ mergeParams: true });

router.route("/").get(getCourses).post(protect, addCourse);
router
  .route("/:id")
  .get(getSingleCourse)
  .put(protect, authorize("publisher", "admin"), updateCourse)
  .delete(protect, authorize("publisher", "admin"), deleteCourse);

module.exports = router;
