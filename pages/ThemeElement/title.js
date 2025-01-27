import React from "react";
import { PublicLayout } from "../Layout/PublicLayout";
const breadcrumbsData = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Portfolio",
    path: "#",
  },
];
const Title = () => { // NOT USED
  return (
    <>
      <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Portfolio">
        <div className="container deal_of_container t_page">
          <div className="row title">
            <div className="col-12">
              <div className="title1 text-center">
                <h5>recent story</h5>
                <h2 className="font-weight-bold">trending products</h2>
              </div>
            </div>
          </div>
          <div className="row title">
            <div className="col-12">
              <div className="title2 text-center">
                <h5>recent story</h5>
                <h2 className="font-weight-bold">trending products</h2>
              </div>
            </div>
          </div>
          <div className="row title">
            <div className="col-12">
              <div className="title3 text-center">
                <h5>recent story</h5>
                <h2 className="font-weight-bold">trending products</h2>
                <div className="title_line"></div>
              </div>
            </div>
          </div>
          <div className="row title">
            <div className="col-12">
              <div className="title4 text-center">
                <h5>recent story</h5>
                <h2 className="font-weight-bold">trending products</h2>
                <div className="title_line">
                  <span></span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row title">
					<div className="col-12">
						<div className="title5 text-center">
							<h5>recent story</h5>
							<h2 className="font-weight-bold">trending products</h2>
							<div className="title_line"></div>
						</div>
					</div>
				</div> */}
        </div>
        {/* <!-- container custom_container --> */}
      </PublicLayout>
    </>
  );
};

export default Title;
