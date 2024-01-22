import { Row, Skeleton, Col, Divider, Button } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllworkstationsitem } from "../../../actions/Manufacturing/workstationsitemAction";
import { updateproductionlinesitem } from "../../../actions/Manufacturing/productionlinesitemAction";
import Rendertable from "./Rendertable";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import AddNewProduct from "./AddNewProduct";
import UpdateProduct from "./UpdateProduct";

const ContactList = ({
  getAllworkstationsitem,
  updateproductionlinesitem,
  List,
  updatelist,
  setUpdatelist,
}) => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getAllworkstationsitem().then((result) => {
      setdata(result);
      setloading(false);
    });
  }, [updatelist]);

  const renderprocess = (status) => {
    return data.map((process) => {
      return process.line_items.map((item) => {
        console.log(process);
        if (item.status == status) {
          return (
            <>
              <div
                style={{
                  border: "1px solid gray",
                  borderRadius: "5px",
                  marginBottom: "5px",
                  backgroundColor: "#f0f2f5",
                }}
              >
                <Row>
                  {item.status != "Pending" ? (
                    <Col span={2}>
                      <Button
                        type="link"
                        style={{ height: "100%" }}
                        onClick={() => {
                          let newstatus = item.status;
                          if (newstatus === "Complete") {
                            newstatus = "Testing";
                          } else if (newstatus === "Testing") {
                            newstatus = "Working";
                          } else if (newstatus === "Working") {
                            newstatus = "Pending";
                          }
                          const formData = new FormData();
                          formData.append("status", newstatus);
                          updateproductionlinesitem(item.id, formData).then(
                            (res) => {
                              setUpdatelist(!updatelist);
                            }
                          );
                        }}
                      >
                        <LeftOutlined />
                      </Button>
                    </Col>
                  ) : (
                    <Col span={2}></Col>
                  )}

                  <Col span={19}>
                    <h4>{process.workstation_name}</h4>
                    <p>
                      {item.workorder_name}
                      <br></br>
                      {item.workorder_item.description}
                      <br></br>
                      {item.capacity}

                      <br></br>
                      {/* {item.status == "Complete" ? (
                        <>
                          <Button
                            onClick={() => {
                              alert("Complete");
                            }}
                          >
                            Send to Warehouse
                          </Button>
                        </>
                      ) : (
                        ""
                      )} */}
                    </p>
                  </Col>
                  <Col></Col>

                  {item.status != "Complete" ? (
                    <Col span={2}>
                      <Button
                        type="link"
                        style={{ height: "100%" }}
                        onClick={() => {
                          let newstatus = item.status;
                          if (newstatus === "Pending") {
                            newstatus = "Working";
                          } else if (newstatus === "Working") {
                            newstatus = "Testing";
                          } else if (newstatus === "Testing") {
                            newstatus = "Complete";
                          }
                          const formData = new FormData();
                          formData.append("status", newstatus);
                          updateproductionlinesitem(item.id, formData).then(
                            (res) => {
                              setUpdatelist(!updatelist);
                            }
                          );
                        }}
                      >
                        <RightOutlined />
                      </Button>
                    </Col>
                  ) : (
                    <Col span={2}></Col>
                  )}
                </Row>
              </div>
            </>
          );
        }
      });
    });
  };

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
        <Row style={{ textAlign: "center" }}>
          <Col span={5}>
            <h3 style={{ backgroundColor: "gray" }}>Pending</h3>
            {renderprocess("Pending")}
          </Col>
          <Col span={5} offset={1}>
            <h3 style={{ backgroundColor: "orange" }}>Working</h3>
            {renderprocess("Working")}
          </Col>
          <Col span={5} offset={1}>
            <h3 style={{ backgroundColor: "yellow" }}>Testing</h3>
            {renderprocess("Testing")}
          </Col>
          <Col span={5} offset={1}>
            <h3 style={{ backgroundColor: "green" }}>Complete</h3>
            {renderprocess("Complete")}
          </Col>
        </Row>
      </>
    );
};

export default connect(null, {
  getAllworkstationsitem,
  updateproductionlinesitem,
})(ContactList);
