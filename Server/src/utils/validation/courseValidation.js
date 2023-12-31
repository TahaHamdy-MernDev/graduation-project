const Joi = require("joi");
module.exports = {
  createCourseKeys: Joi.object({
    name: Joi.string().required().messages({
      "any.required": "اسم الدورة مطلوب",
      "string.empty": "يجب ألا يكون اسم الدورة فارغًا",
    }),
    instructor: Joi.string().required().messages({
      "any.required": "اسم المحاضر مطلوب",
      "string.empty": "يجب ألا يكون اسم المحاضر فارغًا",
    }),
    price: Joi.number().required().messages({
      "any.required": "سعر الدورة مطلوب",
      "number.base": "يجب أن يكون سعر الدورة رقمًا",
    }),
    description: Joi.string().required().messages({
      "any.required": "وصف الدورة مطلوب",
      "string.empty": "يجب ألا يكون وصف الدورة فارغًا",
    }),
    subDescription: Joi.string().required().messages({
      "any.required": "الوصف مصغر مطلوب",
      "string.empty": "يجب ألا يكون وصف الدورة فارغًا",
    }),
    category: Joi.string().required().messages({
      'any.required': 'Category is required.',
      'string.empty': 'Category cannot be empty.',
    }),
    whatUWillLearn: Joi.array().items(Joi.string()).messages({
      "array.base": "يجب أن يكون مصفوفة",
    }),
    image: Joi.string(),
  }),
  updateCourseKeys: Joi.object({
    name: Joi.string().messages({
      "string.empty": "يجب ألا يكون اسم الدورة فارغًا",
    }),
    price: Joi.number().messages({
      "number.base": "يجب أن يكون سعر الدورة رقمًا",
    }),
    category: Joi.string().messages({
      'string.empty': 'Category cannot be empty.',
    }),
    instructor: Joi.string().messages({
      "string.empty": "يجب ألا يكون اسم المحاضر فارغًا",
    }),
    description: Joi.string().messages({
      "string.empty": "يجب ألا يكون وصف الدورة فارغًا",
    }),
    whatUWillLearn: Joi.array().items(Joi.string()).messages({
      "array.base": "يجب أن يكون مصفوفة",
    }),
    subDescription: Joi.string().messages({
  
      "string.empty": "يجب ألا يكون وصف الدورة المصغر فارغًا",
    }),
    image: Joi.string(),
  }),
};
