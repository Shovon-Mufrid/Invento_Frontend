import React, { useState } from "react";
import { connect } from "react-redux";
import AddPaySlip from "./AddPaySlip";

import { Layout, Breadcrumb, Row, Col, Select, Divider } from "antd";
const { Content } = Layout;
const { Option } = Select;

const AddPayslip = () => {
  const [updatelist, setUpdatelist] = useState(false);

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>PaySlip</Breadcrumb.Item>
        <Breadcrumb.Item>Add</Breadcrumb.Item>
      </Breadcrumb>

      <div className="site-layout-background main-frame">
        <AddPaySlip setUpdatelist={setUpdatelist} updatelist={updatelist} />
      </div>
    </>
  );
};

export default connect()(AddPayslip);
