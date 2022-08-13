import { useEffect, useState } from "react";
import Image from "next/image";
import firebase from "../firebase/firebase";
import styles from "../styles/Cart.module.css";
import Link from "next/link";

function Cart() {
  // getting data
  const [dataCenter, setDataCenter] = useState();
  useEffect(() => {
    typeof window !== "undefined" &&
      localStorage.getItem("next_online_store_uid") &&
      firebase
        .database()
        .ref(localStorage.getItem("next_online_store_uid") + "/1")
        .on("value", (snapshot) => {
          const snapshotVal = snapshot.val();
          const dataCenter = [];
          for (let id in snapshotVal) {
            dataCenter.push({ id, ...snapshotVal[id] });
          }
          setDataCenter(dataCenter);
        });
  }, []);

  function removeFromCart(id) {
    typeof window !== "undefined" &&
      localStorage.getItem("next_online_store_uid") &&
      firebase
        .database()
        .ref(`${localStorage.getItem("next_online_store_uid")}/1/${id}`)
        .remove();
  }

  const array = []
  function totalPrice() {
    dataCenter && dataCenter.length > 0 && dataCenter.map((data) => {
      array.push(data.price)
    })
    let totalPrice = array.reduce((a,b) => a+b)
    return totalPrice
  }

  return (
    <div>
      {dataCenter ? (
        dataCenter.length > 0 ? (
          <>
            {dataCenter.map((data) => {
              return (
                <div key={data.id} className={styles.productCartPage}>
                  <div className={styles.productCartImage}>
                    <Image
                      src={data.image}
                      width={100}
                      height={100}
                      alt="product image"
                    />
                  </div>
                  <div className={styles.productCartInfo}>
                    <p>{data.title}</p>
                    <p>{data.price} $</p>
                    <button
                      className={styles.button}
                      onClick={() => removeFromCart(data.id)}
                    >
                      remove from list
                    </button>
                  </div>
                </div>
              );
            })}

            <div className={styles.productCartPage} style={{height: "60px"}}>
              <div className={styles.productCartImage}>
                <Image
                  src="/_next/image?url=https%3A%2F%2Ffakestoreapi.com%2Fimg%2F61U7T1koQqL._AC_SX679_.jpg&w=256&q=75"
                  width={100}
                  height={100}
                  alt="product image"
                  style={{visibility: 'hidden'}}
                />
              </div>
              <div className={styles.productCartInfo}>
                <p>totoal price is {totalPrice()} $</p>
              </div>
            </div>

            <div className={styles.placeOrderButtonContainer}>
              <button className={styles.placeOrderButton}>place order</button>
            </div>
          </>
        ) : (
          "no items yet"
        )
      ) : typeof window !== "undefined" &&
        localStorage.getItem("next_online_store_uid") == null ? (
        <div className={styles.cartSignInContainer}>
          <div>
            <p className={styles.cartSignInMessage}>
              you can't see your carts because you're not signed in, yet :)
            </p>
          </div>
          <div>
            <button className={styles.cartSignInButton}>
              <Link href="/sign" style={{ color: "white" }}>
                <span>visit sign in page</span>
              </Link>
            </button>
          </div>
        </div>
      ) : (
        <div> loading </div>
      )}
    </div>
  );
}

export default Cart;
