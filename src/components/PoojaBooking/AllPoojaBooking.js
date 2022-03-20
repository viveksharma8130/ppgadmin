import React, { useState } from "react";
// reactstrap components
import { Row, Col } from "reactstrap";
import { Empty } from "antd";
import BookingCards from "components/Cards/BookingCards";
// Api
import Dataservices from "../../services/requestApi";
// core components
const AllPoojaBooking = ({
  empty,
  allcourse,
  status,
  editcourse,
  deletecourse,
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
          {allcourse.map((item) => (
            <Col lg="4" key={item._id}>
              <>
                <BookingCards
                  data={item}
                  status={status}
                  editcourse={editcourse}
                  action={true}
                  deletecourse={deletecourse}
                  length={allcourse.length}
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

export default AllPoojaBooking;
