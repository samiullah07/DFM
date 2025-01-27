import React, {useEffect, useState} from "react";
import {Col} from "react-bootstrap";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../../FirebaseConfig";
const NaturalProduct = () => {

  const [itemList, setItemList] = useState([])
  const [image, setImage] = useState("")

    const GetData = async (e) => {//gets data from the database

    const itemsColRef = collection(db, "PromotionalTextHomePage");
    const newItemList = [];


    try {

      const snapshot = await getDocs(itemsColRef);

      snapshot.docs.forEach((doc) => {

        newItemList.push(doc.data())
        setImage(doc.data().image)

      });

      setItemList(newItemList)

    } catch (error) {
      alert(error.message);
    }

  }

  useEffect(() => {
    GetData();
  }, []);

  return (
<>
  <div className="naturalProduct" style={{ position: "relative", overflow: "hidden" }}>
    {/* Pseudo-element for blurring the background */}
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url(${image})`,
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      backgroundSize: "cover",
      zIndex: 0,
    }}></div>

    {/* Content that is not blurred */}
    {itemList.map((dod) => (
        <div className="container naturalProductText" style={{position: "relative", zIndex: 1}} key={dod.id}>
          {dod.topPart && <h5>Promo Code: "{dod.topPart}"</h5>}
          <h2>{dod.bottomPart}</h2>
          {dod.topPart &&
              <button type="button" className="main-button">
                <a href="../Shop">Shop Now</a>
              </button>
          }

        </div>
    ))}

  </div>
</>
  );
};

export default NaturalProduct;
