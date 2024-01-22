import React, { useState } from "react";
import { connect } from "react-redux";
import Maincontent from "./Maincontent";

import { Layout, Breadcrumb } from "antd";
const { Content } = Layout;

const UserRole = () => {
  const [updatelist, setUpdatelist] = useState(true);

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>UserRole</Breadcrumb.Item>
        <Breadcrumb.Item>All</Breadcrumb.Item>
      </Breadcrumb>
      <Maincontent />
    </>
  );
};

export default connect()(UserRole);
