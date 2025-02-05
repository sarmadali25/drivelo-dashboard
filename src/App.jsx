import { useState, useEffect } from "react";
import { Layout } from "antd";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import SideBar from "./components/sidebar/Sidebar";
import Headerbar from "./components/Header/Header";
import Users from "./screens/users/User";
import Drivers from "./screens/drivers/Drivers";
import SignupRequest from "./screens/approval/SignupRequest";
import PaymentRequest from "./screens/approval/PaymentRequest";
import ErrorBoundary from "./components/ErrorBoundary";
import DriverProfile from "./screens/drivers/DriverProfile";
import UserDetailPage from "./screens/users/UserProfile";
import LoginPage from "./screens/auth/LoginPage";

const PrivateRoute = ({ children, isLoggedIn }) => {
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const { Content } = Layout;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true);
  };

  const isLoginPage = location.pathname === "/login";

  return (
    <ErrorBoundary>
      <Layout style={{ minHeight: "100vh" }}>
        {!isLoginPage && isLoggedIn && <SideBar />}
        <Layout>
          {!isLoginPage && isLoggedIn && <Headerbar />}
          <Content style={{ overflowY: "auto", height: "calc(100vh - 64px)" }}>
            <Routes>
              <Route path="/login" element={<LoginPage login={login} />} />
              <Route
                path="/"
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <Users />
                  </PrivateRoute>
                }
              />
              <Route
                path="/drivers"
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <Drivers />
                  </PrivateRoute>
                }
              />
              <Route
                path="/driver/profile/:id"
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <DriverProfile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/user/profile/:id"
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <UserDetailPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="approvals/signup-request"
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <SignupRequest />
                  </PrivateRoute>
                }
              />
              <Route
                path="/approvals/payment-request"
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <PaymentRequest />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </ErrorBoundary>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool,
};
