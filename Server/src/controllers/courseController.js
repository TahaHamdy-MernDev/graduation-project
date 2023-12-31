const asyncHandler = require("express-async-handler");
const dbService = require("../utils/dbService");
const Course = require("../models/courseModel");
const path = require("path");
const fs = require("fs");
exports.createCourse = asyncHandler(async (req, res) => {
  req.body.image = `course/${req.file.filename}`;
  const course = await dbService.create(Course, req.body);
  res.success({ data: course });
});
exports.getAllCourses = asyncHandler(async (req, res) => {
  const courses = await dbService.findMany(Course, {});
  res.success({ data: courses });
});
exports.getCourseById = asyncHandler(async (req, res) => {
  const course = await dbService.findOne(Course, { _id: req.params.id });
  if (!course) {
    return res.recordNotFound({ message: "course not found" });
  }
  res.success({ data: course });
});
exports.requestCourse = asyncHandler(async (req, res) => {
  const course = await dbService.findOne(Course, {
    _id: req.params.id,
  });
  if (!course) {
    return res.recordNotFound({ message: "Course not found" });
  }
  course.requestList.push({ user: req.user._id });

  await course.save();
  res.success({ data: course });
});
exports.updateCourseById = asyncHandler(async (req, res) => {
  const existingCourse = await dbService.findOne(Course, {
    _id: req.params.id,
  });
  if (!existingCourse) {
    return res.recordNotFound({ message: "Course not found" });
  }
  if (req.file && req.file.filename) {
    const newImage = req.file.filename;
    if (newImage) {
      if (existingCourse.image) {
        const imagePath = path.join(
          __dirname,
          "..",
          "uploads",
          existingCourse.image
        );
        if (fs.existsSync(imagePath)) {
          console.log("Image path exists. Deleting...");
          fs.unlinkSync(imagePath);
          console.log("Image deleted successfully.");
          req.body.image = `course/${req.file.filename}`;
        }
      }
    }
  }

  const course = await dbService.updateOne(
    Course,
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!course) {
    return res.recordNotFound({ message: "Course not found" });
  }
  res.success({ data: course });
});
exports.deleteCourseById = asyncHandler(async (req, res) => {
  const course = await dbService.deleteOne(Course, { _id: req.params.id });
  if (!course) {
    return res.recordNotFound({ message: "Course not found" });
  }
  res.success();
});
