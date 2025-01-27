import Image from "next/image";
import React, {useEffect, useState} from "react";
import { Container } from "react-bootstrap";
import Masony from "react-masonry-component";
import { PublicLayout } from "../Layout/PublicLayout";
import {db} from "../../FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
const breadcrumbsData = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Portfolio Three",
    path: "#",
  },
];
const masonryOptions = {
  fitWidth: false,
  itemSelector: ".photo-item",
};

export const MyPortfolio = () => { //Not used
  const [itemList, setItemList] = useState([]);
  const [items, setItem] = useState(itemList);
  const [currentActive, setCuttentActive] = useState(0);
  const [defaultItems, setdefaultItems] = useState(itemList);

  useEffect(() => {

    const getItems = async () => { // filtering items function

      const itemsColRef = collection(db, "Images");
      let newItemList = [];
      try {

        const snapshot = await getDocs(itemsColRef);

        snapshot.docs.forEach((doc) => {

          doc.data().PortfolioImg.forEach((item) => {

            //console.log(item)
            newItemList.push(item)

          });

        });

        setItemList(newItemList);
        setdefaultItems(newItemList)
      } catch (error) {
        alert(error.message);
      }


    };

    getItems();
  }, []); // this will stop the Re-run error as it wont be a constant infinate loop and isntead whenever selectedFilter value changes

  const filterItem = async (categItem, tabIndex) => {

    let newList = []

    const updateItem = itemList.filter(async (curElem) => {

      const itemsColRef = collection(db, "Images");
      let newItemList = [];

      switch (tabIndex) {
        case 0:
          console.log("x")
            setItemList(defaultItems)
          break;
        case 1:
          try {
            const snapshot = await getDocs(itemsColRef);

            snapshot.docs.forEach((doc) => {

              doc.data().PortfolioImg.forEach((item) => {

                if (item.category === "Branding") {
                  newItemList.push(item)
                }

              });

            });
            setItemList(newItemList);
          } catch (error) {
            alert(error.message);
          }
          break;
        case 2:
          try {
            const snapshot = await getDocs(itemsColRef);

            snapshot.docs.forEach((doc) => {

              doc.data().PortfolioImg.forEach((item) => {

                if (item.category === "photography") {
                  newItemList.push(item)
                }

              });

            });
            setItemList(newItemList);
          } catch (error) {
            alert(error.message);
          }
          break;
        case 3:
          try {
            const snapshot = await getDocs(itemsColRef);

            snapshot.docs.forEach((doc) => {

              doc.data().PortfolioImg.forEach((item) => {

                if (item.category === "fashion") {
                  newItemList.push(item)
                }

              });

            });
            setItemList(newItemList);
          } catch (error) {
            alert(error.message);
          }
          break;
        case 4:
          try {
            const snapshot = await getDocs(itemsColRef);

            snapshot.docs.forEach((doc) => {

              doc.data().PortfolioImg.forEach((item) => {

                if (item.category === "product") {
                  newItemList.push(item)
                }

              });

            });
            setItemList(newItemList);
          } catch (error) {
            alert(error.message);
          }
          break;
        default:

          break;
      }



    });

    setItem(updateItem);
    setCuttentActive(tabIndex);

  };

  return (
    <>
      <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Portfolio">
        <div className="container"></div>
        <div className="headding" id="Potfolio">
          <Container>
            <div className="portfolio">
              <h1 className="text-center port-title">My portfolio</h1>
              <div className="port-menu text-center">
                <ul className="port-list port-tab text-center">
                  <li className={currentActive === 0 ? "active" : ""}>
                    <span onClick={() => filterItem("", 0)}>
                      All
                    </span>
                  </li>
                  <li className={currentActive === 1 ? "active" : ""}>
                    <span onClick={() => filterItem("Branding", 1)}>
                      Branding
                    </span>
                  </li>
                  <li className={currentActive === 2 ? "active" : ""}>
                    <span onClick={() => filterItem("photography", 2)}>
                      photography
                    </span>
                  </li>
                  <li className={currentActive === 3 ? "active" : ""}>
                    <span onClick={() => filterItem("fashion", 3)}>
                      Fashion
                    </span>
                  </li>
                  <li className={currentActive === 4 ? "active" : ""}>
                    <span onClick={() => filterItem("product", 4)}>
                      product{" "}
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <Masony
                  className={"photo-list row"}
                  elementType={"ul"}
                  options={masonryOptions}
                  disableImagesLoaded={false}
                  updateOnEachImageLoad={false}
                >
                  {itemList.map((photo) => (
                    <li
                      className={`photo-item col-lg-4 col-md-4 col-sm-6 col-12`}
                      key={photo.id}
                    >
                      <div className="banner">
                        <a>
                          <img
                            src={photo.image}
                            alt="portfoliothree"
                            className="img-fluid mx-auto portfolooimgeffect"
                          />
                        </a>
                      </div>
                    </li>
                  ))}
                </Masony>
              </div>
            </div>
          </Container>
        </div>
      </PublicLayout>
    </>
  );
};

export default MyPortfolio;
