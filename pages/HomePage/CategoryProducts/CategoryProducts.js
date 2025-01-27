import React from "react";
import CategoryTab from "./CategoryTab";
const titleimg = "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/HomeBanner%2Ftitle_img.png?alt=media&token=691e4f14-c6b4-48d2-856e-c0e360edadb2";

const CategoryProducts = () => {
  return (
    <>
      <div className="categoryProductsBgColor ">
        <div className="heading text-center">
          <strong>Categories Products</strong>
          <h2>Categories</h2>
          <div className="headingimg">
            <img
              src={titleimg}
              className="img-fluid mx-auto headingimgclass"
              alt="Category Products"
            />
          </div>
        </div>
        <CategoryTab />
      </div>
    </>
  );
};

export default CategoryProducts;
