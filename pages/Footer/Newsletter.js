import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { db } from "../../FirebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Newsletter = () => { //this is all for the newsletter subscription
  const [inputValue, setInputValue] = useState(''); // Hook to get the user input value
  const [hide, setHide] = useState("first_footer");

  const change = event => {
    setInputValue(event.target.value); // Update input value
  };

  const validationEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (email.match(emailRegex)) {
      return true;
    } else {
      alert('Invalid email address');
      return false;
    }
  };

  const verification = (list) => {
    return !list.includes(inputValue);
  };

  const checker = () => {
    const isSubscribed = localStorage.getItem("subscribed") === "true";
    if (isSubscribed) {
      setHide("first_footer hideThis");
    } else {
      setHide("first_footer");
    }
  };

  useEffect(() => {
    checker();
  }, []);

  const validationEmailExists = async () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validationEmail(inputValue)) {
      if (await validationEmailExists()) {
        try {
          await addDoc(collection(db, "NewsletterSubscription"), {
            Email: inputValue
          });
          setInputValue('');
          localStorage.setItem("subscribed", "true");
          checker();
          console.log('Document successfully written!');
        } catch (error) {
          console.error('Error writing document: ', error);
        }
      } else {
        console.log("user tried to subscribe with an email that already exists");
      }
    } else {
      console.log("user tried to subscribe with an invalid email");
    }
  };

  return (
    <div className={hide}>
      <div className="container">
        <Row className="row-center">
          <Col lg={3} md={3} className="d-none d-md-none d-lg-block pr-0 ">
            <div className="newsletter d-inline-block align-middle">
              <h4 className="text-light text-uppercase font-weight-bolder">
                Sign up for our Newsletter
              </h4>
            </div>
          </Col>
          <Col lg={5} md={7} sm={7}>
            <div className="input-group">
              <input
                onChange={change}
                type="email"
                className="form-control border-white"
                placeholder="Subscribe newsletter..."
                aria-label="Subscribe newsletter..."
                aria-describedby="button-addon2"
                value={inputValue}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary text-uppercase"
                  type="button"
                  id="button-addon2"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </Col>
         <Col lg={4} md={5} sm={5} className="text-right">
          <div className="newsletter d-inline-block align-middle">
            <div className="socials">
              <span>
                <a href="https://www.facebook.com/profile.php?id=61567518111419&mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-facebook" aria-hidden="true"></i>
                </a>
              </span>
              <span>
                <a href="https://www.instagram.com/diasspora.co.uk?igsh=NTc4MTIwNjQ2YQ==" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>
              </span>
              <span>
                <a href="https://wa.me/447442995482" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-whatsapp" aria-hidden="true"></i>
                </a>
              </span>
            </div>
          </div>
         </Col>
        </Row>
      </div>
    </div>
  );
};

export default Newsletter;
