import React from "react";
import { PublicLayout } from "../Layout/PublicLayout";
import CompareList from "./CompareList";
const breadcrumbsData = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Compare",
    path: "#",
  },
];
const Compare = () => { // not used
  return (
    <>
      <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Compare">
        <div className="container">
          <CompareList />
        </div>
      </PublicLayout>
    </>
  );
};

export default Compare;
