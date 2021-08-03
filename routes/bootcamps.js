const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
} = require("../controllers/bootcamp");

// Include other resourse routers
const courseRouter = require("./courses");

const router = express.Router();

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);

router.route("/").get(getBootcamps).post(createBootcamp);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;

// router.get("/", (req, res) => {
//   res.status(200).json({ success: true, msg: "show all bootcamps" });
// });

// router.get("/:id", (req, res) => {
//   res.status(200).json({ success: true, msg: `get bootcamp ${req.params.id}` });
// });

// router.post("/", (req, res) => {
//   res.status(200).json({ success: true, msg: `posted on bootcamps` });
// });

// router.put("/:id", (req, res) => {
//   res.status(200).json({ success: true, msg: `update bootcamp ${req.params.id}` });
// });

// router.delete("/:id", (req, res) => {
//   res.status(200).json({ success: true, msg: `delete bootcamp ${req.params.id}` });
// });
