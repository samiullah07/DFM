import React from "react";
import { Col, Row } from "react-bootstrap";
const Content = () => { //not uses within the code
  return (
    <>
      <div>
        <Row>
          <Col xl={8} lg={12} md={12}></Col>
          <Col xl={4} lg={12} md={12}>
            <p className="fw-bolder ab_bnr_text">
              Aliquam pharetra enim eget sollicitudin cursus. Phasellus quis
              lorem mi. Vestibulum luctus velit sit amet malesuada molestie.
              Mauris aliquam lacinia ligula, a scelerisque elit interdum non.
              Integer bibendum lacus sit amet ullamcorper vestibulum.
            </p>
          </Col>
        </Row>
        <div className="ab_services_container">
          <Row>
            <Col xl={4} lg={4} md={4} sm={4}>
              <div className="service-item border">
                <span className="number float-end p-2">01</span>

                <h3 className="fw-bold pt-3 mb-md-1">fashion</h3>
                <p className="fw-bolder text-muted mb-0">
                  Phasellus quis Vestibulum luctus velit sit amet malesuada
                  molestie.
                </p>
              </div>
            </Col>
            <Col xl={4} lg={4} md={4} sm={4}>
              <div className="service-item border">
                <span className="number float-end p-2">02</span>

                <h3 className="fw-bold pt-3">Sports</h3>
                <p className="fw-bolder text-muted mb-0">
                  Phasellus quis Vestibulum luctus velit sit amet malesuada
                  molestie.
                </p>
              </div>
            </Col>
            <Col xl={4} lg={4} md={4} sm={4}>
              <div className="service-item border">
                <span className="number float-end p-2">03</span>

                <h3 className="fw-bold pt-3">Travel</h3>
                <p className="fw-bolder text-muted mb-0">
                  Aenean vehicula non mauris maximus elementum. Nulla facilisi.
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Content;
