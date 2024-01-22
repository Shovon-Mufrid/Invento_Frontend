import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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
  Affix,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const CreateNewContact = ({
  measurements,
  product,
  setservicetrigger,
  bill,
  serviceindex,
}) => {
  const initial = { Note: "" };
  const [visible, setVisible] = useState(false);
  const index = useRef(-1);
  const [form] = Form.useForm();

  const showDrawer = () => {
    for (let i = 0; i < measurements.current.length; i++) {
      if (
        (measurements.current[i].product == product &&
          typeof measurements.current[i].product != "undefined") ||
        (measurements.current[i].serviceindex == serviceindex &&
          typeof measurements.current[i].serviceindex != "undefined")
      ) {
        form.setFieldsValue(measurements.current[i]);
        index.current = i;
        setVisible(true);
      }
    }
    if (index.current < 0) {
      form.setFieldsValue(bill.current.basicmeasurement);
      setVisible(true);
    }
  };

  const onClose = () => {
    // form.resetFields();
    setVisible(false);
  };

  const onFinish = (values) => {
    if (product > 0) {
      values["product"] = product;
    } else if (serviceindex > -1) {
      values["serviceindex"] = serviceindex;
    }

    if (index.current > -1) {
      measurements.current[index.current] = values;
    } else {
      measurements.current.push(values);
    }
    setservicetrigger(true);
    setVisible(false);
  };

  return (
    <>
      <>
        <Button type="link" onClick={showDrawer} style={{ paddingLeft: "0px" }}>
          Measurements
          <PlusOutlined />
        </Button>
        <Drawer
          title="Measurement details"
          width="100%"
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Form
            form={form}
            layout="horizontal"
            onFinish={onFinish}
            initialValues={initial}
            labelCol={{
              span: 12,
            }}
            wrapperCol={{
              span: 16,
            }}
            labelAlign="left"
          >
            <Row gutter={16}>
              <Col sm={{ span: 24 }} lg={{ span: 10 }}>
                <h3>TOPS</h3>
                <Row>
                  <Form.Item name="Blouse" valuePropName="checked">
                    <Checkbox>Blouse</Checkbox>
                  </Form.Item>
                  <Form.Item name="Kameez" valuePropName="checked">
                    <Checkbox>Kameez</Checkbox>
                  </Form.Item>
                  <Form.Item name="Gown" valuePropName="checked">
                    <Checkbox>Gown</Checkbox>
                  </Form.Item>
                </Row>
                <Row>
                  <Col span={11}>
                    <Form.Item name="Chest" label="Chest">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={11}>
                    <Form.Item name="Waist" label="Waist">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={11} offset={1}>
                    <Form.Item name="Hand_opening" label="Hand opening">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={11}>
                    <Form.Item name="Hip" label="Hip">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={11} offset={1}>
                    <Form.Item name="Length" label="Length">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={11}>
                    <Form.Item name="End" label="End">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={11} offset={1}>
                    <Form.Item name="Slit" label="Slit">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={11}>
                    <Form.Item name="Shoulder" label="Shoulder">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={11} offset={1}>
                    <Form.Item name="Neck_deep_f" label="Neck deep (f)">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={11}>
                    <Form.Item name="Arm_hole" label="Arm hole">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={11} offset={1}>
                    <Form.Item name="Neck_deep_b" label="Neck deep (b)">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={11}>
                    <Form.Item name="Sleeve_l" label="Sleeve L.">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={11} offset={1}>
                    <Form.Item name="Half_body" label="Half Body">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={11}>
                    <Form.Item name="Muscle" label="Muscle">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col
                sm={{ span: 24 }}
                lg={{ span: 7 }}
                style={{
                  borderRight: "1px solid #F0F0F0",
                  borderLeft: "1px solid #F0F0F0",
                  padding: "0 25px",
                }}
              >
                <h3>BOTTOM</h3>
                <Row>
                  <Form.Item name="Skirt" valuePropName="checked">
                    <Checkbox>Skirt</Checkbox>
                  </Form.Item>
                  <Form.Item name="Paladzo" valuePropName="checked">
                    <Checkbox>Paladzo</Checkbox>
                  </Form.Item>
                  <Form.Item name="Pant" valuePropName="checked">
                    <Checkbox>Pant</Checkbox>
                  </Form.Item>
                  <Form.Item name="Gharara" valuePropName="checked">
                    <Checkbox>Gharara</Checkbox>
                  </Form.Item>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item name="Length_bottom" label="Length">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="Waist_bottom" label="Waist">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="Hip_bottom" label="Hip">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="Thigh" label="Thigh">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="Knee" label="Knee">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="Leg_openning" label="Leg openning">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col
                sm={{ span: 24 }}
                lg={{ span: 7 }}
                style={{
                  padding: "0 25px",
                }}
              >
                <h3>EXTRA NOTE</h3>
                <Form.Item
                  name="Note"
                  label=""
                  wrapperCol={{
                    span: 24,
                  }}
                  style={{ minHeight: "60vh" }}
                >
                  <ReactQuill theme="snow" style={{ height: "60vh" }} />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Affix offsetBottom={20}>
              <Form.Item>
                <Button onClick={onClose} style={{ marginRight: 8 }}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Affix>
          </Form>
        </Drawer>
      </>
    </>
  );
};

export default connect(null)(CreateNewContact);
