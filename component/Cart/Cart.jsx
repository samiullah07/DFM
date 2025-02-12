import { Card } from "./Card/Card";
import { CartContext } from "../../pages/_app";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { auth, db, sendEmailVerification } from "../../FirebaseConfig";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { onSnapshot, query, where } from "firebase/firestore";


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
  const delay = ms => new Promise(res => setTimeout(res, ms));

  // Initialize user and cart
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

// Memoize fetchMatchingItems to prevent recreation on every render
  const fetchMatchingItems = useCallback(async (cartOrItemToDisplay) => {
    try {
      const shopItemDocRef = doc(db, "items", "shopItems");
      const shopItemSnapshot = await getDoc(shopItemDocRef);

      if (shopItemSnapshot.exists()) {
        const shopItemsArray = shopItemSnapshot.data().items || [];
        return shopItemsArray.filter(shopItem =>
            cartOrItemToDisplay.some(cartItem => cartItem.id === shopItem.id)
        );
      }
      return [];
    } catch (error) {
      console.error("Error fetching items: ", error);
      return [];
    }
  }, []);

  const Error = async () => {
    Swal.fire({
      icon: "error",
      title: "Unfortunately your cart is empty",
      showConfirmButton: false,
      timer: 3000
    });
  };

  const checkUser = async () => {
    return new Promise((resolve) => {
      auth.onAuthStateChanged(user => {
        if (user) {
          setCurrentUserLoggedIn(user.uid);
          setIsEmailVerified(user.emailVerified);
          resolve(user.uid);
        } else {
          setIsEmailVerified(false);
          setCurrentUserLoggedIn(null);
          resolve(null);
        }
      });
    });
  };

  const userItemsCart = (userId) => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const customerDocRef = doc(db, "customers", userId);

    onSnapshot(customerDocRef, (doc) => {
      if (doc.exists) {
        const customerData = doc.data();
        setItemList(customerData.cart || []);
      }
      setLoading(false);
    }, (error) => {
      alert(error.message);
      setLoading(false);
    });
  };

  const updateQuantityVal = async (currentQuant, itemId, userId) => {
    if (!userId) return;
    const customerDocRef = doc(db, "customers", userId);
    try {
      const snapshot = await getDocs(collection(db, "customers"));
      const customerData = snapshot.docs.find(doc => doc.id === userId)?.data();

      if (customerData) {
        const updatedCart = customerData.cart.map(item =>
            item.id === itemId ? { ...item, quantity: currentQuant } : item
        );
        await updateDoc(customerDocRef, { cart: updatedCart });
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const total = (items) => {
    const totalAmount = items.reduce(
        (total, pdtitem) => total + Number(pdtitem.price) * Number(pdtitem.quantity),
        0
    );

    const discountAmount = (discount / 100) * totalAmount;

    return totalAmount - discountAmount;
  }

  const handlePdtQty = async (change, quantity, id) => {
    if (currentUserLoggedIn) {
      let passedQuantity;

      const updatedItemList = itemList.map((pdtitem) => {
        if (pdtitem.id === id) {
          passedQuantity = change === "increment" ? quantity + 1 : Math.max(1, quantity - 1);
          return { ...pdtitem, quantity: passedQuantity };
        }
        return pdtitem;
      });

      setItemList(updatedItemList);

      if (passedQuantity !== undefined) {
        await updateQuantityVal(passedQuantity, id, currentUserLoggedIn);
      }
    } else {
      // For non-logged in users, update cart instead of itemList
      const updatedCart = cart.map((pdtitem) => {
        if (pdtitem.id === id) {
          const newQuantity = change === "increment" ? quantity + 1 : Math.max(1, quantity - 1);
          return { ...pdtitem, quantity: newQuantity };
        }
        return pdtitem;
      });

      setCart(updatedCart); // Changed from setItemList to setCart
    }
  };

  const ErrorCheck = async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      setIsEmailVerified(auth.currentUser.emailVerified);

      if (!auth.currentUser.emailVerified) {
        Swal.fire({
          icon: "warning",
          title: "Please Verify Your Email",
          text: "You need to verify your email before proceeding to checkout.",
          showConfirmButton: false,
          timer: 3000
        });
        return;
      }
    }

    // Fetch the stock levels of items to display
    const fetchedItems = await fetchMatchingItems(itemsToDisplay);

    // Check for any out-of-stock items
    const outOfStockItems = fetchedItems.filter(item => item.stock === 0);

    if (outOfStockItems.length > 0) {
      // Create a message with the names of out-of-stock items
      const outOfStockItemNames = outOfStockItems.map(item => item.name).join(", ");
      Swal.fire({
        icon: "error",
        title: "Out of Stock",
        text: `The following items are out of stock: ${outOfStockItemNames}. Please remove them from your cart.`,
        confirmButtonText: "Okay"
      });
      return; // Prevent proceeding to checkout
    }

    if (itemsToDisplay.length === 0) {
      setMainLink("#");
      await Error();
    } else {
      const link = `/Checkout?subTot=${total(itemsToDisplay)}`;
      setMainLink(link);
      router.push(link);
    }
  };

  const resendVerificationEmail = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("No user is currently signed in.");
      }

      // Logging the user object to check if it's valid
      console.log("Current user:", user);

      // await user.sendEmailVerification();
      // await sendEmailVerification(user.email);

      await sendEmailVerification(user)

      Swal.fire({
        icon: "success",
        title: "Verification Email Sent",
        text: "Please check your inbox and verify your email.",
        showConfirmButton: false,
        timer: 3000
      });
    } catch (error) {
      let errorMessage = "Failed to send verification email. Please try again later.";

      if (error.message) {
        errorMessage += ` Error: ${error.message}`;
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        showConfirmButton: false,
        timer: 3000
      });
    }
  };


  const itemsToDisplay = currentUserLoggedIn ? itemList : cart;



// Listen for cart changes and update stock information
  useEffect(() => {

    const itemsToDisplay = currentUserLoggedIn ? itemList : cart;

    if (itemsToDisplay.length > 0) {
      const updateStockInfo = async () => {
        try {
          const matchingItems = await fetchMatchingItems(itemsToDisplay);
          const updatedItems = itemsToDisplay.map(itemToDisplay => {
            const matchingItem = matchingItems.find(mItem => mItem.id === itemToDisplay.id);
            return matchingItem ? { ...itemToDisplay, stock: matchingItem.stock } : itemToDisplay;
          });

          // Only update if there are actual changes
          if (JSON.stringify(updatedItems) !== JSON.stringify(cart)) {
            setCart(updatedItems);
            console.log("reloading")

          }
        } catch (error) {
          console.error("Error updating stock info:", error);
        }
      };

      updateStockInfo();
    }
  }, [itemList, currentUserLoggedIn]);


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