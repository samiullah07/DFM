import React from "react";
import { Row, Col } from "react-bootstrap";
import { Gift, Secure, Support } from "../../styles/Svg";
const ServicesLayout2 = () => {  // NOT USED
  return (
    <>
      <div className="container deal_of_container service-style-2-container">
        <div className="main_services border">
          <Row>
            <Col className="m_service">
              <ul className=" service rounded text-center list list-unstyled">
                <li className="ser-svg ">
                  <Support />
                </li>
                <li className="d-block  align-middle text-center">
                  <h6>24/7 free support</h6>
                  <p className="mb-0 text-muted">
                    passages of Lorem Ipsum available
                  </p>
                </li>
              </ul>
            </Col>
            <Col className="m_service">
              <ul className=" service rounded text-center list-unstyled">
                <li className="ser-svg  ">
                  <Secure />
                </li>
                <li className="d-lg-inline-block d-md-block  align-middle text-left">
                  <h6>24/7 free support</h6>
                  <p className="mb-0 text-muted">Online Support 24/7</p>
                </li>
              </ul>
            </Col>
            <Col className="m_service">
              <ul className=" service rounded text-center list-unstyled">
                <li className="ser-svg  ">
                  <Gift />
                </li>
                <li className="d-lg-inline-block d-md-block  align-middle text-left">
                  <h6>24/7 free support</h6>
                  <p className="mb-0 text-muted">Online Support 24/7</p>
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ServicesLayout2;
