import React, { useState } from "react";
import ReactQuill from "react-quill";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { createDraftCostSheet } from "../../../actions/draftcostsheetAction";
import {
  Form,
  Input,
  Button,
  Drawer,
  message,
  DatePicker,
  Divider,
  Select,
  Col,
  Row,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

const CreateNewDraftCost = ({
  setReload,
  reload,
  createDraftCostSheet,
  setUpdatelist,
}) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  // const dispatch = useDispatch();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    createDraftCostSheet(values);
    setUpdatelist(false);
    message.success(values.name + " Has been added to Draft Cost Sheet");
    setVisible(false);
    form.resetFields();
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showDrawer}
        style={{ marginBottom: "10px", float: "right" }}
      >
        <PlusOutlined /> New Draft Cost Sheet
      </Button>
      <Drawer
        title="Create a new Draft Cost Sheet"
        width={800}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="style_name"
                label="Style Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter the style name",
                  },
                ]}
              >
                <Input placeholder="Please enter the style name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="style_code"
                label="Style Code"
                rules={[
                  {
                    required: true,
                    message: "Please enter the style code",
                  },
                ]}
              >
                <Input placeholder="Please enter the style code" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="client_name"
                label="Client Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter the client name",
                  },
                ]}
              >
                <Input placeholder="Please enter the client name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="designer_name"
                label="Designer Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter the designer name",
                  },
                ]}
              >
                <Input placeholder="Please enter the designer name" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please enter the description",
              },
            ]}
          >
            {/* <Input.TextArea placeholder="Please enter the description" /> */}
            <ReactQuill theme="snow" />
          </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="date" label="Order Date">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          </Col>
          <Col span={12}>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[
              {
                required: true,
                message: "Please enter the quantity",
              },
            ]}
          >
            <Input
              type="number"
              min={0}
              placeholder="Please enter the quantity"
            />
          </Form.Item>
          </Col>
        </Row>  

          
          {/* ================================================================================================= */}
          {/* ================================================================================================= */}
          {/* ================================================================================================= */}

          {/* <Divider></Divider>
            <h3>Variations</h3>
            <div style={{ backgroundColor: "#f0f2f5", padding: "10px" }}>
              <Form.List name="orders">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <Row gutter={16}>
                        <Col span={4}>
                          <Form.Item
                            label="Cost Sheet Item"
                            {...restField}
                            name={[name, "cost_sheet_items"]}
                            fieldKey={[fieldKey, "cost_sheet_items"]}
                            rules={[
                              {
                                required: true,
                                message: "Please enter a Cost Sheet Item",
                              },
                            ]}
                          >                            
                            <Input
                              
                              placeholder="Cost Sheet Item"
                            />
                          </Form.Item>
                        </Col>

                        <Col span={4}>
                          <Form.Item
                            label="Unit Name"
                            {...restField}
                            name={[name, "unit_name"]}
                            fieldKey={[fieldKey, "unit_name"]}
                            rules={[
                              {
                                required: true,
                                message: "Please enter a unit name",
                              },
                            ]}
                          >                            
                            <Input
                             
                              placeholder="unit name"
                            />
                          </Form.Item>
                        </Col>

                        <Col span={4}>
                          <Form.Item
                            label="Unit Quantity"
                            {...restField}
                            name={[name, "unit_quantity"]}
                            fieldKey={[fieldKey, "unit_quantity"]}
                            rules={[
                              {
                                required: true,
                                message: "Please enter a quantity",
                              },
                            ]}
                          >
                            <Input
                              // defaultValue={0}
                              // addonBefore="BDT"
                              type="number"
                              placeholder="Unit"
                              // disabled
                            />
                        </Form.Item>
                        </Col>

                        <Col span={4}>
                          <Form.Item
                            label="Unit Price"
                            {...restField}
                            name={[name, "unit_price"]}
                            fieldKey={[fieldKey, "unit_price"]}
                            rules={[
                              {
                                required: false,
                                message: "Please enter a unit price",
                              },
                            ]}
                          >
                            <Input
                              // defaultValue={0}
                              addonBefore="BDT"
                              type="number"
                              placeholder="unit price"
                              // disabled
                            />
                          </Form.Item>
                        </Col>

                        <Col span={6} offset={1}>
                          <Form.Item
                            label="Amount"
                            {...restField}
                            name={[name, "amount"]}
                            fieldKey={[fieldKey, "amount"]}
                            rules={[
                              {
                                required: false,
                                message: "Please enter an amount",
                              },
                            ]}
                          >
                            <Input
                              // defaultValue={0}
                              addonBefore="BDT"
                              type="number"
                              placeholder="amount"
                              // disabled
                            />
                          </Form.Item>
                        </Col>
                        <MinusCircleOutlined
                          onClick={() => remove(name)}
                          style={{ margin: "auto" }}
                        />
                      </Row>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={(e) => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div> */}

          {/* ================================================================================================= */}
          {/* ================================================================================================= */}
          {/* ================================================================================================= */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="net_total_cost"
            label="Net Total Cost"
            rules={[
              {
                required: false,
                message: "Please add module amounts",
              },
            ]}
          >
            <Input disabled type="number" min={0} placeholder="Net Total Cost" />
          </Form.Item>
        </Col>  
        <Col span={12}>
          <Form.Item
            name="profit_percentage"
            label="Profit Percentage"
            rules={[
              {
                required: false,
                message: "Please Add Percentage ",
              },
            ]}
          >
            <Input
              type="number"
              min={0}
              placeholder="Please enter Percentage"
            />
          </Form.Item>
          </Col>
        </Row>
          <Form.Item
            name="net_selling_price"
            label="Net Selling Price"
            rules={[
              {
                required: false,
                // message: "Please add module amounts",
              },
            ]}
          >
            <Input disabled type="number" min={0} placeholder="Net Selling Price" />
          </Form.Item>

          <Form.Item>
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default connect(null, {
  createDraftCostSheet,
})(CreateNewDraftCost);
