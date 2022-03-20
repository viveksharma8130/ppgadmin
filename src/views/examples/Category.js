import React, { useState, useEffect } from "react";

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
// core components
import Header from "components/Headers/Header";
import AddCategory from "components/Category/AddCategory";
import AllCategory from "components/Category/AllCategory";
import Dataservices from "../../services/requestApi";
import queryString from "query-string";
const Category = () => {
  const [category, setCategory] = useState("");
  const [Allcategory, setAllCategory] = useState([]);
  const [filterids, setFilterIds] = useState(undefined);
  const [allfilter, setAllFilter] = useState([]);
  const [update, setUpdate] = useState(false);
  const [cateid, setCateId] = useState("");
  const [search, setSearch] = useState("");

  // GetAllCategory
  const getAllCategory = async (e) => {
    try {
      const [resCategory, resFilter] = await Promise.all([
        Dataservices.CategoryAll(),
        Dataservices.FilterAll(),
      ]);
      setAllCategory(resCategory.data.data);
      setAllFilter(resFilter.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  // Fetch AllCategory
  useEffect(() => {
    getAllCategory();
  }, []);

  // AddCategory
  const AddCategorys = async (e) => {
    e.preventDefault();
    const Data = {
      category,
      filter: filterids,
    };
    try {
      const res = await Dataservices.CategoryAdd(queryString.stringify(Data));
      console.log(res.data);
      getAllCategory();
      setCategory("");
      setFilterIds(undefined);
    } catch (e) {
      console.log(e);
    }
  };

  // category Status
  const categoryUpdateStatus = async (data) => {
    setUpdate(true);
    setCategory(data.category);
    setCateId(data._id);
    setFilterIds(data.filter);
    if (data.filter) {
      const value = [];
      for (let title of data.filter) {
        value.push(title._id);
      }
      setFilterIds(value);
    }
  };
  // Status
  const status = async (e, val) => {
    e.preventDefault();
    try {
      const Data = {
        status: !val.status,
      };
      await Dataservices.CategoryUpdate(val._id, queryString.stringify(Data));
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  // Category Updates
  const categoryUpdate = async (e) => {
    e.preventDefault();
    try {
      const Data = {
        category,
        filter: filterids,
      };
      const res = await Dataservices.CategoryUpdate(
        cateid,
        queryString.stringify(Data)
      );
      console.log(res);
      setUpdate(false);
      getAllCategory();
      setCategory("");
      setFilterIds(undefined);
    } catch (error) {
      console.log(error);
    }
  };
  // Delete Category
  const deleteCategory = async (e, id) => {
    e.preventDefault();
    try {
      const res = await Dataservices.CategoryDelete(id);
      console.log(res);
      getAllCategory();
    } catch (error) {
      console.log(error);
    }
  };
  const searchFilter = Allcategory.filter((data) => {
    return data.category.toLowerCase().includes(search.toLowerCase());
  });
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
                  <Col xs="9">
                    <h3 className="mb-0">Add Category</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <Col lg="12">
                    <AddCategory
                      category={category}
                      allfilter={allfilter}
                      filterids={filterids}
                      setFilter={setFilterIds}
                      setcategory={setCategory}
                      addcategory={AddCategorys}
                      updatecategory={categoryUpdate}
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
                  <Col xs="9">
                    <h3 className="mb-0">All Category</h3>
                  </Col>
                  <Col lg="3">
                    <FormGroup className="mb-0">
                      <Input
                        className="shadow"
                        id="title"
                        placeholder="Search Category"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <AllCategory
                  allcategory={searchFilter}
                  updatecategory={categoryUpdateStatus}
                  deletecat={deleteCategory}
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

export default Category;
