import React, { Component } from "react";
import Slider from "react-slick";

const BrandLogo1 = "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/BrandLogo%2FBrandLogo1.png?alt=media&token=b210de28-46f9-4711-92ea-f064c7d91a41";
const BrandLogo2 = "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/BrandLogo%2FBrandLogo2.png?alt=media&token=f53ec8a8-1a47-4a09-b390-cada2c67fc4a";
const BrandLogo3 = "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/BrandLogo%2FBrandLogo3.png?alt=media&token=afe5fc73-d482-4746-92ba-261b0cb37d10";
const BrandLogo4 = "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/BrandLogo%2FBrandLogo4.png?alt=media&token=83df7695-4106-4d13-9d05-98d86ebd6924";
const BrandLogo5 = "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/BrandLogo%2FBrandLogo4.png?alt=media&token=83df7695-4106-4d13-9d05-98d86ebd6924";

export default class Brandlogo extends Component {// NOT USED
  render() {
    const settings = {
      autoplay: true,
      autoplaySpeed: 1500,
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 1,
      arrow: false,

      responsive: [
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: 5,
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
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 4,
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
    return (
      <>
        <div className="container deal_of_container ">
          <div className="brandLogo">
            <Slider {...settings}>
              <div>
                <img
                  className="img-fluid mx-auto"
                  src={BrandLogo1}
                  alt="BrandLogo"
                />
              </div>
              <div>
                <img
                  className="img-fluid mx-auto"
                  src={BrandLogo2}
                  alt="BrandLogo"
                />
              </div>
              <div>
                <img
                  className="img-fluid mx-auto"
                  src={BrandLogo3}
                  alt="BrandLogo"
                />
              </div>
              <div>
                <img
                  className="img-fluid mx-auto"
                  src={BrandLogo4}
                  alt="BrandLogo"
                />
              </div>
              <div>
                <img
                  className="img-fluid mx-auto"
                  src={BrandLogo5}
                  alt="BrandLogo"
                />
              </div>
              <div>
                <img
                  className="img-fluid mx-auto"
                  src={BrandLogo3}
                  alt="BrandLogo"
                />
              </div>
              <div>
                <img
                  className="img-fluid mx-auto"
                  src={BrandLogo2}
                  alt="BrandLogo"
                />
              </div>
              <div>
                <img
                  className="img-fluid mx-auto"
                  src={BrandLogo4}
                  alt="BrandLogo"
                />
              </div>
            </Slider>
          </div>
        </div>
      </>
    );
  }
}
