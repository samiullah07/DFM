import React, { useContext, useEffect, useRef, useState } from "react";
import { Accordion, Col, Row, Tab, Tabs } from "react-bootstrap";
import Address from "./address";
import Orderasguest from "./orderasguest";
import Payment from "./payment";
import ShippingMethod from "./shippingmethod";
import SignIn from "./signin";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../FirebaseConfig";
import { CartContext } from "../_app";

const Content = () => {
  const { cart } = useContext(CartContext);
  const [itemList, setItemList] = useState([]);
  const [itemNum, setItemNum] = useState("0");
  const [loading, setLoading] = useState(true);
  const [currentUserLoggedIn, setCurrentUserLoggedIn] = useState(null);
  const [logged, setLogged] = useState(null);
  const [logged2, setLogged2] = useState(null);
  const paymentAccordionHeaderRef = useRef(null);
  let [sub, setSub] = useState(0);

  const [accordionValue, setAccordionValue] = useState("Payment");

  useEffect(() => {
  }, [itemNum]);

  function setNum(pNum) {
      setItemNum(pNum)
  }

  const checkUser = async () => { // this will load different data on the website depending if the user is logged in or not

    const urlParams = new URLSearchParams(window.location.search);
    setSub(parseFloat(urlParams.get("subTot")));

    return new Promise((resolve) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setCurrentUserLoggedIn(user.uid);
          resolve(user.uid);
          setLogged(null);
          setLogged2(
            <Accordion.Item value={"Address"} onClick={() => {setItemNum("0")}} eventKey="0">
              <Accordion.Header >Address</Accordion.Header>
              <Accordion.Body>
                <Address pSetNumber={setNum} />
              </Accordion.Body>
            </Accordion.Item>
          );
        } else {
          setLogged(
            <Accordion.Item value={"PersonalInfo"} onClick={() => {setItemNum("0")}} eventKey="0">
              <Accordion.Header>Personal Information</Accordion.Header>
              <Accordion.Body>
                <Tabs
                  defaultActiveKey="orderguest"
                  id="uncontrolled-tab-example"
                  className="mb-xl-3 mb-lg-3"
                >
                  <Tab eventKey="orderguest" title="Order As A Guest">
                    <Orderasguest  pSetNumber={setNum} />
                  </Tab>
                  <Tab eventKey="Sign In" title="Sign In">
                    <SignIn />
                  </Tab>
                </Tabs>
              </Accordion.Body>
            </Accordion.Item>
          );
          setLogged2(null);
          resolve(null);
        }
      });
    });
  };

  const total = (items) =>
    items.reduce(
      (total, pdtitem) => total + Number(pdtitem.price) * Number(pdtitem.quantity),
      0
    );

  const userItemsCart = async (userId) => { //gets the data from users cart
    if (!userId) {
      setLoading(false);
      return;
    }
    const itemsColRef = collection(db, "customers");
    try {
      const snapshot = await getDocs(itemsColRef);
      const newItemList = snapshot.docs
        .filter((doc) => doc.id === userId)
        .flatMap((doc) => doc.data().cart);

      setItemList(newItemList);
      setLoading(false);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const userId = await checkUser();
      await userItemsCart(userId);
    };
    initialize();
  }, []);

  //these just calculate the total price user pays
  const deliveryTax = 4.99;
  const itemsToDisplay = currentUserLoggedIn ? itemList : cart;
  const subTotal = sub;
  const tax = (total(itemsToDisplay) * 0.05).toFixed(2);
  const mainTotal = (Number(subTotal) + Number(deliveryTax) + Number(tax)).toFixed(2);

  useEffect(() => { //passes the total through to the mainpayment page
    const updateURL = () => {
      const url = new URL(window.location);
      url.searchParams.set("mainTotal", mainTotal);
      
      window.history.pushState({}, "", url);
    };

    updateURL();
  }, [mainTotal]);

  return (
    <>
      <div className="container deal_of_container">
        <div className="checkout" id="checkout">
          <Row>
            <Col xl={8} lg={8} md={8} className="contextForm">
              <Accordion value={accordionValue} defaultActiveKey={itemNum} activeKey={itemNum} className="card">
                {logged}
                {logged2}
                <Accordion.Item onClick={() => {setItemNum("2")}} value={"Delivery"} eventKey="2">
                  <Accordion.Header>Delivery Information</Accordion.Header>
                  <Accordion.Body>
                    <ShippingMethod />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item value={"Payment"} onClick={() => {setItemNum("3")}} eventKey="3">
                  <Accordion.Header>
                    Payment
                  </Accordion.Header>
                  <Accordion.Body>
                    <Payment />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
            <Col xl={4} lg={4} md={4}>
              <div className="border rounded bg-white final_payment">
                <div className="card-body border-bottom">
                  <p className="text-muted">{itemsToDisplay.length} items</p>
                  <div>
                    <span className="fw-bold">subtotal</span>
                    <span className="float-end fw-bold">£{subTotal.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="fw-bold">delivery</span>
                    <span className="float-end fw-bold">£{deliveryTax}</span>
                  </div>
                </div>
                <div className="card-body">
                  <div>
                    <span className="fw-bold">taxes</span>
                    <span className="float-end fw-bold">£{tax}</span>
                  </div>
                  <div>
                    <span className="fw-bold">total(tax incl.)</span>
                    <span className="float-end fw-bold">£{mainTotal}</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Content;
