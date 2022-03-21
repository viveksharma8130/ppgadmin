import React from "react";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

import Header from "components/Headers/Header.js";

const Index = (props) => {
  return (
    <>
      <Header show />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
