import React from "react";
import { FormGroup, Input, Button, Form } from "reactstrap";
const AddFilter = ({
  title,
  settitle,
  addbanner,
  updatebanner,
  editstatus,
}) => {
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

        {editstatus ? (
          <Button
            className="my-4 btn-block"
            type="submit"
            color="warning"
            onClick={updatebanner}
          >
            Update Filter
          </Button>
        ) : (
          <Button
            className="my-4 btn-block"
            type="submit"
            color="warning"
            onClick={addbanner}
          >
            Add Filter
          </Button>
        )}
      </Form>
    </>
  );
};
export default AddFilter;
