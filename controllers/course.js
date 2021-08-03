const Course = require("../models/Course");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc   GET courses
// @route  GET /api/v1/courses
// @route  GET /api/v1/bootcamps/:bootcampId/courses
// @access Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find();
  }

  const courses = await query;

  if (!courses) {
    return next(new ErrorResponse(`Courses not found`, 404));
  }

  res.status(200).json({ success: true, count: courses.length, data: courses });
});

// @desc   GET courses by Id
// @route  GET /api/v1/courses/:id
// @access Public
exports.getCoursesById = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  res.status(200).json({ success: true, data: course });
});

// @desc   POST create course
// @route  POST /api/v1/courses/:id
// @access Private
exports.createCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.create(req.body);

  res.status(201).json({ success: true, data: course });
});

// @desc   PUT update a course
// @route  PUT /api/v1/courses/:id
// @access Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!course) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(201).json({ success: true, data: course });
});

// @desc   DLETE courses
// @route  DELETE /api/v1/courses/:id
// @access Private
exports.deleteCourseById = asyncHandler(async (req, res, next) => {
  const course = await Course.findByIdAndDelete(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});
