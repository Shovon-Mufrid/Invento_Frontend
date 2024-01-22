import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getAllWordrobe } from "../../actions/wordrobe";

import RenderTable from "./RenderTable";

import { Layout, Breadcrumb, Row, Col } from "antd";
const { Content } = Layout;

const ProductDetails = ({ getAllWordrobe }) => {
  const [details, setdetails] = useState([]);
  useEffect(() => {
    getAllWordrobe().then(function (result) {
      console.log(result);
      setdetails(result);
    });
  }, []);

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Wordrobe</Breadcrumb.Item>
        <Breadcrumb.Item>All</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background main-frame">
        <RenderTable details={details} />
      </div>
    </>
  );
};

export default connect(null, { getAllWordrobe })(ProductDetails);
