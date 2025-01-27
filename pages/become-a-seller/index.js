import React, { useState } from "react";
import { PublicLayout } from "../Layout/PublicLayout";
import { Form } from "react-bootstrap";

function Page() {
  const [isAnnual, setIsAnnual] = useState(false);
  const handleToggle = () => {
    setIsAnnual(!isAnnual);
  };
  return (
    <PublicLayout>
      <div>
        {/* Header Section */}
        <div className="text-center py-5">
          <h1 className="display-4 fw-bold">Become a Seller</h1>
          <p className="lead">
            Join our platform and grow your business with us!
          </p>
        </div>
        <div style={{ background: "#6d9900" }}>
          {/* Content Section */}
          <div className="text-white container py-5">
            <h2 className="fw-bold mb-4">Why Sell With Us?</h2>
            <p>
              We provide an excellent platform for sellers to showcase their
              products and grow their business. Here’s why you should join us:
            </p>
            <ul className="list-group list-group-flush mb-4">
              <li className="list-group-item border-0 text-white bg-transparent">
                Access to a global customer base
              </li>
              <li className="list-group-item border-0 text-white bg-transparent">
                Seamless payment integration
              </li>
              <li className="list-group-item border-0 text-white bg-transparent">
                24/7 seller support
              </li>
              <li className="list-group-item border-0 text-white bg-transparent">
                Marketing and promotional tools
              </li>
            </ul>

            <h3 className="fw-bold mt-5 mb-3">How to Get Started?</h3>
            <ol className="list-group list-group-flush mb-4">
              <li className="list-group-item border-0 text-white bg-transparent">
                Sign up for a seller account
              </li>
              <li className="list-group-item border-0 text-white bg-transparent">
                List your products
              </li>
              <li className="list-group-item border-0 text-white bg-transparent">
                Start selling and earning!
              </li>
            </ol>
          </div>
        </div>

        {/* Membership Selection Section */}
        <div className="container text-center py-5">
          <h3 className="fw-bold mb-4">Select Your Membership Plan</h3>

          {/* Toggle Button */}
          <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
            <div>
              <p className={`fw-bold  m-0`} style={{ color: "#6d9900" }}>
                Individual Package
              </p>
              <p className="m-0">2 FREE Months by paying yearly</p>
            </div>
            <div className="mb-3">
              <input
                type="checkbox"
                checked={isAnnual}
                onChange={handleToggle}
                id="switch"
                className="toggle-button"
              />
              <label htmlFor="switch" className="toggle-switch">
                Toggle
              </label>
            </div>
            <div>
              <p className={`fw-bold m-0`} style={{ color: "#6d9900" }}>
                Professional Package
              </p>
              <p className="m-0 ">2 FREE Months by paying yearly</p>
            </div>
          </div>

          {/* Membership Card */}
          <div
            className={`card mx-auto shadow ${
              isAnnual ? "border-primary" : "border-warning"
            }`}
            style={{ maxWidth: "600px" }}
          >
            <h4
              className={`fw-bold text-white p-2`}
              style={{ background: isAnnual ? "#6d9900" : "#6d9900" }}
            >
              {isAnnual ? "Professional Package" : "Individual Package"}
            </h4>

            <div>
              <p>2 FREE Months by paying yearly</p>
              <div
                style={{ background: isAnnual ? "#6d9900" : "#6d9900" }}
                className="text-white py-1"
              >
                <h2 className="my-3">
                  {isAnnual ? "£27" : "£10"}{" "}
                  <small style={{ fontSize: "15px" }}>/month</small>
                </h2>
                <p>
                  {isAnnual ? "£277 Billed Annually" : "£144 Billed Annually"}
                </p>
              </div>
              <div className=" p-4 ">
                <ul className="list-unstyled text-start seller-list">
                  <li>
                    <svg
                      className="me-1"
                      style={{ width: "20px", height: "20px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width={100}
                      height={100}
                      viewBox="0 0 50 50"
                    >
                      <path d="M 42.875 8.625 C 42.84375 8.632813 42.8125 8.644531 42.78125 8.65625 C 42.519531 8.722656 42.292969 8.890625 42.15625 9.125 L 21.71875 40.8125 L 7.65625 28.125 C 7.410156 27.8125 7 27.675781 6.613281 27.777344 C 6.226563 27.878906 5.941406 28.203125 5.882813 28.597656 C 5.824219 28.992188 6.003906 29.382813 6.34375 29.59375 L 21.25 43.09375 C 21.46875 43.285156 21.761719 43.371094 22.050781 43.328125 C 22.339844 43.285156 22.59375 43.121094 22.75 42.875 L 43.84375 10.1875 C 44.074219 9.859375 44.085938 9.425781 43.875 9.085938 C 43.664063 8.746094 43.269531 8.566406 42.875 8.625 Z" />
                    </svg>
                    Delivery fulfillment
                  </li>
                  <li>
                    <svg
                      className="me-1"
                      style={{ width: "20px", height: "20px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width={100}
                      height={100}
                      viewBox="0 0 50 50"
                    >
                      <path d="M 42.875 8.625 C 42.84375 8.632813 42.8125 8.644531 42.78125 8.65625 C 42.519531 8.722656 42.292969 8.890625 42.15625 9.125 L 21.71875 40.8125 L 7.65625 28.125 C 7.410156 27.8125 7 27.675781 6.613281 27.777344 C 6.226563 27.878906 5.941406 28.203125 5.882813 28.597656 C 5.824219 28.992188 6.003906 29.382813 6.34375 29.59375 L 21.25 43.09375 C 21.46875 43.285156 21.761719 43.371094 22.050781 43.328125 C 22.339844 43.285156 22.59375 43.121094 22.75 42.875 L 43.84375 10.1875 C 44.074219 9.859375 44.085938 9.425781 43.875 9.085938 C 43.664063 8.746094 43.269531 8.566406 42.875 8.625 Z" />
                    </svg>
                    Listing upto {isAnnual?"1000":"30"} products
                  </li>
                  <li>
                    <svg
                      className="me-1"
                      style={{ width: "20px", height: "20px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width={100}
                      height={100}
                      viewBox="0 0 50 50"
                    >
                      <path d="M 42.875 8.625 C 42.84375 8.632813 42.8125 8.644531 42.78125 8.65625 C 42.519531 8.722656 42.292969 8.890625 42.15625 9.125 L 21.71875 40.8125 L 7.65625 28.125 C 7.410156 27.8125 7 27.675781 6.613281 27.777344 C 6.226563 27.878906 5.941406 28.203125 5.882813 28.597656 C 5.824219 28.992188 6.003906 29.382813 6.34375 29.59375 L 21.25 43.09375 C 21.46875 43.285156 21.761719 43.371094 22.050781 43.328125 C 22.339844 43.285156 22.59375 43.121094 22.75 42.875 L 43.84375 10.1875 C 44.074219 9.859375 44.085938 9.425781 43.875 9.085938 C 43.664063 8.746094 43.269531 8.566406 42.875 8.625 Z" />
                    </svg>
                    Homepage Feature and blog
                  </li>
                  <li>
                    <svg
                      className="me-1"
                      style={{ width: "20px", height: "20px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width={100}
                      height={100}
                      viewBox="0 0 50 50"
                    >
                      <path d="M 42.875 8.625 C 42.84375 8.632813 42.8125 8.644531 42.78125 8.65625 C 42.519531 8.722656 42.292969 8.890625 42.15625 9.125 L 21.71875 40.8125 L 7.65625 28.125 C 7.410156 27.8125 7 27.675781 6.613281 27.777344 C 6.226563 27.878906 5.941406 28.203125 5.882813 28.597656 C 5.824219 28.992188 6.003906 29.382813 6.34375 29.59375 L 21.25 43.09375 C 21.46875 43.285156 21.761719 43.371094 22.050781 43.328125 C 22.339844 43.285156 22.59375 43.121094 22.75 42.875 L 43.84375 10.1875 C 44.074219 9.859375 44.085938 9.425781 43.875 9.085938 C 43.664063 8.746094 43.269531 8.566406 42.875 8.625 Z" />
                    </svg>
                    Boost your visibility: National reach to customers
                  </li>
                  <li>
                    <svg
                      className="me-1"
                      style={{ width: "20px", height: "20px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width={100}
                      height={100}
                      viewBox="0 0 50 50"
                    >
                      <path d="M 42.875 8.625 C 42.84375 8.632813 42.8125 8.644531 42.78125 8.65625 C 42.519531 8.722656 42.292969 8.890625 42.15625 9.125 L 21.71875 40.8125 L 7.65625 28.125 C 7.410156 27.8125 7 27.675781 6.613281 27.777344 C 6.226563 27.878906 5.941406 28.203125 5.882813 28.597656 C 5.824219 28.992188 6.003906 29.382813 6.34375 29.59375 L 21.25 43.09375 C 21.46875 43.285156 21.761719 43.371094 22.050781 43.328125 C 22.339844 43.285156 22.59375 43.121094 22.75 42.875 L 43.84375 10.1875 C 44.074219 9.859375 44.085938 9.425781 43.875 9.085938 C 43.664063 8.746094 43.269531 8.566406 42.875 8.625 Z" />
                    </svg>
                    Simplified payment system: we handle transactions
                  </li>
                
                  <li>
                    <svg
                      className="me-1"
                      style={{ width: "20px", height: "20px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width={100}
                      height={100}
                      viewBox="0 0 50 50"
                    >
                      <path d="M 42.875 8.625 C 42.84375 8.632813 42.8125 8.644531 42.78125 8.65625 C 42.519531 8.722656 42.292969 8.890625 42.15625 9.125 L 21.71875 40.8125 L 7.65625 28.125 C 7.410156 27.8125 7 27.675781 6.613281 27.777344 C 6.226563 27.878906 5.941406 28.203125 5.882813 28.597656 C 5.824219 28.992188 6.003906 29.382813 6.34375 29.59375 L 21.25 43.09375 C 21.46875 43.285156 21.761719 43.371094 22.050781 43.328125 C 22.339844 43.285156 22.59375 43.121094 22.75 42.875 L 43.84375 10.1875 C 44.074219 9.859375 44.085938 9.425781 43.875 9.085938 C 43.664063 8.746094 43.269531 8.566406 42.875 8.625 Z" />
                    </svg>
                    Scalability: Start small and easily scale operations
                  </li>
                  {isAnnual ? (
                    <li>
                      <svg
                        className="me-1"
                        style={{ width: "20px", height: "20px" }}
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width={100}
                        height={100}
                        viewBox="0 0 50 50"
                      >
                        <path d="M 42.875 8.625 C 42.84375 8.632813 42.8125 8.644531 42.78125 8.65625 C 42.519531 8.722656 42.292969 8.890625 42.15625 9.125 L 21.71875 40.8125 L 7.65625 28.125 C 7.410156 27.8125 7 27.675781 6.613281 27.777344 C 6.226563 27.878906 5.941406 28.203125 5.882813 28.597656 C 5.824219 28.992188 6.003906 29.382813 6.34375 29.59375 L 21.25 43.09375 C 21.46875 43.285156 21.761719 43.371094 22.050781 43.328125 C 22.339844 43.285156 22.59375 43.121094 22.75 42.875 L 43.84375 10.1875 C 44.074219 9.859375 44.085938 9.425781 43.875 9.085938 C 43.664063 8.746094 43.269531 8.566406 42.875 8.625 Z" />
                      </svg>
                      Analytics: Monthly reports on product review
                    </li>
                  ) : (
                    <li>
                      <svg
                        className="me-1"
                        style={{ width: "20px", height: "20px" }}
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width={100}
                        height={100}
                        viewBox="0 0 48 48"
                      >
                        <path
                          fill="#F44336"
                          d="M21.5 4.5H26.501V43.5H21.5z"
                          transform="rotate(45.001 24 24)"
                        />
                        <path
                          fill="#F44336"
                          d="M21.5 4.5H26.5V43.501H21.5z"
                          transform="rotate(135.008 24 24)"
                        />
                      </svg>
                      <span style={{ textDecorationLine: "line-through" }}>
                        Analytics: Monthly reports on product review
                      </span>
                    </li>
                  )}
                </ul>
                <a
                  href="https://vendor-dfm-production.up.railway.app/signup"
                  className="btn register-btn text-white mt-3"
                >
                  Register Now
                </a>

                <style jsx>{`
                  .register-btn {
                    background: #6d9900;
                    transition: background 0.3s ease; /* Smooth hover effect */
                  }
                  .register-btn:hover {
                    color: white !important;
                  }
                `}</style>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

export default Page;
