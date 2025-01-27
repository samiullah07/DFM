import React, {useEffect, useState} from "react";
import { Card, Col, Row } from "react-bootstrap";
import Link from "next/link";
import {db} from "../../FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Sideblog = () => {

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
      <Row className="sh_page side-blog bg-light rounded">
        {itemList.map((elm) => (
          <Col
            className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-12 b_left_blog mb-3 mb-md-0"
            key={elm.id}
          >
            <Card className="mb-4">
              <Link href="/SingleBlog/singleBlog">
                <a>
                  <img
                    src={elm.image}
                    className="fst-image mx-auto d-block img-fluid rounded"
                    alt="sideblog"
                  />
                </a>
              </Link>
              <Card.Body className="p-0 mt-3">
                <div className="blog_subtitle">
                  <span className=" pr-2">
                    <i className="far fa-calendar-alt mr-2"></i>
                    {elm.date}
                  </span>
                </div>
                <Card.Title>
                  <h2 className=" mt-3 mb-3 fw-bolder">
                    <Link href="/SingleBlog/singleBlog">
                      <a>{elm.title}</a>
                    </Link>
                  </h2>
                </Card.Title>
                <Card.Text className=" text-muted f_13 mb-3">
                  {elm.content}
                </Card.Text>
                <button type="button" className="main-button">
                  <Link href="/SingleBlog/singleBlog">
                    <a>Read More</a>
                  </Link>
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Sideblog;
