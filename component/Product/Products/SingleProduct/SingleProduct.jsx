import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import { Check, Eye, Heart, ProCart } from "../../../../styles/Svg";
import { CartContext } from "../../../../pages/_app";
import { auth, db } from "../../../../FirebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";
import ReactStars from "react-stars";

export const SingleProduct = ({ product }) => {

  const [currentUserLoggedIn, setCurrentUserLoggedIn] = useState(null);
  let userId;
  let [classesSet, setClass] = useState("");
  const [noHover, setoHover] = useState(null);
  let [link, setLink] = useState("");
  let [modelDissapear, setModel] = useState(null);
  let [modelDissapearEye, setModelEye] = useState(null);
  let [modelDissapearHeart, setModelHeart] = useState(null);

  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [wish, setWish] = useState(false);
  const [compare, setCompare] = useState(false);
  const [addCart, setAddCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { cart, setCart } = useContext(CartContext);
  let [userCartTotal, setuserCartTotal] = useState(0);

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const { name, subName, oldPrice, price, image, isSale, isNew, id } = product;

  const calcTotalUser = async () => {
    let total;
    let newTotal = 0;

    if (!id) {
      setLoading(false);
      return;
    }

    const itemsColRef = collection(db, "customers");
    const newItemList = [];

    try {
      const snapshot = await getDocs(itemsColRef);
      snapshot.docs.forEach((data) => {
        if (data.id === userId) {
          data.data().cart.forEach((item) => {
            total = item.price * item.quantity;
            newTotal += total;
          });
        }
      });
    } catch (error) {
      alert(error.message);
    }

    setuserCartTotal(newTotal);
  };

  useEffect(() => {
    const checkUser = async () => {
      auth.onAuthStateChanged(user => {
        if (user) {
          setCurrentUserLoggedIn(user.uid);
          userId = user.uid;
        } else {
          setCurrentUserLoggedIn(null);
        }
      });
    };

    checkUser();
  }, []);

  useEffect(() => {
    calcTotalUser();
  }, []);

  const showSwal = () => {
    Swal.fire({
      icon: "success",
      title: "Your item has been added",
      showConfirmButton: false,
      timer: 1500
    });
  };

  const showWish = () => {
    Swal.fire({
      icon: "error",
      title: "You have to be logged in to add item"
    });
  };

  const userItemsCart = async (id) => {
    if (!id) {
      setLoading(false);
      return;
    }
    const itemsColRef = collection(db, "customers");
    const newItemList = [];
    let itemExists = false;

    try {
      const snapshot = await getDocs(itemsColRef);
      snapshot.docs.forEach((data) => {
        if (data.id === id) {
          const cart = data.data().cart;

          cart.forEach((item) => {
            if (item.id === product.id) {
              item.quantity += quantity;
              itemExists = true;
            }
          });

          if (!itemExists) {
            product.quantity = quantity;
            cart.push(product);
          }

          newItemList.push(...cart);
        }
      });
    } catch (error) {
      alert(error.message);
    }

    await updateDoc(doc(db, "customers", id), {
      cart: newItemList,
    });
  };

  const userWishCart = async (id) => {
    if (!id) {
      setLoading(false);
      return;
    }
    const itemsColRef = collection(db, "customers");
    const ItemList = [];
    try {
      const snapshot = await getDocs(itemsColRef);
      snapshot.docs.forEach((data) => {
        if (data.id === id) {
          ItemList.push(...data.data().wishlist);
        }
      });
    } catch (error) {
      alert(error.message);
    }
    ItemList.push(product);
    await updateDoc(doc(db, "customers", id), {
      wishlist: ItemList
    });
  };

  const total = cart.reduce(
    (total, pdtitem) =>
      total + Number(pdtitem.price) * Number(pdtitem.quantity),
    0
  );

  const userLocalCart = async () => {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      const updatedCart = cart.map((item, index) =>
        index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
    }
  };

  const cartBtnClicked = async () => {
    if (product.stock === 0) {
      // Cart is empty, do nothing or display a message to the user
      console.log('Cart is empty');
      return;
    }
    if (currentUserLoggedIn) {
      await userItemsCart(currentUserLoggedIn);
      await calcTotalUser();
      await showSwal();
      await delay(2000);
    } else {
      await userLocalCart();
      await showSwal();
      await delay(2000);
    }

    setAddCart(false); // Close modal after adding to cart
  };

  const wishlistBtnClicked = async () => {
    if (product.stock === 0) {
      // Cart is empty, do nothing or display a message to the user
      console.log('Cart is empty');
      return;
    }
    if (currentUserLoggedIn) {
      await userWishCart(currentUserLoggedIn);
      await showSwal();
      await delay(2000);
    } else {
      await showWish();
      await delay(2000);
    }
  };

  useEffect(() => {
    if (product.stock === 0) {
      setClass("imageNoneStock");
      setoHover("");


      setLink("#");
      setModel(<div className="second-img">
        <p className="outOfStockTxt"><b>Out Of Stock</b></p>
      </div>);
    } else {
      setClass("#");
      setoHover(
        <div className="second-img">
          <img
            src={product.imageGallery[0]}
            className="js-img img-fluid mx-auto"
            alt="SingleProduct"
          />
        </div>
      );
      setLink(`/productId/${id}`);
      setModel(<ProCart onClick={cartBtnClicked} />);
      setModelEye(<Eye />);
      setModelHeart(<Heart />);
    }
  }, [product]);

  const endTotal = currentUserLoggedIn ? userCartTotal : total;

  return (
    <>
      <div className="border cardborder cardeffect productCard">
        {isSale && <span className="products_sale">sale</span>}
        {isNew && <span className="products_new">new</span>}
        <div>
          <div className="pro_image">
            <Link href={link}>
              <a>
                <div>
                  <img
                    src={product.imageGallery[0]}
                    className={"js-img img-fluid mx-auto " + classesSet}
                    alt="SingleProduct"
                  />
                  {noHover}
                </div>
              </a>
            </Link>
          </div>
          <div className="text-center">
            <div className="main_text">
              <h2 className="text-center pro-heading my-lg-2">
                <div className="text-muted d-sm-none d-md-inline-block s-title">
                  <ReactStars
                      className={"starsNoFunc justify-content-center align-items-center d-flex"}
                      count={5}
                      size={24}
                      color2={"#ffd700"}
                      value={product.averageRating}
                  />
                  <span style={{textTransform: "none"}}>({product.reviews.length} Review/s)</span> {/* Display the number of reviews */}
                </div>
                <h6>{subName}</h6>
                <Link href={link}>
                  <a className="f-700">{name}</a>
                </Link>
              </h2>
              <span className="text-center">
                <span className="fw-bolder price">£{price}</span>
                <del className="text-muted">{oldPrice}</del>
              </span>
            </div>
            <div className="button-group">
              <div onClick={cartBtnClicked} className="d-inline-block">
                {modelDissapear}
              </div>
              <Modal
                  show={addCart}
                onHide={() => setAddCart(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                  <div>
                    <Row className="row-center">
                      <Col lg={4} md={4}>
                        <a href={`/productId/${id}`}>
                          <div className="eyeProImg">
                            <img
                              src={product.imageGallery[0]}
                              className="js-img img-fluid mx-auto"
                              alt=""
                            />
                          </div>
                        </a>
                      </Col>
                      <Col lg={8} md={8}>
                        <div className="modelcart-title">
                          <div className="addcart-title">
                            <a
                              href={link}
                              className="f-20 fw-bolder"
                            >
                              {name}
                            </a>
                          </div>
                          <div className="productsmalldescption">
                            <ul className="list-unstyled">
                              <li className="my-lg-2">
                                <span className="font-weight-bolder">
                                  <strong>vendor:</strong>
                                </span>
                                <span>
                                  <a href="#">{product.Vendor}</a>
                                </span>
                              </li>
                              <li className="my-lg-2">
                                <span className="font-weight-bolder">
                                  <strong>product type:</strong>
                                </span>
                                <span>{product.ProductType}</span>
                              </li>
                              <li className="my-lg-2">
                                <span className="font-weight-bolder">
                                  <strong>barcode:</strong>
                                </span>
                                <span>{product.Barcode}</span>
                              </li>
                              <li className="my-lg-2">
                                <span className="font-weight-bolder">
                                  <strong>tags:</strong>
                                </span>
                                <span>
                                  <a href="#">{product.Tags}</a>
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <hr />
                    <div className="cart-model-detail">
                      <div>
                        <div className="cart-mtotal">
                          <span className="fw-bolder">subtotal : </span>
                          <span>£{endTotal.toFixed(2)}</span>
                        </div>
                      </div>
                      <hr />
                      <div className="cart-mtotal">
                        <span className="fw-bolder">Item Price : </span>
                        <span>
                          <span className="fw-bolder price">£{price}</span>
                          <del className="text-muted">{oldPrice}</del>
                        </span>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <button onClick={cartBtnClicked} className="main-button">
                    <a>Add To Cart</a>
                  </button>
                  <button onClick={() => setAddCart(false)} className="main-button">
                    <a>Close</a>
                  </button>
                </Modal.Footer>
              </Modal>
              <div onClick={() => setCompare(true)} className="d-inline-block"></div>
              <div
                onClick={() => setModalShow(true)}
                className="d-inline-block"
              >
                {modelDissapearEye}
              </div>
              <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                  <div>
                    <Row className="row-center">
                      <Col lg={4} md={4}>
                        <a href={`/productId/${id}`}>
                          <div className="eyeProImg">
                            <img
                              src={product.imageGallery[0]}
                              className="js-img img-fluid mx-auto"
                              alt="eyeproduct"
                            />
                          </div>
                        </a>
                      </Col>
                      <Col lg={8} md={8}>
                        <a href={`/product/${id}`} className=" f-20 fw-bolder">
                          {name}
                        </a>
                        <hr />
                        <span className="text-center">
                          <span className="fw-bolder price">£{price}</span>
                          <del className="text-muted"> {oldPrice}</del>
                        </span>
                        <hr />
                        <div className="sp_text">
                          <ul className="list-group list-unstyled">
                            <li>{product.content}</li>
                          </ul>
                        </div>
                        <hr />
                        <div className="productQunBtn">
                          <div className="productQuantity">
                            <div className="count">
                              <span className="m-qty"> Quantity : </span>
                              <span
                                onClick={() => {
                                  if (quantity > 1) {
                                    setQuantity(quantity - 1);
                                  }
                                }}
                                className="counter"
                              >
                                <i
                                  className="fa fa-minus"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              <input
                                type="text"
                                className="countInput"
                                disabled
                                value={quantity}
                              />
                              <span
                                onClick={() => setQuantity(quantity + 1)}
                                className="counter"
                              >
                                <i
                                  className="fa fa-plus"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              <span className="eyemodelbtn ml-2">
                                <button onClick={cartBtnClicked} className="main-button">
                                  <a>Add To Cart</a>
                                </button>
                              </span>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="eyemodelbtn">
                          <button className="main-button ml-2">
                            <a onClick={wishlistBtnClicked}>Add To Wishlist</a>
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Modal.Body>
              </Modal>
              <div onClick={() => wishlistBtnClicked()} className="d-inline-block">
                {modelDissapearHeart}
              </div>
              <Modal
                show={wish}
                onHide={() => setWish(false)}
                size="lg"
                centered
                aria-labelledby="contained-modal-title-vcenter"
                className="fav-model wishlistModal"
              >
                <Modal.Body>
                  <Modal.Header closeButton></Modal.Header>
                  <div className="text-center">
                    <Check />
                    <p className="mt-lg-3">
                      You must be logged in to manage your wishlist.
                    </p>
                    <div>
                      <a onClick={wishlistBtnClicked}>Add To Wishlist</a>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
              <div
                href="#"
                className="symbol"
                data-toggle="modal"
                data-target="#heart_model"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
