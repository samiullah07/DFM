import { Row, Col } from "react-bootstrap";
import { PublicLayout } from "../Layout/PublicLayout";
import MultisliderFruit from "../ThemeElement/multisliderfruit";
const breadcrumbsData = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Multi Slider",
    path: "#",
  },
];
const multislider = () => {
  return (
    <>
      <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="services">
        <div className="container deal_of_container">
          <Row>
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <h6 className="text-center f-700 f-22">Fruit</h6>
              <MultisliderFruit/>
            </Col>
          </Row>
        </div>
        <div className="container deal_of_container">
          <Row>
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <h6 className="text-center f-700 f-22">Vegetable</h6>
              <MultisliderFruit/>
            </Col>
          </Row>
        </div>
        <div className="container deal_of_container">
          <Row>
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <h6 className="text-center f-700 f-22">Juice</h6>
              <MultisliderFruit/>
            </Col>
          </Row>
        </div>
      </PublicLayout>
    </>
  );
};

export default multislider;
