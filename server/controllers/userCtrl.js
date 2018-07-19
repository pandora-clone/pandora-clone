let savedUser = {};

const login = (req, res, next) => {
  const user_id = req.body.id;
  const username = req.body.display_name;
  const { email } = req.body;

  // console.log(" userCtrl req body", req.body);
  req.session.user = { user_id, username, email };
  console.log("here is req.session at login: ", req.session);
  savedUser = { user_id, username, email };

  res.status(200).send(req.session);
};

const getUser = (req, res) => {
  // console.log("req session!!!   ", req.session);
  res.status(200).json(savedUser);
};

const logout = (req, res, next) => {
  req.session.destroy();
  res.status(200).json(req.session);
};

module.exports = {
  login,
  getUser,
  logout
};
