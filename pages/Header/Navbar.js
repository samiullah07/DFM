import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useReducer, useState } from "react";
import Image from "next/image";
import { Button, Col, Offcanvas, Row } from "react-bootstrap";
import { CartContext } from "../_app";
import { Accordion } from "react-bootstrap";
import MobileNav from "./MobileNav";
import { CartIcon, Search, Setting, User, Heart } from "../../styles/Svg";
import { auth, db } from "../../FirebaseConfig";
import { getDocs, doc, collection, onSnapshot } from "firebase/firestore";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";
import SearchComponent from "./SearchComponent";

const menu =
  "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/BlogImages%2Fm_menu.jpg?alt=media&token=59b52d5e-016c-4f48-ab5b-0f7a12ffefe6";
const menu1 =
  "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/BlogImages%2Fmenu2.jpg?alt=media&token=e866cf87-6ff2-4cb7-abaa-554646b7d27e";
const logoImage =
  "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/Diasspora%20Finals%2FDiasspora%20Primary%20Logo-15.png?alt=media&token=7d128ef2-34cc-4877-b752-5b1545663660";

const NavBar = () => {
  const [textToDisplay, setTextToDisplay] = useState(null);
  const [orderHistory, setOrderHistory] = useState(null);
  const [userName, setUserName] = useState(null);
  const [wishlist, SetWishList] = useState(null);
  const { cart, setCart } = useContext(CartContext);
  const [show, setShow] = useState(false);
  const [itemList, setItemList] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [cartLength, setCartLength] = useState(0);
  const [wishListLength, setWishListLength] = useState(0);
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const Login = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          await userLoggedIn(user.uid, user.email);
          await userWishList(user.uid);
        } else {
          userLoggedOut();
        }
      });
    };

    const cartUpdate = () => {
      setCartLength(cart.length);
    };

    const cartUserUpdate = (length) => {
      setCartLength(length);
    };

    const wishlistUserUpdate = (length) => {
      setWishListLength(length);
    };

    const orderHistory = async () => {};

    const userLoggedIn = async (userId, userEmail) => {
      let fullN = "";

      const userDocRef = doc(db, "customers", userId);
      const url = new URL(window.location);
      window.history.pushState({}, "", url);

      const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          const userCart = userData.cart || [];

          const firstN = userData.firstName;
          const lastN = userData.lastName;
          fullN = `${firstN} ${lastN}`;
          setItemList(userCart);
          cartUserUpdate(userCart.length);

          setUserName(
            <Link href="#">
              <a className="dropdown-item font-weight-bolder">
                <span className="m-space">
                  <i className="fa fa-user" aria-hidden="true"></i>
                </span>
                {fullN}
              </a>
            </Link>
          );
        }
      });

      setOrderHistory(
        <Link href="/OrderHistory">
          <a className="dropdown-item font-weight-bolder">
            <span className="m-space">
              <i className="fa fa-envelope-open" aria-hidden="true"></i>
            </span>
            Your Orders
          </a>
        </Link>
      );

      setTextToDisplay(
        <Link href="#">
          <a onClick={logOutUser} className="dropdown-item font-weight-bolder">
            <span className="m-space">
              <i className="fa fa-sign-in" aria-hidden="true"></i>
            </span>
            Logout
          </a>
        </Link>
      );

      setIsUserDataLoaded(true);
    };

    const userLoggedOut = () => {
      SetWishList();
      setUserName(
        <Link href="/Authentication/login">
          <a className="dropdown-item font-weight-bolder">
            <span className="m-space">
              <i className="fa fa-sign-in"></i>
            </span>
            log in
          </a>
        </Link>
      );

      setTextToDisplay(
        <Link href="/Authentication/register">
          <a className="dropdown-item font-weight-bolder">
            <span className="m-space">
              <i className="fas fa-user-plus"></i>
            </span>
            register
          </a>
        </Link>
      );

      setIsUserDataLoaded(true);
    };

    const userWishList = async (userId) => {
      const userDocRef = doc(db, "customers", userId);

      const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          const wishList = userData.wishlist || [];

          wishlistUserUpdate(wishList.length);

          SetWishList(
            <span className="pe-auto price_cart d-md-inline-block align-middle font-weight-bolder">
              {wishList.length}
            </span>
          );
        }
      });

      setTextToDisplay(
        <Link href="#">
          <a onClick={logOutUser} className="dropdown-item font-weight-bolder">
            <span className="m-space">
              <i className="fa fa-sign-in" aria-hidden="true"></i>
            </span>
            Logout
          </a>
        </Link>
      );

      setIsUserDataLoaded(true);
    };

    Login();
    cartUpdate();
  }, [cart]);

  const logOutUser = async (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "success",
      title: "You have logged out",
      showConfirmButton: false,
    });
    signOut(auth)
      .then(() => {
        console.log("The user signed out");
      })
      .catch((error) => {
        console.log(error);
      });
    window.location.reload();
  };

  const incrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    router.push("/cart");
  };

  const deleteItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <>
      <header className="home">
        <div className="py-xl-4 ">
          <div className="container">
            <Row className="row-center">
              <Col xl={2} lg={2} md={6} sm={6} xs={6}>
                <div className="text-left logo">
                  <Link href="/">
                    <a>
                      <img
                        src={logoImage}
                        className="mx-auto img-fluid"
                        alt="navbar"
                      />
                    </a>
                  </Link>
                </div>
                <MobileNav />
              </Col>
              <Col xl={8} lg={8} className="none-menu">
                <ul className="main-menu navbarGapping navbar">
                  <li>
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/Shop">
                      <a role="button" aria-expanded="false">
                        Shop
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/Blog/blogcard">
                      <a
                        className=""
                        role="button"
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Blog
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/about">
                      <a
                        className=""
                        role="button"
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
                        About Us
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link href="#">
                      <a
                        className="dropdown-toggle"
                        role="button"
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Information
                      </a>
                    </Link>
                    <ul className="dropdown-menu">
                      <li className="mg_menu col-lg-4 col-md-12">
                        <ul>
                          <li className="d-block">
                            <Link href="/Footer/FooterLink/deliveryInfo">
                              <a className="dropdown-item font-weight-bolder">
                                Terms & Conditions
                              </a>
                            </Link>
                          </li>
                          <li className="d-block">
                            <Link href="/Footer/FooterLink/PrivacyPolicy">
                              <a className="dropdown-item font-weight-bolder">
                                Privacy Policy
                              </a>
                            </Link>
                          </li>
                          <li className="d-block">
                            <Link href="/Footer/FooterLink/RefundPolicy">
                              <a className="dropdown-item font-weight-bolder">
                                Refund Policy
                              </a>
                            </Link>
                          </li>
                          <li className="d-block">
                            <Link
                              href="https://vendor-dfm-production.up.railway.app"
                              className="custom-button"
                            >
                              <a className="dropdown-item font-weight-bolder">
                                Become a Seller
                              </a>
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <Link href="/Contact/contact">
                      <a> Contact us</a>
                    </Link>
                  </li>
                </ul>
              </Col>
              <Col xl={2} lg={2} md={6} sm={6} xs={6} className="text-end p-0">
                <ul className="main-menu align-items-center navbaricon list-unstyled openiconmenu cursor-pointer">
                  <li>
                    <Link href="/Wishlist/Wishlist">
                      <a role="button" aria-expanded="false">
                        <Heart />
                        <span className=""></span>
                        {wishlist}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a
                        className=""
                        role="button"
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <User />
                      </a>
                    </Link>
                    <div
                      className="dropdown-menu openmenu"
                      aria-labelledby="dropdownMenuLink"
                    >
                      {isUserDataLoaded ? (
                        <>
                          <div>{userName}</div>
                          <div>{orderHistory}</div>
                          <div>{textToDisplay}</div>
                        </>
                      ) : (
                        <div>Loading...</div>
                      )}
                    </div>
                  </li>
                  <li className="cursor-pointer inline-block">
                    <Link href="/cart" passHref>
                      <div
                        className="px-2 py-1 rounded-1 text-white d-flex"
                        style={{ backgroundColor: "#6d9900" }}
                      >
                        <span
                          className="position-relative"
                          style={{ height: 30 }}
                        >
                          <a>
                            <CartIcon />
                          </a>
                          <span className="pe-auto d-lg-inline-block d-md-none d-sm-none d-none align-middle font-weight-bolder"></span>
                          <span className="pe-auto price_cart d-md-inline-block align-middle font-weight-bolder">
                            {cartLength}
                          </span>
                        </span>
                        £{totalPrice.toFixed(2)}
                      </div>
                    </Link>
                    <div
                      className="dropdown-menu openmenu"
                      aria-labelledby="dropdownMenuLink"
                      style={{ width: "18rem", zIndex: "1000000" }}
                    >
                      {cart.length > 0 ? (
                        <div>
                          {cart.map((item) => (
                            <div className="mb-2 bg-light p-2" key={item.id}>
                              <div>
                                <i
                                  className="fa fa-trash-o text-danger"
                                  aria-hidden="true"
                                  onClick={() => deleteItem(item.id)}
                                ></i>
                              </div>
                              <div
                                key={item.id}
                                className="d-flex align-items-center justify-content-between "
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="me-3"
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    objectFit: "cover",
                                  }}
                                />
                                <div>
                                  <p className="mb-0 fw-bold">{item.name}</p>
                                  <p className="mb-0 text-muted">
                                    Price: £{item.price}
                                  </p>
                                </div>
                                <div>
                                  <button
                                    className="btn btn-sm text-white"
                                    onClick={() => incrementQuantity(item.id)}
                                    style={{ backgroundColor: "#6d9900" }}
                                  >
                                    +
                                  </button>
                                  <p className="mb-0 text-muted ms-1">
                                    {item.quantity}
                                  </p>
                                  <button
                                    className="btn btn-sm text-white"
                                    onClick={() => decrementQuantity(item.id)}
                                    style={{ backgroundColor: "#6d9900" }}
                                  >
                                    -
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                          <button
                            className="btn w-100 mt-2 text-white"
                            style={{ backgroundColor: "#6d9900" }}
                            onClick={handleCheckout}
                          >
                            CheckOut
                          </button>
                        </div>
                      ) : (
                        <div className="dropdown-item text-center text-muted">
                          Your cart is empty
                        </div>
                      )}
                    </div>
                  </li>
                </ul>
              </Col>
            </Row>
          </div>
          <div className="d-flex justify-content-center bg-transparent position-relative">
            <SearchComponent />
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
