import React from "react";
import Image from "next/image";
import { Row, Col } from "react-bootstrap";

const banr3 = "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/HomeBanner%2Fbanr3.jpg?alt=media&token=6494265b-56a2-42d5-9800-de3ec815ceb8";
const banr4 = "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/HomeBanner%2Fbanr4.jpg?alt=media&token=fd9bc37b-abb3-4da0-9ca8-c4566bbc944c";

const SeasonBanner = () => {//NOT USED
  return (
    <>
      <div className="bnr_fruit">
        <div className="container">
          <Row className="deal_of_container">
            <Col sm={6} xs={12}>
              <div className="banner">
                <a href="../../Shop">
                  <img
                    src={banr3}
                    className="img-fluid mx-auto"
                    alt="season Banner"
                  />
                </a>
              </div>
            </Col>
            <Col sm={6} xs={12}>
              <div className="banner">
                <a href="../../Shop">
                  <img
                    src={banr4}
                    className="img-fluid mx-auto"
                    alt="season Banner"
                  />
                </a>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default SeasonBanner;
