import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { updateproductionlines } from "../../../../actions/Manufacturing/productionlinesAction";
import { updateproductionlinesitem } from "../../../../actions/Manufacturing/productionlinesitemAction";
import { getAllWorkorder } from "../../../../actions/Manufacturing/workorderAction";
import { getAllWorkorderitembyfilter } from "../../../../actions/Manufacturing/workorderitemAction";
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
  updateproductionlinesitem,
  getAllWorkorderitembyfilter,
  ContactList,
  getAllWorkorder,
}) => {
  const initial = { description: "" };
  const [visible, setVisible] = useState(false);
  const [workorder, setworkorder] = useState([]);
  const [workorderitem, setworkorderitem] = useState([]);
  const selectedworkorder = useRef(details.Workorder);
  const [reload, setreload] = useState(false);
  const [loading, setloading] = useState(false);
  const [form] = Form.useForm();

  if (details.start_date != null && details.start_date != undefined) {
    details.start_date = moment(details.start_date);
  }
  if (details.end_date != null && details.end_date != undefined) {
    details.end_date = moment(details.end_date);
  }

  useEffect(() => {
    if (selectedworkorder.current != "") {
      setloading(true);

      getAllWorkorderitembyfilter(selectedworkorder.current).then((result) => {
        setworkorderitem(result);
        setloading(false);
      });
    }
  }, [reload]);

  const showDrawer = () => {
    getAllWorkorder().then((result) => {
      setworkorder(result);
      form.setFieldsValue(details);
      setVisible(true);
    });
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = (values) => {
    updateproductionlinesitem(details.id, values).then((res) => {
      setUpdatelist(!updatelist);
      setVisible(false);
    });
  };

  return (
    <>
      <Button type="link" onClick={showDrawer}>
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
          {/* <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="Workorder" label="Workorder">
                <Select
                  placeholder="Please choose a workorder"
                  onChange={(event) => {
                    selectedworkorder.current = event;
                    form.setFieldsValue({ WorkOrderItem: "" });
                    setreload(!reload);
                  }}
                >
                  {workorder.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.order_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row> */}
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="WorkOrderItem" label="Workorder Item">
                <Select placeholder="Please choose a workorder item">
                  {workorderitem.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.description}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="capacity" label="Capacity">
                <InputNumber placeholder="Capacity" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="start_date" label="Start Date">
                <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="end_date" label="End Date">
                <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
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

export default connect(mapStateToProps, {
  updateproductionlinesitem,
  getAllWorkorder,
  getAllWorkorderitembyfilter,
})(EditContact);
