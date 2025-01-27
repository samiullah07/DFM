import React, {useEffect, useState} from "react";
import { Row, Col, Form, InputGroup, Button, Breadcrumb } from "react-bootstrap";
import { PublicLayout } from "../Layout/PublicLayout";

import {
  Elements,
} from '@stripe/react-stripe-js';

import { loadStripe } from '@stripe/stripe-js';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51ONkRQDlT4UBSHD3eTokNozYx0GWMrufehWtbFyuRykSKgQPQnuUhEB9DdZVjOfcegZKyQHiO0mLQ2NRxGfiFmPe00cBSZiVJw');


const breadcrumbsData = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Payment",
    path: "#",
  },
];

const MainPayment = () => { // this is not used within the website
  const [validated, setValidated] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const options = {
    mode: 'payment',
    amount: 1099,
    currency: 'gbp',
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };

  const fetchClientSecret = async () => {

    try {
      const response = await fetch('https://www.peakclickandcollect.com/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({amount: parseFloat("10999.00")}),
      })
          .then(response => response.json())
          .then(data => {

            const clientSecret = data.clientSecret;
            console.log(clientSecret)
            setClientSecret(clientSecret)

          })


    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {

    fetchClientSecret()
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <PublicLayout>
      {clientSecret && (
          <Elements stripe={stripePromise} options={options}>
      <div className="container mt-4">
        <Breadcrumb>
          {breadcrumbsData.map((item, index) => (
            <Breadcrumb.Item key={index} href={item.path}>
              {item.label}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>



            <PaymentElement className="mb-5" />

            <Col md={12} className="text-center">
              <button  className="m-botton-24 main-button" type="submit" variant="primary">
                Pay Now
              </button>
            </Col>
      </div>
          </Elements>
      )}
    </PublicLayout>
  );
};

export default MainPayment;
