import * as firebase from 'firebase';
//import firestore from 'firebase/firestore';
const settings = {timestampsInSnapshots: true};
var firebaseConfig = {
    apiKey: "AIzaSyBQbaVY0k5sX3ooIy8mRNeUowwQvNlNRaU",
    authDomain: "todolist-c1f36.firebaseapp.com",
    databaseURL: "https://todolist-c1f36.firebaseio.com",
    projectId: "todolist-c1f36",
    storageBucket: "todolist-c1f36.appspot.com",
    messagingSenderId: "1081374246580",
    appId: "1:1081374246580:web:5d1a4064e34c042c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings(settings);
export default firebase;