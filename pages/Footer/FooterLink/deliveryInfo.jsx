import React from "react";
import Image from "next/image";
import { PublicLayout } from "../../Layout/PublicLayout";
const breadcrumbsData = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Terms & Conditions",
    path: "#",
  },
];
const DeliveryInfo = () => {
  const titleimg = "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/HomeBanner%2Ftitle_img.png?alt=media&token=691e4f14-c6b4-48d2-856e-c0e360edadb2"
  return (
    <>
      <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Portfolio">
        <div className="container">
          <div className="deal_of_container">
            <div className="heading text-center">
              <strong>Terms & Conditions</strong>
              <h2>Terms & Conditions</h2>
              <div className="headingimg">
                <img
                    src={titleimg}
                    className="img-fluid mx-auto headingimgclass"
                    alt="DeliveryInfo"
                />
              </div>
            </div>
            <h5><b>T&C’s:</b></h5>
            <p>Terms and Conditions for Diasspora (Packaged Food Delivery Service)</p>
            <p>Please read the following terms and conditions carefully before using our DFM (Packaged Food Delivery Service). By placing an order or using our service, you agree to be bound by these terms and conditions.</p>
            <ol>
              <li type="1"><b>Service Overview:</b>
                <ol type="a">
                  <li>Our DFM (Packaged Food Delivery Service) provides convenient delivery of pre-packaged food items
                    to customers' specified locations.
                  </li>
                  <li>We aim to deliver the food in a timely and efficient manner, ensuring the quality and freshness of
                    the products.
                  </li>
                </ol>
              </li>
              <li type="1"><b>Ordering and Delivery:</b>
                <ol type="a">
                  <li>Orders can be placed through our website or mobile application.</li>
                  <li>Delivery availability and time slots may vary based on location and demand.</li>
                  <li>We reserve the right to refuse or cancel any order at our discretion, including but not limited to
                    situations where the requested items are unavailable or delivery is not possible.
                  </li>
                </ol>
              </li>
              <li type="1"><b>Product Availability and Substitutions:</b>
                <ol type="a">
                  <li>All products are subject to availability. In the event that an ordered item is out of stock, we
                    may substitute it with a similar product of equal or greater value.
                  </li>
                  <li>If you have any allergies or dietary restrictions, it is your responsibility to inform us during
                    the ordering process. We will make reasonable efforts to accommodate your needs, but we cannot
                    guarantee the absence of allergens or cross-contamination
                  </li>
                </ol>
              </li>
              <li type="1"><b>Pricing and Payment:</b>
                <ol type="a">
                  <li>Prices for the food items and delivery charges are clearly displayed on our website or mobile application. All prices are in the local currency and inclusive of applicable taxes, unless stated otherwise.
                  </li>
                  <li>Payment must be made at the time of placing the order. We accept various forms of payment, including credit/debit cards, digital wallets, and other designated payment methods.
                  </li>
                </ol>
              </li>
              <li type="1"><b>Cancellations and Refunds:</b>
                <ol type="a">
                  <li>Orders can be canceled or modified up to a certain period before the scheduled delivery time. The
                    specific cancellation policy will be communicated to you during the ordering process.
                  </li>
                  <li>Refunds, if applicable, will be issued based on our refund policy, which may vary depending on the
                    circumstances. Please refer to our refund policy for more details.
                  </li>
                </ol>
              </li>
              <li type="1"><b>Liability and Disclaimers:</b>
                <ol type="a">
                  <li>We strive to deliver the food items in the best condition possible. However, we are not liable for
                    any damage, loss, or deterioration of the products once they are delivered and accepted by you.
                  </li>
                  <li>Our liability is limited to the purchase price of the affected products.</li>
                  <li>We are not responsible for any adverse health effects resulting from the consumption of the food
                    items. It is your responsibility to ensure that the products are safe for your consumption based on
                    your specific health conditions or allergies.
                  </li>
                </ol>
              </li>
              <li type="1"><b>Intellectual Property:</b>
                <ol type="a">
                  <li>All content, including but not limited to text, images, logos, and trademarks, displayed on our
                    website or mobile application, is our intellectual property and protected by applicable laws. Any
                    unauthorized use or reproduction is strictly prohibited.
                  </li>
                </ol>
              </li>
              <li type="1"><b>Privacy:</b>
                <ol type="a">
                  <li>We collect and process personal information as described in our Privacy Policy. By using our
                    service, you consent to our collection and processing of personal data as outlined therein.
                  </li>
                </ol>
              </li>
              <li type="1"><b>Governing Law and Jurisdiction:</b>
                <ol type="a">
                  <li>These terms and conditions shall be governed by and construed in accordance with the laws of
                    [Country/State]. Any disputes arising out of or in connection with these terms and conditions shall
                    be subject to the exclusive jurisdiction of the courts of [Country/State]
                  </li>
                </ol>
              </li>
              <li type="1"><b>Modifications to the Terms and Conditions:</b>
                <ol type="a">
                  <li>We reserve the right to modify or update these terms and conditions at any time without prior
                    notice. The updated version will be effective upon posting on our website or mobile application.
                  </li>
                </ol>
              </li>
            </ol>
            <p>If you have any questions or concerns about our terms and conditions, please contact our customer support
              before using our service.</p>
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default DeliveryInfo;
