import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Skeleton, Tree, Row, Col, Divider } from "antd";
import { getInvoiceItem, getServices } from "../../../actions/invoiceItem";
import ServiceviewRenderTable from "../../Services/RenderServiceTable";

const List = ({ getServices, reload, id }) => {
  const [data, setdata] = useState();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    getServices(id).then((result) => {
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
            <ServiceviewRenderTable List={data} />
          </Col>
        </Row>
      </>
    );
  }
};

export default connect(null, {
  getServices,
})(List);
