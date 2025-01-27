import React, { useContext, useEffect, useState} from "react";
import Slider from "react-slick";
import { Col } from "react-bootstrap";
import { CartContext } from "../../_app";
import { SingleProduct } from "../../../component/Product/Products/SingleProduct/SingleProduct";
import {db} from "../../../FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";


const settings = { //sets the slider settings
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 4,

      }
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 4,

      }
    },
    { 
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
      }
    }
  ]
};

const FeaturedSlider = () => {


  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);

  const { cart, setCart } = useContext(CartContext);


  const GetItems = async (e) => { // get the items

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
    GetItems();
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
      <Slider {...settings} className="row">
        {itemList.map((product,index) => (
          <div key={index}>

      
          <Col xl={12}>
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
          </div>
        ))}
      </Slider>
    </>
  );
};

export default FeaturedSlider;
