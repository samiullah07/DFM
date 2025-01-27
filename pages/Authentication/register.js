import React, { useEffect, useState } from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import Link from "next/link";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, db } from '../../FirebaseConfig';
import { doc, setDoc, collection, getDocs, addDoc } from "firebase/firestore";
import Swal from "sweetalert2";

// Password strength validation function
const isPasswordStrong = (password) => { // this tests the inputted password if it is strong enough

  const minLength = 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

};

const Registerpage = () => {
  let userId = "";
  const [isChecked, setIsChecked] = useState(false);
  const [newsetter, setnewsetter] = useState(false);
  const [reference, setReference] = useState("#");
  const [hide, setHide] = useState("first_footer");
  const [validated, setValidated] = useState(false);
  const [inputEmailValue, setInputEmailValue] = useState('');
  const [inputPasswordValue, setInputPasswordValue] = useState('');
  const [inputConfirmPasswordValue, setInputConfirmPasswordValue] = useState('');
  const [inputName, setName] = useState('');
  const [inputSurname, setSurname] = useState('');
  const [inputPhoneNum, setPhoneNum] = useState('');
  const [inputCountry, setCountry] = useState('');
  const [inputCity, setCity] = useState('');
  const [inputCounty, setCounty] = useState('');
  const [inputAddress, setAddress] = useState('');
  const [inputAddress2, setAddress2] = useState('');
  const [inputPostCode, setPostCode] = useState('');

  const emailChange = event => setInputEmailValue(event.target.value);
  const passwordChange = event => setInputPasswordValue(event.target.value);
  const confirmPasswordChange = event => setInputConfirmPasswordValue(event.target.value);
  const nameChange = event => setName(event.target.value);
  const surnameChange = event => setSurname(event.target.value);
  const phoneNumChange = event => setPhoneNum(event.target.value);
  const countryChange = event => setCountry(event.target.value);
  const cityChange = event => setCity(event.target.value);
  const countyChange = event => setCounty(event.target.value);
  const addressChange = event => setAddress(event.target.value);
  const addressChange2 = event => setAddress2(event.target.value);
  const postcodeChange = event => setPostCode(event.target.value);
  const handleOnChange = event => setIsChecked(event.target.checked);
  const newsSetter = event => setnewsetter(event.target.checked);

  const redirect = async () => { // this redirects the user
    if (isChecked === true) {
      registered();
      setReference("https://www.diasspora.co.uk");
      window.location.href = "https://www.diasspora.co.uk";
    } else {
      setReference("#");
    }
  }

  const registered = () => { // this is a little pop up
    Swal.fire({
      icon: "success",
      title: "Registration Confirmed",
      showConfirmButton: false,
    });
  };

  const notRegistered = () => { // this is a little pop up
    Swal.fire({
      icon: "error",
      title: "Please agree to terms and conditions",
      showConfirmButton: false,
    });
  };

  const passwordMismatch = () => { // this is a little pop up
    Swal.fire({
      icon: "error",
      title: "Passwords do not match",
      showConfirmButton: false,
    });
  };

  const weakPassword = () => { // this is a little pop up
    Swal.fire({
      icon: "error",
      title: "Password is too weak",
      text: "Your password must be at least 6 characters long and include uppercase letters, lowercase letters, numbers, and special characters.",
      showConfirmButton: false,
    });
  };

  const userExists = (error) => { // this is a little pop up
    Swal.fire({
      icon: "error",
      title: error,
      showConfirmButton: false,
    });
  };

  const userSignUp = async (e) => {
    e.preventDefault();


    if (inputPasswordValue !== inputConfirmPasswordValue) {
      passwordMismatch();
      return;
    }

    if (!isPasswordStrong(inputPasswordValue)) {
      weakPassword();
      return;
    }

    // Ensure all required fields are filled out
    if (
        !inputEmailValue ||
        !inputPasswordValue ||
        !inputName ||
        !inputSurname ||
        !inputPhoneNum ||
        !inputCountry ||
        !inputCity ||
        !inputCounty ||
        !inputAddress ||
        !inputPostCode
    ) {
      setValidated(true);
      return;
    }

    // Check if terms and conditions are agreed to
    if (!isChecked) {
      notRegistered();
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
          auth,
          inputEmailValue,
          inputPasswordValue
      );
      if (userCredential.user) {
        sendEmailVerification(auth.currentUser).then(() => {});
      }

      userId = userCredential.user.uid;

      if (newsetter) {
        await Newsletter(e);
      }

      await uploadData();
    } catch (error) {
      userExists(error.message);
    }
  };

  const uploadData = async () => { // this sends the data into the firebase after being processed and registers the user officially
    try {
      await setDoc(doc(db, "customers", userId), {
        address: inputAddress,
        address2: inputAddress2,
        cart: [],
        country: inputCountry,
        city: inputCity,
        county: inputCounty,
        firstName: inputName,
        lastName: inputSurname,
        email: inputEmailValue,
        phoneNumber: inputPhoneNum,
        postalCode: inputPostCode,
        purchases: [],
        wishlist: []
      });

      console.log('Document successfully written!');
      await redirect();

      setAddress('');
      setAddress2('');
      setCountry('');
      setCity('');
      setCounty('');
      setName('');
      setSurname('');
      setPhoneNum('');
      setPostCode('');
      setInputEmailValue('');
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  }



  const checker = () => { // this checks if the user subscribed to the newsletter
    const isSubscribed = localStorage.getItem("subscribed") === "true";
    if (isSubscribed) {
      setHide("first_footer hideThis");
    } else {
      setHide("first_footer");
    }
  };

  useEffect(() => { // constantly checking
    checker();
  }, []);

  const validationEmail = (email) => { // sees if the email is an email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return email.match(emailRegex);
  };

  const verification = (list) => { // this checks if the email already exists
    return !list.includes(inputEmailValue);
  };

  const validationEmailExists = async () => { // grabs the emails from newsletter subscritions so as not to have the same email
    const itemsColRef = collection(db, "NewsletterSubscription");
    let emailList = [];

    try {
      const snapshot = await getDocs(itemsColRef);
      snapshot.docs.forEach((doc) => {
        emailList.push(doc.data().Email);
      });
    } catch (error) {
      alert(error.message);
    }
    return verification(emailList);
  };

  const Newsletter = async (e) => { // adds it to the database after verifications
    e.preventDefault();

    if (validationEmail(inputEmailValue)) {
      if (await validationEmailExists()) {
        try {
          await addDoc(collection(db, 'NewsletterSubscription'), {
            Email: inputEmailValue
          });
          setInputEmailValue('');
          localStorage.setItem("subscribed", "true");
          checker();
        } catch (error) {
        }
      } else {
      }
    } else {
    }
  };

  const handleSubmit = async (e) => { // prevents registration unless everything is filled and okay
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <>
      <div className="container">
        <div className="loginpage register">
          <div>
            <div>
              <h3 className="text-center fw-bolder mb-3"> Registration </h3>
            </div>
            <div className="login p-3 p-sm-4 card border" id="Registration">
              <div>
                <p>
                  Already have an account?
                  <Link href="/Authentication/login">
                    <a> Log in instead!</a>
                  </Link>
                </p>
              </div>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col xl={6}>
                    <Form.Group
                      md="4"
                      className="mb-lg-4"
                      controlId="validationCustomUsername"
                    >
                      <Form.Label className="f-16">First Name</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          onChange={nameChange}
                          type="text"
                          aria-describedby="inputGroupPrepend"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please Enter name
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col xl={6}>
                    <Form.Group
                      md="4"
                      className="mb-lg-4"
                      controlId="validationCustomUsername"
                    >
                      <Form.Label className="f-16">Last Name</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          onChange={surnameChange}
                          type="text"
                          aria-describedby="inputGroupPrepend"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please Enter Last name
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col xl={12}>
                    <Form.Group
                      md="4"
                      className="mb-lg-4"
                      controlId="validationCustomUsername"
                    >
                      <Form.Label className="f-16">Phone Number</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          onChange={phoneNumChange}
                          type="tel"
                          name="phone"
                          pattern="[0-9] {3}- [0-9] {3}- [0-9]{4}"
                          aria-describedby="inputGroupPrepend"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter your Phone Number.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col xl={12}>
                    <Form.Group
                      md="4"
                      className="mb-lg-4"
                      controlId="validationCustomUsername"
                    >
                      <Form.Label className="f-16">Email Address</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          onChange={emailChange}
                          type="email"
                          aria-describedby="inputGroupPrepend"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please Enter Email Address
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col xl={12}>
                    <Form.Group
                      md="4"
                      className="mb-lg-4"
                      controlId="validationCustomUsername"
                    >
                      <Form.Label className="f-16">Password</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          onChange={passwordChange}
                          type="password"
                          aria-describedby="inputGroupPrepend"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter your password.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col xl={12}>
                    <Form.Group className="mb-lg-4" controlId="validationCustomConfirmPassword">
                      <Form.Label className="f-16">Confirm Password</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          onChange={confirmPasswordChange}
                          type="password"
                          required
                          value={inputConfirmPasswordValue}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please confirm your password.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col xl={12}>
                    <Form.Group
                      md="4"
                      className="mb-lg-4"
                      controlId="validationCustomUsername"
                    >
                      <Form.Label className="f-16">Country</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          onChange={countryChange}
                          type="text"
                          aria-describedby="inputGroupPrepend"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter your country.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col xl={12}>
                    <Form.Group
                      md="4"
                      className="mb-lg-4"
                      controlId="validationCustomUsername"
                    >
                      <Form.Label className="f-16">City</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          onChange={cityChange}
                          type="text"
                          aria-describedby="inputGroupPrepend"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter your city.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col xl={12}>
                    <Form.Group
                      md="4"
                      className="mb-lg-4"
                      controlId="validationCustomUsername"
                    >
                      <Form.Label className="f-16">County</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          onChange={countyChange}
                          type="text"
                          aria-describedby="inputGroupPrepend"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter your county.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col xl={12}>
                    <Form.Group
                      md="4"
                      className="mb-lg-4"
                      controlId="validationCustomUsername"
                    >
                      <Form.Label className="f-16">Address</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          onChange={addressChange}
                          type="text"
                          aria-describedby="inputGroupPrepend"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter your address.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col xl={12}>
                    <Form.Group
                      md="4"
                      className="mb-lg-4"
                      controlId="validationCustomUsername"
                    >
                      <Form.Label className="f-16">Second Line of Address</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          onChange={addressChange2}
                          type="text"
                          aria-describedby="inputGroupPrepend"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter your address.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col xl={12}>
                    <Form.Group
                      md="4"
                      className="mb-lg-4"
                      controlId="validationCustomUsername"
                    >
                      <Form.Label className="f-16">Postal Code</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          onChange={postcodeChange}
                          type="text"
                          aria-describedby="inputGroupPrepend"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter your Postal Code.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>
                <InputGroup className=" ">
                  <InputGroup.Checkbox onChange={newsSetter} aria-label="Checkbox for following text input" />
                  <label className="checkbox fw-bolder">
                    Sign up for our newsletter
                  </label>
                </InputGroup>
                <InputGroup className="mb-lg-3 mb-2">
                  <InputGroup.Checkbox onChange={handleOnChange} aria-label="Checkbox for following text input" />
                  <label className="checkbox fw-bolder">
                    <a href="/Footer/FooterLink/deliveryInfo" target="_blank" rel="noopener noreferrer" className="terms-link"> I agree to the terms and conditions</a>
                  </label>
                </InputGroup>
                <div className="d-flex justify-content-between">
                  <div>
                    <button type="button" className="main-button">
                      <Link href="/">
                        <a>Back</a>
                      </Link>
                    </button>
                  </div>
                  <div>
                    <button onClick={userSignUp} type="submit" className="mb-1 main-button">
                      <a> Register</a>
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registerpage;
