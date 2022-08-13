import { useContext, useEffect, useState } from "react";
import { authContext } from "../contexts/authContext";
import Image from "next/image";
import firebase from "../firebase/firebase";
import styles from "../styles/Sign.module.css";
import Link from "next/link";

function Sign() {
  const { signInWithGoogle, logout, email, displayName, photoURL, uid } =
    useContext(authContext);

  function sign() {
    signInWithGoogle();
  }

  // sending data
  const checkout =
    typeof window !== "undefined"
      ? localStorage.getItem("next_online_store_uid")
      : null;
  useEffect(() => {
    if (email && uid && checkout) {
      firebase
        .database()
        .ref(`${localStorage.getItem("next_online_store_uid")}/0`)
        .set({
          uid: uid,
          displayName: displayName,
          email: email,
          photoURL: photoURL,
        });
    }
  }, [email, uid, displayName, photoURL, checkout]);

  // getting data
  const [dataCenter, setDataCenter] = useState();
  useEffect(() => {
    typeof window !== "undefined" &&
      localStorage.getItem("next_online_store_uid") &&
      firebase
        .database()
        .ref(localStorage.getItem("next_online_store_uid"))
        .on("value", (snapshot) => {
          const snapshotVal = snapshot.val();
          const dataCenter = [];
          for (let id in snapshotVal) {
            dataCenter.push({ id, ...snapshotVal[id] });
          }
          setDataCenter(dataCenter);
        });
  }, [uid]);

  if (dataCenter && dataCenter.length > 0) {
    return (
      <div className={styles.container}>
        <div className={styles.userInfo}>
          {dataCenter && (
            <Image
              style={{ borderRadius: "50%" }}
              alt={
                dataCenter && dataCenter.length > 0
                  ? dataCenter[0].displayName + "'s picture"
                  : "no image yet"
              }
              src={
                dataCenter && dataCenter.length > 0
                  ? dataCenter[0].photoURL
                  : ""
              }
              width="200"
              height="200"
            />
          )}
        </div>

        <div className={styles.message}>
          {dataCenter ? (
            <div>
              <p>
                hi {dataCenter && dataCenter[0].displayName} [emoji] you are
                currently signed in, you can now add and delete items from cart
              </p>
              <div className="buttons">
                <Link href="/cart">
                  <button className={styles.button} style={{width: "100%"}}>see your cart</button>
                </Link>
                <button className={styles.button} style={{width: "100%"}} onClick={logout}>
                  log out
                </button>
              </div>
            </div>
          ) : (
            <button onClick={sign}>sign</button>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.signInContainer}>
        <div>
          <p className={styles.signInMessage}>
            sign in so you can add items to the cart
          </p>
        </div>
        <div>
          <button className={styles.signInButton} onClick={sign}>
            sign
          </button>
        </div>
      </div>
    );
  }
}

export default Sign;
