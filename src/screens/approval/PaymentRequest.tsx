import React from "react";
import { Layout, Card } from "antd";
import { UserOutlined, TeamOutlined } from "@ant-design/icons";
import AntTable from "../../components/Table/Table";

const { Content } = Layout;

const PaymentRequest = () => {
  return (
    <Content>
      <div style={{ padding: "24px", background: "#fff" }}>
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontWeight: "bold", margin: 0 }}>
            Payment Request Dashboard
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#8c8c8c",
              margin: "8px 0 0",
            }}
          >
            Hi, Samantha. Welcome back to Payment Request Dashboard!
          </p>
        </div>

        <h4 style={{ marginBottom: "16px" }}>Payment Requests</h4>
        <AntTable />
      </div>
    </Content>
  );
};

export default PaymentRequest;
