import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import firebase from "../../firebase/firebase";

function AddToCartButton({id, title, price, image}) {

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

  const router = useRouter();
  function alertFunction() {
    router.push("/sign");
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

  return (
      <button
        className="button"
        style={{ width: "100%" }}
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
        {productIdArray.includes(id)
          ? "remove from cart"
          : "add to cart"}
      </button>
  );
}

export default AddToCartButton
