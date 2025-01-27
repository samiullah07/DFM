import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import { Col } from "react-bootstrap";
import { collection, getDocs } from "firebase/firestore";
import {db} from "../../FirebaseConfig";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

const FirstCategoryDesign = () => {

  const [itemList, setItemList] = useState([]);

  const [loading, setLoading] = useState(true);

  const [copyOfMainList, setcopyOfMainList] = useState([])

  const getItems = async () => { // gets data from firebase and calls it below to be used in the website

    const itemsColRef = collection(db, "items");
    let newItemList = [];
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
      setcopyOfMainList(newItemList)
      setLoading(false);

    } catch (error) {
      alert(error.message);
    }

  }

  useEffect(() => {
    getItems();


  }, []);

  return (
    <>
      <div className="container deal_of_container categoryProductsBgColor">
        <Slider {...settings} className="row ">
          {itemList.map((elm, index) => (
            <Col xl={12} lg={12} key={index}>
              <div className=" firstcategory ">
                <img src={elm.image} className="js-img img-fluid mx-auto" alt="first category" />
                <h6 className="text-center text-uppercase text-muted">
                  {elm.category}
                </h6>
              </div>
            </Col>
          ))}
        </Slider>
      </div>
    </>

  );
};

export default FirstCategoryDesign;
