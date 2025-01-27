import React, {useContext, useEffect, useState} from "react";
import {PublicLayout} from "../Layout/PublicLayout";
import {Elements, PaymentElement, useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { auth, db } from "../../FirebaseConfig";
import { collection, getDocs, updateDoc, doc, setDoc } from "firebase/firestore";
import { CartContext } from "../_app";
import Swal from "sweetalert2";

// const stripePromise = loadStripe('pk_test_51OvpaXDHeZrZ0vZyvOyozv3i9PscKGcOHfbK0vh8Y8Bju2BoEyfvi0lifLzjs6IazhvBnhspSwEzOLBPab6PQDDq00XuSgBsdH'); //Testing KEY

const stripePromise = loadStripe('pk_live_51OvpaXDHeZrZ0vZyKBGxwyHhx2fW5cHElN4S59CtYuePuobuXgaG76wDa8teqWwlMLSUAUisEg8cnehKEzUo8Cxe00dG2fc4CC'); //Live Key

const MainPayment = () => { // stripe payment page

  const [validated, setValidated] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  let total = "";
  let newList = [];

  useEffect(() => { // gets cart items
    const urlParams = new URLSearchParams(window.location.search);
    newList = (urlParams.get("cartItems"));

  }, []);

  const optionFunc = () => { // gets total from the url
    const urlParams = new URLSearchParams(window.location.search);
    total = parseFloat(urlParams.get("mainTotal"));

    return {
      clientSecret: clientSecret,
      appearance: {
        /*...*/
      },
    };
  };

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        total = urlParams.get("mainTotal");

        const response = await fetch('https://vendor-dfm-production.up.railway.app/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({amount: total}), // Multiply by 100 to convert to cents
        });
        const data = await response.json();
        setClientSecret(data.clientSecret);

        const url = new URL(window.location);
        url.searchParams.set("clientSecret", data.clientSecret);
        window.history.pushState({}, "", url);


      } catch (error) {
        console.error('Error:', error);
      }
    };



    fetchClientSecret();
  }, []);

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={optionFunc()}>
          <PublicLayout>
            <div className="form-container">
              <form className="total-form">
                <label htmlFor="uniqueId" className="total-label">
                  <b>£{parseFloat(total).toFixed(2)}</b>
                </label>
              </form>
            </div>
            <div className="payment-container">
              <PaymentForm />
            </div>
          </PublicLayout>
        </Elements>
      )}
    </>
  );
};

