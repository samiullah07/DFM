import React from "react";
import { Gift, Secure, Support } from "../../../styles/Svg";

const Service = () => {//used to show logo's
  return (
    <>
      <div className="container ">
        <div className="deal_of_container main_services ">
          <div className="row deliveryinfo border mx-0  p-2">
            <div className="col-md-4 col-sm-12 col-12 m_service ">
              <ul className="bg-white m-0 service rounded ">
                <li className="ser-svg d-inline-block">
                  <Support />
                </li>
                <li className="ser-t d-inline-block  align-middle text-left">
                  <h6 className="f-700">Free support</h6>
                  <p className="mb-0 text-muted">
                    Always here for you.
                  </p>
                </li>
              </ul>
            </div>
            <div className="col-md-4 col-sm-12 col-12 m_service ">
              <ul className="bg-white m-0 service rounded ">
                <li className="ser-svg d-inline-block">
                  <Secure />
                </li>
                <li className="ser-t d-inline-block  align-middle text-left">
                  <h6 className="f-700">Secure Payment</h6>
                  <p className="mb-0 text-muted">
                    Your Security, Guaranteed.
                  </p>
                </li>
              </ul>
            </div>
            <div className="col-md-4 col-sm-12 col-12 m_service bg-white ">
              <ul className="m-0 service rounded ">
                <li className="ser-svg d-inline-block">
                  <Gift />
                </li>
                <li className="ser-t d-inline-block  align-middle text-left">
                  <h6 className="f-700">Promo Codes</h6>
                  <p className="mb-0 text-muted">
                    Exclusive Codes, Just for You.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
