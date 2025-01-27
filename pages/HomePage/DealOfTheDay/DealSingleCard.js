import { Col, Row } from "react-bootstrap";
import Slider from "react-slick";
import Countdown from "./Countdown";
import Link from "next/link";
import { db } from "../../../FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../_app";
import ReactStars from "react-stars";

const DealSingleCard = () => {
  const [itemList, setItemList] = useState([]);
  const [trueItems, setTrueItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({});
  const [windowWidth, setWindowWidth] = useState(0);
  let [classesSet, setClassAttribute] = useState("");
  const [noHover, setoHover] = useState(null);
  let [link, setLink] = useState("");
  let [modelDissapear, setModel] = useState(null);

  const GetItems = async () => { // gets the items from database

  const itemsColRef = collection(db, "items");
  const trueItemsList = [];

  try {
    const snapshot = await getDocs(itemsColRef);

    snapshot.docs.forEach((doc) => {
      doc.data().items.forEach((item) => {
        if (item.id !== "ger42" && item.id !== "123e4") {
          if (item.DOTD === true && item.show) {
            trueItemsList.push(item);
          }
        }
      });
    });

    // Update the trueItems state
    setTrueItems(trueItemsList);
    setLoading(false);

  } catch (error) {
    alert(error.message);
  }
};

  const updateSettings = () => { //this changes the settings depending on the size of the window
    let slidesToShow = 3;

    if (windowWidth < 500) {
      slidesToShow = 1;
    } else if (windowWidth < 680) {
      slidesToShow = 1;
    } else if (trueItems.length <= 3) {
      slidesToShow = trueItems.length;
    }

    const baseSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      rows: trueItems.length >= 7 ? 2 : 1,
    };

    setSettings(baseSettings);
  };

  useEffect(() => {
    const fetchData = async () => {
      await GetItems();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      updateSettings();
    }
  }, [loading, trueItems, windowWidth]);

  useEffect(() => {//this detects the window size
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial window width
    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
  <>
    <Slider {...settings} className="row fixedProductImageDOTD">
      {trueItems.map((dod) => {
        const isOutOfStock = dod.stock === 0;
        const itemLink = isOutOfStock ? "#" : `/productId/${dod.id}`;
        const classAttribute = isOutOfStock ? "imageNoneStock" : "";
        const noHover = isOutOfStock ? "" : (
          <div className="second-img">
            <img
              src={dod.imageGallery[0]}
              className="js-img img-fluid mx-auto"
              alt="SingleProduct"
            />
          </div>
        );
        const modelDissapear = isOutOfStock ? (
          <div className="second-img">
            <p className="dealoftheDayoutOfStockTxt"><b>Out Of Stock</b></p>
          </div>
        ) : null;

        return (
          <div className="product_thumb bg-white rounded col-12" key={dod.id}>
            <Row className="border mainDealcard">
              <div className="pro_image col-sm-5 cardeffect col-lg-4 col-md-4 col-4 px-0">
                <Link href={itemLink}>
                  <a>
                    <img
                      src={dod.imageGallery[0]}
                      className={`img-fluid mx-auto ${classAttribute}`}
                      alt="Deal Single Card"
                    />
                    {noHover}
                    {modelDissapear}
                  </a>
                </Link>
              </div>
              <div className="text-left col-sm-7 col-lg-8 col-md-8 col-8 pr-0 mt-0">
                <div className="main_text">
                  <ReactStars
                      className={"starsNoFunc"}
                        count={5}
                        size={24}
                        color2={"#ffd700"}
                        value={dod.averageRating}
                  />
                    <span style={{textTransform: "none"}}>({dod.reviews.length} Review/s)</span> {/* Display the number of reviews */}
                  <div className="text-muted s-title">{dod.subName}</div>
                  <Link href={itemLink}>
                    <h3 className="pro-heading px-0 font-weight-bolder">
                      {dod.name}
                    </h3>
                  </Link>
                  <span>
                    <span className="font-weight-bold price ">
                      £{dod.price}
                    </span>
                    <del className="text-muted">{dod.oldPrice}</del>
                  </span>
                  <div className="deal-Coundown">
                    <Countdown/>
                  </div>



                </div>
              </div>
            </Row>
          </div>
        );
      })}
    </Slider>
  </>
  );

};

export default DealSingleCard;
