const Category = require("../models/categoryModel");
const asyncHandler = require("../utils/asyncHandler");
const dbService = require("../utils/dbService");

exports.createCategory = asyncHandler(async (req, res) => {
  let categoryName = req.body.categoryName
  const existingName = await dbService.findOne(Category, { categoryName});
  if (existingName) {
    return res.badRequest({ message: "اسم التصنيف مستخدم بالفعل" });
  }
  const category = await dbService.create(Category, req.body);
  res.success({ data: category });
});
exports.getAll = asyncHandler(async(req,res)=>{
  const categories = await Category.find();
  res.success({ data: categories });
})
 