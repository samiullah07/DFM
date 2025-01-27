import React, { useEffect, useState } from "react";
import DealOfTheDay from "../HomePage/DealOfTheDay/DealOfTheDay";
import SpecialProducts from "../SpecialProducts/SpecialProducts";
import Banner from "./Banner";
import CategoryProducts from "./CategoryProducts/CategoryProducts";
import NaturalProduct from "./NaturalProduct/NaturalProduct";
import Service from "./Service/Service";
import ShopNow from "./ShopNow/ShopNow";
import Testimonial from "./Testimonial/Testimonial";
import LatestNews from "./LatestNews";
import Swal from "sweetalert2";
import Head from "next/head";


const HomePage = () => {
  let orderExists = false;
  let orderId;
  const [itemList, setItemList] = useState([]);

  const getId = () => {
    const urlParams = new URLSearchParams(window.location.search);
    orderId = urlParams.get("orderId");
    orderExists = !!orderId;
  };

  const notRegistered = () => {
    Swal.fire({
      icon: "success",
      title: "Your receipt number is: " + orderId,
      text: "A Confirmation Email has been sent to you.",
      showConfirmButton: false,
    });
  };


  useEffect(() => {
    getId();
    if (orderExists) {
      notRegistered();
    }
  }, []);

  return (
    <>
      <Head>
        <title>DFM</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/Diasspora%20Finals%2FDiasspora%20Icon%20With%20No%20Text-29.png?alt=media&token=f857f5f7-17b4-48f4-8b45-0c39ca9fa893" />
      </Head>
      <Banner />
      <DealOfTheDay />
      <ShopNow />
      <SpecialProducts />
      <NaturalProduct />
      <Service />
      {/*<SeasonBanner />*/}
      <CategoryProducts />
      {/*<Testimonial />*/}
      {/*<FeaturedProduct />*/}
      <LatestNews />
      {/*<Brandlogo />*/}
    </>
  );
};

export default HomePage;
