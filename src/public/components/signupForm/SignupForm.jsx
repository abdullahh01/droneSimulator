import React, { memo, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row, Col,Spin } from "antd";
import { Link } from "react-router-dom";
import "./signupForm.css";
import { registerUser } from "../../../lib/services/firebaseService";

const SignupForm = () => {
  const [form] = Form.useForm();
  const [spinning, setSpinning] = useState(false);

  const showLoader = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 3000);
  };

  const onFinish = (values) => {
    registerUser(values.email, values.password)
    showLoader();
  };
  return (
    <>
      <Row id="signupContainer" justify="center" align="middle">
        <Col
          xs={{
            span: 16,
          }}
          sm={{
            span: 12,
          }}
          md={{
            span: 10,
          }}
          lg={{
            span: 8,
          }}
        >
          <h1>Signup</h1>
          <Form
            name="register"
            className="register-form"
            form={form}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
                {
                  min: 7,
                  message: "Password must contain atleast 7 characters!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="register-form-button"
                id="button"
              >
                Signup
              </Button>
              <br />
              <span id="extraText">already have an account?</span> <Link to="/login">Login!</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Spin spinning={spinning} fullscreen />
    </>
  );
};

export default memo(SignupForm);
