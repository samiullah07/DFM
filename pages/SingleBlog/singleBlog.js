import React from "react";
import { PublicLayout } from "../Layout/PublicLayout";
import Content from "./Content";
const breadcrumbsData = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Blog",
    path: "/Blog/blogcard",
  },
  {
    label: "Single Blog",
    path: "#",
  },
];
const SingleBlog = () => {
  return (
    <>
      <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="SingleBlog">
        <div className="container">
          <Content />
        </div>
      </PublicLayout>
    </>
  );
};

export default SingleBlog;
