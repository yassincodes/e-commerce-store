import { useState, useEffect } from "react";
import firebase from "../firebase/firebase";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'

function Product({ id, title, price, image }) {
  // when a user clicks add to cart
  // 1- build a function that returns displayname from localStorage
  // if a user changes localStorage he'll get no displayName
  // if a user is not logout he'll get no displayName
  // => we will tell the user to sign
  // if a user did not change localStorage and everything is ok
  // => when a user clicks on add to cart we will
  //      add info to cart
  //

  // a state to trigger useEffect when the user clicks on addToCart
  const [trigger, setTrigger] = useState(1);

  // sending data
  function addToCart() {
    typeof window !== "undefined" &&
      localStorage.getItem("next_online_store_uid") &&
      firebase
        .database()
        .ref(`${localStorage.getItem("next_online_store_uid")}/1/${id}`)
        .set({
          id: id,
          title: title,
          price: price,
          image: image,
        });
    setTrigger(trigger + 1);
  }

  function removeFromCart() {
    typeof window !== "undefined" &&
      localStorage.getItem("next_online_store_uid") &&
      firebase
        .database()
        .ref(`${localStorage.getItem("next_online_store_uid")}/1/${id}`)
        .remove();
    setTrigger(trigger + 1);
  }

  const router = useRouter()
  function alertFunction() {
    router.push("/sign")
  }

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
  }, [trigger]);

  let productIdArray = [];
  dataCenter &&
    dataCenter.map((data) => {
      productIdArray.push(data.id);
    });

  // building a function that will get displayName

  return (
    <div className="product">
      <Image src={image} width={100} height={100} alt="product image" />
      <div className="product-price">
        <p>{price} $</p>
      </div>
      <h4 className="product-title">{title}</h4>
      <div className="buttons">
        <Link href={`/products/${id}`}>
          <button className="button">more details</button>
        </Link>
        <button
          className="button"
          onClick={
            typeof window !== "undefined" &&
            localStorage.getItem("next_online_store_uid") &&
            dataCenter
              ? productIdArray.includes(id)
                ? removeFromCart
                : addToCart
              : alertFunction
          }
        >
          {productIdArray.includes(id) ? "remove from cart" : "add to cart"}
        </button>
      </div>
    </div>
  );
}

export default Product;
