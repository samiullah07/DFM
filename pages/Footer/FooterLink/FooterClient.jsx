import React from "react";
import { PublicLayout } from "../../Layout/PublicLayout";
import TestimonialSlider from "../../HomePage/Testimonial/TestimonialSlider";
const breadcrumbsData = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Deal",
    path: "#",
  },
];
const Deal = () => {
  const titleimg = "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/HomeBanner%2Ftitle_img.png?alt=media&token=691e4f14-c6b4-48d2-856e-c0e360edadb2"
  return (
    <>
      <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Portfolio">
        <div className="container">
          <div className="deal_of_container">
            <div className="heading text-center">
              <strong>Testimonial</strong>
              <h2>Our Client Review</h2>
              <div className="headingimg">
                <img
                  src={titleimg}
                  className="img-fluid mx-auto headingimgclass"
                  alt="Deal"
                />
              </div>
            </div>
            <TestimonialSlider />
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default Deal;
