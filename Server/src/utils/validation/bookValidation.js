const Joi = require('joi');
module.exports={
createBookKeys : Joi.object({
    title: Joi.string().required().messages({
      'any.required': 'Title is required.',
      'string.empty': 'Title cannot be empty.',
    }),
    // publishedBy: Joi.string().required().messages({
    //   'any.required': 'PublishedBy is required.',
    //   'string.empty': 'PublishedBy cannot be empty.',
    // }),
    rate: Joi.number().required().messages({
      'any.required': 'Rate is required.',
      'number.base': 'Rate must be a number.',
    }),
    // reviews: Joi.array().items( 
    //   Joi.object({
    //     user: Joi.string().required().messages({
    //       'any.required': 'Review user is required.',
    //       'string.empty': 'Review user cannot be empty.',
    //     }),
    //     text: Joi.string().required().messages({
    //       'any.required': 'Review text is required.',
    //       'string.empty': 'Review text cannot be empty.',
    //     }),
    //   })
    // ),
    category: Joi.string().required().messages({
      'any.required': 'Category is required.',
      'string.empty': 'Category cannot be empty.',
    }),
    author: Joi.string().required().messages({
      'any.required': 'Author is required.',
      'string.empty': 'Author cannot be empty.',
    }),

    downloads: Joi.number().default(0),
    description: Joi.string(),
    file: Joi.string(),
    coverImage: Joi.string(),
  }),
  updateBookKeys : Joi.object({
    title: Joi.string().required().messages({
      'any.required': 'Title is required.',
      'string.empty': 'Title cannot be empty.',
    }),

    category: Joi.string().required().messages({
      'any.required': 'Category is required.',
      'string.empty': 'Category cannot be empty.',
    }),
    author: Joi.string().required().messages({
      'any.required': 'Author is required.',
      'string.empty': 'Author cannot be empty.',
    }),
    downloads: Joi.number().default(0),
    description: Joi.string(),
    file: Joi.string(),
    coverImage: Joi.string(),
  }),
}
     