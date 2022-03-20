import React from "react";
import { NavLink as NavLinkRRD } from "react-router-dom";
import {
  NavItem,
  NavLink,
  Nav,
  UncontrolledCollapse as Collapsed,
} from "reactstrap";
const DropMenus = ({ data }) => {
  return (
    <NavItem>
      <NavLink
        to={"#" + data.name}
        tag={NavLinkRRD}
        onClick={(e) => e.preventDefault()}
        data-toggle="collapse"
        className="text-capitalize"
        id={data.name}
      >
        <i className={data.icon} />
        {data.name}
      </NavLink>
      <Collapsed toggler={data.name}>
        <Nav>
          {data.views.map((item, key) => (
            <NavItem key={key}>
              <NavLink
                to={item.layout + item.path}
                tag={NavLinkRRD}
                className="text-capitalize"
              >
                {item.name}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </Collapsed>
    </NavItem>
  );
};
export default DropMenus;
