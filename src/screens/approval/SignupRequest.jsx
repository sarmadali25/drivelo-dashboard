import {
  Layout,
  Table,
  Tag,
  Badge,
  Modal,
  Button,
  Row,
  Col,
  Card,
  Avatar,
  Image,
  Spin,
} from "antd";
import { useState, useMemo } from "react";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useApproveDriver, useDrivers } from "../../hooks/useDrivers";
import Loader from "../../components/Loader";

const { Content } = Layout;

const SignupRequests = () => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [sorter, setSorter] = useState({ field: null, order: null });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState({});

  const { data, isLoading, isFetching, refetch } = useDrivers({
    page: pagination.current,
    limit: pagination.pageSize,
  });

  const { mutate, isLoading: isUpdating } = useApproveDriver();

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
      createdAt: user?.driver?.created_at || user?.createdAt,
      is_document_verified: user.is_approved,
      driver_type: user?.driver?.driver_type,
      is_fee_paid: user?.driver?.is_fee_paid,
      is_online: user?.driver?.is_online,
      documents: user?.driver?.documents || [],
      profile_image:
        user?.driver?.profile_image ||
        "https://www.shutterstock.com/image-vector/blank-avatar-photo-icon-design-600nw-1682415103.jpg",
    }));
  }, [sortedData]);

  const columns = [
    {
      title: "Name",
      dataIndex: "first_name",
      key: "first_name",
      sorter: true,
      render: (text, record) => {
        return (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                position: "relative",
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "stretch",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "4px",
                  right: "6px",
                  width: "12px",
                  height: "12px",
                  backgroundColor: record?.is_online ? "#52c41a" : "#f5111d",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 10,
                  cursor: "pointer",
                }}
              >
                <Badge
                  width="20px"
                  height="20px"
                  status={record?.is_online ? "success" : ""}
                />
              </div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      backgroundImage: "url(assets/media/avatars/blank.png)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <img
                      src={record?.profile_image}
                      alt="Avatar"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <span>{text}</span>
          </div>
        );
      },
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
    },
    {
      title: "Reg. Date",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Driver Type",
      dataIndex: "driver_type",
      key: "driver_type",
      render: (driverType) => (
        <Tag
          color={driverType === "national" ? "green" : "red"}
          icon={driverType ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
        >
          {driverType === "national"
            ? "National"
            : driverType || "Not Specified"}
        </Tag>
      ),
    },
    {
      title: "Fee Status",
      dataIndex: "is_fee_paid",
      key: "is_fee_paid",
      render: (paid) => (
        <Badge
          count={
            paid ? (
              <span
                style={{
                  backgroundColor: "#40c41c",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "50px",
                  fontSize: "14px",
                }}
              >
                <CheckCircleOutlined /> Paid
              </span>
            ) : (
              <span
                style={{
                  backgroundColor: "#f5111d",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "50px",
                  fontSize: "14px",
                }}
              >
                <CloseCircleOutlined /> Not Paid
              </span>
            )
          }
          style={{ marginLeft: "8px" }}
        />
      ),
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
        console.log(record);
        return (
          <a
            onClick={() => handleViewDocuments(record)}
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

  const handleViewDocuments = (driver) => {
    setSelectedDriver(driver);
    setIsModalVisible(true);
  };

  const handleApproveDocuments = () => {
    mutate(
      { id: selectedDriver.key },
      {
        onSuccess: () => {
          setIsModalVisible(false);
          refetch();
        },
      }
    );
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
                Signup Requests
              </h1>
              <p
                style={{
                  fontSize: "16px",
                  color: "#8c8c8c",
                  margin: "8px 0 0",
                }}
              >
                Hi, Admin. Welcome back to Signup Requests!
              </p>
            </div>

            <h3 style={{ marginBottom: "16px" }}>Signup Requests List</h3>

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
              scroll={{ x: "max-content" }}
            />
          </>
        )}
      </div>

      <Modal
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingBottom: "16px",
            }}
          >
            <Avatar
              src={
                selectedDriver?.documents?.find(
                  (img) => img?.document_type === "driver_photo"
                )?.document_url
              }
              size={64}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                color: "#808080",
                marginLeft: "16px",
              }}
            >
              <span style={{ fontSize: "13px" }}>
                {selectedDriver?.first_name}
              </span>
              <span style={{ fontSize: "13px" }}>{selectedDriver?.email}</span>
              <span style={{ fontSize: "13px" }}>
                {selectedDriver?.phone_number}
              </span>
            </div>
          </div>
        }
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={900}
        height={600}
        style={{ top: 20 }}
      >
        <div
          style={{
            maxHeight: "450px",
            overflowY: "auto",
            paddingRight: "16px",
            paddingBottom: "16px",
            marginTop: "20px",
          }}
        >
          <Row gutter={16}>
            {selectedDriver?.documents?.map((doc, index) => {
              if (doc?.document_type !== "driver_photo") {
                return (
                  <Col span={8} key={index}>
                    <Card
                      title={doc?.document_type}
                      bordered={false}
                      style={{
                        border: "1px solid #C8C8C8",
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                        overflow: "hidden",
                        marginTop: "16px",
                        transition: "box-shadow 0.3s ease",
                      }}
                      hoverable
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow =
                          "0 6px 15px rgba(0, 0, 0, 0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow =
                          "0 4px 12px rgba(0, 0, 0, 0.15)";
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "200px",
                          overflow: "hidden",
                          cursor: "pointer",
                        }}
                        onMouseMove={(e) => {
                          const bounds =
                            e.currentTarget.getBoundingClientRect();
                          const offsetX = e.clientX - bounds.left;
                          const offsetY = e.clientY - bounds.top;
                          const moveX = (offsetX / bounds.width) * 20 - 10;
                          const moveY = (offsetY / bounds.height) * 20 - 10;
                          e.currentTarget.querySelector(
                            "img"
                          ).style.transform = `scale(1.3) translate(${moveX}px, ${moveY}px)`;
                        }}
                        onMouseLeave={(e) => {
                          const img = e.currentTarget.querySelector("img");
                          img.style.transform = "scale(1)";
                        }}
                      >
                        <Image
                          src={doc?.document_url}
                          alt={`Document ${index + 1}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.3s ease",
                          }}
                        />
                      </div>
                    </Card>
                  </Col>
                );
              }
            })}
          </Row>
        </div>
        <div
          style={{
            paddingTop: "16px",
            paddingBottom: "16px",
            textAlign: "right",
            marginTop: "20px",
          }}
        >
          <Button
            disabled={selectedDriver?.is_document_verified}
            type="primary"
            onClick={handleApproveDocuments}
          >
            {isUpdating ? (
              <Spin
                style={{ color: "white" }}
                indicator={<LoadingOutlined spin />}
                size="small"
              />
            ) : (
              "Approve Documents"
            )}
          </Button>
        </div>
      </Modal>
    </Content>
  );
};

export default SignupRequests;
