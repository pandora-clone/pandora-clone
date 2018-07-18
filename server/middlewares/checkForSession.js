module.exports = function(req, res, next) {
  const { session } = req;
  if (!session.rctPlayedList) {
    session.rctPlayedList = [];
  }
  console.log("check for session ", req.session);

  next();
};
