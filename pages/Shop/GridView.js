import React, {useContext, useEffect, useState} from "react";
import { Row,Col } from 'react-bootstrap'
import { SingleProduct } from '../../component/Product/Products/SingleProduct/SingleProduct'
import { CartContext } from "../_app";
import { db } from "../../FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import listView from "./ListView";

const GridView = ({filterOptions}) => { // this is where and how the items are displayed

  const [itemList, setItemList] = useState([]);

  const [loading, setLoading] = useState(true);

  const [copyOfMainList, setcopyOfMainList] = useState([])
  const [trueItems, setTrueItems] = useState([])
  const [falseItems, setFalseItems] = useState([])

  const getItems = async () => { // gets the items

    const itemsColRef = collection(db, "items");
    let newItemList = [];
    const trueItemsList = [];
    const falseItemsList = [];
    try {

      const snapshot = await getDocs(itemsColRef);

      snapshot.docs.forEach((doc) => {

        doc.data().items.forEach((item) => {
          if (item.id === "ger42"){

          }else{
            if (item.id === "123e4"){

            }else{
              //console.log(item)
              newItemList.push(item);

                if (item.show){
                  trueItemsList.push(item)
                }
                if (item.show === false){
                  falseItemsList.push(item)
                }

            }

          }

        });

      });

      setItemList(newItemList);
      setTrueItems(trueItemsList);
      setFalseItems(falseItemsList)
      setLoading(false);
      setcopyOfMainList(trueItemsList)

    } catch (error) {
      alert(error.message);
    }

  }

  useEffect(() => {

    const TypeOfVal = () => { // filtering items function

      const selectedFilter = filterOptions.dropDownVal;
      let newList = [...trueItems]; //makin a local copy of itemlist so we dont affect it directly
      
      switch (selectedFilter) {
        case "1":
          // For example, reverse the list
          newList = copyOfMainList;
          break;
        case "2":
          // Sort by name A-Z
          newList = newList.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "3":
          // Sort by name Z-A
          newList = newList.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "4":
          // Sort by lowest price
          newList = newList.sort((a, b) => a.price - b.price); //the => acts as a return in react js, and in js u would just do {return a - b}
          break;
        case "5":
          // Sort by name Z-A
          newList = newList.sort((a, b) => b.price - a.price);
          break;
        default:
          // No sorting
          break;
      }

      setTrueItems(newList); //update the main list
    };

    TypeOfVal();
  }, [filterOptions]); // this will stop the Re-run error as it wont be a constant infinate loop and isntead whenever selectedFilter value changes

  useEffect(() => {
    getItems();


  }, []);


  return (
   <>

     <MainGridView filterOptions={filterOptions} itemList={trueItems}/>

   </>
  )

};

