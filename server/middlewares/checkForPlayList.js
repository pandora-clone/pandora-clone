module.exports = function checkForPlayList(req, res, next) {
  const { session } = req;
  if (!session.rctPlayedList) {
    session.rctPlayedList = [];
  }
  // console.log("check for play session ", req.session);

  next();
};
