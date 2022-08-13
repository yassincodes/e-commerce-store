import firebase from "firebase/compat/app";
import "firebase/compat/database"

const firebaseConfig = {
    apiKey: "AIzaSyBbGLCGom4AQpCWQoAqdlOd-gXY1wiCe9c",
    authDomain: "next-js-online-store.firebaseapp.com",
    projectId: "next-js-online-store",
    storageBucket: "next-js-online-store.appspot.com",
    messagingSenderId: "358485096982",
    appId: "1:358485096982:web:61d034d07f401adc5c9337",
    databaseURL: "https://next-js-online-store-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = firebase.initializeApp(firebaseConfig);

export default firebase