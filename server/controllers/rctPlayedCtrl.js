const getRctPlay = (req, res) => {
  //   console.log("req session!!!   ", req.session.rctPlayedList);
  res.status(200).json(req.session.rctPlayedList);
};

const addRctPlayed = (req, res, next) => {
  const { trackId } = req.body;
  const { rctPlayedList } = req.session;
  //   console.log("req body", req.body);
  const index = rctPlayedList.findIndex(song => song.id == trackId);
  if (index === -1) {
    rctPlayedList.push(trackId);
    // console.log("user....", req.session);
  }
  res.status(200).send(req.session);
};

module.exports = {
  addRctPlayed,
  getRctPlay
};

// let rctPlayedList = [];
// // let id = 1;

// const getRctPlay = (req, res) => {
//   res.status(200).json(req.session.rctPlayedList);
// };

// const addRctPlayed = (req, res, next) => {
//   const { song_id } = req.body;
//   const { rctPlayedList } = req.session;
//   console.log("req body", req.body);
//   const inRctList = rctPlayedList.find(song => song.id == song_id);
//   if (!inRctList) {
//     rctPlayedList.push(song_id);
//     // id++;
//     console.log("user....", req.session);
//   }
//   res.status(200).send(req.session);
// };

// module.exports = {
//   addRctPlayed,
//   getRctPlay
// };
