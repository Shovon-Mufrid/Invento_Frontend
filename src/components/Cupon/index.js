import React from "react";
import { connect } from "react-redux";
import Maincontent from "./Maincontent";

import { Layout, Breadcrumb } from "antd";
const { Content } = Layout;

const Index = () => {
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Coupons</Breadcrumb.Item>
        <Breadcrumb.Item>All</Breadcrumb.Item>
      </Breadcrumb>
      <Maincontent />
    </>
  );
};

export default connect()(Index);
