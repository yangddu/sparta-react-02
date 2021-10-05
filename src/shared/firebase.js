import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB5EsJoywYSSsMk6P-kmTNlzvXrLSma0Ww",
    authDomain: "image-comm-6e91f.firebaseapp.com",
    projectId: "image-comm-6e91f",
    storageBucket: "image-comm-6e91f.appspot.com",
    messagingSenderId: "365159816439",
    appId: "1:365159816439:web:7262491719016128c507f2",
    measurementId: "G-L04TW8V4RP",
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export {auth, apiKey, firestore, storage};