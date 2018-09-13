export default (req, errors) => {
  ['username', 'password'].map(field => {
    if (req.body[field] === undefined) {
      errors.push({
        message: `misssing required ${field} field`
      });
    }
  });
};
