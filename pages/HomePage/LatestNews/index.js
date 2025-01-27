import React from "react";
const titleimg = "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/HomeBanner%2Ftitle_img.png?alt=media&token=691e4f14-c6b4-48d2-856e-c0e360edadb2";
import LatestNewsSlider from "./LatestNewsSlider";

const LatestNews = () => {
  return (
    <>
      <div className="blog_fruit">
        <div className="deal_of_container container">
          <div className="heading text-center">
            <strong>Latest News</strong>
            <h2>Latest News</h2>
            <div className="headingimg">
              <img
                src={titleimg}
                className="img-fluid mx-auto headingimgclass"
                alt="Latest News"
              />
            </div>
          </div>
          <LatestNewsSlider />
        </div>
      </div>
    </>
  );
};

export default LatestNews;
