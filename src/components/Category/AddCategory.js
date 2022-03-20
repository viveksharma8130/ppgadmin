import React from "react";
import { FormGroup, Input, Button, Form } from "reactstrap";

import { Select } from "antd";
const { Option } = Select;
const AddCategory = ({
  category,
  setcategory,
  addcategory,
  statusupdate,
  updatecategory,
  setFilter,
  allfilter,
  filterids,
}) => {
  const handleFilter = (val) => {
    const value = [];
    for (let title of val) {
      value.push(title);
      setFilter(value);
    }
  };
  return (
    <>
      <Form role="form">
        <FormGroup>
          <label className="form-control-label" htmlFor="name">
            Enter Category name
          </label>
          <Input
            className="form-control-alternative"
            id="name"
            placeholder="Category name"
            type="text"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label className="form-control-label d-block" htmlFor="filter">
            Select Filter
          </label>
          <Select
            showSearch
            mode="multiple"
            allowClear
            value={filterids}
            style={{ width: "100%" }}
            placeholder="Select Filter..."
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={handleFilter}
          >
            {allfilter &&
              allfilter.map((item) => (
                <Option value={item._id} key={item._id}>
                  {item.title}
                </Option>
              ))}
          </Select>
        </FormGroup>
        {statusupdate ? (
          <Button
            className="my-4 btn-block"
            type="submit"
            color="primary"
            onClick={updatecategory}
          >
            Update Category
          </Button>
        ) : (
          <Button
            className="my-4 btn-block"
            type="submit"
            color="primary"
            onClick={addcategory}
          >
            Add Category
          </Button>
        )}
      </Form>
    </>
  );
};
export default AddCategory;
