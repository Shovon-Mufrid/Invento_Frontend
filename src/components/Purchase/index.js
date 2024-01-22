import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { getAllPurchase, getAllPurchaseP } from "../../actions/purchase";
import RenderTable from "./RenderTable";

import { Layout, Breadcrumb, Row, Col, Skeleton } from "antd";
const { Content } = Layout;

const ProductDetails = ({ getAllPurchase, getAllPurchaseP }) => {
  const [details, setdetails] = useState([]);
  const pageno = useRef(1);
  const page_size = useRef(10);
  const [reload, setreload] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    getAllPurchaseP(pageno.current, page_size.current).then(function (result) {
      setdetails(result);
      setUpdate(true);
    });
  }, [reload]);
  const rendertable = () => {
    if (update) {
      return (
        <RenderTable
          details={details}
          pageno={pageno}
          page_size={page_size}
          setreload={setreload}
          reload={reload}
          setUpdate={setUpdate}
        />
      );
    } else {
      return <Skeleton active />;
    }
  };
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Purchase Order</Breadcrumb.Item>
        <Breadcrumb.Item>All</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background main-frame">
        <Row></Row>
        {rendertable()}
      </div>
    </>
  );
};

export default connect(null, { getAllPurchase, getAllPurchaseP })(
  ProductDetails
);
