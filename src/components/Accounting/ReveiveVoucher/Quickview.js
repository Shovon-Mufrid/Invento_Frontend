import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Skeleton, Tree, Row, Col, Divider } from "antd";
import { getSpecificreceivevoucheritems } from "../../../actions/accounting/ReceiveVoucher";
import QuickviewRenderTable from "./QuickviewRenderTable";

const List = ({ getSpecificreceivevoucheritems, reload, id }) => {
  const [data, setdata] = useState();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    getSpecificreceivevoucheritems(id).then((result) => {
      setdata(result);
      setloading(false);
      console.log(data);
    });
  }, [reload]);

  if (loading) {
    return <Skeleton active />;
  } else {
    return (
      <>
        <Row style={{ border: "2px solid black", padding: "5px" }}>
          <Col span={24}>
            <QuickviewRenderTable List={data} />
          </Col>
        </Row>
      </>
    );
  }
};

export default connect(null, {
  getSpecificreceivevoucheritems,
})(List);
