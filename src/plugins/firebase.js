import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
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
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase