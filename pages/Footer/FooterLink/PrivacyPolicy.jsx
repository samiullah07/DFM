import React from "react";
import { PublicLayout } from "../../Layout/PublicLayout";
import Image from "next/image";
const breadcrumbsData = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Privacy Policy",
    path: "#",
  },
];
const PrivacyPolicy = () => {

  const titleimg = "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/HomeBanner%2Ftitle_img.png?alt=media&token=691e4f14-c6b4-48d2-856e-c0e360edadb2"

  return (
    <>
      <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Portfolio">
        <div className="container">
          <div className="deal_of_container">
            <div className="heading text-center">
              <strong>See Privacy Policy</strong>
              <h2>Privacy Policy</h2>
              <div className="headingimg">
                <img
                    src={titleimg}
                    className="img-fluid mx-auto headingimgclass"
                    alt="Privacy Policy"
                />
              </div>
            </div>
            <h5><b>Diasspora Privacy Policy for Diasspora</b></h5>
            <p>Effective Date: April 10, 2024</p>
            <p>
              Diasspora (we, us, or our) values your privacy and is dedicated to safeguarding your personal
              information. This Privacy Policy elucidates the collection, utilization, disclosure, and retention of your
              personal data when you engage with our website, mobile app, or any other services provided by Diasspora
              (referred to collectively as the Service).
            </p>

            <h5><b>Information We Collect</b></h5>
            <p>We gather various types of information when you utilize the Service, which can be delineated as
              follows:</p>

            <h5><b>Information You Provide:</b></h5>
            <ul>
              <li><h6><b>Account Information:</b></h6> Upon creating an account with Diasspora, we collect data such as
                your
                name, email address, phone number, delivery address, and billing address.
              </li>
              <li><h6><b>Order Information:</b></h6> When you place an order on Diasspora, we gather particulars about
                your order, including the items you purchase, delivery address, and payment details.
              </li>
              <li><h6><b>Communication Information:</b></h6> Correspondence through the Service, such as contacting
                customer support, may lead to the collection of information, encompassing the content of your message
                and any additional details you provide.
              </li>
              <li><h6><b>Survey Information:</b></h6> On occasion, we may administer surveys to gather feedback on the
                Service. Participation in these surveys is entirely voluntary.
              </li>
            </ul>

            <h5><b>Information Collected Automatically:</b></h5>
            <ul>
              <li><h6><b>Device Information:</b></h6> Details regarding the device you utilize to access the Service,
                such as device type, operating system, IP address, browser type, and unique device identifiers, may be
                collected.
              </li>
              <li><h6><b>Usage Information:</b></h6> We may gather information about your usage patterns on the Service,
                including the pages visited, searches performed, and products viewed.
              </li>
            </ul>

            <h5><b>Information from Third Parties:</b></h5>
            <ul>
              <li>We may obtain information about you from third-party sources, such as social media platforms, should
                you opt to link your account with them. Such information will be subject to the respective privacy
                policies of those platforms.
              </li>
            </ul>

            <h5><b>Use of Your Information:</b></h5>
            <p>We employ your information for the following purposes</p>
            <ul>
              <li><h6><b>To Provide and Enhance the Service:</b></h6> Your information aids us in operating,
                maintaining, and enhancing the Service, including order processing, grocery delivery, and customer
                support.
              </li>
              <li><h6><b>To Personalize Your Experience:</b></h6> We may utilize your information to tailor your
                experience on the Service, such as providing product recommendations tailored to your interests.
              </li>
              <li><h6><b>To Send Marketing Communications:</b></h6> With your consent, we may send you marketing
                communications, such as email newsletters and promotional offers. You retain the option to unsubscribe
                from these communications at any time.
              </li>
              <li><h6><b>To Comply with Legal Obligations:</b></h6> Your information may be used to adhere to applicable
                laws and regulations.
              </li>
            </ul>

            <h5><b>Sharing Your Information:</b></h5>
            <ul>
              <li><h6><b>Service Providers:</b></h6> Third-party service providers assisting us in operating the
                Service, including payment processors, delivery companies, and data storage providers, may be granted
                access to your information.


              </li>
              <li><h6><b>Government Authorities:</b></h6> Your information may be disclosed to government authorities or
                law enforcement officials if mandated by law or if we believe, in good faith, that such disclosure is
                necessary to prevent physical harm or financial loss, or to report suspected illegal activity.


              </li>
            </ul>

            <h5><b>Your Choices</b></h5>
            <p>You retain control over your information:</p>
            <ul>
              <li><h6><b>Accessing Your Information:</b></h6> You can access and update your account information at any
                time by logging into your account.


              </li>
              <li><h6><b>Marketing Communications:</b></h6> You have the option to unsubscribe from marketing
                communications by utilizing the unsubscribe link in any marketing email we dispatch.


              </li>
              <li><h6><b>Cookies and Other Tracking Technologies:</b></h6> Most web browsers afford you the capability
                to manage cookies and other tracking technologies. You can opt to block or delete cookies, or configure
                your browser to notify you when a cookie is being set.


              </li>
            </ul>

            <h5><b>Security</b></h5>
            <p>We implement reasonable measures to safeguard your information from unauthorized access, disclosure, alteration, or destruction. However, its important to note that no internet transmission or electronic storage method is entirely secure.</p>

            <h5><b>Data Retention</b></h5>
            <p>We will retain your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is mandated or permitted by law.</p>

            <h5><b>Childrens Privacy</b></h5>
            <p>The Service is not intended for individuals under the age of 18. We do not knowingly collect or solicit personal information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.</p>

            <h5><b>International Transfers</b></h5>
            <p>Your information may be transferred to, stored, and processed in countries other than your country of residence. These countries may have differing data protection laws from your own.</p>

            <h5><b>Changes to this Privacy Policy</b></h5>
            <p>We reserve the right to update this Privacy Policy periodically. Any changes will be communicated by posting the revised Privacy Policy on the Service.</p>

            <h5><b>Contact Us</b></h5>
            <p>If you have any inquiries regarding this Privacy Policy, please reach out to us at <u>info@diasspora.co.uk</u>. We appreciate your trust in Diasspora and are committed to ensuring the protection and privacy of your personal information.</p>


          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default PrivacyPolicy;
