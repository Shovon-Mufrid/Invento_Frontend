import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getAllTransfer } from "../../actions/transfer";

import RenderTable from "./RenderTable";

import { Layout, Breadcrumb, Row, Col } from "antd";
const { Content } = Layout;

const ProductDetails = ({ getAllTransfer, Auth }) => {
  const [details, setdetails] = useState([]);
  useEffect(() => {
    getAllTransfer().then(function (result) {
      setdetails(result);
    });
  }, []);

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Transfer</Breadcrumb.Item>
        <Breadcrumb.Item>All</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background main-frame">
        <RenderTable details={details} Auth={Auth} />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    Auth: state.auth,
  };
};

export default connect(mapStateToProps, { getAllTransfer })(ProductDetails);
