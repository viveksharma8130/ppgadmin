import React, { useState, useEffect, useCallback } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  FormGroup,
  Input,
} from "reactstrap";
// APi
import Dataservices from "../../services/requestApi";
import queryString from "query-string";
// core components
import Header from "components/Headers/Header";
import AddFilter from "components/Filter/AddFilter";
import AllFilter from "components/Filter/AllFilter";
import Loader from "components/loader/Loader";
import { message } from "antd";

//Firebase

const Filter = () => {
  const [title, settitle] = useState("");
  const [Allfilter, setAllFilter] = useState([]);
  const [update, setUpdate] = useState(false);
  const [filterid, setFilterID] = useState("");
  const [ready, setReady] = useState(false);
  const [search, setSearch] = useState("");

  // Addfilter
  const Addfilters = async (e) => {
    e.preventDefault();
    const Data = {
      title,
    };
    try {
      setReady(true);
      const res = await Dataservices.FilterAdd(queryString.stringify(Data));
      message.success(res.data.message);
      settitle("");
      setReady(false);
      getAllFilter();
    } catch (e) {
      console.log(e);
    }
  };

  // GetAllfilter
  const getAllFilter = useCallback(async (e) => {
    try {
      const res = await Dataservices.FilterAll();
      console.log(res.data.data);
      setAllFilter(res.data.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getAllFilter();
  }, [getAllFilter]);

  // filter Status
  const filterUpdateStatus = async (e, data) => {
    e.preventDefault();
    setUpdate(true);
    settitle(data.title);
    setFilterID(data._id);
  };
  // Status
  const status = async (e, val) => {
    e.preventDefault();
    try {
      const Data = {
        status: !val.status,
      };
      await Dataservices.FilterUpdate(val._id, queryString.stringify(Data));
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  // article Updates
  const filterUpdate = async (e) => {
    e.preventDefault();
    setReady(true);
    try {
      const Data = {
        title,
      };
      const res = await Dataservices.FilterUpdate(
        filterid,
        queryString.stringify(Data)
      );
      if (res.status) {
        message.success("Update Successfully");
        setReady(false);
        settitle("");
        getAllFilter();
        setUpdate(false);
      }
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  // Delete banner
  const deleteFilter = async (id) => {
    setReady(true);
    try {
      await Dataservices.FilterDelete(id);
      setReady(false);
      message.success("Filter Delete Successfully");
      getAllFilter();
    } catch (error) {
      console.log(error);
    }
  };
  // const searchFilter = Allfilter.filter((data) => {
  //   return data.title.toLowerCase().includes(search.toLowerCase());
  // });
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
                  <Col xs="8">
                    <h3 className="mb-0">Add Filter</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <Col lg="12">
                    <AddFilter
                      title={title}
                      settitle={settitle}
                      addbanner={Addfilters}
                      updatebanner={filterUpdate}
                      editstatus={update}
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
                  <Col xs="9">
                    <h3 className="mb-0">All Filter</h3>
                  </Col>
                  <Col lg="3">
                    <FormGroup className="mb-0">
                      <Input
                        className="form-control-alternative border shadow"
                        id="title"
                        placeholder="Search Banner"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardHeader>
              <Loader show={ready} />
              <CardBody>
                <AllFilter
                  allbanner={Allfilter}
                  bannerupdatestatus={filterUpdateStatus}
                  updatebanner={filterUpdate}
                  deletebanner={deleteFilter}
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

export default Filter;
