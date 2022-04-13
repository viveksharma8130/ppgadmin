import React from "react";
import { Image, Select } from "antd";
import { FormGroup, Input, Button, Form } from "reactstrap";
const { Option } = Select;
const AddProductPackage = ({
  colour,
  setcolour,
  price,
  setprice,
  mrp,
  setmrp,
  setimage,
  thumbnail,
  setThumbnail,
  size,
  setSize,
  addvariant,
  statusupdate,
  updatevariant,
}) => {
  const fileHandler = (e) => {
    const file = e.target.files[0];
    const showiMG = URL.createObjectURL(file);
    if (file) {
      setimage(file);
      setThumbnail(showiMG);
    } else {
      setimage(null);
      setThumbnail(null);
    }
  };
  function handleChange(val) {
    const size = [];
    for (let items of val) {
      size.push(items);
      // setUnit(value);
    }
    setSize(size);
  }
  return (
    <>
      <Form role="form">
        <FormGroup>
          <label className="form-control-label" htmlFor="title">
            Select Colour
          </label>
          <Input
            className="form-control-alternative"
            id="title"
            placeholder="Enter Title"
            type="color"
            value={colour}
            onChange={(e) => setcolour(e.target.value)}
          />
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
            onChange={fileHandler}
          />
          {thumbnail && <Image height={200} src={thumbnail} className="mt-3" />}
        </FormGroup>
        <FormGroup>
          <label className="form-control-label" htmlFor="size">
            Enter Size
          </label>
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Enter Size Name"
            value={size}
            onChange={handleChange}
          >
            <Option>xs</Option>
          </Select>
        </FormGroup>
        <FormGroup>
          <label className="form-control-label" htmlFor="price">
            Enter Price
          </label>
          <Input
            className="form-control-alternative"
            id="price"
            placeholder="Enter Price"
            type="number"
            value={price}
            onChange={(e) => setprice(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label className="form-control-label" htmlFor="mrp">
            Enter Mrp
          </label>
          <Input
            className="form-control-alternative"
            id="mrp"
            placeholder="Enter Mrp"
            type="number"
            value={mrp}
            onChange={(e) => setmrp(e.target.value)}
          />
        </FormGroup>
        {statusupdate ? (
          <Button
            className="my-4 btn-block"
            type="submit"
            color="primary"
            onClick={updatevariant}
          >
            Update Variant
          </Button>
        ) : (
          <Button
            className="my-4 btn-block"
            type="submit"
            color="primary"
            onClick={addvariant}
          >
            Add Variant
          </Button>
        )}
      </Form>
    </>
  );
};
export default AddProductPackage;
