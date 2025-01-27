import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import { Col } from "react-bootstrap";
import Link from "next/link";
import {db} from "../../../FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1270,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};
const LatestNewsSlider = () => {
  const [itemList, setItemList] = useState([]);

  const [loading, setLoading] = useState(true);

  const [copyOfMainList, setcopyOfMainList] = useState([])

  const getItems = async () => {//gets data from the database

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
      <Slider {...settings} className="row blog_class">
        {itemList.map((elm, index) => (
          <div className="item" key={index}>
            <Col xl={12} lg={12} className="blog_">
              <div className="blog_thumb">
                <div className="blog_image">
                  <div className={"fixedImage"}>
                    <img
                      src={elm.image}
                      className="img-fluid mx-auto"
                      alt="LatestNewsSlider"
                    />
                    <div className="blog_mask">
                      <div className="blog_mask_content mx-0 my-auto text-center">
                        {/* <Link href="/SingleBlog/singleBlog">
                          <a className="icon d-inline-block ">
                            <i className="fas fa-link"></i>
                          </a>
                        </Link> */}
                        <Link href={`/blogId/${elm.id}`}>
                          <a className="icon d-inline-block">
                            <i className="fas fa-link"></i>
                          </a>
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="text-center main_text text_b  py-xl-4 px-xl-2">
                  <h3 className="text-center">
                    <Link href={`/blogId/${elm.id}`}>
                      <a className="font-weight-bolder f-20 ">
                        {elm.title}
                      </a>
                    </Link>
                  </h3>
                  <span className="text-center">
                    <span className="d text-muted">{elm.date}</span>
                  </span>
                </div>
              </div>
            </Col>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default LatestNewsSlider;
