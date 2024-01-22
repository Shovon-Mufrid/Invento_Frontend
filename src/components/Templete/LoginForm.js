import React from "react";
import { connect } from "react-redux";
import { Button, Checkbox, Form, Input, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../actions/authAction";
import "./template.css";

const LoginForm = ({ signIn }) => {
  console.log("login");
  const navigate = useNavigate();
  const onFinish = (values) => {
    signIn(values).then((e) => {
      if (e) {
        navigate("/dashboard");
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      {/* <div class="background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div> */}
      <Row
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/hrm.png"})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
      >
        <Col
          span={24}
          style={{
            height: "100vh",
            textAlign: "center",
            margin: "auto",

            // background: `${process.env.PUBLIC_URL}` + `/login-background.jpg`,
          }}
        >
          <Form
            className="loginFOrm"
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
            style={{
              marginTop: "10%",
              marginBottom: "10%",
              marginLeft: "30%",
              paddingTop: "5%",
              color: "white",
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            {/* <h1>Login</h1> */}
            <Form.Item
              // label="Email"
              wrapperCol={{
                offset: 8,
                span: 8,
              }}
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your email !",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              // label="Password"
              wrapperCol={{
                offset: 8,
                span: 8,
              }}
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            {/* <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 8,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 8,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  background: "#EFC3AC",
                  color: "black",
                  border: "black",
                }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default connect(null, { signIn })(LoginForm);
