import React from "react";
import { PublicLayout } from "../Layout/PublicLayout";
import Content from "./content";
const breadcrumbsData = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Checkout",
    path: "#",
  },
];
const Checkout = () => {
  return (
    <>
      <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Portfolio">
        <Content />
      </PublicLayout>
    </>
  );
};

export default Checkout;
