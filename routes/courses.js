const express = require("express");
const {
  getCourses,
  getCoursesById,
  createCourse,
  deleteCourseById,
  updateCourse,
} = require("../controllers/course");

const router = express.Router({ mergeParams: true });

router.route("/").get(getCourses).post(createCourse);
router
  .route("/:id")
  .get(getCoursesById)
  .delete(deleteCourseById)
  .put(updateCourse);

module.exports = router;
