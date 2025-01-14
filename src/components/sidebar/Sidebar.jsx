import { Layout, Menu } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const SideBar = () => {
  return (
    <Sider
      style={{ backgroundColor: "#1877F2" }}
      breakpoint="lg"
      width={250}
      collapsedWidth={80}
    >
      <div
        className="logo"
        style={{
          height: "32px",
          margin: "16px",
          color: "#fff",
          fontSize: "24px",
          marginLeft: "38px",
          fontWeight: "bold",
        }}
      >
        YOURLOGO
      </div>
      <Menu
        style={{
          backgroundColor: "#1877F2",
          color: "#fff",
          borderRight: "none",
          marginLeft: "24px",
          marginRight: "24px",
        }}
      >
        <Menu.Item
          key="1"
          icon={<UserOutlined style={{ fontSize: "20px", color: "#fff" }} />}
          style={{
            padding: "10px 16px",
            marginBottom: "8px",
            display: "flex",
            background: "none",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "12px", fontWeight: "500", color: "#fff" }}>
            User
          </span>
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<TeamOutlined style={{ fontSize: "20px", color: "#2a63c7" }} />}
          style={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "10px 16px",
            marginBottom: "8px",
            display: "flex",
            alignItems: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <span
            style={{ fontSize: "16px", fontWeight: "500", color: "#2a63c7" }}
          >
            Drivers
          </span>
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<UserOutlined style={{ fontSize: "20px", color: "#fff" }} />}
          style={{
            padding: "10px 16px",
            marginBottom: "8px",
            display: "flex",
            background: "none",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "12px", fontWeight: "500", color: "#fff" }}>
            Approval
          </span>
        </Menu.Item>

        <div
          style={{
            padding: "0 20px",
            color: "#ffffff",
            fontSize: "12px",
            marginBottom: "8px",
            marginTop: "16px",
          }}
        >
          ACCOUNT PAGES
        </div>
        <Menu.Item
          key="4"
          icon={<ProfileOutlined style={{ fontSize: "20px", color: "#fff" }} />}
          style={{
            borderRadius: "12px",
            padding: "10px 20px",
            marginBottom: "8px",
          }}
        >
          <span style={{ fontSize: "12px", fontWeight: "500", color: "#fff" }}>
            Profile
          </span>
        </Menu.Item>
      </Menu>

      <div
        style={{
          position: "absolute",
          bottom: "24px",
          width: "100%",
          padding: "10px 20px",
          backgroundColor: "#ffffff22",
          borderRadius: "12px",
          textAlign: "center",
        }}
      >
        <LogoutOutlined style={{ fontSize: "20px", color: "#fff" }} />
        <span style={{ color: "#fff", marginLeft: "8px" }}>Log Out</span>
      </div>
    </Sider>
  );
};

export default SideBar;
