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

// Core components
import Header from "components/Headers/Header";
import EditProduct from "components/Product/EditProduct";

// Api
import Dataservices from "../../services/requestApi";

const ProductEdit = ({ location }) => {
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

  return (
    <>
      <Header show={false} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="justify-content-center">
          <Col xl="8">
            <Card className="shadow mb-5">
              <CardHeader className="bg-white border-0">
                <h3 className="mb-0">Edit Product</h3>
              </CardHeader>
              <CardBody>
                {ready ? (
                  <>
                    <EditProduct
                      Allcategory={AllCategory}
                      editdata={location}
                    />
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

export default ProductEdit;
