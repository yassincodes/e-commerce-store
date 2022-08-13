import React, { useState } from "react";
import firebase from "firebase/compat/app";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const authContext = React.createContext();

function AuthContextProvider({ children }) {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [uid, setUid] = useState("");

  const firebaseConfig = {
    apiKey: "AIzaSyBbGLCGom4AQpCWQoAqdlOd-gXY1wiCe9c",
    authDomain: "next-js-online-store.firebaseapp.com",
    projectId: "next-js-online-store",
    storageBucket: "next-js-online-store.appspot.com",
    messagingSenderId: "358485096982",
    appId: "1:358485096982:web:61d034d07f401adc5c9337",
    databaseURL: 
      "https://next-js-online-store-default-rtdb.europe-west1.firebasedatabase.app/"
  };

  const app = firebase.initializeApp(firebaseConfig);

  const auth = getAuth(app);

  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setDisplayName(result.user.displayName);
        setEmail(result.user.email);
        setPhotoURL(result.user.photoURL);
        setUid(result.user.uid);

        localStorage.setItem("next_online_store_uid", result.user.uid);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = async () => {
    signOut(auth)
    .then(() => {
      localStorage.removeItem("next_online_store_uid");
      window.location.reload();
    })
    .catch((error) => {
      // An error happened.
    });
  };

  return (
    <authContext.Provider
      value={{
        email,
        displayName,
        uid,
        photoURL,
        auth,
        signInWithGoogle,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export { AuthContextProvider, authContext };