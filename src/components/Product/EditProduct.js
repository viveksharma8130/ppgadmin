import React, { useState, useEffect } from "react";
import { FormGroup, Input, Button, Form, Spinner, Row, Col } from "reactstrap";
import Dataservices from "../../services/requestApi";
import { Image, message } from "antd";

// Text editor
import TextEditor from "components/TextEditor";
import { useHistory } from "react-router-dom";

const EditProduct = ({ Allcategory, editdata }) => {
  const [category, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [material, setMaterial] = useState("");
  const [design, setDesign] = useState("");
  const [mrp, setMrp] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [description, setDescription] = useState("");
  const [shortdescription, setShortDescription] = useState("");
  const [ready, setReady] = useState(false);
  const [productid, setProductId] = useState("");

  // Update Current Data
  const data = editdata.state;
  let history = useHistory();
  useEffect(() => {
    if (data) {
      setCategoryId(data.category);
      setName(data.name);
      setType(data.type);
      setMaterial(data.material);
      setDesign(data.design);
      setBrand(data.brand);
      setSlug(data.slug);
      setImage(data.image);
      setThumbnail(data.image);
      setDescription(data.description);
      setShortDescription(data.short_description);
      setProductId(data._id);
    }
  }, [data]);

  const UpdateProduct = async (e) => {
    e.preventDefault();
    setReady(true);
    const data = new FormData();
    data.append("name", name);
    data.append("slug", slug);
    data.append("type", type);
    data.append("material", material);
    data.append("design", design);
    if (type === "single") {
      data.append("mrp", mrp);
      data.append("price", price);
    }
    data.append("category", category);
    data.append("brand", brand);
    data.append("image", image);
    data.append("description", description);
    data.append("short_description", shortdescription);

    try {
      const res = await Dataservices.ProductUpdate(productid, data);
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

  return (
    <>
      <Form role="form" onSubmit={UpdateProduct}>
        <Row>
          <Col lg="6">
            <FormGroup>
              <label className="form-control-label d-block" htmlFor="paid">
                Select Product Type
              </label>
              <Input
                type="select"
                id="paid"
                value={type}
                className="form-control-alternative"
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="">Select ... </option>
                <option value="single">Single </option>
                <option value="multiple">Multiple</option>
              </Input>
            </FormGroup>
          </Col>
          <Col lg="6">
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
                required
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
          </Col>
        </Row>

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
        {type === "single" && (
          <>
            <FormGroup>
              <label className="form-control-label" htmlFor="Brand">
                Mrp
              </label>
              <Input
                className="form-control-alternative"
                id="Brand"
                placeholder="Enter Mrp"
                type="text"
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label className="form-control-label" htmlFor="Brand">
                Price
              </label>
              <Input
                className="form-control-alternative"
                id="Brand"
                placeholder="Enter Price"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormGroup>
          </>
        )}
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
          <label className="form-control-label" htmlFor="Brand">
            Material
          </label>
          <Input
            className="form-control-alternative"
            id="Brand"
            placeholder="Enter Material"
            type="text"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label className="form-control-label" htmlFor="Brand">
            Design
          </label>
          <Input
            className="form-control-alternative"
            id="Brand"
            placeholder="Enter Design"
            type="text"
            value={design}
            onChange={(e) => setDesign(e.target.value)}
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
export default EditProduct;
