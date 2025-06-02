import { useState } from "react";
import { Form, Input, Button, Typography, Layout, Spin } from "antd";
import {
  PhoneOutlined,
  LockOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import loginImage from "../../assets/loginImage.png";
import "./LoginPage.css";
import { useLogin } from "../../hooks/useLogin";

const { Title } = Typography;

const LoginPage = ({ login }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isLoading } = useLogin();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (phone && password) {
      mutate(
        { phoneNumber: phone, password },
        {
          onSuccess: (data) => {
            login(data?.result?.data);
            navigate("/");
          },
        }
      );
    }
  };

  return (
    <Layout style={{ height: "100vh", margin: 0 }}>
      <div style={{ display: "flex", gap: "100px", height: "100%" }}>
        <div className="login-image">
          <img
            src={loginImage}
            alt="Login"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div className="login-container">
          <div className="login-form-container">
            <Title level={2}>Hello Again!</Title>
            <p>Welcome Back</p>
            <Form layout="vertical" onFinish={handleLogin}>
              <div>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Enter your phone"
                    prefix={<PhoneOutlined style={{ color: "#C8C8C8" }} />}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Item>
              </div>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Enter your password"
                  value={password}
                  prefix={<LockOutlined style={{ color: "#C8C8C8" }} />}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" block htmlType="submit">
                  {isLoading ? (
                    <Spin
                      style={{ color: "white" }}
                      indicator={<LoadingOutlined spin />}
                      size="small"
                    />
                  ) : (
                    "Login"
                  )}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

LoginPage.propTypes = {
  login: PropTypes.func,
};

export default LoginPage;
