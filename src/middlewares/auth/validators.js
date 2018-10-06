export default (req, res, next) => {
  const errors = [];
  ['username', 'password'].map(field => {
    if (req.body[field] === undefined) {
      errors.push({
        category: 'validation',
        message: `misssing required ${field} field`
      });
    }
  });

  if (req.body.email && !/(.*)@(.*)\.(.*)/.test(req.body.email)) {
    errors.push({
      category: 'validation',
      message: 'invalid email format'
    });
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      errors
    });
  } else next();
};
