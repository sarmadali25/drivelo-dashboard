import { Layout } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./components/sidebar/Sidebar";
import Headerbar from "./components/Header/Header";
import Users from "./screens/users/User";
import Drivers from "./screens/drivers/Drivers";
import SignupRequest from "./screens/approval/SignupRequest";
import PaymentRequest from "./screens/approval/PaymentRequest";
import ErrorBoundary from "./components/ErrorBoundary";

const { Content } = Layout;

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <SideBar />
          <Layout>
            <Headerbar />
            <Content
              style={{
                overflowY: "auto",
                height: "calc(100vh - 64px)",
              }}
            >
              <Routes>
                <Route path="/" element={<Users />} />
                <Route path="/drivers" element={<Drivers />} />
                <Route
                  path="approvals/signup-request"
                  element={<SignupRequest />}
                />
                <Route
                  path="/approvals/payment-request"
                  element={<PaymentRequest />}
                />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
