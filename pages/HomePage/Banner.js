import React, { useEffect, useState, useCallback } from "react";
import Slider from "react-slick";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfig";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Banner = () => {
  const [itemList, setItemList] = useState([]);

  const getItems = useCallback(async () => {
    if (itemList.length === 0) { // Only fetch if itemList is empty
      const itemsColRef = collection(db, "HomePageSlides");
      let newItemList = [];

      try {
        const snapshot = await getDocs(itemsColRef);
        snapshot.docs.forEach((doc) => {
          newItemList.push({ ...doc.data(), id: doc.id }); // Include id if needed
        });
        setItemList(newItemList);
      } catch (error) {
        console.error("Error fetching HomePageSlides:", error);
      }
    }
  }, [itemList]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  return (
      <div>
        <div className="homeBanner">
          <Slider {...settings}>
            {itemList.map((dod) => (
                <Link href="/Shop" key={dod.id} passHref>
                  <a>
                    <div className="banner-slide">
                      <img src={dod.image} className="img img-fluid mx-auto bannerImg" alt="Responsive image" />
                      <div className="banner-Text">
                        <h2>{dod.title}</h2>
                        <p>{dod.text}</p>
                        <button type="button" className="main-button slider-button" >
                          <Link href="/Shop">
                            <a>Shop Now</a>
                          </Link>
                        </button>
                      </div>
                    </div>
                  </a>
                </Link>
            ))}
          </Slider>
        </div>
      </div>
  );
};

export default Banner;
