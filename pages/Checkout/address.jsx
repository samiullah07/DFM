import React, {useContext, useEffect, useState} from "react";
import {Button, Form, InputGroup} from "react-bootstrap";
import { auth, db } from "../../FirebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import htmlTemplate from "../../src/htmlEmailTemplates/mainTemplate.html";


const Address = ({pSetNumber}) => {

  const [currentUserLoggedIn, setCurrentUserLoggedIn] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  const [userFirstname, setUserFirstname] = useState("");
  const [userSecondname, setUserSecondname] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userAddress2, setUserAddress2] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userCounty, setUserCounty] = useState("");
  const [userPostCode, setUserPostCode] = useState("");
  const [userCountry, setUserCountry] = useState("");

  let userId;

  const firstNameChange = (event) => {
    setUserFirstname(event.target.value) //uses the hook to set the user value to input value
    console.log(event.target.value)
  }

  const secondNameChange = (event) => {
    setUserSecondname(event.target.value) //uses the hook to set the user value to input value
    console.log(event.target.value)
  }

  const Address1Change = (event) => {
    setUserAddress(event.target.value) //uses the hook to set the user value to input value
    console.log(event.target.value)
  }

  const Address2Change = (event) => {
    setUserAddress2(event.target.value) //uses the hook to set the user value to input value
    console.log(event.target.value)
  }

  const CityChange = (event) => {
    setUserCity(event.target.value) //uses the hook to set the user value to input value
    console.log(event.target.value)
  }

  const CountyChange = (event) => {
    setUserCounty(event.target.value) //uses the hook to set the user value to input value
    console.log(event.target.value)
  }

  const PostCodeChange = (event) => {
    setUserPostCode(event.target.value) //uses the hook to set the user value to input value
    console.log(event.target.value)
  }

  const CountryChange = (event) => {
    setUserCountry(event.target.value) //uses the hook to set the user value to input value
    console.log(event.target.value)
  }

  const ResetBtn = (e) => { //resets all input values
    e.preventDefault()
    setUserAddress('')
    setUserAddress2('')
    setUserCity('')
    setUserCounty('')
    setUserPostCode('')
    setUserCountry('')

  }

  useEffect(() => { // checks if the user is logged in
    const checkUser = async () => {
      auth.onAuthStateChanged(user => {
        if (user) {
          setCurrentUserLoggedIn(user.uid);
          userId = user.uid
          console.log(userId)
        } else {
          setCurrentUserLoggedIn(null);
        }
      });
    };

    checkUser();
  }, []);

  const SaveBtn = async (e) => { // saves any changes into the database

    const url = new URL(window.location);
    url.searchParams.set("saved", "true");
    window.history.pushState({}, "", url);

    e.preventDefault()
    try {

      await updateDoc(doc(db, "customers", currentUserLoggedIn), {
        address: userAddress,
        address2: userAddress2,
        country: userCountry,
        city: userCity,
        county: userCounty,
        postalCode: userPostCode
      });

      document.getElementById("checkboxConfirm").checked=true
      pSetNumber("3")
      const url = new URL(window.location);
      url.searchParams.set("confirm", "true");
      window.history.pushState({}, "", url);
    } catch (error) {
      console.error('Error writing document and the error is: ', error);
    }

  }

  const userDetails = async () => { //grabs user data to fill out the inputs

    const itemsColRef = collection(db, "customers");

      try {
        const snapshot = await getDocs(itemsColRef);
        snapshot.docs.forEach((data) => {

          if (data.id === userId){

            setUserEmail(data.data().email)

            setUserFirstname(data.data().firstName)
            setUserSecondname(data.data().lastName)
            setUserAddress(data.data().address);
            setUserAddress2(data.data().address2);
            setUserCity(data.data().city);
            setUserCounty(data.data().county);
            setUserPostCode(data.data().postalCode);
            setUserCountry(data.data().country);

          }

        });
      } catch (error) {
        alert(error.message);
      }

    }

  const handleOnChange = async (e) => { //this makes it so when checkbox is checked it will automatically open the next "form"
    pSetNumber(e.target.checked ? "3" : "0")
    if (e.target.checked) {
      const url = new URL(window.location);
      url.searchParams.set("confirm", "true");
      window.history.pushState({}, "", url);
    }else{
      const url = new URL(window.location);
      url.searchParams.set("confirm", "false");
      window.history.pushState({}, "", url);
    }

  }



  useEffect(() => { // runs user details

    userDetails()
  }, []);

  useEffect(() => { //sets the user email in the url for next webpage
    const updateURL = () => {
      const url = new URL(window.location);
      url.searchParams.set("userEmail", userEmail);
      // url.searchParams.set("userSurname", userSecondname)
      window.history.pushState({}, "", url);
    };

    updateURL();
  }, [userEmail]);



  return (
    <>
      <div>
        <Form>
          <Form.Group
              md="4"
              className=" mb_1rem"
              controlId="validationCustomUsername"
          >
            <Form.Label className="fw-bold">Firstname</Form.Label>
            <Form.Control
                onChange={firstNameChange}
                type="text"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                placeholder="Your First Address"
                value={userFirstname}
            />
          </Form.Group>
          <Form.Group
              md="4"
              className=" mb_1rem"
              controlId="validationCustomUsername"
          >
            <Form.Label className="fw-bold">Surname</Form.Label>
            <Form.Control
                onChange={secondNameChange}
                type="text"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                placeholder="Your First Address"
                value={userSecondname}
            />
          </Form.Group>
          <Form.Group
              md="4"
              className=" mb_1rem"
              controlId="validationCustomUsername"
          >
            <Form.Label className="fw-bold">Line 1</Form.Label>
            <Form.Control
                onChange={Address1Change}
                type="text"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                placeholder="Your First Address"
                value={userAddress}
            />
          </Form.Group>
          <Form.Group
              md="4"
              className=" mb_1rem"
              controlId="validationCustomUsername"
          >
            <Form.Label className="fw-bold">Line 2</Form.Label>
            <Form.Control
                onChange={Address2Change}
                type="text"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                placeholder="Your Second Address Not Needed If Not applicable"
                value={userAddress2}
            />
          </Form.Group>
          <Form.Group
              md="4"
              className=" mb_1rem"
              controlId="validationCustomUsername"
          >
            <Form.Label className="fw-bold">City</Form.Label>
            <Form.Control
                onChange={CityChange}
                type="text"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                placeholder="Your City"
                value={userCity}
            />
          </Form.Group>
          <Form.Group
              md="4"
              className=" mb_1rem"
              controlId="validationCustomUsername"
          >
            <Form.Label className="fw-bold">County</Form.Label>
            <Form.Control
                onChange={CountyChange}
                type="text"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                placeholder="Your County"
                value={userCounty}
            />
          </Form.Group>
          <Form.Group
              md="4"
              className=" mb_1rem"
              controlId="validationCustomUsername"
          >
            <Form.Label className="fw-bold">Post Code</Form.Label>
            <Form.Control
                onChange={PostCodeChange}
                type="text"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                placeholder="Your Post Code"
                value={userPostCode}
            />
          </Form.Group>
          <Form.Group
              md="4"
              className=" mb_1rem"
              controlId="validationCustomUsername"
          >
            <Form.Label className="fw-bold">Country</Form.Label>
            <Form.Control
                onChange={CountryChange}
                type="text"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                placeholder="Your Country"
                value={userCountry}
            />
          </Form.Group>

          <InputGroup className="mb-3 mt-2">
            <InputGroup.Checkbox onChange={handleOnChange} id="checkboxConfirm" aria-label="Checkbox for following text input"/>
            <label className="checkout-check">
              <a>Confirm Details</a>
            </label>
          </InputGroup>
          <button onClick={ResetBtn} className="main-button d-inline-block">
            Reset
          </button>
          <button
              onClick={SaveBtn}

              className="main-button d-inline-block float-end"
          >
            Save
          </button>

        </Form>
      </div>
    </>
  );
};

export default Address;
