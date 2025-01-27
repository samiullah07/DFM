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
const RefundPolicy = () => {

  const titleimg = "https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/HomeBanner%2Ftitle_img.png?alt=media&token=691e4f14-c6b4-48d2-856e-c0e360edadb2"

  return (
    <>
      <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Portfolio">
        <div className="container">
          <div className="deal_of_container">
            <div className="heading text-center">
              <strong>See Refund and Return Policy</strong>
              <h2>Refund and Return Policy</h2>
              <div className="headingimg">
                <img
                    src={titleimg}
                    className="img-fluid mx-auto headingimgclass"
                    alt="Privacy Policy"
                />
              </div>
            </div>
            <p>At Diasspora, our commitment is to provide exceptional service to all our valued customers. We understand
              that sometimes issues may arise with your orders, and we are here to assist you with our refund and return
              policy.</p>

            <h5><b>Damaged or Missing Item</b></h5>
            <p>If your order arrives damaged or with missing items, please reach out to us immediately at
              customerservice@diasspora.com. We are dedicated to resolving these issues promptly. Please note that we
              can only offer refunds for items that arrive damaged or are missing.</p>

            <h5><b>Refund Processing Time</b></h5>
            <p>Refunds will be processed within 5 to 10 working days, ensuring you receive your reimbursement as swiftly
              as possible.
            </p>

            <h5><b>Non-Perishable Items</b></h5>
            <p>For non-perishable items, our refund and returns policy extends to 14 days from the date of delivery. If
              14 days have passed since your purchase, we regret that we cannot provide a full refund or exchange.</p>

            <h5><b>Perishable Items</b></h5>
            <p>In the case of perishable items such as plantains, bread, etc., our refund and returns policy is
              applicable within 24 hours from the delivery time. Please contact us within this time frame to report
              missing and/or damaged perishable items. After 24 hours, we cannot offer a full refund or exchange.</p>

            <h5><b>Frozen Items</b></h5>
            <p>For frozen items, we can process refunds only if the items are returned to us still frozen. Partially or
              defrosted products cannot be refunded. We advise returning frozen goods via next-day delivery on Mondays
              to Thursdays to ensure they do not remain at the depot longer than necessary. Please use your discretion
              to determine if these items are still suitable for freezing.
            </p>

            <h5><b>Items Ineligible for Refund/Return Include:</b></h5>
            <ul>
              <li>Perishable items</li>
              <li>Items purchased using gift certificates</li>
              <li>Opened items</li>
              <li>Items reported as issues more than 24 hours after delivery</li>
              <li>Items delayed due to the customers unavailability during delivery attempts</li>
            </ul>

            <h5><b>Photographic Evidence</b></h5>
            <p>In some cases, we may request photographs of the issue, especially if it is visible by inspecting the
              items. This helps us process your refund or account credit efficiently, addressing the specific problem.
            </p>

            <h5><b>Return Shipping Responsibility</b></h5>
            <p>If you wish to return an item, please be aware that you are responsible for covering the shipping costs.
              Shipping costs are non-refundable. In the case of a refund, the cost of return shipping will be deducted
              from your refund. Please ensure that products are returned in their original condition and packaging.
            </p>

            <h5><b>Need Assistance?</b></h5>
            <p>If you have any questions or require further assistance related to refunds and returns, please do not
              hesitate to reach out to us at <u>customerservice@diasspora.com</u>. Our dedicated team is here to help
              you through the process and ensure your satisfaction.

            </p>
            <p>Thank you for choosing Diasspora, and we appreciate your trust in us.</p>

            <div className="heading text-center">
              <h2>Refund and Return Policy</h2>
              <div className="headingimg">
                <img
                    src={titleimg}
                    className="img-fluid mx-auto headingimgclass"
                    alt="Privacy Policy"
                />
              </div>
            </div>

            <p>We always strive to ensure all our customers have an exemplary service when shopping with us.

              Should your order arrive damaged or missing, please contact us at <u>customerservice@diasspora.com</u>,
              and we will immediately try to rectify. <b>Please note though, that we can only offer refunds for items if
                they arrive damaged, or missing. </b></p>
            <p>Refunds will be processed within 5 - 10 working days.</p>
            <p>Our refund and returns policy for Non Perishable items lasts 14 days from delivery. If 14 days have
              passed since your purchase, we cannot offer you a full refund or exchange.
            </p>

            <p>Our refund and returns policy for Perishable items is 24 hours from delivery. For Perishable items
              (plantains, bread, etc) please contact us within 24 hours of delivery of your order to advice of missing
              and/or damaged items. If 24 hours have passed since your purchase was delivered, we cannot offer you a
              full refund or exchange.

            </p>
            <p>Frozen items that arrive back to us on time and are still frozen will be processed, partially or
              defrosted products cannot be refunded. Please use your discretion to decide whether these items are still
              suitable for freezing (i.e that they are still frozen). We recommend using next day delivery on Mondays to
              Thursdays to return frozen goods so they do not sit at the depot for longer than required

              Some items cannot be returned/refunded, including:

            </p>
            <ul>
              <li>Items which are perishable
              </li>
              <li>Items purchased using our gift certificates</li>
              <li>Items that have been opened

              </li>
              <li>Items that are reported more than 24 hours after the delivery time

              </li>
              <li>Items that are not delivered on time due to the customer not being available to receive the order when
                the delivery is attempted
              </li>
            </ul>
            <p>We may request a photograph showing the problem if it is something that can be seen by inspecting the
              Items.

            </p>
            <p>We will provide a refund or account credit in respect of the affected part of the Item(s)

              Should you wish to return an item, you will be responsible for paying for your own shipping costs for
              returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return
              shipping will be deducted from your refund. Please note that the products must be in their original
              condition and packaging. </p>

            <p>Need help? Contact us at <u>customerservice@diasspora.com</u> for questions related to refunds and returns.
            </p>

          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default RefundPolicy;
