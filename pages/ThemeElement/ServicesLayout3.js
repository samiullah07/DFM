import React from "react";
import { Row, Col } from "react-bootstrap";
import { Gift, Secure, Support } from "../../styles/Svg";
const ServicesLayout3 = () => {  // NOT USED
  return (
    <>
      <div className="container deal_of_container">
        <div className="main_services border">
          <Row>
            <Col className="m_service">
              <ul
                className=" service rounded text-center  animate__animated animate__fadeInUp"
                data-wow-duration="0.8s"
                data-wow-delay="0.1s"
              >
                <li className="ser-svg d-lg-inline-block d-md-block  align-middle">
                  <Support />
                </li>
                <li className="ser-t d-lg-inline-block d-md-block  align-middle text-left">
                  <h6>24/7 free support</h6>
                  <p className="mb-0 text-muted">Online Support 24/7</p>
                </li>
              </ul>
            </Col>
            <Col className="m_service">
              <ul
                className=" service rounded text-center  animate__animated animate__fadeInUp"
                data-wow-duration="0.8s"
                data-wow-delay="0.1s"
              >
                <li className="ser-svg d-lg-inline-block d-md-block  align-middle">
                  <Secure />
                </li>
                <li className="ser-t d-lg-inline-block d-md-block  align-middle text-left">
                  <h6>24/7 free support</h6>
                  <p className="mb-0 text-muted">Online Support 24/7</p>
                </li>
              </ul>
            </Col>
            <Col className="m_service">
              <ul
                className=" service rounded text-center  animate__animated animate__fadeInUp"
                data-wow-duration="0.8s"
                data-wow-delay="0.1s"
              >
                <li className="ser-svg d-lg-inline-block d-md-block  align-middle">
                  <Gift />
                </li>
                <li className="ser-t d-lg-inline-block d-md-block  align-middle text-left">
                  <h6>24/7 free support</h6>
                  <p className="mb-0 text-muted">Online Support 24/7</p>
                </li>
              </ul>
            </Col>
            <Col className="m_service">
              <ul
                className=" service rounded text-center  animate__animated animate__fadeInUp"
                data-wow-duration="0.8s"
                data-wow-delay="0.1s"
              >
                <li className="ser-svg d-lg-inline-block d-md-block  align-middle">
                  <Support />
                </li>
                <li className="ser-t d-lg-inline-block d-md-block  align-middle text-left">
                  <h6>World Wide Shipping</h6>
                  <p className="mb-0 text-muted">On Order Over $99</p>
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ServicesLayout3;
