import { Skeleton, Row, Col, Descriptions, Divider } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllproductionlines } from "../../../actions/Manufacturing/productionlinesAction";
import Rendertable from "./Rendertable";
import moment from "moment";

import Create from "./ProductionLineitem/Create";
import ListItem from "./ProductionLineitem/List";

const ContactList = ({
  getAllproductionlines,
  List,
  updatelist,
  setUpdatelist,
}) => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getAllproductionlines().then((result) => {
      setdata(result);
      setloading(false);
    });
  }, [updatelist]);

  if (loading) {
    return <Skeleton active />;
  } else
    return (
      <>
        {/* <Rendertable
          List={data}
          updatelist={updatelist}
          setUpdatelist={setUpdatelist}
        /> */}
        <Divider />
        {data.map((producttionline) => {
          return (
            <>
              <Row
                style={{ border: "1px solid lightgray", marginBottom: "10px" }}
              >
                <Col
                  span={10}
                  style={
                    producttionline.status == "Ongoing"
                      ? { backgroundColor: "#fafafa" }
                      : { backgroundColor: "#fafafa" }
                  }
                >
                  {" "}
                  <Descriptions
                    // title="Production Line details"
                    layout="Vertical"
                    bordered
                  >
                    <Descriptions.Item label="Line Name" span={4}>
                      <b>{producttionline.line_name}</b>
                    </Descriptions.Item>
                    <Descriptions.Item label="Location" span={4}>
                      {producttionline.location}
                    </Descriptions.Item>
                    <Descriptions.Item label="Description" span={4}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: producttionline.description,
                        }}
                      ></div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Start Date" span={2}>
                      {moment(producttionline.start_date).format("DD-MM-YYYY")}
                    </Descriptions.Item>
                    <Descriptions.Item label="End Date" span={2}>
                      {moment(producttionline.end_date).format("DD-MM-YYYY")}
                    </Descriptions.Item>
                    <Descriptions.Item label="Capacity" span={2}>
                      {producttionline.capacity}
                    </Descriptions.Item>
                    <Descriptions.Item label="Consumed" span={2}>
                      {producttionline.capacity_consumed}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={4}>
                      {producttionline.status}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col span={14}>
                  <Create
                    details={producttionline}
                    setUpdatelist={setUpdatelist}
                    updatelist={updatelist}
                  />
                  <ListItem
                    details={producttionline}
                    setUpdatelist={setUpdatelist}
                    updatelist={updatelist}
                  />
                </Col>
              </Row>
            </>
          );
        })}
      </>
    );
};

export default connect(null, {
  getAllproductionlines,
})(ContactList);
