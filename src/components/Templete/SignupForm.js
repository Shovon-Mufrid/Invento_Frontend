import React from "react";
import { useState } from "react";
import { Button, Form, Input, Row, Col } from "antd";
import { Link } from "react-router-dom";
import "./template.css";

const SignupForm = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Row>
        <Col span={6}>
          <div className="section-login-from">
            <h1>Hello Stanger</h1>
            <p>
              Please enter your email && password if you new presh signup button
            </p>
            <Link to="/login">
              <Button type="primary" shape="round" size="large">
                Login
              </Button>
            </Link>
          </div>
        </Col>
        <Col span={18} style={{ height: "100vh" }}>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 8,
            }}
            initialValues={{
              remember: true,
            }}
            style={{ marginTop: "18%" }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <h1>Register</h1>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 8,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default SignupForm;
