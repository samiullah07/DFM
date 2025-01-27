import React, {useContext, useState} from "react";
import { Form, InputGroup } from "react-bootstrap";
import {CartContext} from "../_app";
import Swal from "sweetalert2";
import Link from "next/link";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../../FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const SignIn = () => { // this simply gives the user the option to sign in before the payment
  const [itemList, setItemList] = useState([]);
  const [validated, setValidated] = useState(false);
  const { cart, setCart } = useContext(CartContext);
  const [inputEmailValue, setInputEmailValue] = useState('');
  const [inputPasswordValue, setInputPasswordValue] = useState('');
  const [passCheckBox, setPassCheckBox] = useState('password');
  const [user, setUser] = useState(null);
  const [isChecked, setIsChecked] = useState(true);

  const showCart = () => {
    Swal.fire({
      icon: "success",
      title: "Login Confirmed",
      showConfirmButton: false,
    });
  };

  const handleOnChange = async () => {

    setIsChecked(!isChecked);

  };

  const passHide = () => {
    if(isChecked){
      setPassCheckBox("text")
    }else{
      setPassCheckBox("password")
    }
  }

  const emailChange = (event) => {
    setInputEmailValue(event.target.value);
  };

  const passwordChange = (event) => {
    setInputPasswordValue(event.target.value);
  };

  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("user logged in", user);
    } else {
      console.log("no user is logged in", user);
    }
  });

  const redirect = async () => {
    await showCart();
    window.location.href = "../cart";
  };

  const validationEmailExists = async () => {
    const itemsColRef = collection(db, "customers");
    const newItemList = [];
    try {
      const snapshot = await getDocs(itemsColRef);
      snapshot.docs.forEach((doc) => {
        if (doc.id === user) {
          console.log("it works");
          doc.data().cart.forEach((item) => {
            console.log(item);
            if (item.id !== "ger42" && item.id !== "123e4") {
              newItemList.push(item);
            }
          });
        }
      });
      setItemList(newItemList);
    } catch (error) {
      alert(error.message);
    }
  };

  const loginEmailPassword = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, inputEmailValue, inputPasswordValue);
      setUser(auth.currentUser.uid);
      await validationEmailExists();
      await redirect();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    const newProduct = itemList?.find((pd) => pd.id === id);
    setCart([...cart, { ...newProduct, quantity: 1 }]);
  };

  const breadcrumbsData = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Login",
      path: "#",
    },
  ];

  return (
      <>

              <div className="login p-3 p-sm-4 card">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group md="4" className="mb-3" controlId="validationCustomUsername">
                    <Form.Label className=" f-16 ">Email</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                          onChange={emailChange}
                          type="text"
                          aria-describedby="inputGroupPrepend"
                          required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter your account name
                      </Form.Control.Feedback>
                    </InputGroup>
                    <small id="emailHelp" className="form-text text-muted">
                      We will never share your email with anyone else.
                    </small>
                  </Form.Group>
                  <Form.Group md="4" className="mb-3" controlId="validationCustomUsername">
                    <Form.Label className="f-16">Password</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                          onChange={passwordChange}
                          type={passCheckBox}
                          aria-describedby="inputGroupPrepend"
                          required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter your password.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <InputGroup className="mb-3 mt-2">
                    <InputGroup.Checkbox onClick={passHide} onChange={handleOnChange}
                                         aria-label="Checkbox for following text input" className="m-0"/>
                    <label className="checkbox ">Show Password</label>
                  </InputGroup>
                  <button type="button" className="main-button">
                    <Link href="/">
                      <a>Back</a>
                    </Link>
                  </button>
                  <button onClick={loginEmailPassword}
                          className="mb-3 main-button float-xl-end float-lg-end float-md-end">
                    <a className=""> Login </a>
                  </button>
                </Form>
                <div className="pass_acc border-top f-16 pt-3">
                <span className="forgot_password ">
                  <Link href="/ForgotPassword/forgotPassword">
                    <a>Forgot your password? </a>
                  </Link>
                </span>
                  <span className="no_account float-xl-end float-lg-end float-md-end">
                  No account?
                  <Link href="/Authentication/register">
                    <a> Create one here</a>
                  </Link>
                </span>
                </div>
              </div>



      </>
  );
};

export default SignIn;
