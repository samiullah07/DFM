import React from "react";
import BestSeller from "../SpecialProducts/BestSeller";
import Special from "../SpecialProducts/Special";
import { Tab, Tabs } from "react-bootstrap";
import { PublicLayout } from "../Layout/PublicLayout";
const breadcrumbsData = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Product tab",
    path: "#",
  },
];
const ThemeServices = () => {  // NOT USED
  return (
    <>
      <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="services">
        <div className="container specialPro">
          <div className="text-center tabdiv">
            <Tabs
              defaultActiveKey="newarrivals"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="newarrivals" title="NEW ARRIVALS">
                <Special />
              </Tab>
              <Tab eventKey="special" title="SPECIAL">
                <BestSeller />
              </Tab>
            </Tabs>

          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default ThemeServices;
