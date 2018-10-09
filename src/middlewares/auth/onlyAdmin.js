export default (req, res, next) => {
  if (!req.user.is_admin) {
    res.status(401).json({
      success: false,
      message: `You have insufficient privileges to access the requested content`
    });
  } else next();
};
