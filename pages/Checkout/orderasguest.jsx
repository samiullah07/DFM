import React, { useContext, useEffect, useState } from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import { auth } from "../../FirebaseConfig";
import { CartContext } from "../_app";

const Orderasguest = ({pSetNumber}) => {
  let userId = "";
  const { cart: userCart, setCart: setUserCart } = useContext(CartContext);

  const [validated, setValidated] = useState(false);

  const [inputEmailValue, setInputEmailValue] = useState("");
  const [inputPasswordValue, setInputPasswordValue] = useState("");
  const [inputName, setName] = useState("");
  const [inputSurname, setSurname] = useState("");
  const [inputPhoneNum, setPhoneNum] = useState("");
  const [inputCountry, setCountry] = useState("");
  const [inputCity, setCity] = useState("");
  const [inputCounty, setCounty] = useState("");
  const [inputAddress, setAddress] = useState("");
  const [inputPostCode, setPostCode] = useState("");

  const [isConfirmDisabled, setIsConfirmDisabled] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          userId = user.uid;
        }
      });
    };
    checkUser();
  }, []);

  // Function to check if all inputs are filled
useEffect(() => {
  if (
    !inputEmailValue ||
    !inputName ||
    !inputSurname ||
    !inputPhoneNum ||
    !inputCountry ||
    !inputCity ||
    !inputCounty ||
    !inputAddress ||
    !inputPostCode
  ) {
    setIsConfirmDisabled(true); // Disable if any input is empty
  } else {
    setIsConfirmDisabled(false); // Enable if all inputs are filled
  }
}, [
  inputEmailValue,
  inputPasswordValue,
  inputName,
  inputSurname,
  inputPhoneNum,
  inputCountry,
  inputCity,
  inputCounty,
  inputAddress,
  inputPostCode,
]);

const handleOnChange = async (e) => { //checks if checkbox is clicked then to send user to the next form
  pSetNumber(e.target.checked ? "3" : "0");
  if (e.target.checked) {
    const url = new URL(window.location);
    url.searchParams.set("confirm", "true");
    url.searchParams.set("userPhoneNum", inputPhoneNum);
    url.searchParams.set("userName", inputName);
    url.searchParams.set("userSurname", inputSurname);
    url.searchParams.set("userEmail", inputEmailValue);
    url.searchParams.set("userCountry", inputCountry);
    url.searchParams.set("userCity", inputCity);
    url.searchParams.set("userCounty", inputCounty);
    url.searchParams.set("userAddress", inputAddress);
    url.searchParams.set("userPostcode", inputPostCode);

    window.history.pushState({}, "", url);
  } else {
    const url = new URL(window.location);
    url.searchParams.set("confirm", "false");
    window.history.pushState({}, "", url);
  }
};

  const handleSubmit = async (e) => { //prevents submission without everything being completed
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <>
      <div>
        <div>
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
                      onChange={(e) => setName(e.target.value)}
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
                      onChange={(e) => setSurname(e.target.value)}
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
                      onChange={(e) => setPhoneNum(e.target.value)}
                      type="number"
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
                      onChange={(e) => setInputEmailValue(e.target.value)}
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
                  <Form.Label className="f-16">Country</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      onChange={(e) => setCountry(e.target.value)}
                      type="text"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your Country.
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
                      onChange={(e) => setCity(e.target.value)}
                      type="text"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your City.
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
                      onChange={(e) => setCounty(e.target.value)}
                      type="text"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your County.
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
                      onChange={(e) => setAddress(e.target.value)}
                      type="text"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your Address.
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
                      onChange={(e) => setPostCode(e.target.value)}
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
            <InputGroup className="mb-3 mt-2">
              <InputGroup.Checkbox
                disabled={isConfirmDisabled}
                onChange={handleOnChange}
                aria-label="Checkbox for following text input"
              />
              <label className="checkout-check">
                <a>Confirm Details</a>
              </label>
            </InputGroup>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Orderasguest;
