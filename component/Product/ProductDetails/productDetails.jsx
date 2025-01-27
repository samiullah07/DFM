import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { useRouter } from "next/router";
import { CartContext } from "../../../pages/_app";
import { Row, Col, Button } from "react-bootstrap";
import { Accordion } from "react-bootstrap";
import Link from "next/link";
import FeaturedProduct from "../../../pages/HomePage/FeaturedProduct/FeaturedProduct";
import { Form, InputGroup } from "react-bootstrap";
import {auth, db} from "../../../FirebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";
import ReactStars from "react-stars";

export const ProductDetails = () => {

  const [validated, setValidated] = useState(false);
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [addedInCart, setAddedInCart] = useState(false);
  const [currentUserLoggedIn, setCurrentUserLoggedIn] = useState(null);
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [wish, setWish] = useState(false);
  const [compare, setCompare] = useState(false);
  const [addCart, setAddCart] = useState(false);
  const { cart, setCart } = useContext(CartContext);
  let [itemImageNum, setitemImageNum] = useState(2);

  useEffect(() => {
    const checkUser = async () => {
      auth.onAuthStateChanged(user => {
        if (user) {
          setCurrentUserLoggedIn(user.uid);
        } else {
          setCurrentUserLoggedIn(null);
        }
      });

    };

    checkUser();
  }, []);

  const showSwal = () => {
    Swal.fire({
      icon: "success",
      title: "Your item has been added",
      showConfirmButton: false,
      timer: 1500
    });
  }

  const showWish = () => {
    Swal.fire({
      icon: "error",
      title: "You have to be logged in to add item"
    });
  }

  const userItemsCart = async (id) => {
    if (!id) {
      setLoading(false);
      return;
    }
    const itemsColRef = collection(db, "customers");
    const newItemList = [];
    try {
      const snapshot = await getDocs(itemsColRef);
      snapshot.docs.forEach((data) => {
        if (data.id === id) {

          newItemList.push(...data.data().cart);

        }
      });
    } catch (error) {
      alert(error.message);
    }

    product.quantity = quantity;

    await newItemList.push(product);
    await updateDoc(doc(db, "customers", id), {
      cart: newItemList
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


  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const cartBtnClicked = async () => {
    if (currentUserLoggedIn) {
      await userItemsCart(currentUserLoggedIn);
      await showSwal()
      //window.location.reload()

    }else{
      // Add product to local cart
      const updatedCart = [...cart, { ...product, quantity }];
      setCart(updatedCart);
      await showSwal()
      //window.location.reload()

    }
  };

  const wishlistBtnClicked = async () => {
    if (currentUserLoggedIn) {
      await userWishCart(currentUserLoggedIn);
      await showSwal()


    } else{
      await showWish()

    }
  };

  useEffect(() => {
    if (router.query.id) {

      const itemsColRef = collection(db, "items");

      getDocs(itemsColRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          doc.data().items.forEach((item) => {
            if(item.id === router.query.id)
              setProduct(item);
          })
        })
      })

      .catch(error => {
        alert(error.message)
      })

    }
  }, [router.query.id]);



  const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  rows: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

  useEffect(() => {
    if (product) {
      setAddedInCart(Boolean(cart?.find((pd) => pd.id === product.id)));
    }
  }, [product, cart]);

  const [quantity, setQuantity] = useState(1);
  const [activeColor, setActiveColor] = useState(2);
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  if (!product) return <></>;
  return (
    <>
      <div className="container productDetails">
        <div>
          <div>
            <Row className="sh_page">
              <Col lg={5} md={6}>
                <div id="content">
                  <div>

                      {product.imageGallery.length <= 2 && (
                        <Slider
                          fade={true}
                          infinite={true}
                          speed={500}
                          asNavFor={nav2}
                          slidesToShow={product.imageGallery.length}
                          slidesToScroll={1}
                          arrows={false}
                          lazyLoad={true}
                          autoplay={true} // Enable autoplay
                          autoplaySpeed={2000} // Set the speed (in milliseconds)
                          ref={(slider1) => setNav1(slider1)}
                        >
                          {product.imageGallery.map((img, index) => (
                            <div key={index}>
                              <div className="productsType">
                                {product.isSale && (
                                    <span className="productsSale">sale</span>
                                )}
                                {product.isNew && (
                                    <span className="productsNew">new</span>
                                )}
                              </div>
                              <img
                                  src={img}
                                  alt="product"
                                  className="img-fluid mx-auto"
                              />
                            </div>
                          ))}
                        </Slider>
                      )}

                    {product.imageGallery.length > 2 && (
                        <Slider
                          fade={true}
                          infinite={true}
                          speed={500}
                          asNavFor={nav2}
                          slidesToShow={product.imageGallery.length}
                          slidesToScroll={1}
                          arrows={false}
                          lazyLoad={true}
                          ref={(slider1) => setNav1(slider1)}
                        >
                          {product.imageGallery.map((img, index) => (
                            <div key={index}>
                              <div className="productsType">
                                {product.isSale && (
                                    <span className="productsSale">sale</span>
                                )}
                                {product.isNew && (
                                    <span className="productsNew">new</span>
                                )}
                              </div>
                              <img
                                  src={img}
                                  alt="product"
                                  className="img-fluid mx-auto"
                              />
                            </div>
                          ))}
                        </Slider>
                      )}

                  </div>

                  {product.imageGallery.length > 2 && (
                    <div>
                      <Slider {...settings}>
                        {product.imageGallery.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt="product"
                            className="img-fluid mx-auto secondProcudtSlider"
                          />
                        ))}
                      </Slider>
                    </div>
                  )}
                </div>
              </Col>
              <Col lg={7} md={6}>
                <div className="productDetails sp_product_detail">
                  <div className="text-muted d-sm-none d-md-inline-block s-title">
                    <ReactStars
                        className={"starsNoFunc"}
                        count={5}
                        size={24}
                        color2={"#ffd700"}
                        value={product.averageRating}
                    />
                    <span style={{textTransform: "none"}}>({product.reviews.length} Review/s)</span> {/* Display the number of reviews */}
                  </div>
                  <h6>{product.subName}</h6>
                  <h3>{product.name}</h3>
                  <hr/>
                  {product.oldPrice ? (
                      <span className="productPrice">£{product.price}</span>
                  ) : (
                      <span className="productPrice">£{product.price}</span>
                  )}
                  <hr/>
                  <div className="productsmalldescption">
                    <div className="my-lg-2">
                      <span className="fw-bolder"> ID : </span>
                      <span>{product.id}</span>
                    </div>
                    <div className="my-lg-2">
                      <span className="product-stock"><b>Available Stock: </b>{product.stock}</span>

                    </div>

                    <ul>
                      <li className="my-lg-2">
                        <span className="font-weight-bolder">
                          <strong>Seller:</strong>
                        </span>
                        <span>
                          <a href="#" style={{textTransform: "none"}}>{product.Vendor}</a>
                        </span>
                      </li>
                      <li className="my-lg-2">
                        <span className="font-weight-bolder">
                          <strong>product type:</strong>
                        </span>
                        <span>{product.ProductType}</span>
                      </li>
                    </ul>
                  </div>
                  <hr/>

                  <div className="sp_text">
                    <ul className="list-group ">
                      <li>{product.content}</li>
                    </ul>
                  </div>
                  <hr/>


                  <hr/>
                  <div className="productQunBtn">
                    <div className="productQuantity">
                      <span className="productQuantityTitle">Quantity:</span>
                      <div className="mainCount">
                        <div className="count">
                          <span
                              onClick={() => {
                                if (quantity > 1) {
                                  setQuantity(quantity - 1);
                                }
                              }}
                              className="counter"
                          >
                            <i className="fa fa-minus" aria-hidden="true"></i>
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
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </span>
                        </div>
                      </div>

                      <div className="productBtn">
                        <Button
                            onClick={() => cartBtnClicked()}
                            className="productIcon"
                        >
                          Add To Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="addtoBtn">
                      <div className="count">
                        <div className="icon">

                          <a onClick={() => wishlistBtnClicked()}>
                            <i className="fa fa-heart-o"></i>
                            <span>Add To Wishlist</span>
                          </a>

                        </div>
                      </div>
                    </div>
                  </div>
                  {/* */}
                  <div className="productDescription my-lg-4">
                    <Accordion defaultActiveKey="">
                      {/*<Accordion.Item eventKey="0">
                        <Accordion.Header className="fw-bolder">
                          Description
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>
                            Brunch 3 wolf moon tempor, sunt aliqua put a bird on
                            it squid single-origin coffee nulla assumenda
                            shoreditch et. Nihil anim keffiyeh helvetica, craft
                            beer labore wes anderson cred nesciunt sapiente ea
                            proident. Ad vegan excepteur butcher vice lomo.
                          </p>
                          <p>
                            Leggings occaecat craft beer farm-to-table, raw
                            denim aesthetic synth nesciunt you probably have not
                            heard of them accusamus labore sustainable VHS.
                          </p>
                          <p>
                            There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered alteration
                            in some form, by injected humour, or randomised
                            words which do not look even slightly believable. If
                            you are going to use a passage of Lorem Ipsum, you
                            need to be sure there is not anything embarrassing
                            hidden in the middle of text.
                          </p>
                          <p>
                            All the Lorem Ipsum generators on the Internet tend
                            to repeat predefined chunks as necessary, making
                            this the first true generator on the Internet. It
                            uses a dictionary of over 200 Latin words, combined
                            with a handful of model sentence structures, to
                            generate Lorem Ipsum which looks reasonable. The
                            generated Lorem Ipsum is therefore always free from
                            repetition, injected humour, or non-characteristic
                            words etc.
                          </p>
                        </Accordion.Body>
                      </Accordion.Item>{/* */}
                      {/*  <Accordion.Item eventKey="1">
                        <Accordion.Header className="fw-bolder">
                          Additional Information
                        </Accordion.Header>
                        <Accordion.Body>
                          <div className="card-body">
                            <table>
                              <tbody>
                                <tr>
                                  <td>color:</td>
                                  <td>pink</td>
                                </tr>
                                <tr>
                                  <td>size:</td>
                                  <td>large</td>
                                </tr>
                                <tr>
                                  <td>material:</td>
                                  <td>faberics</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>*/}
                      {/* <Accordion.Item eventKey="2">
                        <Accordion.Header className="fw-bolder">
                          Review
                        </Accordion.Header>
                        <Accordion.Body>
                          <div className="">
                            <Form
                              noValidate
                              validated={validated}
                              onSubmit={handleSubmit}
                            >
                              <Form.Group
                                md="4"
                                className="mb-3"
                                controlId="validationCustomUsername"
                              >
                                <Form.Label className=" f-16 ">
                                  Username
                                </Form.Label>
                                <InputGroup hasValidation>
                                  <Form.Control
                                    type="text"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    Please Enter your account name
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>
                              <Form.Group
                                md="4"
                                className="mb-3"
                                controlId="validationCustomUsername"
                              >
                                <Form.Label className=" f-16 ">
                                  Email
                                </Form.Label>
                                <InputGroup hasValidation>
                                  <Form.Control
                                    type="mail"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    Please Enter your account name
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>
                              <Form.Group
                                md="4"
                                className="mb-3"
                                controlId="validationCustomUsername"
                              >
                                <Form.Label className=" f-16 ">
                                  Your Phone
                                </Form.Label>
                                <InputGroup hasValidation>
                                  <Form.Control
                                    type="text"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    Please Enter your Your Phone
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>
                              <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                              >
                                <Form.Label>Example textarea</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                              </Form.Group>

                              <button
                                type="submit"
                                className="mb-3 main-button"
                                href="/"
                              >
                                <a className=""> Submit</a>
                              </button>
                            </Form>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>{/* */}
                    </Accordion>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <FeaturedProduct/>
    </>
  );
};
export default ProductDetails;
