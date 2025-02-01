import React from "react";
import { Layout, Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import {
  UserOutlined,
  TeamOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const SideBar = () => {
  const { pathname } = useLocation();
  const [approvalsOpen, setApprovalsOpen] = React.useState(true);

  const isActiveRoute = (currentPathName, route) => {
    if (route === "/") {
      return currentPathName === route;
    }
    return currentPathName.includes(route);
  };

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
        <NavLink
          to="/"
          style={
            isActiveRoute(pathname, "/")
              ? {
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  padding: "10px 16px",
                  marginBottom: "16px",
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }
              : {
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "12px",
                  marginBottom: "16px",
                  alignItems: "center",
                  gap: "12px",
                  textDecoration: "none",
                }
          }
        >
          <UserOutlined
            style={
              isActiveRoute(pathname, "/")
                ? { fontSize: "20px", color: "#2a63c7" }
                : { fontSize: "20px", color: "#fff" }
            }
          />
          <span
            style={
              isActiveRoute(pathname, "/")
                ? { fontSize: "16px", fontWeight: "500", color: "#2a63c7" }
                : { fontSize: "14px", fontWeight: "500", color: "#fff" }
            }
          >
            User
          </span>
        </NavLink>

        <NavLink
          to="/drivers"
          style={
            isActiveRoute(pathname, "/drivers")
              ? {
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  padding: "10px 16px",
                  marginBottom: "16px",
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }
              : {
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "12px",
                  marginBottom: "16px",
                  alignItems: "center",
                  gap: "12px",
                  textDecoration: "none",
                }
          }
        >
          <TeamOutlined
            style={
              isActiveRoute(pathname, "/drivers")
                ? { fontSize: "20px", color: "#2a63c7" }
                : { fontSize: "20px", color: "#fff" }
            }
          />
          <span
            style={
              isActiveRoute(pathname, "/drivers")
                ? { fontSize: "16px", fontWeight: "500", color: "#2a63c7" }
                : { fontSize: "14px", fontWeight: "500", color: "#fff" }
            }
          >
            Drivers
          </span>
        </NavLink>

        <NavLink
          to="/approvals/signup-request"
          onClick={() => setApprovalsOpen(true)}
          style={
            isActiveRoute(pathname, "/approvals")
              ? {
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  padding: "10px 16px",
                  marginBottom: "16px",
                  marginTop: "8px",
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }
              : {
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "12px",
                  marginBottom: "16px",
                  alignItems: "center",
                  gap: "12px",
                  textDecoration: "none",
                }
          }
        >
          <TeamOutlined
            style={
              isActiveRoute(pathname, "/approvals")
                ? { fontSize: "20px", color: "#2a63c7" }
                : { fontSize: "20px", color: "#fff" }
            }
          />
          <span
            style={
              isActiveRoute(pathname, "/approvals")
                ? { fontSize: "16px", fontWeight: "500", color: "#2a63c7" }
                : { fontSize: "14px", fontWeight: "500", color: "#fff" }
            }
          >
            Approvals
          </span>
        </NavLink>

        {approvalsOpen && (
          <div style={{ paddingLeft: "20px" }}>
            <NavLink
              to="/approvals/signup-request"
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                marginLeft: "8px",
                textDecoration: "none",
                padding: "8px 16px",
              }}
            >
              <span
                style={
                  isActiveRoute(pathname, "/approvals/signup-request")
                    ? { fontSize: "14px", fontWeight: "500", color: "#fff" }
                    : { fontSize: "12px", fontWeight: "200", color: "#fff" }
                }
              >
                Signup Request
              </span>
            </NavLink>
            <NavLink
              to="/approvals/payment-request"
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "12px",
                marginLeft: "8px",
                alignItems: "center",
                textDecoration: "none",
                padding: "8px 16px",
              }}
            >
              <span
                style={
                  isActiveRoute(pathname, "/approvals/payment-request")
                    ? { fontSize: "14px", fontWeight: "500", color: "#fff" }
                    : { fontSize: "12px", fontWeight: "200", color: "#fff" }
                }
              >
                Payment Request
              </span>
            </NavLink>
          </div>
        )}

        <div
          style={{
            padding: "0 12px",
            color: "#ffffff",
            fontSize: "12px",
            marginBottom: "8px",
            marginTop: "32px",
          }}
        >
          ACCOUNT PAGES
        </div>

        <NavLink
          to="/profile"
          style={
            isActiveRoute(pathname, "/profile")
              ? {
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  padding: "10px 16px",
                  marginBottom: "16px",
                  marginTop: "24px",
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }
              : {
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "12px",
                  marginTop: "24px",
                  marginBottom: "16px",
                  alignItems: "center",
                  gap: "12px",
                  textDecoration: "none",
                }
          }
        >
          <ProfileOutlined
            style={
              isActiveRoute(pathname, "/profile")
                ? { fontSize: "20px", color: "#2a63c7" }
                : { fontSize: "20px", color: "#fff" }
            }
          />
          <span
            style={
              isActiveRoute(pathname, "/profile")
                ? { fontSize: "16px", fontWeight: "500", color: "#2a63c7" }
                : { fontSize: "14px", fontWeight: "500", color: "#fff" }
            }
          >
            Profile
          </span>
        </NavLink>
      </Menu>

      <button
        style={{
          position: "absolute",
          bottom: "24px",
          marginLeft: "10%",
          display: "flex",
          alignItems: "center",
          height: "40px",
          border: "1px solid white",
          width: "70%",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          textAlign: "center",
        }}
      >
        <LogoutOutlined style={{ fontSize: "20px", color: "#2a63c7" }} />
        <span style={{ color: "#2a63c7", marginLeft: "8px" }}>Log Out</span>
      </button>
    </Sider>
  );
};

export default SideBar;
