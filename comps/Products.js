import Product from "../comps/Product"
import { dataContext } from "../contexts/dataContext"
import { useContext } from "react"

function Products({products}) {
    const { choosenCategorie, setChoosenCategorie } = useContext(dataContext);
  return (
    <>
      <div className="choosen-categorie">
        <span
          style={{ cursor: "pointer" }}
          onClick={() => setChoosenCategorie("")}
        >
          {choosenCategorie ? "Home" : ""}
        </span>
        {choosenCategorie ? "  >>  " : ""}
        <span>{choosenCategorie}</span>
      </div>
      <div className="products">
        {products
          .filter(
            choosenCategorie
              ? (el) => el.category == choosenCategorie
              : (el) => el
          )
          .map((product) => (
            <Product
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
              category={product.category}
              image={product.image}
            />
          ))}
      </div>
    </>
  );
}

export default Products;
