const getFavList = (req, res, next) => {
  const { id } = req.params;
  req.app
    .get("db")
    .get_favList(id)
    .then(response => {
      // console.log("response from favList: ", response);
      res.status(200).json(response);
    })
    .catch(error => console.log(error));
};

const addFavList = (req, res, next) => {
  const {
    user_id,
    song_name,
    artist_name,
    img,
    preview_url,
    album_id,
    artist_id,
    track_id
  } = req.body;
  req.app
    .get("db")
    .add_favList([
      user_id,
      song_name,
      artist_name,
      img,
      preview_url,
      album_id,
      artist_id,
      track_id
    ])
    .then(response => res.status(200).json(response))
    .catch(error => console.log(error));
};

const deleteFavList = (req, res, next) => {
  const { id } = req.params;
  req.app
    .get("db")
    .delete_favList([id])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => console.log(error));
};

module.exports = {
  getFavList,
  addFavList,
  deleteFavList
};
