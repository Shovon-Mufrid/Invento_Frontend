import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  getSpecificcontacttype,
  updatecontacttype,
} from "../../../actions/settings";
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
  DatePicker,
  Skeleton,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const CreateNewContact = ({
  getSpecificcontacttype,
  updatecontacttype,
  details,
  setreload,
  auth,
}) => {
  const [data, setdata] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    getSpecificcontacttype(details.id).then((result) => {
      setdata(result);
    });
  }, [visible]);

  const showDrawer = () => {
    getSpecificcontacttype(details.id).then((result) => {
      setdata(result);
      form.setFieldsValue(result);
      setVisible(true);
      setloading(false);
    });
  };

  const onClose = () => {
    form.resetFields();
    setdata([]);
    setloading(true);
    setVisible(false);
  };

  const onFinish = (values) => {
    updatecontacttype(details.id, values);
    form.resetFields();
    setreload(true);
    setdata([]);
    setloading(true);
    setVisible(false);
  };

  const renderdata = () => {
    if (loading) {
      return <Skeleton active />;
    } else {
      return (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={data}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="name" label="Name">
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      );
    }
  };

  return (
    <>
      <>
        {auth.permissions.includes("Settings.Contact Groups_is_update") ? (
          <Button type="link" onClick={showDrawer}>
            Edit
          </Button>
        ) : (
          ""
        )}
        <Drawer
          title="Update group"
          width={400}
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          {renderdata()}
        </Drawer>
      </>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  getSpecificcontacttype,
  updatecontacttype,
})(CreateNewContact);