const PaymentForm = () => {
  // Used for confirmation
  let uniqueId=generateRandomId();
  let userId;

  //used for time
  const delay = ms => new Promise(res => setTimeout(res, ms));

  // general variables
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUserLoggedIn, setCurrentUserLoggedIn] = useState(null);
  const [userCartDetailsList, setUserCartDetailsList] = useState(null);
  const [errorQuantity, setErrorQuantity] = useState([]);
  const [errorName, setErrorName] = useState([]);


  // Used for confirmation
  const { cart: userCart, setCart: setUserCart } = useContext(CartContext);
  const [userFirstname, setUserFirstname] = useState("");
  const [userSecondname, setUserSecondname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userCounty, setUserCounty] = useState("");
  const [userPostCode, setUserPostCode] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState(1);
  const [itemName, setItemName] = useState("");
  const [loggedUserCart, setLoggedUserCart] = useState([])
  let itemNameString = "";
  const strp = useStripe();
  const elem = useElements();
  const quantityError = async (quantity, name) => {

    name.forEach((item) => {

      Swal.fire({
        icon: "error",
        title: "Unfortunately we do not have that many "+item +"'s in stock",
        showConfirmButton: false,
      });

    })
    await delay(5000);
  };

  //////////////////////////////////////////////////////////////////This is where the checking login is //////////////////////////////////////////////////////////////////

  useEffect(() => {
    const checkUser = async () => {
      auth.onAuthStateChanged(user => {
        if (user) {

          setCurrentUserLoggedIn(user.uid);
          userId = user.uid

        } else {

          setCurrentUserLoggedIn(null);
        }

      });

      await userItemsCart();
    };

    checkUser();

  }, []);

  const userItemsCart = async () => {

    const itemsColRef = collection(db, "customers");

    try {
      const snapshot = await getDocs(itemsColRef);
      const newItemList = snapshot.docs
        .filter((doc) => doc.id === userId)
        .flatMap((doc) => doc.data().cart);

      setLoggedUserCart(newItemList);

    } catch (error) {
      alert(error.message);
    }
  };

  //////////////////////////////////////////////////////////////////This is where the Getting user details are//////////////////////////////////////////////////////////////////

  const userDetails = async () => {

    let newList = [];
    let x = 0;


    const itemsColRef = collection(db, "customers");

      try {
        const snapshot = await getDocs(itemsColRef);
        snapshot.docs.forEach((data) => {

          if (data.id === userId){

            setUserEmail(data.data().email)
            setUserFirstname(data.data().firstName)
            setUserSecondname(data.data().lastName)
            setUserAddress(data.data().address);
            setUserCountry(data.data().country);
            setUserCity(data.data().city);
            setUserCounty(data.data().county);
            setUserPostCode(data.data().postalCode);
            setUserPhoneNumber(data.data().phoneNumber)

            newList.push(data.data().cart)

            data.data().cart.forEach((item) => {
              if (x <= 0){
                itemNameString += item.quantity + " " + item.name;
                setItemName(itemNameString)
              }else{

                itemNameString = itemNameString + ", " + item.quantity + " " + item.name;
                setItemName(itemNameString)
              }
              x++

            })

            setUserCartDetailsList(data.data().cart);
          }

        });
      } catch (error) {
        alert(error.message);
      }



  }

  useEffect(() => {

    userDetails()

  }, []);

  //////////////////////////////////////////////////////////////////This is where the confirmations Receipts are //////////////////////////////////////////////////////////////////

  const setConfirmation = async () => {
    console.log(1)
    const urlParams = new URLSearchParams(window.location.search);
    let total = parseFloat(urlParams.get("mainTotal"));
    let clientSecret = urlParams.get("clientSecret");

    console.log(clientSecret)
    console.log(2)
    const timestamp = Date.now();
      try {
        // Add a new document in collection "cities" with "LA" as id
        const data = {
          id: uniqueId,
          email: userEmail,
          firstname: userFirstname,
          surname: userSecondname,
          country: userCountry,
          address: userAddress,
          city: userCity,
          county: userCounty,
          postcode: userPostCode,
          phoneNumber: userPhoneNumber,
          cart: userCartDetailsList,
          total: total,
          time: timestamp,
          clientSecret: clientSecret,
          status: "PAID"
        };
        console.log(3)
        console.log(data)
        // Add a new document in collection "Receipts" with "uniqueId" as id
        await setDoc(doc(db, "Receipts", uniqueId), data);

      } catch (error) {
        alert(error.message);
      }

  }

  const guestConfirmation = async () => {

    const urlParams = new URLSearchParams(window.location.search);
    let clientSecret = urlParams.get("clientSecret");

    let total = parseFloat(urlParams.get("mainTotal"));
    let email = urlParams.get("userEmail");
    let name = urlParams.get("userName");
    let surname = urlParams.get("userSurname");
    let country = urlParams.get("userCountry");
    let city = urlParams.get("userCity");
    let county = urlParams.get("userCounty");
    let address = urlParams.get("userAddress");
    let postcode = urlParams.get("userPostcode");
    let phoneNumber = Number(urlParams.get("userPhoneNum"));
    const timestamp = Date.now();

    try {
        const data = {
          id: uniqueId,
          email: email,
          firstname: name,
          surname: surname,
          country: country,
          address: address,
          city: city,
          county: county,
          postcode: postcode,
          phoneNumber: phoneNumber,
          cart: userCart,
          total: total,
          time: timestamp,
          clientSecret: clientSecret,
          status: "PAID"
        };

        console.log(data)
        // Add a new document in collection "Receipts" with "uniqueId" as id
        await setDoc(doc(db, "Receipts", uniqueId), data);

      } catch (error) {
        alert(error.message);
      }
  }

  //////////////////////////////////////////////////////////////////This is where the Vendor updates are//////////////////////////////////////////////////////////////////

  const userItemsVendorUpdate = async () => {

    let totalVendor = 0;
    let newTotalVendor = 0;
    let mainVendorTotal = 0;
    let vendorName;
    let vendorRefChange;
    let newList = [];

    const itemsColRef = collection(db, "customers");
    const vendorRef = collection(db, "Vendor")

      try {

        const snapshot = await getDocs(itemsColRef);
        const secondSnap = await getDocs(vendorRef)

        await snapshot.docs.forEach((data) => {

          if (data.id === currentUserLoggedIn){

            data.data().cart.forEach((item) => {

              if (item.Vendor){

                vendorName = item.Vendor

                totalVendor = item.price * item.quantity;

                newTotalVendor += totalVendor;

                mainVendorTotal = newTotalVendor;

                vendorRefChange = doc(db, "Vendor", vendorName)

                secondSnap.docs.forEach((vendorData) => {

                if (vendorData.id === vendorName){

                  mainVendorTotal += vendorData.data().totalEarned;

                  vendorData.data().receipts.forEach((uniqueNum) => {
                    if (uniqueNum === uniqueId){

                    }else{
                      newList.push(uniqueNum)
                    }
                  })
                }
              })
              }
            })
          }
        });
      } catch (error) {
        alert(error.message);
      }

      newList.push(uniqueId)

      await updateDoc(vendorRefChange, {
        receipts: newList,
        totalEarned: mainVendorTotal
      });


  }


  const guestItemsVendorUpdate = async () => {
    let totalVendor = 0;
    let newTotalVendor = 0;
    let mainVendorTotal = 0;
    let vendorName;
    let vendorRefChange;
    let newList = [];

    const vendorRef = collection(db, "Vendor")

      try {

        const secondSnap = await getDocs(vendorRef)

        await userCart.map((item) => {

          if (item.Vendor){

            vendorName = item.Vendor

            totalVendor = item.price * item.quantity;

            newTotalVendor += totalVendor;

            mainVendorTotal = newTotalVendor;

            vendorRefChange = doc(db, "Vendor", vendorName)

            secondSnap.docs.forEach((vendorData) => {

          if (vendorData.id === vendorName){

            mainVendorTotal += vendorData.data().totalEarned;

            vendorData.data().receipts.forEach((uniqueNum) => {
              if (uniqueNum === uniqueId){

              }else{
                newList.push(uniqueNum)
              }
            })
          }
        })
          }
        })
      } catch (error) {
        alert(error.message);
      }
        newList.push(uniqueId)

        await updateDoc(vendorRefChange, {
          receipts: newList,
          totalEarned: mainVendorTotal
        });

  }


  //////////////////////////////////////////////////////////////////This is where the Unique Id generates//////////////////////////////////////////////////////////////////
