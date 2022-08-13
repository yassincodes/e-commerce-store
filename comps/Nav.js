import { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Link from "next/link";
import styles from "../styles/Nav.module.css";
import { dataContext } from "../contexts/dataContext";
import { useContext } from "react";
// note: you should make cards and Sign in Icon form
function Nav() {
  const { setChoosenCategorie } = useContext(dataContext);
  const userSVG = (
    <svg
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      aria-labelledby="personIconTitle"
      stroke="#2329D6"
      strokeWidth="1"
      strokeLinecap="square"
      strokeLinejoin="miter"
      fill="none"
      color="#2329D6"
    >
      {" "}
      <title id="personIconTitle">Person</title>{" "}
      <path d="M4,20 C4,17 8,17 10,15 C11,14 8,14 8,9 C8,5.667 9.333,4 12,4 C14.667,4 16,5.667 16,9 C16,14 13,14 14,15 C16,17 20,17 20,20" />{" "}
    </svg>
  );
  const cartSVG = (
    <svg
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      aria-labelledby="bagIconTitle"
      stroke="#2329D6"
      strokeWidth="1"
      strokeLinecap="square"
      strokeLinejoin="miter"
      fill="none"
      color="#2329D6"
    >
      {" "}
      <title id="bagIconTitle">Bag</title>{" "}
      <rect width="14" height="12" x="5" y="7" />{" "}
      <path d="M8 7a4 4 0 1 1 8 0" />{" "}
    </svg>
  );
  const menuSVG = (
    <svg
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      aria-labelledby="hamburgerIconTitle"
      stroke="#2329D6"
      strokeWidth="1"
      strokeLinecap="square"
      strokeLinejoin="miter"
      fill="none"
      color="#2329D6"
    >
      {" "}
      <title id="hamburgerIconTitle">Menu</title>{" "}
      <path d="M6 7L18 7M6 12L18 12M6 17L18 17" />{" "}
    </svg>
  );
  const searchSVG = (
    <svg
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      aria-labelledby="searchIconTitle"
      stroke="#2329D6"
      strokeWidth="1"
      strokeLinecap="square"
      strokeLinejoin="miter"
      fill="none"
      color="#2329D6"
    >
      {" "}
      <title id="searchIconTitle">Search</title>{" "}
      <path d="M14.4121122,14.4121122 L20,20" />{" "}
      <circle cx="10" cy="10" r="6" />{" "}
    </svg>
  );
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <div className={styles.nav}>
      <div className={styles.icons}>
        <div>
          <a>{searchSVG}</a>
        </div>
        <div>
          <Link href="/sign">
            <a>{userSVG}</a>
          </Link>
        </div>
        <div>
          <Link href="/cart">
            <a>{cartSVG}</a>
          </Link>
        </div>
        <div className={styles.menu}>
          <a onClick={toggleDrawer}>{menuSVG}</a>
        </div>
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="left"
          className={styles.categoriesPhoneViewContainer}
        >
          <div>
            <div>categories</div>
            <div className={styles.categoriesPhoneView}>
            <div
                className={styles.categoriePhoneView}
                onClick={() => {setChoosenCategorie(""); setIsOpen(false)}}
              >
                <Link href="/">all</Link>
              </div>
              <div
                className={styles.categoriePhoneView}
                onClick={() => {setChoosenCategorie("electronics"); setIsOpen(false)}}
              >
                <Link href="/">electronics</Link>
              </div>
              <div
                className={styles.categoriePhoneView}
                onClick={() => {setChoosenCategorie("jewelery"); setIsOpen(false)}}
              >
                <Link href="/">jewelery</Link>
              </div>
              <div
                className={styles.categoriePhoneView}
                onClick={() => {setChoosenCategorie("men's clothing"); setIsOpen(false)}}
              >
                <Link href="/">men's clothing</Link>
              </div>
              <div
                className={styles.categoriePhoneView}
                onClick={() => {setChoosenCategorie("women's clothing"); setIsOpen(false)}}
              >
                <Link href="/">women's clothing</Link>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
      <div className={styles.title}>
        <Link href="/">
          <h1 style={{ cursor: "pointer" }}>minimalist store</h1>
        </Link>
      </div>
      <div className={styles.categories}>
        <div
          style={{ marginLeft: "5px", marginRight: "5px" }}
          onClick={() => setChoosenCategorie("")}
        >
          <Link href="/">all</Link>
        </div>

        <div
          style={{ marginLeft: "5px", marginRight: "5px" }}
          onClick={() => setChoosenCategorie("electronics")}
        >
          <Link href="/">electronics</Link>
        </div>
        <div
          style={{ marginLeft: "5px", marginRight: "5px" }}
          onClick={() => setChoosenCategorie("jewelery")}
        >
          <Link href="/">jewelery</Link>
        </div>
        <div
          style={{ marginLeft: "5px", marginRight: "5px" }}
          onClick={() => setChoosenCategorie("men's clothing")}
        >
          <Link href="/">men's clothing</Link>
        </div>
        <div
          style={{ marginLeft: "5px", marginRight: "5px" }}
          onClick={() => setChoosenCategorie("women's clothing")}
        >
          <Link href="/">women's clothing</Link>
        </div>
      </div>
    </div>
  );
}

export default Nav;
