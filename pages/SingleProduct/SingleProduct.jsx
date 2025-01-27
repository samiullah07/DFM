import React from "react";
import { useState } from "react";
import { Col, Row, Button, Accordion } from "react-bootstrap";
import Slider from "react-slick";
import { PublicLayout } from "../Layout/PublicLayout";
import FeaturedProduct from "../HomePage/FeaturedProduct/FeaturedProduct";
import FeaturedSlider from "../HomePage/FeaturedProduct/FeaturedSlider";
import Link from "next/link";
import { Form, InputGroup } from "react-bootstrap";
const breadcrumbsData = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "SingleProduct",
    path: "#",
  },
];

const SingleProduct = () => {

  const product_27 = "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/ItemImages%2Fproduct_27.jpg?alt=media&token=1e013d7b-deb3-4671-96b3-3c741a14d272";
  const product_28 = "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/ItemImages%2Fproduct_28.jpg?alt=media&token=eb8c5cb6-d6fe-453f-95f5-ec9550686ab9";
  const product_29 = "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/ItemImages%2Fproduct_29.jpg?alt=media&token=608f6ff4-abf0-4ada-a40e-b055dc5dd7bd";
  const product_30 = "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/ItemImages%2Fproduct_30.jpg?alt=media&token=63879852-d1b4-486b-adb5-9c31db26ff9f";
  const product_33 = "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/ItemImages%2Fproduct_33.jpg?alt=media&token=a9be2878-c467-4da3-ac16-60062f1454bd";
  const titleimg = "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/HomeBanner%2Ftitle_img.png?alt=media&token=691e4f14-c6b4-48d2-856e-c0e360edadb2"
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
  return (
    <>
      <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Portfolio">
        <div className="container sp_pro_container">
          <div>
            <div>
              <Row className="sh_page">
                <Col lg={5}>
                  <div id="content">
                    <div>
                      <Slider
                        fade={true}
                        asNavFor={nav2}
                        arrows={false}
                        lazyLoad={true}
                        ref={(slider1) => setNav1(slider1)}
                      >
                        <img
                          src={product_27}
                          className="img-fluid mx-auto"
                          alt="single product"
                        />
                        <img
                          src={product_28}
                          className="img-fluid mx-auto"
                          alt="single product"
                        />
                        <img
                          src={product_29}
                          className="img-fluid mx-auto"
                          alt="single product"
                        />
                        <img
                          src={product_30}
                          className="img-fluid mx-auto"
                          alt="single product"
                        />
                        <img
                          src={product_33}
                          className="img-fluid mx-auto"
                          alt="single product"
                        />
                      </Slider>
                    </div>

                    <div>
                      <Slider
                        arrows={false}
                        asNavFor={nav1}
                        ref={(slider2) => setNav2(slider2)}
                        slidesToShow={4}
                        swipeToSlide={true}
                        focusOnSelect={true}
                        autoplay={true}
                        autoplaySpeed={1500}
                        infinite={true}
                        speed={500}
                      >
                        <img
                          src={product_27}
                          className="img-fluid mx-auto secondProcudtSlider"
                          alt="single product"
                        />
                        <img
                          src={product_28}
                          className="img-fluid mx-auto secondProcudtSlider"
                          alt="single product"
                        />
                        <img
                          src={product_29}
                          className="img-fluid mx-auto secondProcudtSlider"
                          alt="single product"
                        />
                        <img
                          src={product_30}
                          className="img-fluid mx-auto secondProcudtSlider"
                          alt="single product"
                        />
                        <img
                          src={product_33}
                          className="img-fluid mx-auto secondProcudtSlider"
                          alt="single product"
                        />
                      </Slider>
                    </div>
                  </div>
                </Col>
                <Col lg={7}>
                  <div className="productDetails sp_product_detail">
                    <h6>Fresh Fruit, Vegetables</h6>
                    <h3>Fresh Fruit - Banganapalli, 1 Kg</h3>
                    <span className="productPrice">$49.00</span>
                    <div className="my-2">
                      <span className="fw-bolder"> SKU : PR101</span>
                    </div>
                    <div className="my-2">
                      <span className="fw-bolder">Availability : In Stock</span>
                    </div>
                    <div className="sp_text">
                      <ul className="list-group ">
                        <li>
                          Universal Foundation Masks Skin Imperfections And
                          Gives It A Matte Finish, Remaining Completely
                          Invisible On The Face. The Foundation Is Suitable For
                          Any Skin Type. Thanks To A Unique Combination Of
                          Pigments, The Foundation Adapts Perfectly To Even The
                          Smallest Features Of Skin Tone, Creating An Even And
                          Natural Tone
                        </li>
                      </ul>
                    </div>

                    <div className="productOptions">
                      <div className="productColor">
                        <span>Color:</span>
                        <ul>
                          <li className="bg-primary"></li>
                          <li className="bg-info"></li>
                          <li className="bg-warning"></li>
                          <li className="bg-success"></li>
                          <li className="bg-danger"></li>
                        </ul>
                      </div>
                    </div>
                    <div className="productQunBtn productOptions">
                      <div className="productQuantity">
                        <span className="productQuantityTitle">
                          Quantity: In Available
                        </span>
                      </div>
                    </div>
                    <div>
                      <hr />
                      <div className="addtoBtn">
                        <div className="count">
                          <div className="icon">
                            <Link href="/Wishlist/Wishlist">
                              <a>
                                <i className="fa fa-heart-o"></i>
                                <span>Add To Wishlist</span>
                              </a>
                            </Link>
                          </div>
                        </div>
                        <div className="count">
                          <div className=" icon">
                            <Link href="/Compare/compare">
                              <a>
                                <i className="fa fa-balance-scale"></i>
                                <span>Add To Compare</span>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <hr />
                    </div>
                    <div className="productsmalldescption">
                      <ul>
                        <li className="my-2">
                          <span className="font-weight-bolder">
                            <strong>vendor:</strong>
                          </span>
                          <span>
                            <a href="#">levis</a>
                          </span>
                        </li>
                        <li className="my-2">
                          <span className="font-weight-bolder">
                            <strong>product type:</strong>
                          </span>
                          <span>shirt</span>
                        </li>
                        <li className="my-2">
                          <span className="font-weight-bolder">
                            <strong>barcode:</strong>
                          </span>
                          <span>1234321</span>
                        </li>
                        <li className="my-2">
                          <span className="font-weight-bolder">
                            <strong>tags:</strong>
                          </span>
                          <span>
                            <a href="#">summer ,</a>
                          </span>
                          <span>
                            <a href="#" className="">
                              winter
                            </a>
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="productDescription my-4">
                      <Accordion defaultActiveKey="">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>DESCRIPTION</Accordion.Header>
                          <Accordion.Body>
                            <p>
                              Brunch 3 wolf moon tempor, sunt aliqua put a bird
                              on it squid single-origin coffee nulla assumenda
                              shoreditch et. Nihil anim keffiyeh helvetica,
                              craft beer labore wes anderson cred nesciunt
                              sapiente ea proident. Ad vegan excepteur butcher
                              vice lomo.
                            </p>
                            <p>
                              Leggings occaecat craft beer farm-to-table, raw
                              denim aesthetic synth nesciunt you probably have
                              not heard of them accusamus labore sustainable
                              VHS.
                            </p>
                            <p>
                              There are many variations of passages of Lorem
                              Ipsum available, but the majority have suffered
                              alteration in some form, by injected humour, or
                              randomised words which do not look even slightly
                              believable. If you are going to use a passage of
                              Lorem Ipsum, you need to be sure there is not
                              anything embarrassing hidden in the middle of
                              text.
                            </p>
                            <p>
                              All the Lorem Ipsum generators on the Internet
                              tend to repeat predefined chunks as necessary,
                              making this the first true generator on the
                              Internet. It uses a dictionary of over 200 Latin
                              words, combined with a handful of model sentence
                              structures, to generate Lorem Ipsum which looks
                              reasonable. The generated Lorem Ipsum is therefore
                              always free from repetition, injected humour, or
                              non-characteristic words etc.
                            </p>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>
                            ADDITIONAL INFORMATION
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
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                          <Accordion.Header>REVIEW</Accordion.Header>
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
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div className="container deal_of_container">
          <div className="heading text-center ">
            <strong>Add Featured Products</strong>
            <h2>Featured Product</h2>
            <div className="headingimg">
              <img
                src={titleimg}
                className="img-fluid mx-auto headingimgclass"
                alt="single products"
              />
            </div>
          </div>
          <FeaturedSlider />
        </div>
        <FeaturedProduct />
      </PublicLayout>
    </>
  );
};

export default SingleProduct;
