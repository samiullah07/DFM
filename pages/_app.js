import Head from "next/head";
import Script from "next/script";
import { createContext, useState } from "react";
import ScrollToTop from "react-scroll-to-top";
import "../styles/globals.css";
import "../styles/css/homepage.css";
import "../styles/css/Gallery.css";
import "../styles/css/Pages.css";
import "../styles/css/ProductPage.css";
import "../styles/css/blog.css";
import "../styles/css/contact.css";
import "../styles/css/responsive.css";
import "../styles/css/error.css";
import "../styles/css/checkout.css";
export const CartContext = createContext();
function MyApp({ Component, pageProps }) {

  const [cart, setCart] = useState([]);
      return (
        <>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Flavoro</title>
          <link rel="icon" href="/icon.ico" />
          <link
            rel="stylesheet"
            href="path/to/font-awesome/css/font-awesome.min.css"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
            crossOrigin="anonymous"
          />
          {/* slick */}
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          ></link>
          <Script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
            crossOrigin="anonymous"
          />
          <Script
            src="https://kit.fontawesome.com/b0fc5c0ae8.js"
            crossOrigin="anonymous"
          ></Script>
          <CartContext.Provider value={{ cart, setCart }}>
            <ScrollToTop smooth />
            <Component {...pageProps} />
          </CartContext.Provider>

        </>
      );
}

export default MyApp;
