import React, {Component, useContext, useEffect, useState} from "react";
import { Row, Col } from "react-bootstrap";
import { CartContext } from "../_app";
import { ListProduct } from "../../component/Product/Products/ListProduct/ListProduct";
import { db } from "../../FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const ListView = () => {

  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);

  const { cart, setCart } = useContext(CartContext);


  const UserItems = async (e) => { // user items

    const itemsColRef = collection(db, "items");
    const newItemList = [];

    try {

      const snapshot = await getDocs(itemsColRef);

      snapshot.docs.forEach((doc) => {

        doc.data().items.forEach((item) => {
          if (item.id === "ger42"){

          }else{
            if (item.id === "123e4"){

            }else{
              //console.log(item)
              newItemList.push(item);

            }

          }

        });

      });

      setItemList(newItemList);
      setLoading(false);

    } catch (error) {
      alert(error.message);
    }

  }

  useEffect(() => {
    UserItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = (id) => {
    const newProduct = itemList?.find((pd) => pd.id === id);
    setCart([...cart, { ...newProduct, quantity: 1 }]);
  };

  return (
    <>
    <Row>
        {itemList.map((product,index) => (
          <Col xl={12} md={12} xs={12} key={index}>
          <ListProduct
            addedInCart={Boolean(cart?.find((pd) => pd.id === product.id))}
            key={product.id}
            product={product}
            name={product.name}
            price={product.price}
            oldPrice={product.oldPrice}
            onAddToWish={(id) => console.log(id)}
            onAddToCart={handleAddToCart}
          />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ListView;

