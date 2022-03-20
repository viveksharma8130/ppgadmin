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
import AddArticle from "components/Article/AddArticle";
import AllArticle from "components/Article/AllArticle";
import Loader from "components/loader/Loader";
import { message } from "antd";

//Firebase

const Article = () => {
  const [title, settitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [image, setImage] = useState(null);
  const [Allbanner, setAllBanner] = useState([]);
  const [update, setUpdate] = useState(false);
  const [bannerid, setBannerID] = useState("");
  const [ready, setReady] = useState(false);
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");

  // Addarticle
  const Addarticle = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("image", image);
    try {
      setReady(true);
      const res = await Dataservices.ArticleAdd(data);
      message.success(res.data.message);
      settitle("");
      setImage(null);
      setThumbnail(null);
      setDescription("");
      setReady(false);
      getAllarticle();
    } catch (e) {
      console.log(e);
    }
  };

  // GetAllarticle
  const getAllarticle = useCallback(async (e) => {
    try {
      const res = await Dataservices.ArticleAll();
      console.log(res.data.data);
      setAllBanner(res.data.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getAllarticle();
  }, [getAllarticle]);

  // article Status
  const bannerUpdateStatus = async (e, data) => {
    e.preventDefault();
    setUpdate(true);
    settitle(data.title);
    setDescription(data.description);
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
      await Dataservices.ArticleUpdate(val._id, queryString.stringify(Data));
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  // article Updates
  const updateFilter = async (e) => {
    e.preventDefault();
    setReady(true);
    try {
      if (image) {
        const data = new FormData();
        data.append("title", title);
        data.append("description", description);
        data.append("image", image);
        const res = await Dataservices.ArticleUpdate(bannerid, data);
        if (res.status) {
          message.success("Update Successfully");
          setReady(false);
          settitle("");
          setImage(null);
          setThumbnail(null);
          setDescription("");
          getAllarticle();
          setUpdate(false);
        }
        console.log(res.data);
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
      await Dataservices.ArticleDelete(id);
      setReady(false);
      message.success("Article Delete Successfully");
      getAllarticle();
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
                    <h3 className="mb-0">Add Article</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <Col lg="12">
                    <AddArticle
                      title={title}
                      settitle={settitle}
                      setimage={setImage}
                      description={description}
                      addbanner={Addarticle}
                      setdescription={setDescription}
                      thumbnail={thumbnail}
                      setthumbnail={setThumbnail}
                      updatebanner={updateFilter}
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
                    <h3 className="mb-0">All Article</h3>
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
                <AllArticle
                  allbanner={Allbanner}
                  bannerupdatestatus={bannerUpdateStatus}
                  updatebanner={updateFilter}
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

export default Article;
