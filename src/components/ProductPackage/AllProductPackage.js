import React from "react";
// reactstrap components
import {
  Input,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Label,
  Table,
  Media,
} from "reactstrap";
// Api
// import Dataservices from "../../services/requestApi";
// import queryString from "query-string";
const AllProductPackage = ({
  allvariant,
  updatevariant,
  status,
  deletevariant,
}) => {
  return (
    <>
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Image</th>
            <th scope="col">Colour</th>
            <th scope="col">Price</th>
            <th scope="col">Mrp</th>
            <th scope="col">Status</th>
            <th scope="col" className="text-right">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {allvariant &&
            allvariant.map((item, index) => (
              <tr key={item._id}>
                <th scope="row">{index + 1}</th>
                <th scope="row">
                  <Media className="align-items-center">
                    <a
                      className="avatar avatar-sm rounded-circle mr-3"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <img alt="..." src={item.image} className="objectImg" />
                    </a>
                  </Media>
                </th>
                <td>
                  <div className="color_flow">
                    <div
                      className="color"
                      style={{ backgroundColor: item.colour }}
                    ></div>
                    {item.colour}
                  </div>
                </td>
                <td>
                  <i className="fa fa-rupee-sign " /> {item.price}
                </td>
                <td>
                  <i className="fa fa-rupee-sign " /> {item.mrp}
                </td>

                <td>
                  <Label className="custom-toggle custom-toggle-warning">
                    <Input
                      onClick={(e) => status(e, item)}
                      defaultChecked={item.status}
                      type="checkbox"
                    />
                    <span
                      className="custom-toggle-slider rounded-circle"
                      data-label-off="Off"
                      data-label-on="On"
                    />
                  </Label>
                </td>
                <td className="text-right">
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="btn-icon-only text-light"
                      href="#pablo"
                      role="button"
                      size="sm"
                      color=""
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fas fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem onClick={(e) => updatevariant(item)}>
                        <i className="fas fa-edit text-primary" /> Edit
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={(e) => deletevariant(e, item._id)}
                      >
                        <i className="fas fa-trash text-danger" />
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default AllProductPackage;
