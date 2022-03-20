import React from "react";
import { FormGroup, Input, Button, Form } from "reactstrap";
const AddBanner = ({
  title,
  settitle,
  setimage,
  type,
  settype,
  addbanner,
  updatebanner,
  editstatus,
  thumbnail,
  setthumbnail,
}) => {
  const fileHandle = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimage(file);
      const showiMG = URL.createObjectURL(file);
      setthumbnail(showiMG);
    }
  };
  return (
    <>
      <Form role="form" onSubmit={addbanner}>
        <FormGroup>
          <label className="form-control-label" htmlFor="title">
            Title
          </label>
          <Input
            className="form-control-alternative"
            id="title"
            placeholder="Enter Title"
            type="text"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <label className="form-control-label" htmlFor="url">
            Type
          </label>
          <Input
            className="form-control-alternative"
            id="url"
            placeholder="www.example.com"
            type="select"
            value={type}
            onChange={(e) => settype(e.target.value)}
          >
            <option value="">Select</option>
            <option value="homepage">Homepage</option>
            <option value="puja">Pooja</option>
            <option value="product">Product</option>
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
            onChange={fileHandle}
            required
          />
        </FormGroup>
        <FormGroup>
          {thumbnail && (
            <img src={thumbnail} className="img-fluid" alt="banner" />
          )}
        </FormGroup>
        {editstatus ? (
          <Button
            className="my-4 btn-block"
            type="submit"
            color="warning"
            onClick={updatebanner}
          >
            Update Banner
          </Button>
        ) : (
          <Button
            className="my-4 btn-block"
            type="submit"
            color="warning"
            onClick={addbanner}
          >
            Add Banner
          </Button>
        )}
      </Form>
    </>
  );
};
export default AddBanner;
