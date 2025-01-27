import Image from "next/image";
import React from "react";
import { Button, Col, Collapse, Row } from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";

export const Footer = () => { //footer, holds all footer data
  const [Useopen, UsesetOpen] = useState(false);
  const [Sopen, SsetOpen] = useState(false);


  return (
    <>
      <div className="footer">
        <div className="third_footer">
          <div className="container custom_container">
            <div className="th_foo">
              <Row>
                <Col xl={6} lg={6} md={6} xs={12} className="f_col">
                  <div className="fst_col FooterVertical">
                    <div className="footer_title">
                      <h5 className="text-uppercase text-white footerLinkHeading">
                        contact us
                        <Button
                          className="Footer-button"
                          onClick={() => UsesetOpen(!Useopen)}
                          aria-controls="example-collapse-text"
                          aria-expanded={Useopen}
                        ></Button>
                      </h5>
                    </div>
                    <Collapse in={Useopen}>
                      <div className="categorie  " id="fproduct">
                        <ul className="add_row">
                          {/*<li className="d-flex">*/}
                          {/*  <div>*/}
                          {/*    <a>*/}
                          {/*      <i*/}
                          {/*          className="fa fa-map-marker"*/}
                          {/*          aria-hidden="true"*/}
                          {/*      ></i>*/}
                          {/*    </a>*/}
                          {/*  </div>*/}
                          {/*  <div className="data1">*/}
                          {/*    <a>*/}
                          {/*      1093, Marigold Lane,*/}
                          {/*      <br/> Coral Way, Miami,*/}
                          {/*      <br/>*/}
                          {/*      Florida, 33169*/}
                          {/*    </a>*/}
                          {/*  </div>*/}
                          {/*</li>*/}
                          <li className="d-flex">
                            <div>
                              <a>
                                <i
                                    className="fa fa-phone"
                                    aria-hidden="true"
                                ></i>
                              </a>
                            </div>
                            <div>
                              <a href="https://wa.me/447442995482">(+44) 7442 995482</a>
                            </div>
                          </li>
                          <li className="d-flex">
                            <div>
                              <a>
                                <i
                                    className="fa fa-envelope"
                                    aria-hidden="true"
                                ></i>
                              </a>
                            </div>
                            <div>
                              <a className="mail_f">info@diasspora.co.uk</a>
                            </div>
                          </li>
                        </ul>
                        <ul className="foo_pay">
                          <li>
                            <a>
                              <i className="fab fa-cc-mastercard"></i>
                            </a>
                          </li>
                          <li>
                            <a>
                              <i className="fab fa-cc-visa"></i>
                            </a>
                          </li>
                          <li>
                            <a>
                              <i className="fas fa-credit-card"></i>
                            </a>
                          </li>
                        </ul>

                      </div>


                    </Collapse>
                  </div>
                </Col>
                <Col xl={6} lg={6} md={6} xs={12}>
                  <div className="sec_col  FooterVertical">
                    <div className="footer_title">
                      <h5 className="text-uppercase text-white footerLinkHeading">
                        Extras
                        <Button
                            className="Footer-button"
                            onClick={() => SsetOpen(!Sopen)}
                            aria-controls="example-collapse-text"
                            aria-expanded={Sopen}
                        ></Button>
                      </h5>
                    </div>
                    <Collapse in={Sopen}>
                      <div className="categorie" id="sproduct">
                        <ul>
                          <li>
                            <Link href="/about">
                              <a>About Us</a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/Footer/FooterLink/deliveryInfo">
                              <a>Delivery Infomations</a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/Footer/FooterLink/PrivacyPolicy">
                              <a>Privacy Policy</a>
                            </Link>
                          </li>
                          {/*<li>*/}
                          {/*  <Link href="/Footer/FooterLink/CustomService">*/}
                          {/*    <a>Customer Service</a>*/}
                          {/*  </Link>*/}
                          {/*</li>*/}
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                </Col>

              </Row>
            </div>
          </div>
        </div>
        <div className="fifth_footer">
          <div className="container custom_container">
            <Row>
              <Col className="col-12">
                <div className="text-center demo_link d-block">
                  2024 @ All rights reserved Powered by <a>DFM</a>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
