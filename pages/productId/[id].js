import { PublicLayout } from "../Layout/PublicLayout";
import { ProductDetails } from "../../component/Product/ProductDetails/productDetails";

const breadcrumbsData = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Shop",
    path: "/Shop",
  },
];
const SingleProductPage = () => { // not used
  return (
    <>
      <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Shop">
        <ProductDetails />
      </PublicLayout>
    </>
  );
};

export default SingleProductPage;
