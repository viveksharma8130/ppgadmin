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
import AllPoojaBooking from "components/PoojaBooking/AllPoojaBooking";
import AddPoojaBooking from "components/PoojaBooking/AddPoojaBooking";

// Api
import Dataservices from "../../services/requestApi";
import AddDataModal from "components/Modal/AddDataModal";

const PoojaBooking = () => {
  const [AllCourses, setAllCourse] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [ready, setReady] = useState(false);
  const [modal, setModal] = useState(false);
  const [editdata, setEditdata] = useState(null);
  const [mounted, setMounted] = useState(true);
  const [search, setSearch] = useState("");

  // GetAllCourse
  const getAllPoojaBooking = useCallback(async () => {
    try {
      const res = await Dataservices.PoojaBookingAll();
      if (mounted) {
        setAllCourse(res.data.data);
        if (!res.data.data.length > 0) {
          setEmpty(true);
        }
        setReady(true);
      }
    } catch (e) {
      console.log(e);
    }
  }, [mounted]);

  useEffect(() => {
    getAllPoojaBooking();
    return () => {
      getAllPoojaBooking();
      setMounted(false);
    };
  }, [getAllPoojaBooking]);
  const HandleModal = () => {
    setModal((data) => !data);
  };

  // Status
  const status = async (val) => {
    try {
      const data = new FormData();
      data.append("status", !val.status);
      const res = await Dataservices.PoojaBookingUpdate(val._id, data);
      if (res.data) {
        message.success(`${val.name} Status updated successfully`);
      }
      // window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Category
  const deletePooja = async (e, id) => {
    e.preventDefault();
    try {
      const res = await Dataservices.PoojaBookingDelete(id);
      console.log(res);
      getAllPoojaBooking();
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
  const searchFilter = AllCourses.filter((data) => {
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
                      All Pooja Booking
                      <Button
                        color="primary"
                        size="sm"
                        className="float-right"
                        onClick={HandleModal}
                      >
                        <PlusOutlined /> Add Pooja Booking
                      </Button>
                    </h3>
                  </Col>
                  <Col lg="3">
                    <FormGroup className="mb-0">
                      <Input
                        className="shadow"
                        id="title"
                        placeholder="Search Booking"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <AddDataModal
                  title={
                    editdata ? editdata.name : "Add Pooja Booking for Packages"
                  }
                  show={modal}
                  hide={setModal}
                  afterclose={afterClose}
                  width="700px"
                >
                  <AddPoojaBooking
                    hide={setModal}
                    editdata={editdata}
                    refresh={getAllPoojaBooking}
                  />
                </AddDataModal>
              </CardHeader>
              <CardBody>
                {ready ? (
                  <>
                    <AllPoojaBooking
                      empty={empty}
                      allcourse={searchFilter}
                      status={status}
                      editcourse={UpdateStatusPooja}
                      deletecourse={deletePooja}
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

export default PoojaBooking;
