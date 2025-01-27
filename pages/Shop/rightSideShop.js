import React from "react";
import Filter from "./Filter";
import Product from "./Product";
import { Row, Col } from "react-bootstrap";
import { PublicLayout } from "../Layout/PublicLayout";
const breadcrumbsData = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Shop",
    path: "#",
  },
];
const rightSideShop = () => {
  return (
    <>
      <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Shop">
        <div className="container">
          <Row className="m-botton-24">
            <Col lg={9}>
              <Product />
            </Col>
            <Col lg={3}>
              <Filter />
            </Col>
          </Row>
        </div>
      </PublicLayout>
    </>
  );
};

export default rightSideShop;
