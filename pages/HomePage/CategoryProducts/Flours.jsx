import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Row } from "react-bootstrap";
import Link from "next/link";
import { db } from "../../../FirebaseConfig";
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";
import ReactStars from "react-stars/dist/react-stars";

const Flours = () => { //SAME AS DRINKS CLASS
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trueItems, setTrueItems] = useState([]);
  const [falseItems, setFalseItems] = useState([]);
  const [specificAttributes, setClass] = useState("");

  function calculateAverage(arr) {
    // Step 1: Calculate the sum of all elements
    const sum = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log("Sum:", sum);
    // Step 2: Divide the sum by the number of elements
    const average = sum / arr.length;
    console.log("Average:", average);
    return average;
}


const handleRatingChange = async (newRating, itemId) => {
    console.log(`New rating for item ${itemId} is:`, newRating);
    let newList = [];
    let average = 0;

    const itemsUpdate = doc(db, "items", "shopItems");
    const updatedItems = itemList.map((item) => {
        if (item.id === itemId) {
          item.reviews.push(newRating)

          // Clear the newList array before adding the ratings
          newList = [...item.reviews];  // Spread operator to copy ratings

          // If you want to include the newRating as well, add it to newList
          newList.push(newRating);

          average = calculateAverage(newList).toFixed(2);
          item.averageRating = average;

        }
        return item;
    });

    // If needed, update the database with the new average rating
     await updateDoc(itemsUpdate, {
         items: updatedItems,
     });
};

  useEffect(() => {
    const itemsColRef = collection(db, "items");

    const unsubscribe = onSnapshot(itemsColRef, (snapshot) => {
      const newItemList = [];
      const trueItemsList = [];
      const falseItemsList = [];
      let avarage = 0;
      const newList = [];
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        data.items.forEach((item) => {
          newItemList.push(item);

          if (item.show) {
            if (item.ProductType.includes("Grains") || item.ProductType.includes("Flours")){
              trueItemsList.push(item);
            }
          } else {
            falseItemsList.push(item);
          }
        });
      });

      setItemList(newItemList);
      setTrueItems(trueItemsList);
      setFalseItems(falseItemsList);
      setLoading(false);

      if (trueItemsList.length === 1) {
        setClass("imageSizeCategory");
      } else if (trueItemsList.length === 2) {
        setClass("imageSizeCategoryforTwo");
      } else {
        setClass("");
      }
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const slidesToShow = trueItems.length <= 3 ? trueItems.length : 3;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    rows: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: slidesToShow,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: slidesToShow,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings} className={`row fixedProductImageCategory ${specificAttributes}`}>
        {trueItems.map((dod) => (
          <div className="product_thumb rounded col-12" key={dod.id}>
            <Row className="border mainDealcard">
              <div className="pro_image col-sm-5 cardeffect col-lg-4 col-4 m-0 px-0">
                <Link href={dod.stock === 0 ? "#" : `/productId/${dod.id}`}>
                  <a>
                    <img
                      src={dod.imageGallery[0]}
                      className={`img-fluid mx-auto ${dod.stock === 0 ? "imageNoneStock" : ""}`}
                      alt="juice"
                    />
                    {dod.stock === 0 ? (
                      <div className="second-img">
                        <p className="CategoryoutOfStockTxt">
                          <b>Out Of Stock</b>
                        </p>
                      </div>
                    ) : (
                      <div className="second-img">
                        <img
                          src={dod.imageGallery[0]}
                          className="js-img img-fluid mx-auto"
                          alt="SingleProduct"
                        />
                      </div>
                    )}
                  </a>
                </Link>
              </div>
              <div className="m-0 col-sm-7 col-lg-8 col-8 pr-0 mt-0">
                <div className="main_text text-start">
                  <div className="text-muted d-sm-none d-md-inline-block s-title">
                    <ReactStars
                        className={"starsNoFunc"}
                        count={5}
                        size={24}
                        color2={"#ffd700"}
                        value={dod.averageRating}
                    />
                    <span style={{textTransform: "none"}}>({dod.reviews.length} Review/s)</span> {/* Display the number of reviews */}
                  </div>
                  <Link href={dod.stock === 0 ? "#" : `/productId/${dod.id}`}>
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
                </div>
              </div>
            </Row>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Flours;
