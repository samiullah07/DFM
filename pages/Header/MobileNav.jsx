import React from "react";
import { Navbar, Offcanvas } from "react-bootstrap";
import MobileVerticalMenu from "./MobileVerticalMenu";
const MobileNav = () => { //changes the format for phones
  return (
    <>
      <div className="mobile">
        <Navbar expand={false}>
          <Navbar.Toggle aria-controls="offcanvasNavbar">
            <i className="fa fa-bars" aria-hidden="true"></i>
          </Navbar.Toggle>
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
          >
            <div className="bg-warning">
              <Offcanvas.Header closeButton className="pt-2 pb-2">
                <Offcanvas.Title id="offcanvasNavbarLabel">
                  DFM
                </Offcanvas.Title>
              </Offcanvas.Header>
            </div>
            <Offcanvas.Body className="mobile-body">
              <MobileVerticalMenu />
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Navbar>
      </div>
    </>
  );
};

export default MobileNav;
