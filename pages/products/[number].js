import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "../../comps/buttons/AddToCartButton"
import RotationButton from "../../comps/buttons/RotationButton"

export async function getStaticPaths() {
  const res = await fetch("https://fakestoreapi.com/products/");
  const products = await res.json();

  const paths = products.map((products) => ({
    params: { number: products.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://fakestoreapi.com/products/${params.number}`);
  const product = await res.json();

  return { props: { product } };
}

function singleProduct({ product }) {
  return (
    <div className="product-page">
      <div className="product-image">
      <RotationButton image={product.image} />
      </div>
      <div className="product-info">
        <h1>{product.title}</h1>
        <div>
          <p>price</p>
          <p>{product.price} $</p>
        </div>
        <div>{product.description}</div>
        <div className="buttons">
          <Link href="/">
            <button className="button" style={{ width: "100%" }}>
              return to home
            </button>
          </Link>
          <AddToCartButton id={product.id} title={product.title} price={product.price} image={product.image}  />
        </div>
      </div>
    </div>
  );
}

export default singleProduct;
