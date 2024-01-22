import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  createmanufacturingCost,
  getAllmanufacturingCostbyfilter,
  deletemanufacturingCost,
} from "../../../../actions/Manufacturing/manufacturingCostAction";
import { getAllWorkorder } from "../../../../actions/Manufacturing/workorderAction";

import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Drawer,
  Button,
  Col,
  Row,
  Select,
  message,
  Divider,
  DatePicker,
  Spin,
  Popconfirm,
} from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

var currentdate = new Date();

const Create = ({
  createmanufacturingCost,
  getAllWorkorder,
  getAllmanufacturingCostbyfilter,
  deletemanufacturingCost,
  setUpdatelist,
  ContactList,
  updatelist,
  details,
}) => {
  const initial = { description: "" };
  const [visible, setVisible] = useState(false);
  const [workorder, setworkorder] = useState([]);
  const [costing, setcosting] = useState([]);
  const [workorderitem, setworkorderitem] = useState([]);
  const selectedworkorder = useRef("");
  const [reload, setreload] = useState(false);
  const [loading, setloading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      setloading(true);
      getAllmanufacturingCostbyfilter(details.ProductionLine, details.id).then(
        (result) => {
          setcosting(result);
          setloading(false);
        }
      );
    }
  }, [reload]);

  const showDrawer = () => {
    getAllmanufacturingCostbyfilter(details.ProductionLine, details.id).then(
      (result) => {
        setcosting(result);
        setVisible(true);
      }
    );
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = (values) => {
    values["ProductionLine"] = details.ProductionLine;
    values["ProductionLine_item"] = details.id;
    createmanufacturingCost(values).then((res) => {
      form.resetFields();
      setUpdatelist(!updatelist);
      // message.success(values.name + " Has been added to your contact list");
      setreload(!reload);
    });
  };

  const confirm = (id) => {
    deletemanufacturingCost(id).then((rs) => {
      setUpdatelist(!updatelist);
      message.success("Removed");
      setreload(!reload);
    });
  };

  const options = [
    { value: "Fabrics", label: "Fabrics" },
    { value: "Trims/Accessories", label: "Trims/Accessories" },
    { value: "Labor Cost", label: "Labor Cost" },
  ];

  const unit_name = [
    { value: "Yards", label: "Yards" },
    { value: "Pcs", label: "Pcs" },
    { value: "Hours", label: "Hours" },
  ];

  return (
    <>
      <>
        <Button
          type="link"
          onClick={showDrawer}
          //   style={{ marginBottom: "10px", float: "right" }}
        >
          Costing
        </Button>
        <Drawer
          title="Costing"
          width="40%"
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            // initialValues={initial}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="type" label="Cost Type">
                  <Select options={options} placeholder="Select an option" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Cost name"
                  rules={[{ required: true, message: "Add Name" }]}
                >
                  <Input type="text" placeholder="Name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="description" label="Description">
                  <Input type="text" placeholder="Name" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="unit_name" label="Unit Name">
                  <Select options={unit_name} placeholder="Unit Name" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="cost_per_unit" label="Cost">
                  <Input type="number" min={0} placeholder="Cost" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="quantity" label="Quantity">
                  <Input type="number" min={0} placeholder="Quantity" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}></Row>

            <Form.Item>
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Form>
          <Divider />
          <Spin spinning={loading}>
            <Divider orientation="left">Fabrics</Divider>
            <table className="costing_table">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Unit</th>
                <th>Cost/Unit</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
              {costing.map((cost) => {
                if (cost.type == "Fabrics") {
                  return (
                    <tr>
                      <td>{cost.name}</td>
                      <td>{cost.description}</td>
                      <td>{cost.unit_name}</td>
                      <td>{cost.cost_per_unit}</td>
                      <td>{cost.quantity}</td>
                      <td>{cost.total_cost}</td>
                      <td>
                        <Button danger style={{ marginRight: "10px" }}>
                          <Popconfirm
                            title="Are you sure to delete this?"
                            onConfirm={() => confirm(cost.id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Link to="#">X</Link>
                          </Popconfirm>
                        </Button>
                      </td>
                    </tr>
                  );
                }
              })}
            </table>

            <Divider orientation="left">Trims/Accessories</Divider>
            <table className="costing_table">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Unit</th>
                <th>Cost/Unit</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
              {costing.map((cost) => {
                if (cost.type == "Trims/Accessories") {
                  return (
                    <tr>
                      <td>{cost.name}</td>
                      <td>{cost.description}</td>
                      <td>{cost.unit_name}</td>
                      <td>{cost.cost_per_unit}</td>
                      <td>{cost.quantity}</td>
                      <td>{cost.total_cost}</td>
                      <td>
                        <Button danger style={{ marginRight: "10px" }}>
                          <Popconfirm
                            title="Are you sure to delete this?"
                            onConfirm={() => confirm(cost.id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Link to="#">X</Link>
                          </Popconfirm>
                        </Button>
                      </td>
                    </tr>
                  );
                }
              })}
            </table>

            <Divider orientation="left">Labor Cost</Divider>
            <table className="costing_table">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Unit</th>
                <th>Cost/Unit</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
              {costing.map((cost) => {
                if (cost.type == "Labor Cost") {
                  return (
                    <tr>
                      <td>{cost.name}</td>
                      <td>{cost.description}</td>
                      <td>{cost.unit_name}</td>
                      <td>{cost.cost_per_unit}</td>
                      <td>{cost.quantity}</td>
                      <td>{cost.total_cost}</td>
                      <td>
                        <Button danger style={{ marginRight: "10px" }}>
                          <Popconfirm
                            title="Are you sure to delete this?"
                            onConfirm={() => confirm(cost.id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Link to="#">X</Link>
                          </Popconfirm>
                        </Button>
                      </td>
                    </tr>
                  );
                }
              })}
            </table>
          </Spin>
        </Drawer>
      </>
    </>
  );
};

export default connect(null, {
  createmanufacturingCost,
  getAllWorkorder,
  getAllmanufacturingCostbyfilter,
  deletemanufacturingCost,
})(Create);
