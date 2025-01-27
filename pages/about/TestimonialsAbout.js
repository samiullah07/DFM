import React, {Component, useEffect, useState} from "react";
import Slider from "react-slick";
import { Row, Col } from "react-bootstrap";
import { collection, getDocs } from "firebase/firestore";
import {db} from "../../FirebaseConfig";

export const TestimonialSlider = () => {

  const [itemList, setItemList] = useState([]);

  const [loading, setLoading] = useState(true);

  const [copyOfMainList, setcopyOfMainList] = useState([])

  const Items = async () => { // it gathers data from testimonials in firebase and uses it bellow to display on web page

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
      arrows: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
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
        <div className="container ">
          <div className="about_testimonials">
            <div className="title_outer text-center">
              <h5 className="fw-bolder mb-lg-4 d-inline-block pr-3 bg-white ">
                <span className="">testimonials</span>
              </h5>
            </div>
            <Slider {...settings} className="row row-center">
              {itemList.map((elm, index) => (
                <div className="item" key={index}>
                  <Col xl={12}>
                    <div className="rounded p-md-4 p-3 cust_">
                      <div className="d-flex">
                        <Row>
                          <Col
                            xl={3}
                            lg={3}
                            md={4}
                            sm={12}
                            xs={12}
                            className="text-center"
                          >
                            <div>
                              <img
                                src={elm.image}
                                className="mx-auto d-block img-fluid"
                                alt="testi1"
                              />
                              <div>
                                <span className="fw-bold d-inline-block pt-2">
                                  {elm.maintitle}
                                </span>
                                <br />
                                <span className="text-muted d-sm-block">
                                  {elm.subtitle}
                                </span>
                              </div>
                            </div>
                          </Col>
                          <Col xl={8} lg={8} md={8} sm={12} xs={12}>
                            <div>
                              <p className="f_13 text-muted c_des">
                                {elm.paragraph}
                              </p>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </>
    );
  }

export default TestimonialSlider;
