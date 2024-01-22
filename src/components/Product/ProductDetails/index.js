import React, { useState } from "react";
import { connect } from "react-redux";
// import ProductList from "./ProductList";
// import CreateNewAttribute from "./CreateNewAttribute";
import AllProductList from "./AllProductList";
import ViewProduct from "./ViewProduct";
import SingleProductDetailsTable from "./SingleProductDetailsTable";

import { Layout, Breadcrumb, Row, Col } from "antd";
const { Content } = Layout;

const ProductDetails = () => {
  const [updatelist, setUpdatelist] = useState(true);
  const [trigger, settrigger] = useState(true);
  const [details, setdetails] = useState([]);

  const setselectedproduct = (trigger, details) => {
    settrigger(trigger);
    setdetails(details);
  };
  const renderdata = () => {
    if (trigger) {
      return (
        <AllProductList
          updatelist={updatelist}
          setUpdatelist={setUpdatelist}
          setselectedproduct={setselectedproduct}
        />
      );
    } else {
      return (
        <SingleProductDetailsTable
          setUpdatelist={setUpdatelist}
          details={details}
          settrigger={settrigger}
        />
      );
    }
  };

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Products</Breadcrumb.Item>
        <Breadcrumb.Item>All</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background main-frame">
        <Row>
          <Col span={24}>{renderdata()}</Col>
        </Row>
      </div>
    </>
  );
};

export default connect()(ProductDetails);
