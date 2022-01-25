// Import the functions you need from the SDKs you need
import firebase from 'firebase'
//import {app} from 'firebase'
//import {auth} from 'firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo-At1IhXtQz16Nq4DWv7FA-9D_cOwkLI",
  authDomain: "mis475-auth.firebaseapp.com",
  projectId: "mis475-auth",
  storageBucket: "mis475-auth.appspot.com",
  messagingSenderId: "809400156316",
  appId: "1:809400156316:web:19a947abd010b3e915ed59"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };