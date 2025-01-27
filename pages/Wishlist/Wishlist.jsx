import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { PublicLayout } from "../Layout/PublicLayout";
import { auth, db } from "../../FirebaseConfig";
import { collection, getDocs, updateDoc, doc, arrayRemove } from "firebase/firestore";
import {ProCart} from "../../styles/Svg";
import Swal from "sweetalert2";

const breadcrumbsData = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Wishlist",
    path: "#",
  },
];

const Wishlist = () => {

  const [itemList, setItemList] = useState([]);
  const [currentUserLoggedIn, setCurrentUserLoggedIn] = useState(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(true);
  let [userCartTotal, setuserCartTotal] = useState(0);
  let userId;
  const [quantity, setQuantity] = useState(1);
  const delay = ms => new Promise(res => setTimeout(res, ms));

  const checkUser = () => { //Checking if user is logged in
    return new Promise((resolve) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setCurrentUserLoggedIn(user.uid);
          resolve(user.uid);
          userId = user.uid;
        } else {
          setCurrentUserLoggedIn(null);
          resolve(null);
        }
      });
    });
  };

  const fetchMatchingItems = async (cartOrItemToDisplay) => {
    try {
      // Reference to the Firestore 'items' collection
      const itemsColRef = collection(db, "items");

      // Fetch all documents from the 'items' collection
      const itemsSnapshot = await getDocs(itemsColRef);

      // Assuming `shopItem` is a document within the 'items' collection
      // that contains an array of item objects in a field called `items`
      const shopItemDocRef = doc(db, "items", "shopItems");
      const shopItemSnapshot = await getDoc(shopItemDocRef);

      if (shopItemSnapshot.exists()) {
        const shopItemsArray = shopItemSnapshot.data().items || [];

        // Filter the shop items by matching the IDs in `cartOrItemToDisplay`
        const matchingItems = shopItemsArray.filter(shopItem =>
            cartOrItemToDisplay.some(cartItem => cartItem.id === shopItem.id)
        );

        // Return the matching items
        return matchingItems;
      } else {
        console.error("ShopItem document does not exist.");
        return [];
      }

    } catch (error) {
      console.error("Error fetching items: ", error);
      return [];
    }
  };

  const calcTotalUser = async (product) => { // used to calculate the amount of items in the wishlist
    let total;
    let newTotal = 0;

    if (!product.id) {
      setLoading(false);
      return;
    }

    const itemsColRef = collection(db, "customers");
    const newItemList = [];

    try {
      const snapshot = await getDocs(itemsColRef);
      snapshot.docs.forEach((data) => {
        if (data.id === userId) {
          data.data().cart.forEach((item) => {
            total = item.price * item.quantity;
            newTotal += total;
          });
        }
      });
    } catch (error) {
      alert(error.message);
    }

    setuserCartTotal(newTotal);
  };

  const showSwal = () => { // user pop up
    Swal.fire({
      icon: "success",
      title: "Your item has been added",
      showConfirmButton: false,
      timer: 1500
    });
  };

  const cartBtnClicked = async (product) => { //adds the items from the wishlist to the user's basket
    if (product.stock === 0) {
      return;
    }
    if (currentUserLoggedIn) {
      await userAddItemsCart(currentUserLoggedIn, product);
      await calcTotalUser(product);
      await showSwal();
      await delay(2000);
    }

  };

  const userAddItemsCart = async (id, product) => { //Adds the item to the actual cart in the database
    if (!id) {
      setLoading(false);
      return;
    }
    const itemsColRef = collection(db, "customers");
    const newItemList = [];
    let itemExists = false;

    try {
      const snapshot = await getDocs(itemsColRef);
      snapshot.docs.forEach((data) => {
        if (data.id === id) {
          const cart = data.data().cart;

          cart.forEach((item) => {
            if (item.id === product.id) {
              item.quantity += quantity;
              itemExists = true;
            }
          });

          if (!itemExists) {
            product.quantity = quantity;
            cart.push(product);
          }

          newItemList.push(...cart);
        }
      });
    } catch (error) {
      alert(error.message);
    }

    await updateDoc(doc(db, "customers", id), {
      cart: newItemList,
    });
  };

  const userItemsCart = async (userId) => { // grabs the current items in the users cart
    if (!userId) return;
    const itemsColRef = collection(db, "customers");
    const newItemList = [];
    try {
      const snapshot = await getDocs(itemsColRef);
      snapshot.docs.forEach((data) => {
        if (data.id === userId) {
          data.data().wishlist.forEach((item) => {
            newItemList.push(item);
          });
        }
      });
      setItemList(newItemList);
      
    } catch (error) {
      alert(error.message);
    }
  };

  const removeFromWishlist = async (product) => {// removes item from the users wishlist
    if (!currentUserLoggedIn) {
      return;
    }

    const userDocRef = doc(db, "customers", currentUserLoggedIn);

    try {
      await updateDoc(userDocRef, {
        wishlist: arrayRemove(product),
      });
      setItemList((prevItems) => prevItems.filter((item) => item.id !== product.id));



    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const userId = await checkUser();
      await userItemsCart(userId);
      setLoading(false);
    };
    initialize();
  }, []);

  useEffect(() => {
    const display = () => {
      if (loading) {
        setOutput(
          <div className="onlyOne d-flex justify-content-center">
            <h2>Loading...</h2>
          </div>
        );
      } else if (currentUserLoggedIn) {
        if (itemList.length > 0) {
          setOutput(
            <div className="container wishlist">
              {itemList.map((elm, index) => (
                <div className="row" key={index}>
                  <Col xs={12} md={6} lg={6}>
                    <div className="d-flex row">
                      <Col xl={4} xs={4} md={5} lg={5} className="px-0">
                        <img src={elm.imageGallery[0]} className="img-fluid mx-auto" alt="wishlist" />
                      </Col>
                      <Col xl={8} xs={8} md={7} lg={7}>
                        <h5 className="w_product_name font-weight-bold mb-2 mb-sm-3 mb-xl-3">
                          <a href={`/productId/${elm.id}`} className="common">
                            {elm.name}
                          </a>
                        </h5>
                        <ul className="p-0">
                          <li className="my-1 list-unstyled">
                            <span className="d-xl-inline-block d-none"> {elm.category} </span>
                          </li>
                          {/* Stock info appears under the name on smaller screens */}
                          <li className="my-1 list-unstyled d-xl-none">
          <span className="stock-info">
            <b>Available Stock:</b> {elm.stock}
          </span>
                          </li>
                        </ul>
                      </Col>
                    </div>
                  </Col>
                  <Col md={6} lg={6}>
                    <div>
                      <Row>
                        <Col lg={4} xs={4}>
                          <ul className="p-0">
                            <li className="my-1 list-unstyled">
                              <span className="font-weight-bold"> Price</span>
                            </li>
                            <li className="my-1 list-unstyled">
                              <span className=""> £{elm.price}</span>
                            </li>
                          </ul>
                        </Col>
                        <Col lg={4} xs={4}>
                          {/* Stock info appears on the right for larger screens */}
                          <span className="font-weight-bolder stock d-none d-xl-inline-block">
          <b>Available Stock:</b> {elm.stock}
        </span>
                        </Col>
                        <Col lg={4} xs={4} className="text-end d-flex flex-column justify-content-between">
                          <div className="d-flex justify-content-end align-items-center">
                            <Link href="#">
                              <a onClick={() => cartBtnClicked(elm)} className="me-4">
                                <ProCart height="50" />
                              </a>
                            </Link>
                            <Link href="#">
                              <a onClick={() => removeFromWishlist(elm)} className="me-4">
                                <i className="fas fa-trash-alt" style={{color: "red", fontSize: "18px"}}></i>
                              </a>
                            </Link>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <hr />
                </div>
              ))}
            </div>
          );
        } else {
          setOutput(
            <div className="onlyOne d-flex justify-content-center">
              <h2>There are no items in your wishlist</h2>
            </div>
          );
        }
      } else {
        setOutput(
          <div className="onlyOne d-flex justify-content-center">
            <h2>You need to log in to add or view your wishlist</h2>
          </div>
        );
      }
    };

    display();
  }, [loading, currentUserLoggedIn, itemList]);

  return (
    <>
      <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Wishlist">
        {output}
      </PublicLayout>
    </>
  );
};

export default Wishlist;
