import React from "react";
import { Card, Row, Col, Tag } from "antd";
import { useParams } from "react-router-dom";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSingleUser } from "../../hooks/useUsers";
import Loader from "../../components/Loader";

const UserDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useSingleUser(id);

  const {
    phone_number = "Not available",
    first_name = "Not available",
    email = "Not available",
    createdAt = "Not available",
    documents: userDocuments = [],
    driver = {},
  } = data?.result?.user || {};

  const {
    driver_type = "Not specified",
    is_approved = false,
    is_fee_paid = false,
    is_online = false,
    national_id = "Not available",
    documents = [],
    vehicles = [],
    passport_id = "Not available",
    truck_size = "Not specified",
    truck_type = "Not specified",
    truck_type_name = "Not specified",
  } = driver || [];

  const idDocuments = documents.length > 0 ? documents : userDocuments;

  return (
    <div style={{ padding: "24px", background: "#fff" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>User Details</h1>
      <p style={{ fontSize: "16px", color: "#8c8c8c" }}>
        All important data for the user.
      </p>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div style={{ marginTop: "32px" }}>
            <div>
              <div style={{ display: "flex", gap: "16px" }}>
                <div>
                  <img
                    src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554_640.png"
                    alt="Avatar"
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div style={{ marginTop: "16px" }}>
                  <h2>{first_name}</h2>
                  <p style={{ color: "#4a4a4a" }}>{email}</p>
                  <p style={{ color: "#4a4a4a" }}>{phone_number}</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "32px" }}>
              <Card
                title="User Info"
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  marginBottom: "24px",
                  border: "1px solid #dcdcdc",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "12px",
                  }}
                >
                  <UserOutlined
                    style={{
                      fontSize: "24px",
                      color: "#2a63c7",
                    }}
                  />
                  <h3 style={{ paddingTop: "8px" }}>User Details:</h3>
                </div>

                <Row gutter={16}>
                  <Col span={6}>
                    <h4>Driver Type</h4>
                    <p style={{ color: "#888888" }}>{driver_type}</p>
                  </Col>
                  <Col span={6}>
                    <h4>Truck Size</h4>
                    <p style={{ color: "#888888" }}>{truck_size}</p>
                  </Col>
                  <Col span={6}>
                    <h4>Truck Type</h4>
                    <p style={{ color: "#888888" }}>{truck_type}</p>
                  </Col>
                  <Col span={6}>
                    <h4>Truck Type Name</h4>
                    <p style={{ color: "#888888" }}>{truck_type_name}</p>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={6}>
                    <h4>Status</h4>
                    <Tag
                      color={is_approved ? "green" : "red"}
                      icon={
                        is_approved ? (
                          <CheckCircleOutlined />
                        ) : (
                          <CloseCircleOutlined />
                        )
                      }
                    >
                      {is_approved ? "Approved" : "Pending"}
                    </Tag>
                  </Col>
                  <Col span={6}>
                    <h4>Fee Paid</h4>
                    <Tag color={is_fee_paid ? "success" : "error"}>
                      {is_fee_paid ? "Paid" : "Not Paid"}
                    </Tag>
                  </Col>
                  <Col span={6}>
                    <h4>Online Status</h4>
                    <Tag
                      color={is_online ? "success" : "default"}
                      style={{
                        backgroundColor: is_online ? "#52c41a" : "#d9d9d9", // Custom green color for online status
                        color: is_online ? "white" : "black",
                      }}
                    >
                      {is_online ? "Online" : "Offline"}
                    </Tag>
                  </Col>
                  <Col span={6}>
                    <h4>Account Created</h4>
                    <p style={{ color: "#888888" }}>
                      {new Date(createdAt).toLocaleDateString()}
                    </p>
                  </Col>
                  <Col span={6}>
                    <h4>National ID</h4>
                    <p style={{ color: "#888888" }}>{national_id}</p>
                  </Col>
                  <Col span={6}>
                    <h4>Passport ID</h4>
                    <p style={{ color: "#888888" }}>{passport_id}</p>
                  </Col>
                </Row>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "12px",
                  }}
                >
                  <CarOutlined
                    style={{
                      fontSize: "24px",
                      color: "#2a63c7",
                    }}
                  />
                  <h3 style={{ paddingTop: "8px" }}>User Vehicles Details:</h3>
                </div>

                <Row gutter={16}>
                  {vehicles && vehicles.length > 0 ? (
                    vehicles.map((vehicle, index) => (
                      <React.Fragment key={index}>
                        <Col span={6}>
                          <h4>Make</h4>
                          <p style={{ color: "#888888" }}>{vehicle.make}</p>
                        </Col>
                        <Col span={6}>
                          <h4>Model</h4>
                          <p style={{ color: "#888888" }}>{vehicle.model}</p>
                        </Col>
                        <Col span={6}>
                          <h4>Year</h4>
                          <p style={{ color: "#888888" }}>{vehicle.year}</p>
                        </Col>
                        <Col span={6}>
                          <h4>License Plate</h4>
                          <p style={{ color: "#888888" }}>
                            {vehicle.license_plate}
                          </p>
                        </Col>
                      </React.Fragment>
                    ))
                  ) : (
                    <p>No vehicle information available</p>
                  )}
                </Row>
              </Card>
            </div>
          </div>

          <div style={{ background: "#fff" }}>
            <Card
              title="Documents"
              style={{
                marginTop: "24px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: "1px solid #dcdcdc",
              }}
            >
              {idDocuments && idDocuments.length > 0 ? (
                <Row gutter={16}>
                  {idDocuments &&
                    idDocuments.map((doc, index) => (
                      <Col span={8} key={index}>
                        <Card
                          bordered={false}
                          style={{
                            textAlign: "center",
                            borderRadius: "8px",
                            border: "1px solid #dcdcdc",
                            marginTop: "24px",
                          }}
                        >
                          <img
                            src={doc.document_url}
                            alt={doc.document_type}
                            style={{
                              width: "100%",
                              height: "200px",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                          <p style={{ marginTop: "24px" }}>
                            {doc.document_type.replace(/_/g, " ").toUpperCase()}
                          </p>
                        </Card>
                      </Col>
                    ))}
                </Row>
              ) : (
                <p>No documents available</p>
              )}
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetailPage;
