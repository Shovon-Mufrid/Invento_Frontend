import React, { useState, useRef } from "react";
import { connect } from "react-redux";

import Userroles from "./Userroles";
import PermissionList from "./permissionlist";

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
  const selectedRole = useRef(null);
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Tools</Breadcrumb.Item>
        <Breadcrumb.Item>Permissions</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background main-frame">
        <Userroles
          selectedRole={selectedRole}
          setreload={setreload}
          reload={reload}
        />
        <Divider />
        <PermissionList
          selectedRole={selectedRole}
          setreload={setreload}
          reload={reload}
        />
      </div>
    </>
  );
};

export default connect(null)(Index);
