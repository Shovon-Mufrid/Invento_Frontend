import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getAllTransfer_not_Received } from "../../../actions/transfer";

import { Layout, Breadcrumb, Row, Col, Card } from "antd";
const { Content } = Layout;

const ProductDetails = ({ getAllTransfer_not_Received }) => {
  const [details, setdetails] = useState([]);
  useEffect(() => {
    getAllTransfer_not_Received().then(function (result) {
      setdetails(result);
    });
  }, []);

  return (
    <>
      <Row>
        <Col
          span={24}
          style={{ padding: "1rem", border: "1px solid whitesmoke" }}
        >
          <Row>
            <Col
              span={24}
              style={{
                marginBottom: "1rem",
                border: "1px solid whitesmoke",
              }}
            >
              <Card
                title="Pending stock transfer"
                className="summary_card transactions stock"
                bordered={true}
                extra={<> Total : {details.length}</>}
              >
                {details.map((item, index) => {
                  if (index < 10) {
                    return (
                      <Row>
                        <Col span={20}>
                          <p>Challan no. {item.tansfer_number}</p>
                        </Col>
                        <Col span={4} style={{ textAlign: "right" }}>
                          <p>{item.quantity}</p>
                        </Col>
                      </Row>
                    );
                  }
                })}
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default connect(null, { getAllTransfer_not_Received })(ProductDetails);
