import { Row, Col } from "react-bootstrap";
import Image from "next/image";
import Sideblog from "./Sideblog";
import { PublicLayout } from "../Layout/PublicLayout";
import Link from "next/link";
const breadcrumbsData = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Left Blog",
    path: "#",
  },
];
const leftBlog = () => { //not used
  const SideBlog1 = "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/BlogImages%2FSideBlog1.jpg?alt=media&token=7f257c2f-6c0a-4e1f-a63e-13895f29ff71";
  const SideBlog2 = "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/BlogImages%2FSideBlog2.jpg?alt=media&token=b506facd-c885-4256-a3cc-ce7321aeb7e2";
  const SideBlog3 = "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/BlogImages%2FSideBlog3.jpg?alt=media&token=8ecc37bf-fd07-4627-a80a-644b9589cb03";
  const SideBlog4 = "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/BlogImages%2FSideBlog4.jpg?alt=media&token=ea0aa056-a3df-4a4e-8fad-4c670600b598";
  return (
    <>
      <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Shop">
        <div className="container">
          <Row>
            <div className="col-md-4 col-lg-3 col-xl-3 col-sm-6 b_left_side">
              <div className="bl_sticky">
                <div className="row sh_page p-0 bg-light rounded mb-3">
                  <div className="col-12">
                    <div className="title_outer">
                      <h5 className="font-weight-bolder mb-4 d-inline-block pr-3 ">
                        <span className="b-title">recent blog</span>
                      </h5>
                    </div>
                    <ul className="bl-sidebar leftblog-padding">
                      <li className=" d-block border-bottom">
                        <div className="media pb-3">
                          <div className="pr-2 left-blog-img">
                            <Link href="/Blog/blogcard">
                              <a>
                                <img
                                  src={SideBlog1}
                                  className="fst-image mx-auto d-block img-fluid rounded"
                                  alt="SideBlog1"
                                />
                              </a>
                            </Link>
                          </div>
                          <div className="media-body">
                            <h6 className="mt-0 f_15 font-weight-bolder">
                              <Link href="/Blog/blogcard">
                                <a>
                                  Nullam in neque vitae arcu auctor dignissim
                                  feugiat erat.
                                </a>
                              </Link>
                            </h6>
                            <p>
                              <span className="font-weight-bolder pr-2">
                                <i className="far fa-calendar-alt mr-2"></i>Oct
                                27 2020
                              </span>
                            </p>
                          </div>
                        </div>
                      </li>
                      <li className=" d-block border-bottom ">
                        <div className="media py-3">
                          <div className="pr-2 left-blog-img">
                            <Link href="/Blog/blogcard">
                              <a>
                                <img
                                  src={SideBlog2}
                                  className="fst-image mx-auto d-block img-fluid rounded"
                                  alt="SideBlog3"
                                />
                              </a>
                            </Link>
                          </div>
                          <div className="media-body">
                            <h6 className="mt-0 f_15 font-weight-bolder">
                              <Link href="/Blog/blogcard">
                                <a>
                                  Vestibulum lobortis bibendum sollicitudin
                                  lectus.
                                </a>
                              </Link>
                            </h6>
                            <p>
                              <span className="font-weight-bolder pr-2">
                                <i className="far fa-calendar-alt mr-2"></i>Oct
                                27 2020
                              </span>
                            </p>
                          </div>
                        </div>
                      </li>
                      <li className=" d-block border-bottom">
                        <div className="media py-3">
                          <div className="pr-2 left-blog-img">
                            <Link href="/Blog/blogcard">
                              <a>
                                <img
                                  src={SideBlog3}
                                  className="fst-image mx-auto d-block img-fluid rounded"
                                  alt="SideBlog4"
                                />
                              </a>
                            </Link>
                          </div>
                          <div className="media-body">
                            <h6 className="mt-0 f_15 font-weight-bolder">
                              <Link href="/Blog/blogcard">
                                <a>
                                  eget sollicitudin cursus Phasellus quis lorem
                                  mi Vestibulum
                                </a>
                              </Link>
                            </h6>
                            <p>
                              <span className="font-weight-bolder pr-2">
                                <i className="far fa-calendar-alt mr-2"></i>Oct
                                27 2020
                              </span>
                            </p>
                          </div>
                        </div>
                      </li>
                      <li className="d-block ">
                        <div className="media pt-3">
                          <div className="pr-2 left-blog-img">
                            <Link href="/Blog/blogcard">
                              <a>
                                <img
                                  src={SideBlog4}
                                  className="fst-image mx-auto d-block img-fluid rounded"
                                  alt="blog_5"
                                />
                              </a>
                            </Link>
                          </div>
                          <div className="media-body">
                            <h6 className="mt-0 f_15 font-weight-bolder">
                              <Link href="/Blog/blogcard">
                                <a>
                                  bibendum lacus sit amet ullamcorper
                                  vestibulum.
                                </a>
                              </Link>
                            </h6>
                            <p>
                              <span className="font-weight-bolder pr-2">
                                <i className="far fa-calendar-alt mr-2"></i>Oct
                                27 2020
                              </span>
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row sh_page bg-light rounded mb-3">
                  <div className="col-12">
                    <div className="title_outer">
                      <h5 className="font-weight-bolder mb-3 d-inline-block pr-3 ">
                        <span className="b-title">category</span>
                      </h5>
                    </div>

                    <ul className="bl_cat">
                      <li className="font-weight-bolder pt-0">
                        <Link href="/Shop">
                          <a>Guava </a>
                        </Link>
                      </li>
                      <li className="font-weight-bolder">
                        <Link href="/Shop">
                          <a>Muskmelon </a>
                        </Link>
                      </li>
                      <li className="font-weight-bolder">
                        <Link href="/Shop">
                          <a>Olive </a>
                        </Link>
                      </li>
                      <li className="font-weight-bolder">
                        <Link href="/Shop">
                          <a>Java Plum</a>
                        </Link>
                      </li>
                      <li className="font-weight-bolder">
                        <Link href="/Shop">
                          <a>Lime</a>
                        </Link>
                      </li>
                      <li className="font-weight-bolder">
                        <Link href="/Shop">
                          <a>Papaya</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row sh_page bg-light rounded">
                  <div className="col-12">
                    <div className="title_outer">
                      <h5 className="font-weight-bolder mb-3 d-inline-block pr-3 ">
                        <span className="b-title">comment</span>
                      </h5>
                    </div>

                    <ul className="bl_cat">
                      <li className="font-weight-bolder pt-0">
                        Vestibulum luctus velit sit amet malesuada molestie
                      </li>
                      <li className="font-weight-bolder">
                        hasellus quis lorem mi Vestibulum luctus velit sit.
                      </li>
                      <li className="font-weight-bolder">
                        Integer bibendum lacus sit amet ullamcorper vestibulum.
                      </li>
                      <li className="font-weight-bolder">
                        Phasellus quis lorem mi Vestibulum luctus velit sit amet
                        malesuada molestie.
                      </li>
                      <li className="font-weight-bolder">
                        Vestibulum luctus velit sit amet malesuada molestie
                        Mauris
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <Col lg={9} md={8} sm={6}>
              <Sideblog />
            </Col>
          </Row>
        </div>
      </PublicLayout>
    </>
  );
};

export default leftBlog;
