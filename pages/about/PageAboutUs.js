import React from "react";
const PageAboutUs = () => {// not used
  const about_us = "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/TeamImages%2Fabout_us.jpg?alt=media&token=96d96dbe-3bf2-4e5f-9d2f-287fbe0e57bf"
  return (
    <>
      <div className="container about-text">
        <div className="banner">
          <a>
            <img src={about_us} className="img-fluid mx-auto" alt="aboutus" />
          </a>
        </div>
        <div className="mt-lg-3 mt-sm-1 mt-lg-3">
          <h4 className="font-weight-bold">
            Diaspora Food Market.
          </h4>
          <h5><b>About Diasspora</b></h5>
          <p>Introducing Diasspora, the vibrant online platform that bridges continents, creating a global tapestry of flavors, and delivering the heart and soul of Asia, Africa, and the Caribbean right to your doorstep. Our mission goes beyond mere commerce; its about fostering a sense of community and belonging. With Diasspora, youre not just ordering products; youre joining a movement—a movement of excitement, happiness, and homeland satisfaction.</p>
          <p>Diaspora refers to the dispersion or scattering of a particular group of people, often with a common ethnic, cultural, or national background, from their original homeland to various locations around the world. The Diasspora icon is an abstract image of this dispersion. People scattered from a common place, with common foods but also a picture of again coming back to that place by the ability to eat homeland foods.</p>
          <h5><b>Non-Perishable Items</b></h5>
          <ul>
            <li>To be Cheaper, Better and Faster.
            </li>
            <li>To connect every diasporan to their root by making homeland foods easily accessible anywhere in
              Diaspora.
            </li>
          </ul>

          <h5><b>Our Mission:</b></h5>
          <p>Our mission is to connect diaspora communities to their favorite food items and empower entrepreneurs to
            build their own online food businesses, no matter where they are in the world. We understand the importance
            of food in connecting us to our roots, and were here to make it easy for you to enjoy a taste of home.
            Forget about the hassle - well deliver it right to your doorstep.

            But we are not just about food. Were passionate about making a difference in the world. Thats why we
            support several initiatives:
          </p>
          <ul>
            <li><b>Empowering Girls Education:</b> Were dedicated to breaking down barriers and creating opportunities
              by supporting girls access to education in underserved areas..
            </li>
            <li><b>Feeding Hungry Children:</b> With every purchase you make, a portion of the proceeds goes towards
              feeding children in need.
            </li>
          </ul>
          <p>So come join us at Diasspora and experience the taste of home, all while making a positive impact in the
            world. Let us take care of the hassle - all you need to do is sit back, relax, and enjoy!

            </p>
          {/*<p>Welcome to Diasspora, the online platform that brings the flavours of Africa, Asia and Caribbean right to*/}
          {/*  your doorstep! Our MISSION is to help the diaspora community access their favourite food items, no matter*/}
          {/*  where they are in the world. However, we presently cover the whole of the United Kingdom and are looking to*/}
          {/*  expand worldwide. We understand the importance of food in connecting us to our roots, and we’re here to make*/}
          {/*  it easy for you to enjoy the taste of home by “Bringing the flavours of home to your doorstep.” while you*/}
          {/*  forget about the hassle.*/}

          {/*  But we’re not just about food - we’re also about empowerment. We believe that everyone deserves the*/}
          {/*  opportunity to build their own business, and that’s why we’re proud to offer a platform that helps diaspora*/}
          {/*  entrepreneurs sell their homeland food items. Whether you’re a shop owner or you are just starting out with*/}
          {/*  only a few food items, we’re here to support you as you build your own online food item business. </p>*/}
          {/*<p>We are dedicated to empowering girls worldwide by supporting their access to education in some of the most*/}
          {/*  remote and underserved areas. Our mission is to break down barriers and create opportunities, ensuring that*/}
          {/*  every girl has the chance to thrive through education.</p>*/}
          {/*<p>At Diasspora, we are passionate about making a difference in the world. That’s why we are committed to*/}
          {/*  supporting hungry children around the world. With every purchase you make on our platform, a portion of the*/}
          {/*  proceeds goes towards feeding children in need.</p>*/}
          {/*<p>So come join us at Diasspora and experience the taste of home, all while making a positive impact in the*/}
          {/*  world. Let us take care of the hassle of finding your favourite food items - all you need to do is sit back,*/}
          {/*  relax and enjoy!</p>*/}
          {/*<p>Note: we need to start traveling to different part of the world start from Africa to empower people and*/}
          {/*  document it.</p>*/}
        </div>
      </div>
    </>
  );
};

export default PageAboutUs;
