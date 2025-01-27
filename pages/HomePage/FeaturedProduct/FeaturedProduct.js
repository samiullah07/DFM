import React from 'react'
const titleimg = "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/HomeBanner%2Ftitle_img.png?alt=media&token=691e4f14-c6b4-48d2-856e-c0e360edadb2";
import FeaturedSlider from './FeaturedSlider';
const FeaturedProduct = () => {
  return (
    <>
    <div className='categoryProductsBgColor'>
        <div className="heading text-center ">
        <strong>Add Top Rated Products</strong>
        <h2>Top Rated Products</h2>
        <div className="headingimg">
          <img src={titleimg} className="img-fluid mx-auto headingimgclass" alt='Featured Product' />
        </div>
        </div>
        <div className='container'>
        <FeaturedSlider/>
        </div>
        </div>
    </>
  )
}

export default FeaturedProduct