import React, {useEffect} from "react";
import { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import {useRouter} from "next/router";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../FirebaseConfig";
import {forEach} from "react-bootstrap/ElementChildren";

const Content = () => {
  const [validated, setValidated] = useState(false);
  const [blog, setBlog] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");

  const [content, setContent] = useState([]);

  const router = useRouter();

  useEffect(() => { //gets data from the database to be saved in list and be used below
    let newList = []
    if (router.query.blogId) {
      const itemsColRef = collection(db, "DataLatestNews");

      getDocs(itemsColRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          doc.data().datalatestnews.forEach((item) => {

            if(item.id === Number(router.query.blogId)){
              setBlog(item.image);
              setDate(item.date)
              setTitle(item.title)
              item.contents.forEach((paragraph) =>{
                newList.push(paragraph)
              })


            }

          });

          setContent(newList)
        });
      })
      .catch(error => {
        alert(error.message);
      });
    }
  }, [router.query.blogId]); // Change this dependency to `router.query.blogId`

  return (
    <>
      <div className="singleBlog single ">
        <Row className="sh_page">
          <Col xl={12} lg={12} md={12}>
            <Card>
              <img src={blog} alt="Content" className="img-fluid mx-auto" />
              <Card.Body>
                <div className="blog_subtitle">
                  <span className="f-bolder pr-2">
                    <i className="far fa-calendar-alt mr-2"></i>{date}
                  </span>
                </div>
                <Card.Title>
                  <h2 className="card-title mt-3 f-bold">
                    <a href="#">
                      {title}
                    </a>
                  </h2>
                </Card.Title>
                {content.map((paragraph, index) => (
                  <Card.Text key={index} className="text-muted f_13">
                    {paragraph}
                  </Card.Text>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Content;
