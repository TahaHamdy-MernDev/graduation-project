const bookCtrl = require("../controllers/bookController");
const { authorizeAdmin, authenticate } = require("../middleware/auth");
const { upload } = require("../utils/upload");
const { validate } = require("../utils/validate");
const { createBookKeys,updateBookKeys } = require("../utils/validation/bookValidation");

const router = require("express").Router();
router.post(
  "/create",
  authorizeAdmin,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "bookFile", maxCount: 1 },
  ]),
  validate(createBookKeys),
  bookCtrl.createBook
);
router.patch(
  "/update/:id",
  authorizeAdmin,
  upload.single("coverImage"),
  validate(updateBookKeys),
  bookCtrl.updateBookById
);
router.get('/get-all',bookCtrl.getAllBooks)
router.post("/leave-comment/:id", authenticate, bookCtrl.addReview);
router.post("/download/:id", bookCtrl.download);
router.delete('/delete/:id',bookCtrl.deleteBookById)
module.exports = router;
