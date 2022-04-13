import React, { useState, useEffect } from "react";

// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";
// core components
import Header from "components/Headers/Header";
import Dataservices from "../../services/requestApi";
import AllProductPackage from "components/ProductPackage/AllProductPackage";
import AddProductPackage from "components/ProductPackage/AddProductPackage";
import { useCallback } from "react";
import { message } from "antd";
const ProductPackage = ({ location }) => {
  const { _id, name } = location.state;

  const [Allvariant, setAllVariant] = useState([]);
  const [colour, setColour] = useState("");
  const [image, setImage] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [size, setSize] = useState([]);
  const [price, setPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [update, setUpdate] = useState(false);
  const [variantid, setVariantId] = useState("");
  // Fetch AllCategory
  const getAllVariant = useCallback(
    async (e) => {
      try {
        const res = await Dataservices.ProductAllVariant(_id);
        if (res.data.data) {
          setAllVariant(res.data.data);
        }
      } catch (e) {
        console.log(e);
      }
    },
    [_id]
  );
  useEffect(() => {
    getAllVariant();
  }, [getAllVariant]);

  // GetAllCategory

  // AddVariant
  const AddVariant = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("product_id", _id);
    data.append("colour", colour);
    data.append("image", image);
    data.append("size", size);
    data.append("price", price);
    data.append("mrp", mrp);
    try {
      const res = await Dataservices.ProductCreateVariant(data);
      console.log(res.data);
      if (res.data.status_code === 200) {
        message.success(res.data.message);
        getAllVariant();
        setColour("");
        setPrice("");
        setMrp("");
        setColour("");
        setImage(null);
        setThumbnail(null);
        setSize([]);
      } else {
        message.error(res.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // package Status
  const variantUpdateStatus = async (data) => {
    setUpdate(true);
    setColour(data.colour);
    setImage(data.image);
    setThumbnail(data.image);
    if (data.size) {
      let value = data.size;
      const result = value.split(",");
      setSize(result);
    }
    setMrp(data.mrp);
    setPrice(data.price);
    setVariantId(data._id);
  };
  // Status
  const status = async (e, val) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("status", !val.status);
      await Dataservices.ProductUpdateVariant(val._id, data);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  // Package Updates
  const variantUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("product_id", _id);
      data.append("colour", colour);
      data.append("image", image);
      data.append("size", size);
      data.append("price", price);
      data.append("mrp", mrp);
      await Dataservices.ProductUpdateVariant(variantid, data);
      setUpdate(false);
      getAllVariant();
      setColour("");
      setPrice("");
      setMrp("");
      setColour("");
      setImage(null);
      setThumbnail(null);
      setSize([]);
    } catch (error) {
      console.log(error);
    }
  };
  // Delete Package
  const deletePackage = async (e, id) => {
    e.preventDefault();
    try {
      await Dataservices.ProductDeleteVariant(id);
      getAllVariant();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header show={false} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="justify-content-center">
          <Col xl="4">
            <Card className="card-profile shadow mb-5">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <Col xs="12">
                    <h3 className="mb-0">Add Product Variant</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <Col lg="12">
                    <AddProductPackage
                      colour={colour}
                      setcolour={setColour}
                      price={price}
                      setprice={setPrice}
                      mrp={mrp}
                      setmrp={setMrp}
                      setimage={setImage}
                      thumbnail={thumbnail}
                      setThumbnail={setThumbnail}
                      size={size}
                      setSize={setSize}
                      addvariant={AddVariant}
                      updatevariant={variantUpdate}
                      statusupdate={update}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col xl="8">
            <Card className="shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="12">
                    <h3 className="mb-0">All Variant in {name}</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <AllProductPackage
                  allvariant={Allvariant}
                  updatevariant={variantUpdateStatus}
                  deletevariant={deletePackage}
                  status={status}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductPackage;