function generateRandomId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

//////////////////////////////////////////////////////////////////This is where the local item names are retrieved //////////////////////////////////////////////////////////////////

const getLocalName = async () =>{
    let x = 0;

    await userCart.forEach((item) => {

      if (x <= 0){
        itemNameString += item.quantity + " " + item.name;

      }else{
        itemNameString = itemNameString + ", " + item.quantity + " " + item.name;


      }

      x++

    })
  return itemNameString
}

//////////////////////////////////////////////////////////////////This is where the in stock gets checked//////////////////////////////////////////////////////////////////

const checkUserQuantityStocks = async () => {
    let statement = false;
    let x = 0;

    let errorList = [];
    let errornameList = [];

    const itemsColRef = collection(db, "customers");
    const snapshot = await getDocs(itemsColRef);

    await snapshot.docs.forEach((data) => {

       if (data.id === currentUserLoggedIn){
         if (data.data().cart === []){
           console.log("I was right")
         }
         data.data().cart.forEach((item) => {
            if (item.quantity > item.stock){
              x++
              if (x>0){
                errorList.push(item.stock)
                errornameList.push(item.name)

              }
            }
         })
       }

    });

    setErrorQuantity(errorList)
    setErrorName(errornameList)
    if (x > 0){
      statement = false;
    }else{
      statement = true;
    }

    return statement;
}

const checkGuestQuantityStocks = async () => {
    let statement = false;
    let x = 0;
    let errorList = [];
    let errornameList = [];

    await userCart.forEach((item) => {
        if (item.quantity > item.stock){
          x++
          if (x>0){
            errorList.push(item.stock)
            errornameList.push(item.name)
          }
        }
    });

    setErrorQuantity(errorList)
    setErrorName(errornameList)

    if (x > 0){
      statement = false;
    }else{
      statement = true;
    }

    return statement;
}
//////////////////////////////////////////////////////////////////This is where the updating quantity stock is done//////////////////////////////////////////////////////////////////

const updateUserStock = async () => {

  let newItemsList = [];


  const customerRef = collection(db, "customers");
  const itemsRef = collection(db, "items");
  const snapshot = await getDocs(customerRef);
  const secondSnapshot = await getDocs(itemsRef);

  await secondSnapshot.docs.forEach((secondData) => {

    secondData.data().items.map((product) =>{
      newItemsList.push(product)
    })

  });
  console.log(newItemsList)
  snapshot.docs.forEach((data) => {
    if (data.id === currentUserLoggedIn) {
      data.data().cart.forEach((item) => {

        newItemsList.forEach((prod)  =>{
          if (prod.id === item.id){
            prod.stock -= item.quantity
          }
        })
      });

    }
  });


  console.log(newItemsList);

  const mainItems = doc(db, "items", "shopItems");

  await updateDoc(mainItems, {
    items: newItemsList,
  });
};

