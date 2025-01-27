import React, {useEffect, useState} from 'react'
import { Row,Col } from 'react-bootstrap'
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../../FirebaseConfig";

const ShopNow = () => {

    const [itemList, setItemList] = useState([])

    const GetData = async (e) => {//gets data from the database

    const itemsColRef = collection(db, "PromotionalImagesHomePage");
    const newItemList = [];


    try {

      const snapshot = await getDocs(itemsColRef);

      snapshot.docs.forEach((doc) => {

        newItemList.push(doc.data())

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
        <div className="container ">
            <Row >
                {itemList.map((dod) => (
                    <Col sm={6} xs={12} key={dod.id}>
                        <div className='banner'>
                            <a href={dod.href}>
                                <img src={dod.image} className="img-fluid mx-auto shopNowImg" alt="shop now" />
                            </a>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    <div className='container'>


    </div>
    </>
  )
}

export default ShopNow