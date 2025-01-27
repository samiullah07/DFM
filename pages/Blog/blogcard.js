import React, {useEffect, useState} from "react";
import { Card, Col, Row } from "react-bootstrap";
import { PublicLayout } from "../Layout/PublicLayout";
import Link from "next/link";
import {db} from "../../FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
const breadcrumbsData = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Blog",
    path: "#",
  },
];
const Blogcard = () => {

  const [itemList, setItemList] = useState([]);

  const [loading, setLoading] = useState(true);

  const [copyOfMainList, setcopyOfMainList] = useState([])

  const getItems = async () => { //gets the data from firebase to use in the website

    const itemsColRef = collection(db, "DataLatestNews");
    let newItemList = [];
    try {

      const snapshot = await getDocs(itemsColRef);

      snapshot.docs.forEach((doc) => {

        doc.data().datalatestnews.forEach((item) => {

          newItemList.push(item);

        });

      });

      setItemList(newItemList);
      setcopyOfMainList(newItemList)
      setLoading(false);

    } catch (error) {
      alert(error.message);
    }

  }

  useEffect(() => {
    getItems();


  }, []);

  return (
    <>
      <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Shop">
        <div className="container">
          <Row className="sh_page bg-light rounded">
            {itemList.map((elm, index) => (
              <Col xl={4} lg={4} md={6} sm={6} key={index}>
                <Card className="mb-4">
                  <div className="banner fixedImage">
                    <a>
                      <Link href={`/blogId/${elm.id}`}>
                        <img
                          src={elm.image}
                          className="fst-image mx-auto d-block img-fluid  rounded"
                          alt="Blogcard"
                        />
                      </Link>
                    </a>
                  </div>
                  <Card.Body className="p-0 mt-3">
                    <div className="blog_subtitle">
                      <span className=" pr-2">
                        <i className="far fa-calendar-alt mr-2"></i>
                        {elm.date}
                      </span>
                    </div>
                    <Card.Title>
                      <h2 className=" mt-lg-3 mb-lg-3 fw-bolder">
                        <Link href={`/blogId/${elm.id}`}>
                          <a href="#">{elm.title}</a>
                        </Link>
                      </h2>
                    </Card.Title>
                    <Card.Text className=" text-muted f_13 mb-3">
                      {elm.brief}
                    </Card.Text>
                    <button type="button" className="main-button">
                      <Link href={`/blogId/${elm.id}`}>
                        <a>Read More</a>
                      </Link>
                    </button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </PublicLayout>
    </>
  );
};

export default Blogcard;