const MainGridView = ({filterOptions, itemList}) => {
  const [vendorList, setVendorList] = useState([])
  const [categoryList, setCategoryList] = useState([])

  const { cart, setCart } = useContext(CartContext);

  const handleAddToCart = (id) => {

    const newProduct = itemList?.find((pd) => pd.id === id);
    setCart([...cart, { ...newProduct, quantity: 1 }]);

  };

  const getVendorData = async () =>{ // gathering the vendor data

    const itemsColRefVendor = collection(db, "Vendor");
    const newVendorList = [];

    try {

      const snapshot = await getDocs(itemsColRefVendor);

      snapshot.docs.forEach((doc) => {

        newVendorList.push(doc.data())

      });

      setVendorList(newVendorList)

    } catch (error) {
      alert(error.message);
    }
  }

  const getCategoryData = async () =>{ // grabbing the category items

    const itemsColRefVendor = collection(db, "CategoryFilter");
    const newCategoryList = [];

    try {

      const snapshot = await getDocs(itemsColRefVendor);

      snapshot.docs.forEach((doc) => {

        newCategoryList.push(doc.data())

      });

      setCategoryList(newCategoryList)

    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    getVendorData()
    getCategoryData()
  }, []);

  return (
   <>
   <Row>
      {itemList.map((item, index) => {
        //prevent no items showing when equal to 0 aka user typed 0 or deleted max amount so back to default
        if (filterOptions.maxPrice == 0){
          filterOptions.maxPrice = 999999999999999999
        }

        // Filter by price
        const minPriceFilter = item.price >= filterOptions.minPrice;
        const maxPriceFilter = item.price <= filterOptions.maxPrice;

        // Filter by search term
        const searchTerm = filterOptions.search;
        const searchedFilter = !searchTerm || item.name.toLowerCase().includes(searchTerm);

        // Filter by colors
        const colourFiltering = filterOptions.colourPink || filterOptions.colourYellow || filterOptions.colourWhite || filterOptions.colourBlack;
        const colourPinkFilter = item.colors.includes("Pink") && filterOptions.colourPink;
        const colourYellowFilter = item.colors.includes("Yellow") && filterOptions.colourYellow;
        const colourWhiteFilter = item.colors.includes("White") && filterOptions.colourWhite;
        const colourBlackFilter = item.colors.includes("Black") && filterOptions.colourBlack;

        // Filter by categories
        //const categoriesFiltering = filterOptions.meatSeafoods || filterOptions.fruitsVegetable || filterOptions.condimentsSpices || filterOptions.snacksConfectionery || filterOptions.drinksBeverages || filterOptions.grainsFlours;
        //const categoriesJuiceFilter = item.ProductType.includes("meatSeafoods") && filterOptions.meatSeafoods;
        //const categoriesFreshFilter = item.ProductType.includes("fruitsVegetable") && filterOptions.fruitsVegetable;
        //const categoriesFruitFilter = item.ProductType.includes("condimentsSpices") && filterOptions.condimentsSpices;
        //const categoriesMilkFilter = item.ProductType.includes("snacksConfectionery") && filterOptions.snacksConfectionery;
        //const categoriesJamFilter = item.ProductType.includes("drinksBeverages") && filterOptions.drinksBeverages;
        //const categoriesFlourFilter = item.ProductType.includes("grainsFlours") && filterOptions.grainsFlours;

        // Check if any category is selected from the filterOptions
        const categoriesFiltering = categoryList.some(category => filterOptions[`${category.foodId}`]);

          // Dynamic category filter creation based on categoryList
          const categoryFilters = categoryList.map(category => {
              // Convert both category.title and item.ProductType to lowercase for case-insensitive comparison
              const productTypeLower = item.ProductType.toLowerCase();
              const categoryTitleLower = category.title.toLowerCase();

              // Check if item.ProductType is included in category.title OR if category.title is included in item.ProductType
              return (
                  categoryTitleLower.includes(productTypeLower) || // chekcs if the item product type is in the category title
                  productTypeLower.includes(categoryTitleLower)    // and this checks if the category title is in the product type
              ) && filterOptions[`${category.foodId}`]; // Check if category is selected
          });

        // Combine all the category filters using logical OR
        const categoryFiltersCombined = categoryFilters.includes(true);
        //console.log(categoryFilters);

        // This filter checks the vendors selected, to prove it works there is a peach product under the Solamone vendor
        // const vendorFilterDetect = filterOptions.vendorLevis || filterOptions.vendorOther;
        // const vendorLevisFilter = item.Vendor.includes("GmailTest") && filterOptions.GmailTest;
        // const vendorOtherFilter = item.Vendor.includes("Solamone") && filterOptions.vendorOther;
        // console.log(filterOptions.GmailTest)

        // This filter checks the vendors selected dynamically using the vendorList
        const vendorFilterDetect = vendorList.some(vendor => filterOptions[`${vendor.displayName}`]);

        // Dynamic vendor filter creation based on vendorList
        const vendorFilters = vendorList.map(vendor => {
          return item.Vendor.includes(vendor.displayName) && filterOptions[`${vendor.displayName}`];
          //for the code above i dint do what i did for category so that it has to match that exact vendor so that there are no vendor mismatches

        });

        // Combine all the vendor filters using logical OR
        const vendorFiltersCombined = vendorFilters.includes(true);


        // Check if item meets all filter criteria
        const productMeetsFilterOptions =
            minPriceFilter &&
            maxPriceFilter &&
            searchedFilter &&
            (
                !colourFiltering ||
                colourPinkFilter ||
                colourYellowFilter ||
                colourWhiteFilter ||
                colourBlackFilter
            ) && (
                !vendorFilterDetect ||
                vendorFiltersCombined
            ) && (
                !categoriesFiltering ||
                categoryFiltersCombined
            );

        return productMeetsFilterOptions ? (
            <Col xl={4} lg={4} md={6} sm={6} xs={6} className="m-top-24 fixedProductImageShop" key={index}>
              <SingleProduct
                  addedInCart={Boolean(cart?.find((pd) => pd.id === item.id))}
                  key={item.id}
                  product={item}
                  name={item.name}
                  price={item.price}
                  oldPrice={item.oldPrice}
                  onAddToWish={(id) => console.log(id)}
                  onAddToCart={handleAddToCart}
              />
            </Col>
        ) : null;

      })}
    </Row>

    </>
  )
};

export default GridView