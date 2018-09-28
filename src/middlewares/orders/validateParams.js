import { jsonParse } from '../../helpers';

export default (req, res, next) => {
  const { qty } = req.body;
  const errors = [];
  ['category', 'name', 'qty'].map(field => {
    if (req.body[field] === undefined) {
      errors.push({
        category: 'validation',
        message: `misssing required "${field}" field`
      });
    }
  });

  if (typeof jsonParse(qty) !== 'number') {
    errors.push({
      category: 'validation',
      message: `qty should be a number`
    });
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      errors
    });
  } else next();
};
