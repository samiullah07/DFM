import React, {useEffect, useState} from "react";
import { Form } from "react-bootstrap";

const ShippingMethod = () => {
  const [freeChecked, setfreeChecked] = useState(null);
  const [premiumChecked, setpremiumChecked] = useState(null);


  const freeshippingCheck = (event) => {
    setfreeChecked(true)
    setpremiumChecked(false)

  }

  const premiumshippingCheck = (event) => {
    setpremiumChecked(true)
    setfreeChecked(false)
  }

 /* useEffect(() => {
    const updateURL = () => {
      const urlParams = new URLSearchParams(window.location.search);
      let total = parseFloat(urlParams.get("mainTotal"));
      let mainTotal = 0;

      console.log(total)
      if(freeChecked === true){
        let calc = total * 0.1
        mainTotal = total + calc;
        mainTotal.toFixed(2);
        mainTotal = mainTotal.toString()
        const url = new URL(window.location);
        url.searchParams.set("mainTotal", mainTotal);
        window.history.pushState({}, "", url);
      }
      if(premiumChecked === false){
        let calc = total * 0.2
        mainTotal = total + calc;
        mainTotal.toFixed(2);
        mainTotal = mainTotal.toString()
        const url = new URL(window.location);
        url.searchParams.set("mainTotal", mainTotal);
        window.history.pushState({}, "", url);
      }


    };

    updateURL();
  }, []); */

  return (
    <>
      <div className="shippingmethod">
        <Form>
          <div className="form-group text-left">
            <label className="fw-bold mb-2">Delivery Information</label>
            <br />
            <label className="form-check-label">The delivery Fee is £4.99, it will be added onto your total</label>


            {/*  <span className="form-check d-inline-block">
              <input
                className="form-check-input"
                type="radio"
                name="gridRadios"
                id="free_ship"
                onChange={freeshippingCheck}
                required


              />
              <label className="form-check-label">Free shipping</label>
            </span>
            <span className="form-check d-inline-block ml-2">
              <input
                className="form-check-input"
                type="radio"
                name="gridRadios"
                id="with_ship"
                onChange={premiumshippingCheck}
              />
              <label className="form-check-label">Premium shipping</label>
            </span>*/}
          </div>
        </Form>
      </div>
    </>
  );
};

export default ShippingMethod;
