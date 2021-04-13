import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.FIRE_APIKEY,
  authDomain: process.env.FIRE_AUTHDOMAIN,
  projectId: "creativity-com-9fc94",
  storageBucket: process.env.FIRE_STOREBUCK,
  messagingSenderId: "508445377050",
  appId: process.env.FIRE_APPID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