const updateGuestStock = async () => {
  let quantity;
  let stockTotal;
  let newStockTotal;

  let newItemsList = [];

  const itemsRef = collection(db, "items");

  const secondSnapshot = await getDocs(itemsRef);

  await secondSnapshot.docs.forEach((secondData) => {

    secondData.data().items.map((product) =>{
      newItemsList.push(product)
    })

  });

  await userCart.forEach((item) => {

    quantity = item.quantity
    newItemsList.forEach((prod) =>{
      if (prod.id === item.id){
        prod.stock -= item.quantity
      }
    })


  });
  //console.log(newItemsList)

  const mainItems = doc(db, "items", "shopItems");

   updateDoc(mainItems, {
     items: newItemsList
   });
  //console.log("Should update firestore here")


}

 const [err, setError] = useState(null);
//////////////////////////////////////////////////////////////////This is where the clicking button gets handled//////////////////////////////////////////////////////////////////
const handleSubmit = async (event) => {

    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    let email = urlParams.get("userEmail");
    let name = urlParams.get("userName");

    let itemsNames;


    if (!stripe || !elements) {
      console.log("not done")
        return;
    }

    elements.submit()
    .then(async function (result) {
      //console.log(result.error)
      if (result.error) {
        console.log("fail")
        return;
      }else{
        await runApp()
      }
    });


    setIsLoading(true);

  const {error} = await stripe.confirmPayment({

      elements,
      confirmParams: {
       return_url: "https://www.diasspora.co.uk?orderId="+uniqueId, // Your return URL
      },
    });

    if (error) {
        setMessage(error.message);
    }



    setIsLoading(false);
  };

const runApp = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    let email = urlParams.get("userEmail");
    let name = urlParams.get("userName");

    let itemsNames;

  if (currentUserLoggedIn) {
          if (loggedUserCart.length === 0) {

            return;
          } else {
            let statement = await checkUserQuantityStocks()

            if (statement) {
              await setConfirmation()
              await userItemsVendorUpdate()
              await updateUserStock()
              await RemoveItems()
              await emailSend(userEmail, userFirstname)
            } else {
              await quantityError(errorQuantity, errorName)
              return;
            }
          }
        } else {
          if (userCart.length === 0) {

            return;
          } else {
            let statement = await checkGuestQuantityStocks()

            if (statement) {
              itemsNames = await getLocalName()
              await guestConfirmation()
              await guestItemsVendorUpdate()
              await updateGuestStock()
              await emailSend(email, name)
            } else {
              await quantityError(errorQuantity, errorName)
              return;
            }
          }
        }
}

  //////////////////////////////////////////////////////////////////This is where the items get cleared //////////////////////////////////////////////////////////////////

  const RemoveItems = async () => {

    const userDocRef = doc(db, "customers", currentUserLoggedIn);

      try {
        await updateDoc(userDocRef, {
          cart: [] // Removes cart items
        });

      } catch (error) {
        console.error("Error removing item from cart: ", error);
      }
  }

  //////////////////////////////////////////////////////////////////This is where the Email sends//////////////////////////////////////////////////////////////////

  const emailSend = async (email, name, itemN) => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        let total = parseFloat(urlParams.get("mainTotal"));

        const response = await fetch('https://vendor-dfm-production.up.railway.app/api/send-confirmation-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: email,
                firstName: name,
                orderNumber: uniqueId,
                total: total.toFixed(2)
            }),
        });

        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}`);
            return;
        }

        const data = await response.json();
        console.log('Response data:', data);

        if (data.success) {
            console.log('Email sent successfully!');
        } else {
            console.error(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
};




  //////////////////////////////////////////////////////////////////This is what the user see's//////////////////////////////////////////////////////////////////
  return (
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element"/>
        <div className="text-center m-top-24 m-botton-24 ">

          <button className=" main-button" id="submit" type="submit" disabled={isLoading}>
            <span id="button-text">
              {isLoading ? <div className="spinner" id="spinner"></div> : "Pay Now"}
            </span>
          </button>

        </div>
        {message && <div id="payment-message">{message}</div>}
      </form>
  );
};

export default MainPayment;
