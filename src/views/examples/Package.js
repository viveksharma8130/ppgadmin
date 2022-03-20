import React, { useState, useEffect } from "react";

// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";
// core components
import Header from "components/Headers/Header";
import Dataservices from "../../services/requestApi";
import queryString from "query-string";
import AllPackage from "components/Package/AllPackage";
import AddPackage from "components/Package/AddPackage";
import { useCallback } from "react";
const Package = ({ location }) => {
  const { _id, name } = location.state;

  const [Allpackage, setAllPackage] = useState([]);
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [samagriprice, setSamagriPrice] = useState("");
  const [update, setUpdate] = useState(false);
  const [packageid, setPackageId] = useState("");
  // Fetch AllCategory
  const getAllPackage = useCallback(
    async (e) => {
      try {
        const res = await Dataservices.PoojaBookingAllPackages(_id);
        setAllPackage(res.data.data);
      } catch (e) {
        console.log(e);
      }
    },
    [_id]
  );
  useEffect(() => {
    getAllPackage();
  }, [getAllPackage]);

  // GetAllCategory

  // AddPackages
  const AddPackages = async (e) => {
    e.preventDefault();
    const Data = {
      title,
      price,
      samagri_price: samagriprice,
      puja_id: _id,
    };
    try {
      await Dataservices.PoojaBookingAddPackges(queryString.stringify(Data));
      getAllPackage();
      setTitle("");
      setPrice("");
      setSamagriPrice("");
    } catch (e) {
      console.log(e);
    }
  };

  // package Status
  const packageUpdateStatus = async (data) => {
    setUpdate(true);
    setTitle(data.title);
    setSamagriPrice(data.samagri_price);
    setPrice(data.price);
    setPackageId(data._id);
  };
  // Status
  const status = async (e, val) => {
    e.preventDefault();
    try {
      const Data = {
        status: !val.status,
      };
      await Dataservices.PoojaBookingUpdatePackges(
        val._id,
        queryString.stringify(Data)
      );
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  // Package Updates
  const packageUpdate = async (e) => {
    e.preventDefault();
    try {
      const Data = {
        title,
        price,
        samagri_price: samagriprice,
      };
      await Dataservices.PoojaBookingUpdatePackges(
        packageid,
        queryString.stringify(Data)
      );
      setUpdate(false);
      getAllPackage();
      setTitle("");
      setPrice("");
      setSamagriPrice("");
    } catch (error) {
      console.log(error);
    }
  };
  // Delete Package
  const deletePackage = async (e, id) => {
    e.preventDefault();
    try {
      await Dataservices.PoojaBookingDeletePackges(id);
      getAllPackage();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header show={false} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col xl="4">
            <Card className="card-profile shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <Col xs="12">
                    <h3 className="mb-0">Add Package</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <Col lg="12">
                    <AddPackage
                      title={title}
                      settitle={setTitle}
                      price={price}
                      setprice={setPrice}
                      samagriprice={samagriprice}
                      setsamagriprice={setSamagriPrice}
                      addpackage={AddPackages}
                      updatepackage={packageUpdate}
                      statusupdate={update}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="12">
                    <h3 className="mb-0">All Package in {name}</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <AllPackage
                  allcategory={Allpackage}
                  updatecategory={packageUpdateStatus}
                  deletecat={deletePackage}
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

export default Package;
