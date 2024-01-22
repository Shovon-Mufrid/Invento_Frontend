import React, { Component } from "react";
import { connect } from "react-redux";
import SearchStock from "./SearchStock";

import { Layout, Breadcrumb } from "antd";
const { Content } = Layout;

class Dashboard extends Component {
  render() {
    return (
      <>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Stock</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background main-frame">
          <SearchStock />
        </div>
      </>
    );
  }
}

export default connect()(Dashboard);
