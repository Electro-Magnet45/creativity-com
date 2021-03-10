import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAUQG8gvrs0q6Dr1rzfCtxnK0baLD6bSa4",
  authDomain: "creativity-com.firebaseapp.com",
  projectId: "creativity-com",
  storageBucket: "creativity-com.appspot.com",
  messagingSenderId: "1026259966778",
  appId: "1:1026259966778:web:1ca7ec1b7320c5e9bbce03",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
