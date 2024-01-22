import React, { Component } from "react";
import { connect } from "react-redux";

import Excelimport from "./Excelimport";

import { Breadcrumb, Divider } from "antd";

class Tools extends Component {
  render() {
    return (
      <>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Import Data</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background main-frame">
          <h1>Import Products from Excel file</h1>
          <Excelimport />
        </div>
      </>
    );
  }
}

export default connect()(Tools);
