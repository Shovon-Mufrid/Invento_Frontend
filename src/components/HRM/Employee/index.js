import React, { useState } from "react";
import { connect } from "react-redux";
import "./Idcard.css";

import Maincontent from "./Maincontent";

import { Layout, Breadcrumb } from "antd";
const { Content } = Layout;

const Employee = () => {
  const [updatelist, setUpdatelist] = useState(true);

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Employee</Breadcrumb.Item>
      </Breadcrumb>
      <Maincontent />
    </>
  );
};

export default connect()(Employee);
