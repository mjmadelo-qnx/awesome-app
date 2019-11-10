// import something here
import firebase from "firebase/app"
import "firebase/firestore"
import { firestorePlugin } from "vuefire"

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDuZZd2sY1fP6-oTeK4MfxVA9kFVk9lDsA",
  authDomain: "music-list-na-malupet.firebaseapp.com",
  databaseURL: "https://music-list-na-malupet.firebaseio.com",
  projectId: "music-list-na-malupet",
  storageBucket: "music-list-na-malupet.appspot.com",
  messagingSenderId: "210129327752",
  appId: "1:210129327752:web:ebcf125d3924ab2c2d713d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
// "async" is optional
export default async ({ Vue }) => {
  // something to do
  // this.$db -> Global
  Vue.use(firestorePlugin);
  Vue.prototype.$db = db;
}