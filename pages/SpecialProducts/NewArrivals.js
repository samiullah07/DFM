import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { Col } from "react-bootstrap";
import { SingleProduct } from "../../component/Product/Products/SingleProduct/SingleProduct";
import { CartContext } from "../_app";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfig";

const NewArrivals = () => { //SAME AS BESTSELLER
  const [itemList, setItemList] = useState([]);
  const [trueItems, setTrueItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(null);
  const [classes, setClasses] = useState(null);

  const { cart, setCart } = useContext(CartContext);

  const UserItems = async () => {
    const itemsColRef = collection(db, "items");
    const newItemList = [];
    const trueItemsList = [];
    const falseItemsList = [];

    try {
      const snapshot = await getDocs(itemsColRef);

      snapshot.docs.forEach((doc) => {
        doc.data().items.forEach((item) => {
          if (item.id !== "ger42" && item.id !== "123e4") {
            newItemList.push(item);
            if ( item.category === "NewArrivals") {
              item.show ? trueItemsList.push(item) : falseItemsList.push(item);
            }
          }
        });
      });

      setItemList(newItemList);
      setTrueItems(trueItemsList);
      setLoading(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const chooseSettings = () => {
  const baseSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    rows: 1,
    responsive: [],
  };

  if (trueItems.length === 1) {
    baseSettings.slidesToShow = 1;
    setClasses("singleImageSizeCustom");

    baseSettings.responsive = [
      { breakpoint: 1199, settings: { slidesToShow: 1 } },
      { breakpoint: 900, settings: { slidesToShow: 1 } },
      { breakpoint: 800, settings: { slidesToShow: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ];
  } else if (trueItems.length <= 3) {
    baseSettings.slidesToShow = trueItems.length;
    setClasses("imageSizeCustom");

    baseSettings.responsive = [
      { breakpoint: 1199, settings: { slidesToShow: trueItems.length } },
      { breakpoint: 900, settings: { slidesToShow: trueItems.length } },
      { breakpoint: 800, settings: { slidesToShow: trueItems.length } },
      { breakpoint: 600, settings: { slidesToShow: trueItems.length } },
      { breakpoint: 480, settings: { slidesToShow: trueItems.length } },
    ];
  } else if (trueItems.length >= 7) {
    baseSettings.rows = 2;
    setClasses("imageSizeCustom");

    baseSettings.responsive = [
      { breakpoint: 1199, settings: { slidesToShow: 2, rows: 2 } },
      { breakpoint: 900, settings: { slidesToShow: 2, rows: 2 } },
      { breakpoint: 800, settings: { slidesToShow: 2, rows: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 2, rows: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 2, rows: 2 } },
    ];
  } else {
    baseSettings.responsive = [
      { breakpoint: 1199, settings: { slidesToShow: 2 } },
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 800, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ];
  }

  setSettings(baseSettings);
};


  useEffect(() => {
    const fetchData = async () => {
      await UserItems();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      chooseSettings();
    }
  }, [loading, trueItems]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = (id) => {
    const newProduct = trueItems?.find((pd) => pd.id === id);
    setCart([...cart, { ...newProduct, quantity: 1 }]);
  };

  return (
    <>
      {settings && (
        <Slider {...settings} className={`row fixedProductImage ${classes}`}>
          {trueItems.map((product, index) => (
            <Col xl={12} key={index}>
              <SingleProduct
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
        </Slider>
      )}
    </>
  );
};

export default NewArrivals;
