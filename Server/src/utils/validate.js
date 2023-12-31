const validate = (schema) => {
  return (req, res, next) => {
    console.log(req.body);
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorDetails = error.details.map((err) => ({
        message: err.message,
      }));
      return res.status(400).json({ success: false, error: errorDetails });
    }
    next();
  };
};

module.exports = { validate };
