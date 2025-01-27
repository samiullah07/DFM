import React from "react";
import { PublicLayout } from "../Layout/PublicLayout";
import FirstCategoryDesign from "./FirstCategoryDesign";
import SecondCategoryDesign from "./SecondCategoryDesign";
import ThirdCategoryDesign from "./ThirdCategoryDesign";
const breadcrumbsData = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "All Category",
    path: "#",
  },
];
const AllCategory = () => {
  return (
    <>
      <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="AllCategory">
        <FirstCategoryDesign />
        <SecondCategoryDesign />
        <ThirdCategoryDesign />
      </PublicLayout>
    </>
  );
};

export default AllCategory;
