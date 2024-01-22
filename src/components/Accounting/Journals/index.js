import React, { useState } from "react";
import { connect } from "react-redux";

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
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Accounting</Breadcrumb.Item>
        <Breadcrumb.Item>Accounts</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background main-frame">
        <Row>
          <Col span={24}>
            <List reload={reload} setreload={setreload} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default connect(null)(Index);
