export default (req, res, next) => {
  if (!req.user.details) {
    res.status(401).json({
      success: false,
      message: `you must be logged in to access the requested resource`
    });
  } else next();
};
