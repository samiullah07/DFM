import { Card } from "./Card/Card";
import { CartContext } from "../../pages/_app";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { auth, db, sendEmailVerification } from "../../FirebaseConfig";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { onSnapshot } from "firebase/firestore";

export const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserLoggedIn, setCurrentUserLoggedIn] = useState(null);
  const [mainLink, setMainLink] = useState("");
  const [promoValue, setPromoValue] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initialize = async () => {
      const userId = await checkUser();
      if (userId) {
        userItemsCart(userId);
      } else {
        setLoading(false);
      }
    };
    initialize();
  }, []);

  const promoChange = async event => {
    const promoCode = event.target.value;
    setPromoValue(promoCode);

    const itemsColRef = collection(db, "PromoCodes");

    try {
      const snapshot = await getDocs(itemsColRef);
      let discountApplied = false;

      snapshot.docs.forEach((data) => {
        data.data().promoList.forEach((code) => {
          const amount = code.amount;
          const promoName = code.promoName;

          if (promoCode === promoName) {
            setDiscount(amount);
            discountApplied = true;
          }
        });
      });

      if (!discountApplied) {
        setDiscount(0);
      }

    } catch (error) {
      alert(error.message);
    }
  }

  const total = (items) => {
    const totalAmount = items.reduce(
        (total, pdtitem) => total + Number(pdtitem.price) * Number(pdtitem.quantity),
        0
    );

    const discountAmount = (discount / 100) * totalAmount;

    return totalAmount - discountAmount;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div className="container">
        <div className="card">
          <Row>
            <Col xl={12}>
              <div className="cardbox">
                <div className="cardTblBox">
                  <div className="cardRow cardHeadRow">
                    <div className="cart-width-main">
                      <div className="cartTableCol">Product</div>
                    </div>
                    <div className="cart-sub-width row">
                      <div className="cartTableCol col">Price</div>
                      <div className="cartTableCol col">Quantity</div>
                      <div className="cartTableCol col">Total</div>
                      <div className="cartTableCol col">Delete</div>
                    </div>
                  </div>
                  {cart.length > 0 ? (
                      cart.map((item) => (
                          <Card
                              onChangeQuantity={(change, quantity) =>
                                  handlePdtQty(change, quantity, item.id)
                              }
                              key={item.id}
                              cart={item}
                          />
                      ))
                  ) : (
                      <div>No items in the cart</div>
                  )}
                </div>
              </div>
            </Col>
            <Col xl={6}></Col>
            <Col xl={6}>
              <div className="cbottom">
                <div className="cbottom-total">
                  <div className="cbottom-totalgoods mb-3">
                    <span className="cgood">Enter Promo Code</span>
                    <input onChange={promoChange} className="promoInput" value={promoValue}></input>
                  </div>
                  <div className="cbottom-totalpromo mb-3 text-center">
                    <span className="cgood">Discount</span>
                    <span className="cgood-price">{discount > 0 ? `${discount.toFixed()}%` : 'No'}</span>
                  </div>
                  <div className="cbottom-totalnum v text-center">
                    <span className="cgood"> total: </span>
                    <span className="cgood-price">£{total(itemsToDisplay).toFixed(2)}</span>
                  </div>
                  <hr />
                  <button
                      onClick={ErrorCheck}
                      type="button"
                      className="main-button"
                      disabled={currentUserLoggedIn && !isEmailVerified}
                  >
                    Pay Now
                  </button>
                  {currentUserLoggedIn && !isEmailVerified && (
                      <button
                          onClick={resendVerificationEmail}
                          type="button"
                          className="resend-email-button"
                      >
                        Resend Verification Email
                      </button>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
  );
};

export default Cart;
