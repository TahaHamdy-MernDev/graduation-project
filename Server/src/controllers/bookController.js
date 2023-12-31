const asyncHandler = require("express-async-handler");
const dbService = require("../utils/dbService");
const Book = require("../models/bookModel");
const fs = require("fs");
const path = require("path");
exports.createBook = asyncHandler(async (req, res) => {
  let bookObj = {
    ...req.body,
    publishedBy: req.user._id,
    file: `books/${req.files.bookFile[0].filename}`,
    coverImage: `books/${req.files.coverImage[0].filename}`,
  };
  const book = await dbService.create(Book, bookObj);
  res.success({ data: book });
});

exports.getAllBooks = asyncHandler(async (req, res) => {
  const books = await dbService.findMany(Book, {});
  res.success({ data: books });
});

exports.getBookById = asyncHandler(async (req, res) => {
  const book = await dbService.findOne(Book, { _id: req.params.id });
  if (!book) {
    return res.recordNotFound({ message: "Book not found" });
  }
  res.success({ data: book });
});
exports.addReview = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const book = await dbService.findOne(Book, { _id: req.params.id });
  if (!book) {
    return res.recordNotFound({ message: "Book not found" });
  }
  book.reviews.push({ user: req.user._id, text });
  console.log(book.reviews);
  await book.save();
  res.success({ data: book });
});

exports.updateBookById = asyncHandler(async (req, res) => {
  const existingBook = await dbService.findOne(Book, { _id: req.params.id });
  if (!existingBook) {
    return res.recordNotFound({ message: "Book not found" });
  }
  if (req.file && req.file.filename) {
    const newCoverImage = req.file.filename;
    if (newCoverImage) {
      if (existingBook.coverImage) {
        const imagePath = path.join(
          __dirname,
          "..",
          "uploads",
          existingBook.coverImage
        );
        if (fs.existsSync(imagePath)) {
          console.log("Image path exists. Deleting...");
          fs.unlinkSync(imagePath);
          console.log("Image deleted successfully.");
          req.body.coverImage = `books/${req.file.filename}`;
        }
      }
    }
  }

  const book = await dbService.updateOne(
    Book,
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!book) {
    return res.recordNotFound({ message: "Book not found" });
  }
  res.success({ data: book });
});
exports.download =asyncHandler(async(req,res)=>{
  const existingBook = await dbService.findOne(Book, { _id: req.params.id });
  if (!existingBook) {
    return res.recordNotFound({ message: "Book not found" });
  }
  existingBook.downloads += 1;
  existingBook.save();
  res.success();
})
exports.deleteBookById = asyncHandler(async (req, res) => {
  const book = await dbService.deleteOne(Book, { _id: req.params.id });
  if (!book) {
    return res.recordNotFound({ message: "Book not found" });
  }
  res.success({ message: "Book deleted successfully" });
});
