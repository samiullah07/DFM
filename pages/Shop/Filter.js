import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Form, Collapse, Offcanvas } from "react-bootstrap";
import RangeSlider from "./RangeSlider";
import Link from "next/link";
import { CartContext } from "../_app";
import { collection, getDocs, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { auth, db } from "../../FirebaseConfig";
import { Search } from "../../styles/Svg";

export const Filter = ({ OnFilterUpdate }) => {

  const [Useopen, UsesetOpen] = useState(false);
  const [Usesearch, Usesetsearch] = useState(false);
  const [Useprice, Usesetprice] = useState(false);
  const [Usecolor, UsesetColor] = useState(false);
  const [Usebrand, UsesetBrand] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState([])
  const [vendorFilter, setVendorFilter] = useState([])
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const FilterUpdated = (e) => { // gets the input value from the search bar
    const name = e.target.getAttribute("id");
    let value = e.target.value;

    if (name === "search") {
      value = value.toLowerCase();
    }

    OnFilterUpdate(name, value);
  };

  const CheckboxFilterUpdated = (e) => { // gets the checkboxes value (its dynamic)
    const name = e.target.getAttribute("id");
    const value = e.target.checked;

    OnFilterUpdate(name, value);
  };

  const reset = () => { //simply refreshes the webpage
    window.location.reload();
  };



  const UserItems = async (e) => { // this is where all of the item products are gathered

    const itemsColRefCategory = collection(db, "CategoryFilter");
    const itemsColRefVendor = collection(db, "Vendor");
    const categoryList = [];
    const vendorList = [];
    try {

      const snapshot = await getDocs(itemsColRefCategory);

      snapshot.docs.forEach((doc) => {

        categoryList.push(doc.data())

      });

      setCategoryFilter(categoryList)

    } catch (error) {
      alert(error.message);
    }

    try {

      const snapshot = await getDocs(itemsColRefVendor);

      snapshot.docs.forEach((doc) => {

        if(doc.data().approved){
          vendorList.push(doc.data())
        }

      });

      setVendorFilter(vendorList)

    } catch (error) {
      alert(error.message);
    }

  }

  useEffect(() => {
    UserItems();
  }, []);

  return (
    <>
      <div className="shop_sidebar">
        <Card className="border">
          <Card.Body>
            <Form>
              <Card.Title>
                <h2 className="text-uppercase card-title font-weight-bold d-md-block d-none">
                  filter by
                </h2>
              </Card.Title>
              <div>
                <div className="s_filter">
                  <div className="s_collspan">
                    <h6 className="text-uppercase border-bottom fw-bold">
                      Filter
                      <Button
                        className="filter-collspan"
                        onClick={() => UsesetOpen(!Useopen)}
                        aria-controls="example-collapse-text"
                        aria-expanded={Useopen}
                      ></Button>
                    </h6>
                    <Collapse className="m-botton-24" in={Useopen}>
                      <div className="row filtervalue">
                        <div className="sort-by text-end">
                          <select onChange={FilterUpdated} className="form-select" id="dropDownVal">
                            <option value="1">Without Filter</option>
                            <option value="2">Name, A to Z</option>
                            <option value="3">Name, Z to A</option>
                            <option value="4">Price, low to high</option>
                            <option value="5">Price, high to low</option>
                          </select>
                        </div>
                      </div>
                    </Collapse>
                    <h6 className="text-uppercase border-bottom fw-bold">
                      Search
                      <Button
                        className="filter-collspan"
                        onClick={() => Usesetsearch(!Usesearch)}
                        aria-controls="example-collapse-text"
                        aria-expanded={Usesearch}
                      ></Button>
                    </h6>
                    <Collapse className="m-botton-24" in={Usesearch}>
                      <div className="row filtervalue">
                        <Col
                          xl={12}
                          lg={12}
                          md={12}
                          sm={12}
                          xs={12}
                          className="d-inline-block"
                        >
                          <Form.Label>Search Item Name</Form.Label>
                          <Form.Control
                            id={"search"}
                            placeholder="Search for an Item"
                            onChange={FilterUpdated}
                          />
                        </Col>
                      </div>
                    </Collapse>
                    <h6 className="text-uppercase border-bottom fw-bold">
                      Range
                      <Button
                        className="filter-collspan"
                        onClick={() => Usesetprice(!Useprice)}
                        aria-controls="example-collapse-text"
                        aria-expanded={Useprice}
                      ></Button>
                    </h6>
                    <Collapse in={Useprice}>
                      <div className="row filtervalue">
                        <Col
                          xl={6}
                          lg={6}
                          md={6}
                          sm={6}
                          xs={6}
                          className="d-inline-block"
                        >
                          <Form.Label>min</Form.Label>
                          <Form.Control
                            id={"minPrice"}
                            onChange={FilterUpdated}
                            type="number"
                          />
                        </Col>
                        <Col
                          xl={6}
                          lg={6}
                          md={6}
                          sm={6}
                          xs={6}
                          className="d-inline-block"
                        >
                          <Form.Label>max</Form.Label>
                          <Form.Control
                            id={"maxPrice"}
                            onChange={FilterUpdated}
                            type="number"
                          />
                        </Col>
                      </div>
                    </Collapse>
                  </div>

                  <div className="s_filter">
                    <div className="s_collspan">
                      <h6 className="text-uppercase border-bottom fw-bold">
                        Categories
                        <Button
                          className="filter-collspan"
                          onClick={() => UsesetColor(!Usecolor)}
                          aria-controls="example-collapse-text"
                          aria-expanded={Usecolor}
                        ></Button>
                      </h6>
                      <Collapse in={Usecolor}>
                        <div>
                          {categoryFilter.map((dod) => (
                            <Form.Label key={dod.id} className="form-check">
                              <input
                                onChange={CheckboxFilterUpdated}
                                className="form-check-input"
                                type="checkbox"
                                value="#D10374"
                                id={dod.foodId}
                              />
                              <span className="form-check-label font-weight-bolder">
                                {dod.title}
                              </span>
                              <span className="text-right float-end "></span>
                            </Form.Label>
                          ))}
                        </div>
                      </Collapse>
                    </div>
                  </div>
                  {/*<div className="s_filter">
                    <div className="s_collspan">
                      <h6 className="text-uppercase border-bottom fw-bold">
                        Sellers
                        <Button
                          className="filter-collspan"
                          onClick={() => UsesetBrand(!Usebrand)}
                          aria-controls="example-collapse-text"
                          aria-expanded={Usebrand}
                        ></Button>
                      </h6>
                      <Collapse in={Usebrand}>
                        <div>
                          {vendorFilter.map((dod) => (
                            <Form.Label key={dod.id} className="form-check">
                              <input
                                onChange={CheckboxFilterUpdated}
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id={dod.displayName}
                              />
                              <span className="form-check-label font-weight-bolder" style={{textTransform: "none"}}>
                                {dod.displayName}
                              </span>
                              <span className="text-right float-end "></span>
                            </Form.Label>
                          ))}
                        </div>
                      </Collapse>
                    </div>
                  </div>*/}
                  <button onClick={reset} type="button" className="main-button s_filter">
                    <a>Clear All</a>
                  </button>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Filter;
