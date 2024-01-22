import React, { useState } from "react";
import ReactQuill from "react-quill";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import moment from "moment";
import { updateDraftCostSheet } from "../../../actions/draftcostsheetAction";
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

const dateFormat = "DD-MM-YYYY";

const EditDraftCostSheet = ({
  details,
  content,
  setReload,
  reload,
  updateDraftCostSheet,
  setUpdatelist,
}) => {
  const [visible, setVisible] = useState(false);
  // const [form] = Form.useForm();
  // const dispatch = useDispatch();
  console.log(details);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    updateDraftCostSheet(details.id, values);
    setUpdatelist(false);
    message.success(
      "Draft Cost Sheet of" + values.style_name + "Has Been Updated"
    );
    setVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showDrawer}
        style={{ marginBottom: "10px", marginRight: "10px" }}
      >
        Update Cost Sheet
        {/* <PlusOutlined />Update Cost Sheet */}
      </Button>

      <Drawer
        title="Update Cost Sheet"
        width={800}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form layout="vertical" onFinish={onFinish} initialValues={details}>
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
                {/* <DatePicker style={{ width: "100%" }} /> */}
                <Input
              disabled
              type="date"
              
            />
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
                <Input
                  disabled
                  type="number"
                  min={0}
                  placeholder="Net Total Cost"
                />
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
            <Input
              disabled
              type="number"
              min={0}
              placeholder="Net Selling Price"
            />
          </Form.Item>

          <Form.Item>
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default connect(null, {
  updateDraftCostSheet,
})(EditDraftCostSheet);
