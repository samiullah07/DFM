import { Col, Row } from "react-bootstrap";
import { Eye, Heart, ProCart, ProCompare } from "../../../../styles/Svg";

export const ListProduct = ({ product, onAddToCart, addedInCart }) => {

  const { name, oldPrice, price, image, description, id } = product;

  return (
    <>
      <div className="list-ul">
        <div className="item shop_list_item">
          <div className="">
            <Row className="row-center">
              <Col xl={3} lg={3} md={4} sm={4} xs={12}>
                <div className="pro_image">
                  <a href={`/productId/${id}`}>
                    <img
                      src={image}
                      className="js-img img-fluid mx-auto"
                      alt="ListProduct"
                    />
                    <div className="second-img">
                      <img
                        src={image}
                        className="js-img img-fluid mx-auto"
                        alt="ListProduct"
                      />
                    </div>
                  </a>
                </div>
              </Col>
              <Col xl={9} lg={9} md={8} sm={8} xs={12}>
                <div className="main_text">
                  <div>
                    <h2 className="pro-heading fw-bolder mb-1	">
                      <h6>{product.subName}</h6>
                      <a href={`/product/${id}`} className="f-20">
                        {name}
                      </a>
                    </h2>

                    <span>
                      <span className="fw-bold f-20 price">${price}</span>
                      <del className="text-muted">{oldPrice}</del>
                    </span>
                    <p className="description mt-1 text-muted">{description}</p>

                    <div className="button-group">
                      <a
                        href="#"
                        className="symbol"
                        data-toggle="modal"
                        data-target="#cart_model"
                        disabled={addedInCart}
                        onClick={() => onAddToCart(id)}
                      >
                        <ProCart />
                      </a>
                      <a
                        href="#"
                        className="symbol"
                        data-toggle="modal"
                        data-target="#compare_model"
                      >
                        <ProCompare />
                      </a>
                      <a
                        href="#"
                        className="symbol"
                        data-toggle="modal"
                        data-target="#eye_model"
                      >
                        <Eye />
                      </a>
                      <a
                        href="#"
                        className="symbol"
                        data-toggle="modal"
                        data-target="#heart_model"
                      >
                        <Heart />
                      </a>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};
export default ListProduct;
