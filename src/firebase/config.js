// import firebase from 'firebase/app'
// import 'firebase/firestore'
// import 'firebase/auth'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyArhDqUp0pWARiYD5DwtIkrw_vzBrubxGo",
  authDomain: "simple-netflix-vue.firebaseapp.com",
  projectId: "simple-netflix-vue",
  storageBucket: "simple-netflix-vue.appspot.com",
  messagingSenderId: "478386080838",
  appId: "1:478386080838:web:f782adf7308cab906d0e47"
};

//init firebase
firebase.initializeApp(firebaseConfig)

//init firestore service
const projectFirestore = firebase.firestore()

const projectAuth = firebase.auth()

//timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, timestamp }