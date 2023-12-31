const { authenticate } = require("passport");
const categoryCtrl = require("../controllers/categoryController");
const { authorizeAdmin } = require("../middleware/auth");
const { validate } = require("../utils/validate");
const {
  createCategoryKeys,
} = require("../utils/validation/categoryValidation");

const router = require("express").Router();
router.post(
  "/create",
  authorizeAdmin,
  validate(createCategoryKeys),
  categoryCtrl.createCategory
);
router.get("/get-all", categoryCtrl.getAll);
module.exports = router;
