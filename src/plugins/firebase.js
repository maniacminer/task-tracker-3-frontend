import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
// import firebaseui from 'firebaseui'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAsZw7hZmfnFoBWHTh7pawJJiYz8dluRsA",
  authDomain: "task-tracker-1f469.firebaseapp.com",
  databaseURL: "https://task-tracker-1f469.firebaseio.com",
  projectId: "task-tracker-1f469",
  storageBucket: "task-tracker-1f469.appspot.com",
  messagingSenderId: "157276606683",
  appId: "1:157276606683:web:59fc34a2e468cee7"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Ситуация с Persistence на 2019-05-28:
//Important: For the web, offline persistence is an experimental
//  feature that is supported only by the Chrome, Safari, and Firefox web browsers.
//  Also, if a user opens multiple browser tabs that point to the same
//  Cloud Firestore database,   and offline persistence is enabled,
// Cloud Firestore will work correctly only   in the first tab.

// firebase
//   .firestore()
//   .enablePersistence()
//   .catch(function(err) {
//     console.error(err)
//     if (err.code == "failed-precondition") {
//       // Multiple tabs open, persistence can only be enabled
//       // in one tab at a a time.
//       // ...
//     } else if (err.code == "unimplemented") {
//       // The current browser does not support all of the
//       // features required to enable persistence
//       // ...
//     }
//   })

export default firebase
