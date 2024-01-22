import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NewSidebar from "../../Layout/NewSidebar";
import Navbar from "../../Layout/Navbar";
import List from "./List";

import {
  Layout,
  Breadcrumb,
  Row,
  Col,
  Divider,
  Space,
  Popconfirm,
  Button,
  message,
} from "antd";

const { Content } = Layout;

const Index = ({}) => {
  const [reload, setreload] = useState(false);
  return (
    <>
      <Layout className="window-frame">
        <Layout className="site-layout">
          <Content className="main-frame-content">
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Report</Breadcrumb.Item>
              <Breadcrumb.Item>Userlog</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background main-frame">
              <Row>
                <Col span={24}>
                  <List reload={reload} setreload={setreload} />
                </Col>
              </Row>
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default connect(null)(Index);
