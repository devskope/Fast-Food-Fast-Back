export default (req, res) => {
  if (req.body.username === undefined) {
    res.status(400).json({
      success: false,
      message: `misssing required username field`
    });
  }

  if (req.body.password === undefined) {
    res.status(400).json({
      success: false,
      message: `misssing required password field`
    });
  }
};
