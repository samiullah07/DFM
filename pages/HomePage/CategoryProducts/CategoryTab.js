import React, { useEffect, useState } from "react";
import Meat from "./Meat";
import Fruits from "./Fruits";
import Spices from "./Spices";
import Snacks from "./Snacks";
import Drinks from "./Drinks";
import Flours from "./Flours";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../FirebaseConfig";

const CategoryTab = () => {
  const [itemList, setItemList] = useState([]);
  const [activeTab, setActiveTab] = useState("juice");

  const validationEmailExists = async () => {
    const itemsColRef = collection(db, "CategoryTitles");
    const newItemList = [];

    try {
      const snapshot = await getDocs(itemsColRef);

      snapshot.docs.forEach((doc) => {
        newItemList.push(doc.data());
      });

      setItemList(newItemList);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    validationEmailExists();
  }, []);

  const renderComponent = () => { // this refrences what gets clicked
    switch (activeTab) {
      case "juice":
        return <Meat />;
      case "fresh":
        return <Fruits />;
      case "fruit":
        return <Spices />;
      case "milk":
        return <Snacks />;
      case "jam":
        return <Drinks />;
      case "flour":
        return <Flours />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="categoryTab">
        <div className="container text-center tabdiv">
          <div className="categorytabmain">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              {itemList.map((dod) => (
                <li key={dod.id} className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === dod.categoryId ? "active" : ""}`}
                    id={dod.tab}
                    data-bs-toggle="tab"
                    data-bs-target={`#${dod.categoryId}`}
                    type="button"
                    role="tab"
                    aria-controls={dod.categoryId}
                    aria-selected={activeTab === dod.categoryId}
                    onClick={() => setActiveTab(dod.categoryId)}
                  >
                    <img
                      alt="category Tab"
                      src={dod.image}
                      className="img-fluid mx-auto tabImg"
                    />
                    {dod.title}
                  </button>
                </li>
              ))}
            </ul>

            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id={activeTab}
                role="tabpanel"
                aria-labelledby={`${activeTab}-tab`}
              >
                {renderComponent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryTab;
