import React, { useState } from "react";
// reactstrap components
import { Row, Col } from "reactstrap";
import { Empty } from "antd";
// Api
import Dataservices from "../../services/requestApi";
import ProductCards from "components/Cards/ProductCards";
// core components
const AllProduct = ({
  empty,
  allproduct,
  status,
  editproduct,
  deleteproduct,
  url,
}) => {
  const [value, setValue] = useState("0");
  const sequence = async (id) => {
    try {
      const data = new FormData();
      data.append("sequence", value);
      await Dataservices.PoojaBookingUpdate(id, data);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Row className="card-group myAdminCards">
      {empty ? (
        <Col>
          <Empty />
        </Col>
      ) : (
        <>
          {allproduct.map((item) => (
            <Col lg="4" key={item._id}>
              <>
                <ProductCards
                  data={item}
                  status={status}
                  editproduct={editproduct}
                  action={true}
                  deleteproduct={deleteproduct}
                  length={allproduct.length}
                  setvalue={setValue}
                  sequence={sequence}
                  url={url}
                />
              </>
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};

export default AllProduct;
