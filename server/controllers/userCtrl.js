const getUser = (req, res) => {
  console.log("req session!!!   ", req.session);
  res.status(200).json(req.session.users);
};
// const login = (req, res, next) => {
//   if (
//     req.body.id === req.session.users.user_id
//     // && req.body.email === req.session.users.email
//   ) {
//     console.log(req.body.display_name);
//     req.session.users.username = req.body.display_name;
//     console.log("this userCtl login", req.session.users);
//     res.status(200).json();
//   } else {
//     res.status(500).json("unauthorized");
//   }
// };
const login = (req, res, next) => {
  const user_id = req.body.id;
  const username = req.body.display_name;
  const { email } = req.body;
  const { users } = req.session;
  console.log("here is req.session at login: ", req.session);

  console.log(" userCtrl req body", req.body);
  const index = users.findIndex(user => user.user_id == user_id);
  if (index === -1) {
    users.push({ user_id, username, email });
    console.log(" this is userCtrl req session users....", users);
  }
  res.status(200).send(req.session);
};

const logout = (req, res, next) => {
  req.session.destroy();
  res.status(200).json(req.session);
};

module.exports = {
  login,
  //   register,
  getUser,
  logout
};
