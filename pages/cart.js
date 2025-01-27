import React from "react";
import Cart from "../component/Cart/Cart";
import PublicLayout from "./Layout/PublicLayout";
const breadcrumbsData = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Cart",
    path: "#",
  },
];
const cart = () => {
  return (
    <>
      <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Portfolio">
        <Cart />
      </PublicLayout>
    </>
  );
};

export default cart;
