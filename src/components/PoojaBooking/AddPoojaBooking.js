import React, { useState, useEffect } from "react";
import { FormGroup, Input, Button, Form, Spinner } from "reactstrap";
import Dataservices from "../../services/requestApi";
import { Image, message } from "antd";
// Text editor
import TextEditor from "components/TextEditor";

const AddPoojaBooking = ({ hide, editdata, refresh }) => {
  const [package_type, setPackageType] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [samagriprice, setSamagriPrice] = useState("");
  const [poojaid, setPoojaid] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [description, setDescription] = useState("");
  const [shortdescription, setShortDescription] = useState("");
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const update = () => {
      if (mounted) {
        setName(editdata ? editdata.name : "");
        setPackageType(editdata ? editdata.package_type : "");
        setImage(editdata ? editdata.image : "");
        setThumbnail(editdata ? editdata.image : "");
        setSlug(editdata ? editdata.slug : "");
        setPrice(editdata ? editdata.price : "");
        setSamagriPrice(editdata ? editdata.samagri_price : "");
        setDescription(editdata ? editdata.description : "");
        setShortDescription(editdata ? editdata.short_description : "");
        setPoojaid(editdata ? editdata._id : "");
      }
    };
    update();
    return () => {
      setMounted(false);
      update();
    };
  }, [editdata, mounted]);

  const SubmitPoojaBooking = async (e) => {
    e.preventDefault();
    setReady(true);
    const data = new FormData();
    data.append("name", name);
    data.append("image", image);
    data.append("price", price);
    data.append("samagri_price", samagriprice);
    data.append("package_type", package_type);
    data.append("description", description);
    data.append("short_description", shortdescription);
    data.append("slug", slug);
    try {
      const res = await Dataservices.PoojaBookingAdd(data);
      if (res.data.status_code === 200) {
        setReady(false);
        refresh();
        hide(false);
      } else {
        message.success("Something Went Wrong");
      }
    } catch (e) {
      console.log(e.response.data);
      if (e.response.data) {
        message.success(e.response.data.message);
        setReady(false);
      }
    }
  };
  const UpdateCourse = async (e) => {
    e.preventDefault();
    setReady(true);
    try {
      const data = new FormData();
      data.append("name", name);
      data.append("image", image);
      data.append("price", price);
      data.append("samagri_price", samagriprice);
      data.append("package_type", package_type);
      data.append("description", description);
      data.append("short_description", shortdescription);
      data.append("slug", slug);
      await Dataservices.PoojaBookingUpdate(poojaid, data);
      message.success("Pooja updated successfully");
      setName("");
      setDescription("");
      setPoojaid("");
      setName("");
      setPrice("");
      setSamagriPrice("");
      setSlug("");
      setImage(null);
      setThumbnail(null);
      setDescription("");
      setShortDescription("");
      setReady(false);
      hide(false);
      refresh();
    } catch (e) {
      console.log(e.response);
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
      <Form role="form">
        <FormGroup>
          <label className="form-control-label d-block" htmlFor="paid">
            Select Package Type
          </label>
          <Input
            type="select"
            id="paid"
            value={package_type}
            className="form-control-alternative"
            onChange={(e) => setPackageType(e.target.value)}
          >
            <option value="">Select ... </option>
            <option value="single">Single </option>
            <option value="multiple">Multiple</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <label className="form-control-label" htmlFor="image">
            Image
          </label>
          <Input
            className="form-control-alternative"
            id="image"
            type="file"
            accept="image/*"
            required
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
        {package_type === "multiple" && (
          <>
            <FormGroup>
              <label className="form-control-label" htmlFor="price">
                Price
              </label>
              <Input
                className="form-control-alternative"
                id="price"
                placeholder="Enter Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label className="form-control-label" htmlFor="samagriprice">
                Samagri Price
              </label>
              <Input
                className="form-control-alternative"
                id="samagriprice"
                placeholder="Enter Samagri Price"
                type="number"
                value={samagriprice}
                onChange={(e) => setSamagriPrice(e.target.value)}
              />
            </FormGroup>
          </>
        )}
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
        {!editdata ? (
          <Button
            className="my-4 btn-block"
            type="submit"
            color="warning"
            onClick={SubmitPoojaBooking}
            disabled={ready}
          >
            {ready && <Spinner size="sm" color="light" />} Add Pooja
          </Button>
        ) : (
          <Button
            className="my-4 btn-block"
            type="submit"
            color="warning"
            onClick={UpdateCourse}
            disabled={ready}
          >
            {ready && <Spinner size="sm" color="light" />} Update Pooja
          </Button>
        )}
      </Form>
    </>
  );
};
export default AddPoojaBooking;
