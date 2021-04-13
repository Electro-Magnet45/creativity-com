import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRE_APIKEY,
  authDomain: process.env.REACT_APP_FIRE_AUTHDOMAIN,
  projectId: "creativity-com-9fc94",
  storageBucket: process.env.REACT_APP_FIRE_STOREBUCK,
  messagingSenderId: "508445377050",
  appId: process.env.REACT_APP_FIRE_APPID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
