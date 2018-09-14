export default (req, errors) => {
  ['category', 'name', 'qty'].map(field => {
    if (req.body[field] === undefined) {
      errors.push({
        message: `misssing required "${field}" field`
      });
    }
  });
};
