import React from "react";
import Link from "next/link";
import Image from "next/image";

const MobileVerticalMenu = () => { //sets it for user convenience for phones
  return (
    <>
      <div>
        <div className="mobile-menu bg-white">
          <div id="mySidenav" className="sidenav 	">
            <div className=" navbar-collapse" id="navbarSupportedContent">
              <ul className=" navbar navbar-nav">
                <li className=" ">
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </li>
                <li className="dropdown ">
                  <Link href="/Shop">
                  <a

                    id="navbarDropdown"
                    role="button"

                    aria-expanded="false"

                  >
                    shop&nbsp;
                    <span className="float-end mt-1"></span>

                  </a>
                  </Link>

                </li>
                <li className=" dropdown ">
                  <Link href="/Blog/blogcard">
                  <a
                    id="navbarDropdown"
                    role="button"
                    aria-expanded="false"
                  >
                    blog&nbsp;
                    <span className="float-end mt-1"></span>
                  </a>
                  </Link>

                </li>
                <li className=" dropdown ">
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
                <li className=" dropdown ">
                  <a
                    className="dropdown-toggle "
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Information
                    <span className="float-end mt-1"></span>
                  </a>

                  <ul className="dropdown-menu">
                    <li className="mg_menu col-lg-6 col-md-12">
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

                        {/*<li className="d-block">*/}
                        {/*  <Link href="/Footer/FooterLink/CustomService">*/}
                        {/*    <a className="dropdown-item font-weight-bolder">*/}
                        {/*      Customer Service*/}
                        {/*    </a>*/}
                        {/*  </Link>*/}
                        {/*</li>*/}
                        <li className="d-block">
                          <Link href="https://vendor-dfm-production.up.railway.app" className="custom-button">
                            <a
                                className="dropdown-item font-weight-bolder">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileVerticalMenu;
