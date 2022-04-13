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
  Button,
  FormGroup,
  Input,
} from "reactstrap";
import { message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
// core components
import Header from "components/Headers/Header";
import AllProduct from "components/Product/AllProduct";
import EditProduct from "components/Product/EditProduct";

// Api
import Dataservices from "../../services/requestApi";
import AddDataModal from "components/Modal/AddDataModal";
import { Link } from "react-router-dom";

const Products = () => {
  const [AllProductss, setAllProduct] = useState([]);
  const [AllCategory, setAllCategory] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [ready, setReady] = useState(false);
  const [modal, setModal] = useState(false);
  const [editdata, setEditdata] = useState(null);
  const [mounted, setMounted] = useState(true);
  const [search, setSearch] = useState("");

  // GetAllCourse
  const getAllProduct = useCallback(async () => {
    try {
      const [resProduct, resCategory] = await Promise.all([
        Dataservices.ProductAll(),
        Dataservices.CategoryAll(),
      ]);
      if (mounted) {
        setAllProduct(resProduct.data.data);
        setAllCategory(resCategory.data.data);
        // console.log(resCategory.data.data);
        if (!resProduct.data.data.length > 0) {
          setEmpty(true);
        }
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
  const HandleModal = () => {
    setModal((data) => !data);
  };

  // Status
  const status = async (val) => {
    try {
      const data = new FormData();
      data.append("status", !val.status);
      const res = await Dataservices.ProductUpdate(val._id, data);
      if (res.data) {
        message.success(`${val.name} Status updated successfully`);
      }
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Category
  const deleteProduct = async (e, id) => {
    e.preventDefault();
    try {
      const res = await Dataservices.ProductDelete(id);
      console.log(res);
      if (res.data.status_code === 200) {
        message.success(res.data.message);
        getAllProduct();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const UpdateStatusPooja = async (e, data) => {
    e.preventDefault();
    HandleModal();
    setEditdata(data);
  };
  const afterClose = () => {
    setEditdata(null);
  };
  const searchFilter = AllProductss.filter((data) => {
    return data.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <Header show={false} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="justify-content-center">
          <Col xl="12">
            <Card className="shadow mb-5">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="9">
                    <h3 className="mb-0">
                      All Product
                      <Button
                        color="primary"
                        size="sm"
                        className="float-right"
                        to="/admin/add-product"
                        tag={Link}
                      >
                        <PlusOutlined /> Add Product
                      </Button>
                    </h3>
                  </Col>
                  <Col lg="3">
                    <FormGroup className="mb-0">
                      <Input
                        className="shadow"
                        id="title"
                        placeholder="Search Product"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <AddDataModal
                  title={editdata ? editdata.name : "Add Product for Packages"}
                  show={modal}
                  hide={setModal}
                  afterclose={afterClose}
                  width="700px"
                >
                  <EditProduct
                    hide={setModal}
                    Allcategory={AllCategory}
                    editdata={editdata}
                    refresh={getAllProduct}
                  />
                </AddDataModal>
              </CardHeader>
              <CardBody>
                {ready ? (
                  <>
                    <AllProduct
                      empty={empty}
                      allproduct={searchFilter}
                      status={status}
                      editproduct={UpdateStatusPooja}
                      deleteproduct={deleteProduct}
                      url="packagedetails"
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

export default Products;
