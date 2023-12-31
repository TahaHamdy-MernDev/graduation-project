const Joi = require("joi");

module.exports = {
  createCategoryKeys: Joi.object({
    categoryName: Joi.string().trim().required().messages({
        'any.required': 'حقل اسم التصنيف مطلوب',
        'string.empty': 'حقل اسم التصنيف يجب أن لا يكون فارغًا',
      }),
      categoryDescription: Joi.string().trim().required().messages({
        'any.required': 'حقل وصف التصنيف مطلوب',
        'string.empty': 'حقل وصف التصنيف يجب أن لا يكون فارغًا',
      }),
  }),
};
