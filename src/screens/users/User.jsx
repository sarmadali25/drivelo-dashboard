import { Layout, Card, Table, Tag, Avatar } from "antd";
import { useState, useMemo } from "react";
import {
  UserOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useUsers } from "../../hooks/useUsers";
import Loader from "../../components/Loader";

const { Content } = Layout;

const Users = () => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [sorter, setSorter] = useState({ field: null, order: null });

  const { data, isLoading, isFetching } = useUsers({
    page: pagination.current,
    limit: pagination.pageSize,
  });

  const sortedData = useMemo(() => {
    if (!data?.result?.users) return [];

    let users = [...data.result.users];

    if (sorter.field) {
      users.sort((a, b) => {
        const valueA = a[sorter.field];
        const valueB = b[sorter.field];

        if (typeof valueA === "string") {
          return sorter.order === "ascend"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        } else {
          return sorter.order === "ascend" ? valueA - valueB : valueB - valueA;
        }
      });
    }

    return users;
  }, [data, sorter]);

  const dataSource = useMemo(() => {
    return sortedData.map((user) => ({
      key: user.id,
      first_name: user.first_name,
      email: user.email,
      phone_number: user.phone_number,
      createdAt: user.createdAt,
      is_document_verified: user.is_document_verified,
    }));
  }, [sortedData]);

  const columns = [
    {
      title: "Name",
      dataIndex: "first_name",
      key: "first_name",
      sorter: true,
      render: (text) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554_640.png"
            style={{ marginRight: "8px" }}
          />
          {text}
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Mobile",
      dataIndex: "phone_number",
      key: "phone_number",
      sorter: true,
    },
    {
      title: "Date of Reg.",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "is_document_verified",
      render: (isVerified) => (
        <Tag
          color={isVerified ? "green" : "red"}
          icon={isVerified ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
        >
          {isVerified ? "Verified" : "Not Verified"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => {
        return (
          <a
            href={`user/profile/${record?.key}`}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#1890ff",
              fontSize: "18px",
            }}
          >
            <EyeOutlined />
          </a>
        );
      },
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });

    if (sorter.order) {
      setSorter({
        field: sorter.field,
        order: sorter.order,
      });
    } else {
      setSorter({ field: null, order: null });
    }
  };

  return (
    <Content>
      <div style={{ padding: "24px", background: "#fff" }}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div style={{ marginBottom: "24px" }}>
              <h1 style={{ fontSize: "32px", fontWeight: "bold", margin: 0 }}>
                User Dashboard
              </h1>
              <p
                style={{
                  fontSize: "16px",
                  color: "#8c8c8c",
                  margin: "8px 0 0",
                }}
              >
                Hi, Samantha. Welcome back to User Dashboard!
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
                    <p
                      style={{ margin: 0, fontSize: "16px", color: "#8c8c8c" }}
                    >
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
                    <p
                      style={{ margin: 0, fontSize: "16px", color: "#8c8c8c" }}
                    >
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

            <h3 style={{ marginBottom: "16px" }}>Users List</h3>

            <Table
              dataSource={dataSource}
              columns={columns}
              loading={isFetching}
              pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: data?.result?.pagination?.total || 0,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "20", "50"],
                position: ["bottomRight"],
              }}
              onChange={handleTableChange}
            />
          </>
        )}
      </div>
    </Content>
  );
};

export default Users;
