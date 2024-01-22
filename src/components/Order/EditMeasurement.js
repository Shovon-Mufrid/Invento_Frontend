import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getInvoiceMeasurement,
  updateMasurement,
} from "../../actions/measurment";
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
  Skeleton,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const CreateNewContact = ({
  getInvoiceMeasurement,
  updateMasurement,
  details,
}) => {
  const initial = { Note: "" };
  const [visible, setVisible] = useState(false);
  const [showbutton, setshowbutton] = useState(false);
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [form] = Form.useForm();

  const showDrawer = () => {
    getInvoiceMeasurement(details.id).then((result) => {
      setshowbutton(true);
      setdata(result);
      setloading(false);
      setVisible(true);
    });
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = (values) => {
    // measurements.current[0] = values;

    updateMasurement(data[0].id, values);
    setVisible(false);
  };

  const renderDrawer = () => {
    if (loading) {
      //   return <Skeleton active />;
    } else {
      return (
        <Drawer
          title="Measurement details"
          width={1200}
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Form
            form={form}
            layout="horizontal"
            onFinish={onFinish}
            initialValues={data[0]}
            labelCol={{
              span: 12,
            }}
            wrapperCol={{
              span: 16,
            }}
            labelAlign="left"
          >
            <Row gutter={16}>
              <Col span={10}>
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
                span={7}
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
                span={7}
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
                  Update
                </Button>
              </Form.Item>
            </Affix>
          </Form>
        </Drawer>
      );
    }
  };

  return (
    <>
      {""}|{""}
      <a href="#" onClick={showDrawer} style={{ margin: 4 }}>
        Measurements
      </a>
      {renderDrawer()}
    </>
  );
};

export default connect(null, { getInvoiceMeasurement, updateMasurement })(
  CreateNewContact
);
