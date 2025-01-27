import React from "react";
import Service from "../HomePage/Service/Service";
import { PublicLayout } from "../Layout/PublicLayout";
import ServicesLayout2 from "./ServicesLayout2";
import ServicesLayout3 from "./ServicesLayout3";
const breadcrumbsData = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "services",
    path: "#",
  },
];
const services = () => { // NOT USED
  return (
    <>
      <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="services">
        <Service />
        <ServicesLayout2 />
        <ServicesLayout3 />
      </PublicLayout>
    </>
  );
};

export default services;
