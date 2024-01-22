import React, { useState } from "react";
import { connect } from "react-redux";
import List from "./List";
import CreateNewChart from "./CreateNewChart";

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
        <Breadcrumb.Item>Chart of accounts</Breadcrumb.Item>
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
