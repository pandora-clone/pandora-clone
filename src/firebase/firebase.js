import firebase from "firebase";

var config = {
  apiKey: "AIzaSyDCh1GMPfdsmKhj6GU_UJTtQBoMcPP8sk4",
  authDomain: "pandora-clone-9eadf.firebaseapp.com",
  databaseURL: "https://pandora-clone-9eadf.firebaseio.com",
  projectId: "pandora-clone-9eadf",
  storageBucket: "pandora-clone-9eadf.appspot.com",
  messagingSenderId: "1097925208322"
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
