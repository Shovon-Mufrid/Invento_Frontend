import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { updateworkstations } from "../../../actions/Manufacturing/workstationsAction";
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
  DatePicker,
} from "antd";

const { Option } = Select;

const EditContact = ({
  details,
  setUpdatelist,
  updatelist,
  updateworkstations,
  ContactList,
}) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const initial = { description: "" };
  if (details.start_date != null && details.start_date != undefined) {
    details.start_date = moment(details.start_date);
  }
  if (details.end_date != null && details.end_date != undefined) {
    details.end_date = moment(details.end_date);
  }
  const showDrawer = () => {
    form.setFieldsValue(details);
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    updateworkstations(details.id, values).then((res) => {
      setUpdatelist(!updatelist);
      setVisible(false);
    });
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Edit
      </Button>

      <Drawer
        title="Edit Workorder"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={initial}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="workstation_name" label="Workstation Name">
                <Input placeholder="Please enter workstation name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="description" label="Description">
                <ReactQuill theme="snow" />
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
      </Drawer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ContactList: state.contacts.contacttype,
  };
};

export default connect(mapStateToProps, { updateworkstations })(EditContact);
