const Joi =require('joi')
const PASSWORD_REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
module.exports = {
    registerSchema: Joi.object({
        firstName: Joi.string().required().messages({
            'any.required': 'First name is required.',
            'string.empty': 'First name must not be empty.',
        }),
        lastName: Joi.string().required().messages({
            'any.required': 'Last name is required.',
            'string.empty': 'Last name must not be empty.',
        }),
        email: Joi.string().email().required().messages({
            'any.required': 'Email is required.',
            'string.empty': 'Email must not be empty.',
            'string.email': 'Email must be a valid email address.',
        }),
        password: Joi.string().pattern(PASSWORD_REGEXP).required().messages({
            'any.required': 'Password is required.',
            'string.empty': 'Password must not be empty.',
            'string.pattern.base': 'Password must contain at least 8 characters, including one digit, one lowercase letter, one uppercase letter, and one special character.'

        })
    }),
    loginSchema: Joi.object({
        email: Joi.string().email().required().messages({
            'any.required': 'Email is required.',
            'string.empty': 'Email must not be empty.',
            'string.email': 'Email must be a valid email address.',
        }),
        password: Joi.string().pattern(PASSWORD_REGEXP).required().messages({
            'any.required': 'Password is required.',
            'string.empty': 'Password must not be empty.',
            'string.pattern.base': 'Password must contain at least 8 characters, including one digit, one lowercase letter, one uppercase letter, and one special character.'

        })
    })
}