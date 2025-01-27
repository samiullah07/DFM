import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Form, InputGroup } from "react-bootstrap";
import Link from "next/link";
import Swal from "sweetalert2";

const Payment = () => {
  const [reference, setReference] = useState("#");
  const { query, push } = useRouter();

  const error = () => { //user pop up
    Swal.fire({
      icon: "error",
      title: "Please Confirm Details",
      showConfirmButton: false,
    });
  };

  const redirect = async (e) => { //redirects the user and sets confirmation to true on url to be used later
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);

    let confirmation = urlParams.get("confirm");

    if (confirmation === "true"){
      push(reference);
    }else{
      error()
    }
  };

  const handleOnChange = async (e) => { //passes all details to url to be used in stripe payment
    if (e.target.checked) {


      const urlParams = new URLSearchParams(window.location.search);

      const total = urlParams.get("mainTotal");
      const userEmail = urlParams.get("userEmail");
      const userName = urlParams.get("userName");
      const userSurname = urlParams.get("userSurname");
      const userPhoneNum = urlParams.get("userPhoneNum");
      const userCountry = urlParams.get("userCountry");
      const userCity = urlParams.get("userCity");
      const userCounty = urlParams.get("userCounty");
      const userAddress = urlParams.get("userAddress");
      const userPostcode = urlParams.get("userPostcode");




      setReference(`MainPayments/mainpayment?mainTotal=${total}&userEmail=${userEmail}&userName=${userName}&userSurname=${userSurname}&userPhoneNum=${userPhoneNum}&userCountry=${userCountry}&userCity=${userCity}&userCounty=${userCounty}&userAddress=${userAddress}&userPostcode=${userPostcode}`);
    } else {

      setReference("#");
    }
  };

  useEffect(() => {
    console.log(query);
  }, [query]);

  return (
    <>
      <div className="payment">
        <Form onSubmit={redirect}>
          <div className="form-group text-left checkout-signin">
            <label className="fw-bold mb-2">Payment Method</label>
            <br />
            <InputGroup className="mb-3 mt-2">
              <InputGroup.Checkbox onChange={handleOnChange} aria-label="Checkbox for following text input" />
              <label className="checkout-check">
                <a href="../Footer/FooterLink/deliveryInfo" target="../Footer/FooterLink/deliveryInfo">Terms & conditions</a>
              </label>
            </InputGroup>

            <button type="submit" className="main-button">
              Pay
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Payment;
