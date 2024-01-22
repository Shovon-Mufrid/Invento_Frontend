import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { updateworkstationsitem } from "../../../actions/Manufacturing/workstationsitemAction";
import { getAllworkstations } from "../../../actions/Manufacturing/workstationsAction";
import { getAllproductionlines } from "../../../actions/Manufacturing/productionlinesAction";
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
  updateworkstationsitem,
  getAllworkstations,
  getAllproductionlines,
  ContactList,
}) => {
  const [visible, setVisible] = useState(false);
  const [workstation, setworkstation] = useState([]);
  const [productionline, setproductionline] = useState([]);
  const [form] = Form.useForm();
  const initial = { description: "" };
  if (details.start_date != null && details.start_date != undefined) {
    details.start_date = moment(details.start_date);
  }
  if (details.end_date != null && details.end_date != undefined) {
    details.end_date = moment(details.end_date);
  }
  const showDrawer = () => {
    getAllworkstations().then((res) => {
      setworkstation(res);
      getAllproductionlines().then((result) => {
        setproductionline(result);
        form.setFieldsValue(details);
        setVisible(true);
      });
    });
  };

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    updateworkstationsitem(details.id, values).then((data) => {
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
              <Form.Item name="ProductionLine" label="Production Line">
                <Select placeholder="Please choose a production line">
                  {productionline.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.line_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="Workstation" label="Workstation">
                <Select placeholder="Please choose a workstation">
                  {workstation.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.workstation_name}
                    </Option>
                  ))}
                </Select>
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
  updateworkstationsitem,
  getAllworkstations,
  getAllproductionlines,
})(EditContact);
