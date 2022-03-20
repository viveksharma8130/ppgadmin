import React, { useState, useEffect } from "react";
import { FormGroup, Input, Button, Form, Spinner } from "reactstrap";
import Dataservices from "../../services/requestApi";
import { Image, message } from "antd";
import { v4 as uuidv4 } from "uuid";
import AddDataModal from "components/Modal/AddDataModal";

// Text editor
import TextEditor from "components/TextEditor";
import AddVariantForm from "components/Variant/AddVariantForm";
import { useHistory } from "react-router-dom";

const AddProduct = ({ Allcategory }) => {
  const [category, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [filter, setFilter] = useState([]);
  const [variant, setVariant] = useState([]);
  const [variantlist, setVariantList] = useState([]);
  const [variantListId, setVariantListId] = useState([]);
  const [variantEditlist, setVariantEditList] = useState([]);
  const [brand, setBrand] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [description, setDescription] = useState("");
  const [shortdescription, setShortDescription] = useState("");
  const [ready, setReady] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalvariant, setModalVariant] = useState(false);

  let history = useHistory();
  useEffect(() => {
    const Update = () => {
      sessionStorage.setItem("variantlist", JSON.stringify(variant));
    };
    Update();
    return Update();
  }, [variant]);

  // Get Filter By Category Id
  useEffect(() => {
    const getFilter = async () => {
      try {
        if (category) {
          const res = await Dataservices.CategoryAllFilterById(category);
          if (res.data.message) {
            setFilter(res.data.data.filter);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    getFilter();
  }, [category]);

  const SubmitProduct = async (e) => {
    e.preventDefault();
    setReady(true);
    const data = new FormData();
    data.append("name", name);
    data.append("brand", brand);
    data.append("image", image);
    data.append("category", category);
    data.append("variant", JSON.stringify(variant));
    data.append("description", description);
    data.append("short_description", shortdescription);
    data.append("slug", slug);

    try {
      const res = await Dataservices.ProductAdd(data);
      console.log(res.data);
      if (res.data) {
        setReady(false);
        history.goBack();
      } else {
        message.error("Something Went Wrong");
      }
    } catch (e) {
      console.log(e.response.data);
      if (e.response.data) {
        message.success(e.response.data.message);
        setReady(false);
      }
    }
  };

  const fileHandler = (e) => {
    const file = e.target.files[0];
    const showiMG = URL.createObjectURL(file);
    if (file) {
      setImage(file);
      setThumbnail(showiMG);
    } else {
      setImage(null);
      setThumbnail(null);
    }
  };
  const HandleName = (e) => {
    let text = e.target.value;
    const slugtext = text.toLocaleLowerCase().replaceAll(" ", "-");
    setName(text);
    setSlug(slugtext);
  };

  // Varient Model
  const HandleModal = () => {
    setModal((data) => !data);
  };

  // EditVariantModal
  const HandleEditModal = () => {
    setModalVariant((data) => !data);
  };

  // Add Variant
  const AddVariantSubmit = (e) => {
    e.preventDefault();
    let formfield = {};

    for (let item of e.target) {
      if (item.name && item.value) {
        formfield[item.name] = item.value.trim();
        formfield.id = uuidv4();
      }
    }

    setVariant((prevState) => [...prevState, formfield]);
    const data = [];
    for (const [key, value] of Object.entries(formfield)) {
      data.push(
        <React.Fragment key={key}>
          <AddVariantForm
            keys={key}
            value={value}
            EditVariant={EditVariant}
            DeleteVariant={DeleteVariant}
          />
        </React.Fragment>
      );
    }

    setVariantList((prevState) => [...prevState, data]);
    setModal(false);
  };

  // Edit Variant
  const EditVariant = async (e, id) => {
    e.preventDefault();
    const getList = sessionStorage.getItem("variantlist");
    const variantdata = JSON.parse(getList);
    const filterForm = variantdata.find((item) => item.id === id);
    setVariantListId(id);
    setVariantEditList(filterForm);
    HandleEditModal();
  };
  const DeleteVariant = (e, id) => {
    e.preventDefault();
    const getList = sessionStorage.getItem("variantlist");
    const variantdata = JSON.parse(getList);
    const filterData = variantdata.filter((v) => v.id !== id);
    setVariant(filterData);
    const dataRender = [];
    for (const [key, value] of Object.entries(filterData)) {
      for (const [keys, values] of Object.entries(value)) {
        dataRender.push(
          <React.Fragment key={Math.random() + key}>
            <AddVariantForm
              keys={keys}
              value={values}
              EditVariant={EditVariant}
              DeleteVariant={DeleteVariant}
            />
          </React.Fragment>
        );
      }
    }
    setVariantList(dataRender);
  };
  const UpdateVariant = (e) => {
    e.preventDefault();
    let formfield = {};
    for (let item of e.target) {
      if (item.name && item.value) {
        formfield[item.name] = item.value.trim();
      }
    }

    const getList = sessionStorage.getItem("variantlist");
    const variantdata = JSON.parse(getList);

    const data = [];
    for (let items of variantdata) {
      if (items.id === variantListId) {
        items = formfield;
      }
      data.push(items);
    }
    setVariant(data);
    const dataRender = [];
    for (const [key, value] of Object.entries(data)) {
      for (const [keys, values] of Object.entries(value)) {
        dataRender.push(
          <React.Fragment key={Math.random() + key}>
            <AddVariantForm
              keys={keys}
              value={values}
              EditVariant={EditVariant}
              DeleteVariant={DeleteVariant}
            />
          </React.Fragment>
        );
      }
    }

    // console.log(sdsa);
    setVariantList(dataRender);
    HandleEditModal();
  };

  const varList = Object.entries(variantEditlist).map(([key, value]) => {
    return (
      <React.Fragment key={key}>
        <FormGroup>
          <label className="form-control-label" htmlFor={key}>
            {key.toLocaleUpperCase()}
          </label>
          <Input
            className="form-control-alternative"
            type="text"
            id={key.toLocaleLowerCase()}
            name={key.toLocaleLowerCase()}
            defaultValue={value}
            readOnly={key === "id"}
            placeholder={"Enter " + key}
          />
        </FormGroup>
      </React.Fragment>
    );
  });
  return (
    <>
      <AddDataModal
        title="Add Variant"
        show={modal}
        hide={setModal}
        width="700px"
      >
        <Form role="form" onSubmit={AddVariantSubmit}>
          {filter &&
            filter.map((item) => (
              <FormGroup key={item._id}>
                <label
                  className="form-control-label d-block"
                  htmlFor={item.title.toLocaleLowerCase()}
                >
                  {item.title}
                </label>
                <Input
                  type="text"
                  id={item.title.toLocaleLowerCase()}
                  name={item.title.toLocaleLowerCase()}
                  placeholder={"Enter " + item.title}
                  className="form-control-alternative"
                />
              </FormGroup>
            ))}
          <FormGroup>
            <label className="form-control-label d-block" htmlFor="mrp">
              Mrp
            </label>
            <Input
              type="text"
              id="mrp"
              name="mrp"
              placeholder={"Enter mrp"}
              className="form-control-alternative"
            />
          </FormGroup>
          <FormGroup>
            <label className="form-control-label d-block" htmlFor="price">
              Price
            </label>
            <Input
              type="text"
              id="price"
              name="price"
              placeholder={"Enter Price"}
              className="form-control-alternative"
            />
          </FormGroup>
          <Button className="my-4 btn-block" type="submit" color="warning">
            Add Variant
          </Button>
        </Form>
      </AddDataModal>
      <AddDataModal
        title="Edit Variant"
        show={modalvariant}
        hide={HandleEditModal}
        width="700px"
      >
        <Form onSubmit={UpdateVariant} id="editVariant">
          {varList}
          <Button className="my-4 btn-block" type="submit" color="warning">
            Update Variant
          </Button>
        </Form>
      </AddDataModal>
      <Form role="form" onSubmit={SubmitProduct}>
        <FormGroup>
          <label className="form-control-label d-block" htmlFor="paid">
            Select Category
          </label>
          <Input
            type="select"
            id="paid"
            value={category}
            className="form-control-alternative"
            onChange={(e) => setCategoryId(e.target.value)}
            disabled={category}
          >
            <option value="">Select ... </option>
            {Allcategory &&
              Allcategory.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.category}{" "}
                </option>
              ))}
          </Input>
        </FormGroup>
        {category && (
          <>
            <FormGroup>
              <label className="form-control-label d-block" htmlFor="varient">
                Varient
                <Button
                  color="warning"
                  size="sm"
                  type="button"
                  className="btn-rounded ml-2"
                  onClick={HandleModal}
                >
                  <i className="fas fa-plus" />
                </Button>
              </label>
            </FormGroup>

            <div className="variant_wrap">{variantlist && variantlist}</div>
          </>
        )}
        <FormGroup>
          <label className="form-control-label" htmlFor="image">
            Image
          </label>
          <Input
            className="form-control-alternative"
            id="image"
            type="file"
            accept="image/*"
            onChange={fileHandler}
          />
          {thumbnail && <Image width={200} src={thumbnail} className="mt-3" />}
        </FormGroup>
        <FormGroup>
          <label className="form-control-label" htmlFor="name">
            Name
          </label>
          <Input
            className="form-control-alternative"
            id="name"
            placeholder="Name"
            type="text"
            value={name}
            onChange={HandleName}
          />
        </FormGroup>
        <FormGroup>
          <label className="form-control-label" htmlFor="Brand">
            Brand
          </label>
          <Input
            className="form-control-alternative"
            id="Brand"
            placeholder="Enter Brand"
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label className="form-control-label" htmlFor="short_des">
            Short Description
          </label>
          <Input
            className="form-control-alternative"
            id="short_des"
            placeholder="Enter Short Description"
            type="textarea"
            rows="4"
            value={shortdescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label className="form-control-label" htmlFor="desc">
            Description
          </label>
          <TextEditor value={description} setvalue={setDescription} />
        </FormGroup>
        <Button
          className="my-4 btn-block"
          type="submit"
          color="warning"
          disabled={ready}
        >
          {ready && <Spinner size="sm" color="light" />} Add Product
        </Button>
      </Form>
    </>
  );
};
export default AddProduct;
