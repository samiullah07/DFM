import Link from "next/link";
import { auth, db } from "../../../FirebaseConfig"; // Ensure db is imported
import { Cart } from "../Cart";
import React, {useContext, useEffect} from "react";
import { CartContext } from "../../../pages/_app";
import { Col } from "react-bootstrap";
import { updateDoc, doc, arrayRemove, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";
let localCart = [];
let newCart = []
let cartEmpty = true;
// TODO There will be 2 different carts 1 cart set to local storage if logged out if not then online cart and drag items from current cart to online
// TODO if user logged in then user online cart associated with that user

export const Card = ({ cart, onChangeQuantity }) => {
  const { name, image, id, isStocked, productNumber, oldPrice, price, quantity } = cart;

  const { cart: userCart, setCart: setUserCart } = useContext(CartContext);

  const showCart = () => {
    console.log(cart)
    Swal.fire({
      icon: "success",
      title: "Item removed from cart",
      showConfirmButton: false,
      timer: 1500
    });
  };

  const handleRemoveFromCart = async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(db, "customers", user.uid);

      // Fetch the current cart
      const userDoc = await getDoc(userDocRef);
      const cart = userDoc.data()?.cart || [];

      // Filter out the item with the specified ID
      const updatedCart = cart.filter(item => item.id !== id);

      // Update the Firestore document with the updated cart
      await updateDoc(userDocRef, {
        cart: updatedCart
      });
      showCart();
    } catch (error) {
      console.error("Error removing item from cart: ", error);
    }
  } else {
    const newCart = userCart.filter(item => item.id !== cart.id);
    setUserCart(newCart);
    showCart();
  }
};


  return (
    <>
      <div className="ctable-row border-bottom">
        <div className="cart-width-main col">
          <div className="">
            <Link href={`/productId/${id}`}>
              <a className="cart-table__img">
                <img src={cart.imageGallery[0]} className="js-img img-fluid mx-auto" alt="" />
              </a>
            </Link>
            <div className="ctable-info">
              <Link href={`/productId/${id}`}>
                <a className="title prodTitle">{name}</a>
              </Link>
              {isStocked && <span className="ctableinfo-stock prodTitle">Stock Available: {cart.stock}</span>}
              <span className="ctableinfo-num prodTitle">ID: {id}</span>
            </div>
          </div>
        </div>
        <div className="cart-sub-width col">
          <div className="ctable-col col">
            {oldPrice ? (
                <span className="ctable-price">
                £{price}
                  <del className="text-muted">£{oldPrice}</del>
              </span>
            ) : (
                <span className="ctable-price">£{price}</span>
            )}
          </div>
          <div className="ctable-col col">
            <div className="ctable-quantity">
              <div className="c-box">
                <span
                    onClick={() => onChangeQuantity("decrement", quantity)}
                    className="counter-link quantity clink-prev"
                >
                  <i className="fa fa-angle-left" aria-hidden="true"></i>
                </span>
                <input type="text" className="quantity c-input" value={quantity} readOnly/>
                <span
                    onClick={() => onChangeQuantity("increment", quantity)}
                    className="counter-link clink-next"
                >
                  <i className="fa fa-angle-right" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="ctable-col col">
            <span className="ctable-total">
              £{(price * quantity).toFixed(2)}
            </span>
          </div>
          <div className="col">
            <Link href="#">
              <a onClick={handleRemoveFromCart}>
                <i className="fas fa-trash-alt"></i>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
