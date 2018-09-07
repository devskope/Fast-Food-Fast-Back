export default (req, res) => {
  ['category', 'name', 'qty'].map(field => {
    if (req.body[field] === undefined) {
      res.status(400).json({
        success: false,
        message: `misssing required "${field}" field`
      });
    }
  });
};
