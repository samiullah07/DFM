const titleimg = "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/HomeBanner%2Ftitle_img.png?alt=media&token=691e4f14-c6b4-48d2-856e-c0e360edadb2";
import TestimonialSlider from "./TestimonialSlider";

const Testimonial = () => {
  return (
    <>
    <div className="test_fruit">
      <div className="deal_of_container">
        <div className="heading text-center">
          <strong>Testimonial</strong>
          <h2>Our Client Review</h2>
          <div className="headingimg">
            <img
              src={titleimg}
              className="img-fluid mx-auto headingimgclass"
              alt="textimonial"
            />
          </div>
        </div>
        <TestimonialSlider/>
      </div>
      </div>
    </>
  );
};

export default Testimonial;
