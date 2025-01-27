import React, {useEffect, useState} from "react";
import { Card, Col, Row } from "react-bootstrap";
import {useRouter} from "next/router";
import { PublicLayout } from "../Layout/PublicLayout";
import Content from "../SingleBlog/Content";
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
    path: "/Blog/blogcard",
  },
];
const BlogId = () => { //not used


  return (
    <>
      <>
      <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Shop">
        <Content />
      </PublicLayout>
    </>
    </>
  );
};

export default BlogId;
