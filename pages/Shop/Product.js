import React from "react";
import { Row, Col } from "react-bootstrap";
import GridView from "./GridView";
import ListView from "./ListView";

const Product = ({filterOptions}) => {

  return (
    <>
      <div className="bg-light">
        <Col lg={2} md={2} sm={2} xs={5} className="d-inline-block">
          <ul className="nav" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <div
                className="nav-link active"
                id="juice-tab"
                data-bs-toggle="tab"
                data-bs-target="#juice"
                type="button"
                role="tab"
                aria-controls="juice"
                aria-selected="true"
              >
                <i className="fas fa-th"></i>
              </div>
            </li>
            {/*<li className="nav-item" role="presentation">
              <div
                className="nav-link"
                id="fresh-tab"
                data-bs-toggle="tab"
                data-bs-target="#fresh"
                type="button"
                role="tab"
                aria-controls="fresh"
                aria-selected="false"
              >
                <i className="fas fa-list"></i>
              </div>
            </li>*/}
          </ul>
        </Col>
        <Col
          lg={4}
          md={4}
          sm={4}
          xs={7}
          className="d-inline-block  d-xl-inline-block totalProduct"
        >

        </Col>

        {/*<Col lg={6} md={6} sm={6} xs={12} className="d-inline-block">
          <div className="sort-by text-end">
            <div className="sort">
              <select onChange={detect} className="form-select" id="inlineFormCustomSelect">
                <option selected>Relevance...</option>
                <option value="1">Relevance</option>
                <option value="2">Name, A to Z</option>
                <option value="3">Name, Z to A</option>
                <option value="4">Price, low to high</option>
                <option value="5">Price, high to low</option>
              </select>
            </div>
          </div>
        </Col>*/}
      </div>

      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="juice"
          role="tabpanel"
          aria-labelledby="juice-tab"
        >
          <GridView filterOptions={filterOptions} />
        </div>
        {/*<div
          className="tab-pane fade"
          id="fresh"
          role="tabpanel"
          aria-labelledby="fresh-tab"
        >
          <Brandlogo />
          <ListView />
        </div>*/}
      </div>
    </>
  );
};

export default Product;
