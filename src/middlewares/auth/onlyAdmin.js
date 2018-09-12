export default (req, res, next) => {
  if (!req.details.isAdmin) {
    res.status(403).json({
      success: false,
      message: `you dont have sufficient privileges to access the requested resource`
    });
  } else next();
};
