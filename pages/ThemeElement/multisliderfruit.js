import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import Slider from "react-slick";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfig";

const Multisliderfruit = () => {

  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);

  var settings = { // slider settings
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: false,
    responsive: [
      {
        breakpoint: 1270,
        settings: {
          slidesToShow: 2,
          vertical: false,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          vertical: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          vertical: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          vertical: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          vertical: false,
        },
      },
    ],
  };



  const getItems = async (e) => { //this is gathering all of the deal of the day items

    const itemsColRef = collection(db, "DOTD Items");
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
    getItems();
  }, []);

  return (
    <>
      <div className="">
        <Slider {...settings} className="row">
          {itemList.map((dod) => (
            <div
              className="product_thumb bg-white rounded  col-12 "
              key={dod.id}
            >
              <Row className="border mainDealcard">
                <div className="pro_image col-sm-5 cardeffect col-lg-4 col-md-4 col-4 px-0">
                  <Link href="/#">
                    <a>
                      <img
                        src={dod.image}
                        className="img-fluid mx-auto"
                        alt="Deal Single Card"
                      />
                      <div className="second-img">
                        <img
                          src={dod.image}
                          className="img-fluid mx-auto"
                          alt="Deal Single Card"
                        />
                      </div>
                    </a>
                  </Link>
                </div>
                <div className="text-left col-sm-7 col-lg-8 col-md-8 col-8 pr-0 mt-0">
                  <div className="main_text">
                    <div className="text-muted s-title">{dod.subtitle}</div>
                    <h3 className="pro-heading px-0 font-weight-bolder">
                      {dod.maintitle}
                    </h3>
                    <span>
                      <span className="font-weight-bold price ">
                        {dod.newprice}
                      </span>
                      <del className="text-muted"> {dod.oldprice}</del>
                    </span>
                  </div>
                </div>
              </Row>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Multisliderfruit;
