module.exports = function checkForUser(req, res, next) {
  const { session } = req;
  session.user = {};

  // console.log("check for user session ", req.session.users);
  next();
};
