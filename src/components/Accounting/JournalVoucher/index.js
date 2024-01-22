import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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

const Index = ({auth}) => {
  const [reload, setreload] = useState(false);

  const renderview = () => {
    return (
      <Row>
        <Col span={24}>
          <Button
            type="primary"
            style={{ float: "right", marginBottom: "10px" }}
          >
           { auth.permissions.includes(
                "Accounting.Journal entry voucher_is_create"
              )  ?<Link to="/accounting/journalvoucher/create">
              Create new journal voucher
            </Link>:""}
          </Button>
        </Col>
        <Col span={24}>
          <List reload={reload} setreload={setreload} />
        </Col>
      </Row>
    );
  };
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Accounting</Breadcrumb.Item>
        <Breadcrumb.Item>Journal voucher</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background main-frame">{renderview()}</div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};


export default connect(mapStateToProps)(Index);
