import Head from "next/head";
import Products from "../comps/Products";

export async function getServerSideProps() {
  const req = await fetch("https://fakestoreapi.com/products");
  const products = await req.json();

  return {
    props: { products },
  };
}

function index({ products }) {
  return (
    <div className="App">
      <Head>
        <title>Home</title>
      </Head>
      <Products
        products={products}
      />
    </div>
  );
}

export default index;
