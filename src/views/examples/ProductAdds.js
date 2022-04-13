import React, { useState, useEffect, useCallback } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Spinner,
} from "reactstrap";
// import { message } from "antd";
// core components
import Header from "components/Headers/Header";
import AddProduct from "components/Product/AddProduct";

// Api
import Dataservices from "../../services/requestApi";
// import AddDataModal from "components/Modal/AddDataModal";

const ProductAdds = () => {
  const [AllCategory, setAllCategory] = useState([]);
  const [ready, setReady] = useState(false);
  //   const [modal, setModal] = useState(false);
  const [mounted, setMounted] = useState(true);

  // GetAllCourse
  const getAllProduct = useCallback(async () => {
    try {
      const [resCategory] = await Promise.all([Dataservices.CategoryAll()]);
      if (mounted) {
        setAllCategory(resCategory.data.data);
        // console.log(resCategory.data.data);

        setReady(true);
      }
    } catch (e) {
      console.log(e);
    }
  }, [mounted]);

  useEffect(() => {
    getAllProduct();
    return () => {
      getAllProduct();
      setMounted(false);
    };
  }, [getAllProduct]);
  //   const HandleModal = () => {
  //     setModal((data) => !data);
  //   };

  return (
    <>
      <Header show={false} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="justify-content-center">
          <Col xl="10">
            <Card className="shadow mb-5">
              <CardHeader className="bg-white border-0">
                <h3 className="mb-0">All Product</h3>
              </CardHeader>
              <CardBody>
                {ready ? (
                  <>
                    <AddProduct Allcategory={AllCategory} />
                  </>
                ) : (
                  <div className="text-center">
                    <Spinner color="primary" />
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductAdds;
