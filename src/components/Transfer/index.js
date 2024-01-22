import React, { Component } from "react";
import { connect } from "react-redux";
// import Sidebar from "../layout/Sidebar";
// import Navbar from "../layout/Navbar";

import Transfer from "./Transfer";

import { Layout, Breadcrumb } from "antd";
const { Content } = Layout;

class Dashboard extends Component {
  render() {
    return (
      <>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Transfer Product</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background main-frame">
          <Transfer />
        </div>
      </>
    );
  }
}

export default connect()(Dashboard);
