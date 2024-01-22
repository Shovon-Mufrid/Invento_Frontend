import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { pendingPurchase } from "../../../actions/purchase";

import { Layout, Breadcrumb, Row, Col, Card } from "antd";
const { Content } = Layout;

const ProductDetails = ({ pendingPurchase }) => {
  const [details, setdetails] = useState([]);
  useEffect(() => {
    pendingPurchase().then(function (result) {
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
                title="Pending purchase"
                className="summary_card transactions stock"
                bordered={true}
                extra={<> Total : {details ? details.length : 0}</>}
              >
                {details.map((item, index) => {
                  if (index < 10) {
                    return (
                      <Row>
                        <Col span={18}>
                          <p>Purchase no. {item.purchase_number}</p>
                        </Col>
                        <Col span={6} style={{ textAlign: "right" }}>
                          <p>{item.delivery_date}</p>
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

export default connect(null, { pendingPurchase })(ProductDetails);
