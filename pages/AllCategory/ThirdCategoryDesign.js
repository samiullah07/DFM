import React, { Component } from "react";
import Slider from "react-slick";
import { Col } from "react-bootstrap";
export default class ThirdCategoryDesign extends Component {
  render() { // this class is not used
    const settings = {
      dots: false,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1399,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 1199,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 699,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
          },
        },

        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
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
        {
          breakpoint: 400,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
      <>
        <div className="container deal_of_container text-center ">
          <div className="catslider">
            <div className="">
              <Slider {...settings} className="row">
                <Col className="item">
                  <div className="s-3-button rounded">
                    <a href="#" className="fw-bold">
                      laptop
                    </a>
                  </div>
                </Col>
                <Col className="item">
                  <div className="s-3-button rounded">
                    <a href="#" className="fw-bold">
                      Mobile
                    </a>
                  </div>
                </Col>
                <Col className="item">
                  <div className="s-3-button rounded">
                    <a href="#" className="fw-bold">
                      Mobile
                    </a>
                  </div>
                </Col>
                <Col className="item">
                  <div className="s-3-button rounded">
                    <a href="#" className="fw-bold">
                      Mobile
                    </a>
                  </div>
                </Col>
                <Col className="item">
                  <div className="s-3-button rounded">
                    <a href="#" className="fw-bold">
                      Tv
                    </a>
                  </div>
                </Col>
                <Col className="item">
                  <div className="s-3-button rounded">
                    <a href="#" className="fw-bold">
                      Audio
                    </a>
                  </div>
                </Col>
                <Col className="item">
                  <div className="s-3-button rounded">
                    <a href="#" className="fw-bold">
                      Phone
                    </a>
                  </div>
                </Col>
                <Col className="item">
                  <div className="s-3-button rounded">
                    <a href="#" className="fw-bold">
                      Camera
                    </a>
                  </div>
                </Col>
                <Col className="item">
                  <div className="s-3-button rounded">
                    <a href="#" className="fw-bold">
                      laptop
                    </a>
                  </div>
                </Col>
              </Slider>
            </div>
          </div>
        </div>
      </>
    );
  }
}
