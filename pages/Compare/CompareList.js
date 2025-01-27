import product_11 from "../../public/assets/Product/product_11.jpg";
import Image from "next/image";

const CompareList = () => {
  return (
    <>
      <div className="table-responsive ">
        <table className="table">
          <thead>
            <tr className="th-compare">
              <td className="font-weight-bold">Action</td>
              <th>
                <button type="button" className="main-button f_13">
                  Remove
                </button>
              </th>
            </tr>
          </thead>
          <tbody id="table-compare">
            <tr>
              <th className="product-name">Product Name</th>
              <td>Fresh Lemon </td>
            </tr>
            <tr>
              <th className="product-name">Product Image</th>
              <td>
                <div>
                  <Image
                    src={product_11}
                    className="fst-image d-block img-fluid"
                    alt="product_11"
                  />
                </div>
                <div className="font-weight-bold f_15">
                  <span>best price : </span>$130.50
                </div>
                <form>
                  <button href="cart.html" className="main-button f_13 mt-3 ">
                    Add to Cart
                  </button>
                </form>
              </td>
            </tr>
            <tr>
              <th className="product-name">Product Description</th>
              <td>
                <p className="description-compare f_13 mb-0">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distrib...
                </p>
              </td>
            </tr>
            <tr>
              <th className="product-name"> Availability </th>
              <td>
                <p className="mb-0"> In stock </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CompareList;
