import Image from "next/image";
const titleimg = "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/HomeBanner%2Ftitle_img.png?alt=media&token=691e4f14-c6b4-48d2-856e-c0e360edadb2";
import DealSingleCard from "./DealSingleCard";

const DealCard = () => {
  return (
    <>
      <div className="deal_fruit">
        <div className="deal_of_container">
          <div className="heading text-center">
            <strong>Featured Products</strong>
            <h2>Deal Of The Day</h2>
            <div className="headingimg">
              <img
                src={titleimg}
                className="img-fluid mx-auto headingimgclass"
                alt="DealCard"
              />
            </div>
          </div>
          <div className="container">
            <DealSingleCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default DealCard;
