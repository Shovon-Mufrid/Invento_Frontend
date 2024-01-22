import React, { useState } from "react";
import { connect } from "react-redux";
import Maincontent from "./Maincontent";
import { Breadcrumb } from "antd";

const Contact = () => {
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Office</Breadcrumb.Item>
        <Breadcrumb.Item>All</Breadcrumb.Item>
      </Breadcrumb>
      <Maincontent />
    </>
  );
};

export default connect()(Contact);
