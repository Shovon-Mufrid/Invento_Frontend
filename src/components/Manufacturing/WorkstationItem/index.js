import React, { useState } from "react";
import { connect } from "react-redux";
import List from "./List";
import Create from "./Create";

import { Breadcrumb } from "antd";

const Contact = ({ auth }) => {
  const [updatelist, setUpdatelist] = useState(true);
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Manufacturing</Breadcrumb.Item>
        <Breadcrumb.Item>Work Process</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background main-frame">
        {auth.permissions.includes("Manufacturing.Work Process_is_create") ? (
          <Create updatelist={updatelist} setUpdatelist={setUpdatelist} />
        ) : (
          ""
        )}
        <List updatelist={updatelist} setUpdatelist={setUpdatelist} />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Contact);
