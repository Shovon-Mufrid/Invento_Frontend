import React, { useState } from "react";
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

const Measurement = ({ measurements }) => {
  return (
    <>
      <>
        <Row gutter={16}>
          <Col
            sm={{
              span: 24,
            }}
            lg={{
              span: 14,
            }}
          >
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
            sm={{
              span: 24,
            }}
            lg={{
              span: 10,
            }}
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
        </Row>
      </>
    </>
  );
};

export default connect(null)(Measurement);
