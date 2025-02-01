import { Layout, Card } from "antd";
import { UserOutlined, TeamOutlined } from "@ant-design/icons";
import AntTable from "../../components/Table/Table";

const { Content } = Layout;

const Drivers = () => {
  return (
    <Content>
      <div style={{ padding: "24px", background: "#fff" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", margin: 0 }}>
            Driver Dashboard
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "#8c8c8c",
              margin: "8px 0 0",
            }}
          >
            Hi, Samantha. Welcome back to Driver Dashboard!
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <Card
            style={{
              flex: 1,
              maxWidth: "250px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <UserOutlined
                style={{
                  fontSize: "40px",
                  color: "#1890ff",
                  marginRight: "16px",
                }}
              />
              <div>
                <p style={{ margin: 0, fontSize: "16px", color: "#8c8c8c" }}>
                  Active Drivers
                </p>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  765K
                </h2>
              </div>
            </div>
          </Card>

          <Card
            style={{
              flex: 1,
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              maxWidth: "250px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <TeamOutlined
                style={{
                  fontSize: "40px",
                  color: "#1890ff",
                  marginRight: "16px",
                }}
              />
              <div>
                <p style={{ margin: 0, fontSize: "16px", color: "#8c8c8c" }}>
                  Non Active Drivers
                </p>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  15
                </h2>
              </div>
            </div>
          </Card>

          <Card
            style={{
              flex: 1,
              borderRadius: "12px",
              maxWidth: "250px",
              backgroundColor: "#1890ff",
              color: "#fff",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <UserOutlined
                style={{
                  fontSize: "40px",
                  color: "#fff",
                  marginRight: "16px",
                }}
              />
              <div>
                <p style={{ margin: 0, fontSize: "16px", color: "#fff" }}>
                  Total Drivers
                </p>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  200K+
                </h2>
              </div>
            </div>
          </Card>
        </div>
        <h3 style={{ marginBottom: "16px" }}>Drivers List</h3>
        <AntTable />
      </div>
    </Content>
  );
};

export default Drivers;
