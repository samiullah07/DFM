import React, { useContext, useEffect, useState } from "react";
import Filter from "./Filter";
import Product from "./Product";
import { Row, Col } from "react-bootstrap";
import { PublicLayout } from "../Layout/PublicLayout";
import Head from "next/head";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../FirebaseConfig";

const breadcrumbsData = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Shop',
    path: '/Shop',
  }
];

const Shop = () => {

  const [vendorList, setVendorList] = useState([])
  const [categoryList, setCategoryList] = useState([])

  const [defaultFilterOptions, setDefaultFilterOptions] = useState({
    search: "",
    minPrice: 0,
    maxPrice: 999,
    colourPink: false,
    colourYellow: false,
    colourWhite: false,
    colourBlack: false,
    dropDownVal: 0,
  });

  const getVendorData = async () =>{ // get the vendor items filtered

    const itemsColRefVendor = collection(db, "Vendor");
    const newVendorList = [];

    try {

      const snapshot = await getDocs(itemsColRefVendor);

      snapshot.docs.forEach((doc) => {

        newVendorList.push(doc.data())

      });

      setVendorList(newVendorList)

    } catch (error) {
      alert(error.message);
    }
  }

  const getCategoryData = async () =>{ // get the category items filtered

    const itemsColRefVendor = collection(db, "CategoryFilter");
    const newCategoryList = [];

    try {

      const snapshot = await getDocs(itemsColRefVendor);

      snapshot.docs.forEach((doc) => {

        newCategoryList.push(doc.data())

      });

      setCategoryList(newCategoryList)

    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    getVendorData()
    getCategoryData()
  }, []);

  useEffect(() => {
    if (vendorList.length > 0) {
      // Dynamically generate vendor filter options based on vendorList
      const vendorFilterOptions = vendorList.reduce((acc, vendor) => {
        acc[`${vendor.displayName}`] = false;
        return acc;
      }, {});

      // Update the default filter options state with dynamic vendor filters
      setDefaultFilterOptions(prevOptions => ({
        ...prevOptions,
        ...vendorFilterOptions
      }));
    }
  }, [vendorList]);

  useEffect(() => {
    if (categoryList.length > 0) {
      // Dynamically generate vendor filter options based on vendorList
      const categoryFilterOptions = categoryList.reduce((acc, category) => {
        acc[`${category.foodId}`] = false;
        return acc;
      }, {});

      // Update the default filter options state with dynamic vendor filters
      setDefaultFilterOptions(prevOptions => ({
        ...prevOptions,
        ...categoryFilterOptions
      }));
    }
  }, [categoryList]);

  //console.log(defaultFilterOptions);

  const [filterOptions, setFilterOptions] = useState(defaultFilterOptions);

  const UpdateFilter = (option, value) => { // updates the filter
    setFilterOptions({...filterOptions, [option]: value});
  }

  useEffect(() => {}, [filterOptions]);

  return (
    <>
      <Head>
        <title>DFM</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/Diasspora%20Finals%2FDiasspora%20Icon%20With%20No%20Text-29.png?alt=media&token=f857f5f7-17b4-48f4-8b45-0c39ca9fa893" />
      </Head>
      <PublicLayout  breadcrumb={breadcrumbsData} breadcrumbTitle='Shop'>
        <div className="container">
          <Row className='m-botton-24'>
            <Col lg={3} md={4}>
              <Filter OnFilterUpdate={UpdateFilter} />
            </Col>
            <Col lg={9} md={8}>
              <Product filterOptions={filterOptions} />
            </Col>
          </Row>
        </div>
      </PublicLayout>
    </>
  );
};

export default Shop;
