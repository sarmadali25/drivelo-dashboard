import { Layout, Avatar, Input, Badge } from "antd";
import { BellOutlined, MailOutlined, SearchOutlined } from "@ant-design/icons";

const { Header } = Layout;

const Headerbar = () => {
  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 16px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Input
        placeholder="Search user by ID..."
        prefix={<SearchOutlined />}
        style={{
          width: "300px",
          marginRight: "16px",
          borderRadius: "20px",
          padding: "8px 12px",
        }}
      />

      <Badge
        count={12}
        style={{ backgroundColor: "#1890ff", marginRight: "16px" }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#f0f2f5",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BellOutlined style={{ fontSize: "20px", color: "#595959" }} />
        </div>
      </Badge>

      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "#f0f2f5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "16px",
          marginLeft: "16px",
        }}
      >
        <MailOutlined style={{ fontSize: "20px", color: "#595959" }} />
      </div>

      <Avatar
        src="https://via.placeholder.com/150"
        size={40}
        style={{ borderRadius: "50%" }}
      />
    </Header>
  );
};

export default Headerbar;
