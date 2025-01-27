import React from "react";
const titleimg = "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/HomeBanner%2Ftitle_img.png?alt=media&token=691e4f14-c6b4-48d2-856e-c0e360edadb2";
import { Tab, Tabs } from "react-bootstrap";
import NewArrivals from "./NewArrivals";
import Special from "./Special";
import BestSeller from "./BestSeller";
const SpecialProducts = () => {
  return (
    <>
      <div className="special_fruit">
        <div className="deal_of_container">
          <div className="heading text-center">
            <strong>Top Product</strong>
            <h2>Trending Product</h2>
            <div className="headingimg">
              <img
                src={titleimg}
                className="img-fluid mx-auto headingimgclass"
                alt="SpecialProducts"
              />
            </div>
          </div>
          <div className="container specialPro text-center tabdiv">
            <Tabs
              defaultActiveKey="newarrivals"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="newarrivals" title="NEW ARRIVALS">
                <NewArrivals />
              </Tab>
              <Tab eventKey="special" title="SPECIAL">
                <Special />
              </Tab>
              <Tab eventKey="bestseller" title="BEST SELLER">
                <BestSeller />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialProducts;
