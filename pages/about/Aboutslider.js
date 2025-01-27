import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import {db} from "../../FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const Aboutslider = () => {

  const [itemList, setItemList] = useState([]);

  const [loading, setLoading] = useState(true);

  const [copyOfMainList, setcopyOfMainList] = useState([])

  const Items = async () => { //gets the data from teamdata in firebase to use below to display the image and names of the team

    const itemsColRef = collection(db, "TeamData");
    let newItemList = [];
    try {

      const snapshot = await getDocs(itemsColRef);

      snapshot.docs.forEach((doc) => {

        doc.data().teamdata.forEach((item) => {

          newItemList.push(item);

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
    Items();


  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
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
      <div className="container about_testimonials">
        <Slider {...settings}>
          {itemList.map((elm, index) => (
            <div className="item" key={index}>
              <div className="ab_thumb text-center ">
                <img
                  src={elm.image}
                  className="fst-image mx-auto d-block img-fluid rounded"
                  alt="team_1"
                />
                <h5 className="fw-bold pt-3 pt-md-2 cursor-pointer">
                  {elm.name}
                </h5>
                <div className=" ab-slider-subtitle">{elm.title}</div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Aboutslider;
