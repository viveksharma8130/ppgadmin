import React from "react";
// reactstrap components
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import { NavLink as Link } from "react-router-dom";
import { Switch, InputNumber } from "antd";
import moment from "moment";
// core components
const DummyImage = "https://dummyimage.com/430x240/5e72e4/fff.png";
// deletecourse
const ProductCards = ({
  status,
  data,
  action,
  setvalue,
  deleteproduct,
  length,
  sequence,
  url,
}) => {
  return (
    <Card className="mb-2">
      <div className="imgwraped">
        <CardImg
          alt={data.name}
          src={data.image ? data.image : DummyImage}
          top
        />
      </div>

      {action && (
        <div className="actionbtn">
          <Switch
            defaultChecked={data.status}
            onChange={() => status(data)}
            className="mr-3"
          />
          <Link
            size="sm"
            className="btn btn-sm btn-secondary editbtn"
            to={{ pathname: `edit-product`, state: data }}
          >
            <i className="fas fa-edit" /> Edit
          </Link>
          {data.type === "multiple" && (
            <Link
              className="btn btn-sm btn-secondary editbtn"
              to={{ pathname: "/admin/product_variant", state: data }}
            >
              <i className="fas fa-plus" /> Variant
            </Link>
          )}
          <Button
            size="sm"
            className="editbtn"
            onClick={(e) => deleteproduct(e, data._id)}
          >
            <i className="fas fa-trash text-danger" />
          </Button>
        </div>
      )}
      <CardBody className="pt-1">
        <div className="mb-2 d-flex justify-content-between">
          <div className="isHomesequenc">
            <h6>Sequence</h6>
            <InputNumber
              min={1}
              size="small"
              max={length}
              defaultValue={data.sequence}
              onChange={(value) => setvalue(value)}
              onPressEnter={() => sequence(data._id)}
            />
          </div>
        </div>
        <h3 className="font-weight-bold mb-0">{data.name}</h3>

        {data.package_type === "single" && (
          <>
            <CardTitle className="font-weight-bold mb-0">
              <i className="fas fa-rupee-sign" /> {data.price}
            </CardTitle>
            <CardTitle className="font-weight-bold mb-0">
              Mrp: {data.mrp}
            </CardTitle>
          </>
        )}
        <CardText className="mb-2">
          <small className="text-muted">
            Created at {moment(data.validity).format("ll")}
          </small>
        </CardText>
      </CardBody>
    </Card>
  );
};

export default ProductCards;
