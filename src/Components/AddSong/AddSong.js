import React, { Component } from "react";
import Dropzone from "react-dropzone";
import SpotifyWebApi from "spotify-web-api-js";
import { database, storage } from "../../firebase/firebase";
import availableCategories from "./availableCategories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faMusic } from "@fortawesome/free-solid-svg-icons";
import { Link, Route, Redirect } from "react-router-dom";

const spotifyApi = new SpotifyWebApi();

class AddSong extends Component {
  constructor(props) {
    super(props);
    this.userRef = null;

    this.state = {
      songName: "",
      author: "",
      songGenre: "",
      songUrl: "",
      imageUrl: "",
      user: null,
      image: [],
      song: []
    };

    this.userRef = database.ref("/users");
    this.songsRef = database.ref("/songs");
    this.storageRef = storage.ref("/user-data");

    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
    this.addSong = this.addSong.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async onImageDrop(file) {
    const acceptedImageFormats = ["jpg", "png", "jpeg"];
    const acceptedAudioFormats = ["mp3"];
    let that = this;
    switch (file[0].type) {
      case "image/jpeg":
      case "image/png":
        this.setState({ image: file });
        break;
      case "audio/mp3":
        this.setState({ song: file });
        break;
      default:
        alert("Sorry this format is not supported " + file[0].type);
    }

    console.log("Format", file[0].type);
    const uploadTask = this.storageRef
      .child(this.state.user.id)
      .child(file[0].name)
      .put(file[0], { contentType: file[0].type });

    await uploadTask.on("state_changed", snapshot => {
      console.log(snapshot);
      console.log(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100 + "%"
      );

      if (snapshot.bytesTransferred == snapshot.totalBytes) {
        return uploadTask.snapshot.ref
          .getDownloadURL()
          .then(function(downloadURL) {
            console.log(typeof downloadURL);
            console.log("File available at", downloadURL);

            if (acceptedImageFormats.some(el => downloadURL.includes(el))) {
              that.setState({ imageUrl: downloadURL });
            } else {
              that.setState({ songUrl: downloadURL });
            }
          });
      }
    });
  }

  handleSubmit(event) {
    const file = event.target.files[0];
    const uploadTask = this.storageRef
      .child(file.name)
      .put(file, { contentType: file.type });
  }

  componentDidMount() {
    this.getMe();
  }

  handleChangeInput(event) {
    let inputType = event.target.name;
    this.setState({
      [inputType]: event.target.value
    });
  }

  addSong() {
    this.songsRef.push({
      userId: this.state.user.id,
      songName: this.state.songName,
      author: this.state.author,
      songGenre: this.state.songGenre,
      songUrl: this.state.songUrl,
      imageUrl: this.state.imageUrl
    });
  }
  getMe = () => {
    spotifyApi.getMe().then(response => {
      this.setState({
        user: response
      });
      console.log(response);
      this.userRef.child(response.id).set(response);
    });
  };

  chooseCategory(category) {
    this.setState({
      songGenre: category
    });
    console.log(this.state.songGenre);
  }

  render() {
    let displayCategories = availableCategories.availableCategories.map(
      (element, i) => {
        return (
          <div
            key={i}
            className={
              this.state.songGenre === element.name
                ? "addsong-image-category-container active-category"
                : "addsong-image-category-container"
            }
          >
            <img
              onClick={() => this.chooseCategory(element.name)}
              src={element.url}
              alt={element.name}
            />
            <h3 className="addsong-image-category-text">{element.name}</h3>
          </div>
        );
      }
    );
    console.log(availableCategories.availableCategories);
    return (
      <div className="addsong-wrapper">
        <h1 style={{ textAlign: "center" }}>Lets add your song</h1>

        {console.log(this.state.image)}
        {console.log(this.state.song)}
        <div className="addsong-category-wrapper">{displayCategories}</div>

        <div className="addsong-input-container">
          <div className="input-fields">
            <h2>Title</h2>
            <input
              onChange={this.handleChangeInput}
              name="songName"
              type="text"
            />
          </div>
          <div className="input-fields">
            <h2>Author</h2>
            <input
              onChange={this.handleChangeInput}
              name="author"
              type="text"
            />
          </div>

          <div>
            {this.state.image.length === 0 ? (
              <Dropzone
                className="dropzone_image"
                style={{ position: "absolute" }}
                onChange={this.handleSubmit}
                onDrop={this.onImageDrop.bind(this)}
              >
                <FontAwesomeIcon className="image-icon" icon={faImage} />
                <p>Select image to upload.</p>
              </Dropzone>
            ) : (
              <img
                className="image-uploaded"
                src={this.state.image[0].preview}
                alt=""
              />
            )}
            {this.state.song.length === 0 ? (
              <Dropzone
                className="dropzone_audio"
                style={{ position: "absolute" }}
                onChange={this.handleSubmit}
                onDrop={this.onImageDrop.bind(this)}
              >
                <FontAwesomeIcon className="music-icon" icon={faMusic} />
                <p>Select audio to upload.</p>
              </Dropzone>
            ) : (
              <audio className="song-uploaded" controls>
                <source
                  className="player"
                  src={this.state.song[0].preview}
                  type="audio/mp3"
                />
              </audio>
            )}
          </div>
        </div>

        <div className="submit-field">
          <button className="submit-button" onClick={this.addSong}>
            <h3>Submit</h3>
          </button>
        </div>
        {console.log(this.state.image[0])}

        <img src={this.state.image[0]} alt="" />
      </div>
    );
  }
}
export default AddSong;
