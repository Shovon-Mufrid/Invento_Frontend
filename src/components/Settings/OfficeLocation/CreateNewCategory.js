import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  createOfficeLocation,
  getAllOfficeLocation,
} from "../../../actions/officelocationAction";
import {
  Form,
  Input,
  Drawer,
  Button,
  Col,
  Row,
  message,
  TreeSelect,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const CreateNewAttribute = ({
  setUpdatelist,
  createOfficeLocation,
  getAllOfficeLocation,
  List,
}) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    getAllOfficeLocation();
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = async (values) => {
    let response = await createOfficeLocation(values);
    if (response.status == 201) {
      setUpdatelist(false);
      message.success(values.name + " Has been added to your office location");
      form.resetFields();
      setVisible(false);
    } else if (response.response.data.slug) {
      message.warning(response.response.data.slug);
    } else {
      message.error("Please contact with your service provider");
    }
  };

  return (
    <>
      <>
        <Button
          type="primary"
          onClick={showDrawer}
          style={{ marginBottom: "10px", float: "right" }}
        >
          <PlusOutlined /> New office location
        </Button>
        <Drawer
          title="Create a new office location"
          width={400}
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Form
            form={form}
            layout="vertical"
            hideRequiredMark
            onFinish={onFinish}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true, message: "Please enter name" }]}
                >
                  <Input placeholder="Please enter name" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="OfficeLocation_parent" label="Parent Location">
                  <TreeSelect treeData={List} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button
                onClick={() => {
                  form.resetFields();
                }}
                style={{ marginRight: 8 }}
              >
                Clear
              </Button>
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    List: state.officelocation.OfficeLocationlist,
  };
};

export default connect(mapStateToProps, {
  createOfficeLocation,
  getAllOfficeLocation,
})(CreateNewAttribute);
