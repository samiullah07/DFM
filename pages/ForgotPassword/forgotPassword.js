import React, {useState} from "react";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import { auth, db } from '../../FirebaseConfig';
import { doc, setDoc } from "firebase/firestore";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Swal from "sweetalert2";



const ForgotPassword = () => {

  const [inputEmailValue, setInputEmailValue] = useState('');
  const timeout = "setting 5 second timeout"


  const showCart = () => { // user pop up
    Swal.fire({
      icon: "success",
      title: "Reset Password Email Sent",
      showConfirmButton: false,
    });
  };

  const redirect = async () => { // redirects the user
    window.location.href = "/Authentication/login";
  };

  const emailChange = event => {

    setInputEmailValue(event.target.value) //uses the hook to set the user value to input value
    console.log(event.target.value)

  }

  const forgotPassBtn = async (e) => {  // sends an email to reset password to user
    e.preventDefault()
    const auth = getAuth();
    sendPasswordResetEmail(auth, inputEmailValue)
    .then(async () => {
      // Password reset email sent!
      await showCart();
      setTimeout(redirect, 2000);

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }


  return (
    <>
      <div className="container loginpage">
        <div className=" custom_container ">
          <h3 className="text-center fw-bolder mb-3">Forgot your password? </h3>
          <div
            id="forgot"
            className="page-content border card card-block p-3 p-sm-4"
          >
            <Row>
              <Col>
                <form className="needs-validation " method="post" noValidate>
                  <div className="form-group">
                    <p className="renew_pass text-muted ">
                      Please enter the email address you used to register. You
                      will receive a temporary link to reset your password.
                    </p>
                    <label className="f-16">Email address</label>
                    <input onChange={emailChange} type="email" className="form-control" required />
                    <div className="invalid-feedback">
                      Please Enter your account name.
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <div>
                      <button type="button" className="main-button">
                        <Link href="/">
                          <a>Back</a>
                        </Link>
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={forgotPassBtn}
                        className="mb-1 main-button"
                      >
                        <a> Send</a>
                      </button>
                    </div>
                  </div>
                </form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
