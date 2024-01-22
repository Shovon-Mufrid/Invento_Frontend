import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Skeleton, Tree, Row, Col, Divider } from "antd";
import { getSpecificcontravoucher } from "../../../actions/accounting/ContraVoucher";
import QuickviewRenderTable from "./QuickviewRenderTable";

const List = ({ getSpecificcontravoucher, reload, details }) => {
  const [data, setdata] = useState();
  const [loading, setloading] = useState(true);
  console.log(details);
  return (
    <>
      <Row style={{ border: "2px solid black", padding: "5px" }}>
        <Col span={24}>
          <QuickviewRenderTable List={details} />
        </Col>
      </Row>
    </>
  );
};

export default connect(null, {
  getSpecificcontravoucher,
})(List);
