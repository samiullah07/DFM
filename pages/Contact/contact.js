import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { Form, InputGroup } from "react-bootstrap";
import { PublicLayout } from "../Layout/PublicLayout";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../../FirebaseConfig";
import Swal from "sweetalert2";

const breadcrumbsData = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "contact",
    path: "#",
  },
];
const Contact = () => {
  const [validated, setValidated] = useState(false);

  //used for time
  const delay = ms => new Promise(res => setTimeout(res, ms));

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [question, setQuestion] = useState("");

  let enquiryId;

  const confirmation = async (enquiryId) => { // user pop up

      Swal.fire({
        icon: "success",
        title: "Thank you for your enquiry " + enquiryId + " we will get to you within 3 to 5 working Days",
        showConfirmButton: false,


    })
    await delay(5000);
  };

  const FirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const EmailChange = (event) => {
    setEmail(event.target.value);
  };

  const PhoneNumberChange = (event) => {
    setPhoneNum(event.target.value); // Keep as a string
  };

  const QuestionChange = (event) => {
    setQuestion(event.target.value);
  };

function generateRandomId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

  //////////////////////////////////////////////////////////////////This is where the Email sends//////////////////////////////////////////////////////////////////

  const emailSend = async (p_email, p_name, p_question, p_phoneNum, p_uniqueID) => { //sends email
    const response = await fetch('https://vendor-dfm-production.up.railway.app/api/send-contact-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: p_email,
        firstName: p_name,
        question: p_question,
        enquiryNumber: p_uniqueID,
        phoneNum: p_phoneNum.toString(), // Ensure phoneNum is a string
      }),
    });

    const data = await response.json();

    if (data.success) {
      console.log('Email sent successfully!');
    } else {
      console.log(`Error: ${data.error}`);
    }
  };

  const guestConfirmation = async (p_email, p_name, p_question, p_phoneNum, p_uniqueID) => { // saves the email sent into database

    const timestamp = Date.now();

    try {
        const data = {
          id: p_uniqueID,
          email: p_email,
          firstname: p_name,
          phoneNumber: p_phoneNum,
          enquiry: p_question,
          time: timestamp
        };

        // Add a new document in collection "CustomerEnquiry" with "uniqueId" as id
        await setDoc(doc(db, "CustomerEnquiry", p_uniqueID), data);

      } catch (error) {
        alert(error.message);
      }
  }

  const handleSubmit = async (event) => { //makes sure that everything is verified before sending email
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    event.preventDefault();
    setValidated(true);
    enquiryId = await generateRandomId()
    await emailSend(email, firstName, question, phoneNum, enquiryId)
    await guestConfirmation(email, firstName, question, phoneNum, enquiryId)
    await confirmation(enquiryId)
  };
  return (
    <>
      <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Compare">
        <div className="container deal_of_container">
          <Row>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group
                  md="4"
                  className="mb-3"
                  controlId="validationCustomUsername"
                >
                  <Form.Label className=" f-16 ">Name</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                        onChange={FirstNameChange}
                      type="text"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter your account name
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group
                  md="4"
                  className="mb-3"
                  controlId="validationCustomUsername"
                >
                  <Form.Label className=" f-16 ">Email</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                        onChange={EmailChange}
                      type="mail"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter your account name
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group
                  md="4"
                  className="mb-3"
                  controlId="validationCustomUsername"
                >
                  <Form.Label className=" f-16 ">Phone Number</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                        onChange={PhoneNumberChange}
                      type="tel"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter your  Phone Number
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Your Enquiry</Form.Label>
                  <Form.Control onChange={QuestionChange} as="textarea" rows={5} />
                </Form.Group>

                <button
                  type="submit"
                  className="mb-3 main-button float-xl-end float-lg-end float-md-end"
                  href="/"
                >
                  <a className=""> Submit</a>
                </button>
              </Form>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12 col-sm-offset-2 pt-lg-0 pt-md-4 pt-sm-4 pt-4">
              <div className="our_off">
                <h4 className="mb-lg-3 mb-sm-2">
                  Our <strong>Contact</strong>
                </h4>
                <ul
                  className="list list-unstyled list-icons 
               list-icons-style-2 mt-2"
                >
                  {/*<li className="mb-lg-3 mb-sm-2">*/}
                  {/*  <i className="fas fa-map-marker-alt top-6"></i>*/}
                  {/*  <strong className="text-dark px-2">Address:</strong> 1234*/}
                  {/*  Street Name, City Name, United States*/}
                  {/*</li>*/}
                  <li className="mb-lg-3 mb-sm-2">
                    <i className="fas fa-phone top-6"></i>
                    <strong className="text-dark px-2">Phone:</strong> <a href="https://wa.me/447442995482">(+44) 7442 995482</a>
                  </li>
                  <li className="mb-0">
                    <i className="fas fa-envelope top-6"></i>
                    <strong className="text-dark px-2">Email:</strong>
                    <a href="#">info@diasspora.co.uk</a>
                  </li>
                </ul>
              </div>
              <div className="buss_hou">
                <h4 className="pt-lg-3 pt-xl-4 mb-lg-3">
                  Business <strong>Hours</strong>
                </h4>
                <ul className="list list-unstyled list-icons list-dark mt-2">
                  <li className="mb-lg-3 mb-sm-2">
                    <i className="far fa-clock top-6"></i> Monday - Friday - 9am
                    to 5pm
                  </li>
                  <li className="mb-lg-3 mb-sm-2">
                    <i className="far fa-clock top-6"></i> Saturday - 9am to 2pm
                  </li>
                  <li className="mb-0">
                    <i className="far fa-clock top-6"></i> Sunday - Closed
                  </li>
                </ul>
              </div>
              <div className="get_touch">
                <div className="pt-lg-3 pt-xl-4 mb-lg-3">
                  <h4>
                    Get in <strong>Touch</strong>
                  </h4>
                  <p className="lead mb-0 get_in">
                    We're keen to hear from you! When you have submitted your enquiry, please allow 3-5 business days for us to reply.
                  </p>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </PublicLayout>
    </>
  );
};

export default Contact;
