import React from "react";
import { FormGroup, Input, Button, Form } from "reactstrap";

const AddPackage = ({
  title,
  settitle,
  price,
  setprice,
  samagriprice,
  setsamagriprice,
  addpackage,
  statusupdate,
  updatepackage,
}) => {
  return (
    <>
      <Form role="form">
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
          />
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
          <label className="form-control-label" htmlFor="price">
            Enter Samagri Price
          </label>
          <Input
            className="form-control-alternative"
            id="price"
            placeholder="Enter Samagri Price"
            type="number"
            value={samagriprice}
            onChange={(e) => setsamagriprice(e.target.value)}
          />
        </FormGroup>
        {statusupdate ? (
          <Button
            className="my-4 btn-block"
            type="submit"
            color="primary"
            onClick={updatepackage}
          >
            Update Package
          </Button>
        ) : (
          <Button
            className="my-4 btn-block"
            type="submit"
            color="primary"
            onClick={addpackage}
          >
            Add Package
          </Button>
        )}
      </Form>
    </>
  );
};
export default AddPackage;
