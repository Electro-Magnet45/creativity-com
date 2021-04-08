import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBz3beNE88gymLP4IZh4JWRdoZ2HCTnQJU",
  authDomain: "creativity-com-9fc94.firebaseapp.com",
  projectId: "creativity-com-9fc94",
  storageBucket: "creativity-com-9fc94.appspot.com",
  messagingSenderId: "508445377050",
  appId: "1:508445377050:web:f05090c69f13b5692ac7a3",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
