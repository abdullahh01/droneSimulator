import { memo, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row, Col, Spin } from "antd";
import { Link } from "react-router-dom";
import "./loginForm.css";
import { loginUser, resetPassword } from "../../../lib/services/firebaseService";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [form] = Form.useForm();

  const showLoader = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 3000);
  };

  const onFinish = (values) => {
    loginUser(values.email, values.password);
    showLoader();
  };
  return (
    <>
      <Row id="loginContainer" justify="center" align="middle">
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
          <h1>Login</h1>
          <Form
            name="normal_login"
            className="login-form"
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
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
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
                  message: "Password must contain atleast 8 characters!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <div style={{ textAlign: "right" }}>
              <a
                className="login-form-forgot "
                onClick={() => {
                  email ? resetPassword(email) : alert("please enter email");
                }}
              >
                Forgot password?
              </a>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                id="button"
              >
                Log in
              </Button>
              <br />
              <span id="extraText">Or</span>{" "}
              <Link to="/signup">register now!</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Spin spinning={spinning} fullscreen />
    </>
  );
};

export default memo(LoginForm);
