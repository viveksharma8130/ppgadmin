import React from "react";
import { NavLink as NavLinkRRD } from "react-router-dom";
import { NavItem, NavLink } from "reactstrap";
const Menus = ({ data, collapse }) => (
  <NavItem>
    {data.show ? (
      <NavLink
        to={data.layout + data.path}
        tag={NavLinkRRD}
        onClick={collapse}
        activeClassName="active"
      >
        <i className={data.icon} />
        {data.name}
      </NavLink>
    ) : null}
  </NavItem>
);
export default Menus;
