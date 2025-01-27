import React, {Component, useEffect, useState} from "react";
import Slider from "react-slick";
import {db} from "../../../FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const TestimonialSlider = () => {

  const [itemList, setItemList] = useState([]);

  const [loading, setLoading] = useState(true);

  const [copyOfMainList, setcopyOfMainList] = useState([])

  const Items = async () => {

    const itemsColRef = collection(db, "Testimonials");
    let newItemList = [];
    try {

      const snapshot = await getDocs(itemsColRef);

      snapshot.docs.forEach((doc) => {

        doc.data().testimonials.forEach((item) => {

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
      slidesToShow: 2,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1270,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 580,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };
    return (
      <>
        <div className="container text-center">
          <Slider {...settings} >
          {itemList.map((elm) => (
            <div className="testimonialSlidermainclass" key={elm.id}>
              <img src={elm.image} className="img-fluid mx-auto" alt=" Testimonial Slider " />
              <div>
              <h3 className="font-weight-bold d-inline-block py-xl-3 f_15">
               {elm.maintitle}
              </h3>
              <span className="font-weight-bolder text-muted"> {elm.subtitle}</span>
              <p className="text-muted">
              {elm.paragraph}
                
              </p>
              </div>
            </div>
       
            ))}
          </Slider>
        </div>
      </>
    );
}
export default TestimonialSlider;