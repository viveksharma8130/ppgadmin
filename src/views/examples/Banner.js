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
import AddBanner from "components/Banner/AddBanner";
import AllBanner from "components/Banner/AllBanner";
import Loader from "components/loader/Loader";
import { message } from "antd";

//Firebase

const Banner = () => {
  const [title, settitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [image, setImage] = useState(null);
  const [Allbanner, setAllBanner] = useState([]);
  const [update, setUpdate] = useState(false);
  const [bannerid, setBannerID] = useState("");
  const [ready, setReady] = useState(false);
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");

  // AddLanguage
  const Addbanner = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("type", type);
    data.append("image", image);
    try {
      setReady(true);
      const res = await Dataservices.BannerAdd(data);
      message.success(res.data.message);
      settitle("");
      setImage(null);
      setThumbnail(null);
      setType("");
      setReady(false);
      getAllBanner();
    } catch (e) {
      console.log(e);
    }
  };

  // GetAllbanner
  const getAllBanner = useCallback(async (e) => {
    try {
      const res = await Dataservices.BannerAll();
      console.log(res.data.data);
      setAllBanner(res.data.data);
    } catch (e) {
      console.log(e);
    }
  }, []);
  // Fetch AllBanner
  useEffect(() => {
    getAllBanner();
  }, [getAllBanner]);

  // banner Status
  const bannerUpdateStatus = async (e, data) => {
    e.preventDefault();
    setUpdate(true);
    settitle(data.title);
    setType(data.type);
    setImage(data.image);
    setThumbnail(data.image);
    setBannerID(data._id);
  };
  // Status
  const status = async (e, val) => {
    e.preventDefault();
    try {
      const Data = {
        status: !val.status,
      };
      await Dataservices.BannerUpdate(val._id, queryString.stringify(Data));
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  // Banner Updates
  const bannerUpdate = async (e) => {
    e.preventDefault();
    setReady(true);
    try {
      if (image) {
        const data = new FormData();
        data.append("title", title);
        data.append("type", type);
        data.append("image", image);
        const res = await Dataservices.BannerUpdate(bannerid, data);
        if (res.status) {
          message.success("Update Successfully");
          setReady(false);
          settitle("");
          setImage(null);
          setThumbnail(null);
          setType("");
          getAllBanner();
          setUpdate(false);
        }
      } else {
        message.error("Please Upload Image");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Delete banner
  const deleteBanner = async (id) => {
    setReady(true);
    try {
      await Dataservices.BannerDelete(id);
      setReady(false);
      message.success("Banner Delete Successfully");
      getAllBanner();
    } catch (error) {
      console.log(error);
    }
  };
  // const searchFilter = Allbanner.filter((data) => {
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
                    <h3 className="mb-0">Add banner</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <Col lg="12">
                    <AddBanner
                      title={title}
                      settitle={settitle}
                      setimage={setImage}
                      type={type}
                      addbanner={Addbanner}
                      settype={setType}
                      thumbnail={thumbnail}
                      setthumbnail={setThumbnail}
                      updatebanner={bannerUpdate}
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
                    <h3 className="mb-0">All banner</h3>
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
                <AllBanner
                  allbanner={Allbanner}
                  bannerupdatestatus={bannerUpdateStatus}
                  updatebanner={bannerUpdate}
                  deletebanner={deleteBanner}
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

export default Banner;
