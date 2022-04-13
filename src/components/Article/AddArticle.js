import TextEditor from "components/TextEditor";
import React from "react";
import { FormGroup, Input, Button, Form } from "reactstrap";
const AddArticle = ({
  title,
  settitle,
  setimage,
  description,
  setdescription,
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

        <FormGroup>
          <label className="form-control-label" htmlFor="desc">
            Description
          </label>
          <TextEditor value={description} setvalue={setdescription} />
        </FormGroup>
        {editstatus ? (
          <Button
            className="my-4 btn-block"
            type="submit"
            color="warning"
            onClick={updatebanner}
          >
            Update Article
          </Button>
        ) : (
          <Button
            className="my-4 btn-block"
            type="submit"
            color="warning"
            onClick={addbanner}
          >
            Add Article
          </Button>
        )}
      </Form>
    </>
  );
};
export default AddArticle;
