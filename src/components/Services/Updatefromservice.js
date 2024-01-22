import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import ReactToPrint from "react-to-print";
import { DeleteOutlined } from "@ant-design/icons";
import dateFormat from "dateformat";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  updateService,
  getSpecificServices,
  getServicesCosting,
  deleteServicesCosting,
} from "../../actions/invoiceItem";
import Addcosting from "./Addcosting";
import { updateVariation } from "../../actions/variableProductAction";
import { getAllEmployee } from "../../actions/employeeAction";

import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Button,
  Col,
  Row,
  Select,
  message,
  TreeSelect,
  Space,
  Divider,
  Drawer,
  Image,
  Skeleton,
} from "antd";

const { Option } = Select;

const Quickview = ({
  id,
  updateService,
  getSpecificServices,
  setloadServicepage,
  getServicesCosting,
  deleteServicesCosting,
  updateVariation,
  employeeList,
  getAllEmployee,
}) => {
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(true);
  const [loadcosting, setloadcosting] = useState(false);
  const [details, setdetails] = useState();
  const [costs, setcosts] = useState();
  const [form] = Form.useForm();

  useEffect(() => {
    getAllEmployee();
    getSpecificServices(id).then((e) => {
      getServicesCosting(id).then((cost) => {
        setdetails(e);
        setcosts(cost);
        setloading(false);
        setloadcosting(false);
        form.resetFields();
      });
    });
    // getServicesCosting(id).then((cost) => {
    //   setcosts(cost);
    //   setloadcosting(false);
    // });
  }, [loadcosting]);

  const onFinish = (values) => {
    updateService(details.id, values);
    setVisible(false);
    form.resetFields();
    setloadServicepage(true);
  };

  const showDrawer = () => {
    getSpecificServices(id).then((e) => {
      getServicesCosting(id).then((cost) => {
        setdetails(e);
        setcosts(cost);
        setloading(false);
        setVisible(true);
        form.resetFields();
      });
    });
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const rendercosts = () => {
    if (loading) {
      return <Skeleton active />;
    } else {
      return costs.map((cost, index) => {
        return (
          <>
            <Row
              style={{
                borderRadius: "5px",
                padding: "10px",
                paddingBottom: "0px",
                border: "1px solid gray",
                marginBottom: "5px",
                minHeight: "50px",
              }}
            >
              <Col span={2}>{index + 1}.</Col>
              <Col span={7}>{cost.Material ? cost.Material.title : ""}</Col>
              <Col span={11} style={{ margin: "auto" }}>
                <span
                  style={{ margin: "auto" }}
                  dangerouslySetInnerHTML={{ __html: cost.details }}
                ></span>
              </Col>
              {/* <Col span={6}>{dateFormat(cost.updated_at, "mmmm dS")}</Col> */}
              <Col span={4} style={{ textAlign: "center" }}>
                {cost.cost}{" "}
                <DeleteOutlined
                  style={{ color: "Red", float: "right", marginTop: "5px" }}
                  onClick={(e) => {
                    console.log(cost);
                    if (cost.product > 0) {
                      let formData = new FormData();
                      formData.append(
                        "quantity",
                        cost.Material.quantity + cost.quantity
                      );
                      formData.append("data", "");
                      updateVariation(cost.Material.id, formData).then(
                        () => {}
                      );
                    }
                    deleteServicesCosting(cost.id).then(() => {
                      setloadcosting(true);
                    });
                  }}
                />
              </Col>
            </Row>
          </>
        );
      });
    }
  };

  const renderData = () => {
    if (loading) {
      return <>loading</>;
    } else {
      return (
        <Row>
          <Col span={12} style={{ paddingTop: "10px" }}>
            <Row>
              <Col span={8}>
                <h3>Issue date</h3>
                {dateFormat(details.issue_date, "mmmm dS, yyyy")}
              </Col>
              <Col span={7}>
                <h3>Delivery date</h3>
                {dateFormat(details.delivery_date, "mmmm dS, yyyy")}
              </Col>
              <Col span={3} style={{ textAlign: "center" }}>
                <h3>Quantity</h3>
                {details.quantity}
              </Col>
              {/* <Col span={6} style={{ textAlign: "center" }}>
                <h3>budget</h3>
                {details.price}
              </Col> */}
            </Row>
            <Divider />
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={details}
            >
              <Row gutter={16} style={{ paddingRight: "30px" }}>
                <Col span={24}>
                  <Form.Item
                    name="status"
                    label="Status"
                    rules={[
                      { required: true, message: "Please choose a status" },
                    ]}
                    style={{ fontWeight: "600", color: "#1890FF" }}
                  >
                    <Select
                      placeholder="Please choose a status"
                      style={{ fontWeight: "400" }}
                    >
                      <Option value="Factory Received">Factory Received</Option>
                      <Option value="On Hold">On Hold</Option>
                      <Option value="Processing">Processing</Option>
                      <Option value="Partially Ready">Partially Ready</Option>
                      <Option value="Ready (QC checked)">
                        Ready (QC checked)
                      </Option>
                      <Option value="Outlet Delivered">Outlet Delivered</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="employe"
                    label="Assigned to"
                    style={{ fontWeight: "600", color: "#1890FF" }}
                  >
                    <Select
                      showSearch
                      placeholder="Please choose an assignee"
                      style={{ fontWeight: "400" }}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {employeeList.map((employee) => {
                        if (employee.branchName == "Factory") {
                          return (
                            <Option value={employee.id}>{employee.name}</Option>
                          );
                        }
                      })}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="details"
                    label="Description"
                    style={{ minHeight: "40vh" }}
                  >
                    <ReactQuill theme="snow" style={{ height: "30vh" }} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button onClick={onClose} style={{ marginRight: 8 }}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col
            span={12}
            style={{
              padding: "30px",
              paddingTop: "10px",
              backgroundColor: "whitesmoke",
              borderRadius: "10px",
              minHeight: "85vh",
            }}
          >
            <Row>
              <Col span={6}>
                <h3>Total Cost</h3>
                {details.cost}
              </Col>
              <Col span={6}></Col>
              <Col span={12}>
                <h3>Last Update</h3>
                {dateFormat(details.updated_at, "mmmm dS, yyyy")}
              </Col>
            </Row>
            <Divider />
            <Addcosting id={details.id} setloadcosting={setloadcosting} />
            <Row
              style={{
                borderRadius: "5px",
                padding: "10px",
              }}
            >
              <Col span={2} style={{ margin: "auto" }}>
                <h3>SL.</h3>
              </Col>
              <Col span={7} style={{ margin: "auto" }}>
                <h3>Material</h3>
              </Col>
              <Col span={11} style={{ margin: "auto" }}>
                <h3>Cost Details</h3>
              </Col>

              <Col span={4} style={{ textAlign: "center" }}>
                <h3>Cost</h3>
              </Col>
            </Row>
            {rendercosts()}
          </Col>
        </Row>
      );
    }
  };

  return (
    <>
      <>
        <a href="#" onClick={showDrawer} style={{ margin: 4 }}>
          Update
        </a>
        <Drawer
          title="Service"
          width="1200"
          onClose={onClose}
          visible={visible}
        >
          {renderData()}
        </Drawer>
      </>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    employeeList: state.employee.employeelist,
  };
};

export default connect(mapStateToProps, {
  updateService,
  getSpecificServices,
  getServicesCosting,
  deleteServicesCosting,
  updateVariation,
  getAllEmployee,
})(Quickview);
