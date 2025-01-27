import React from "react";
import { PublicLayout } from "../Layout/PublicLayout";
import Aboutslider from "./Aboutslider";
import PageAboutUs from "./PageAboutUs";
import TestimonialsAbout from "./TestimonialsAbout";
const breadcrumbsData = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About Us",
    path: "#",
  },
];
const MainAboutPage = () => { //used to refer to the webpage and display what needs to be displayed
  return (
    <>
      <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="About">
        <PageAboutUs />
        {/*<TestimonialsAbout />*/}
        {/*<Aboutslider />*/}
      </PublicLayout>
    </>
  );
};

export default MainAboutPage;
