module.exports = function checkForUser(req, res, next) {
  const { session } = req;
  session.users = [];
  // if (!session.user) {
  //   session.users = [];
  // }

  // console.log("check for user session ", req.session.users);
  next();
};
