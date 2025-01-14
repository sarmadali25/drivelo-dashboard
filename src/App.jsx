import { Layout } from "antd";
import SideBar from "./components/sidebar/Sidebar";
import Headerbar from "./components/Header/Header";
import Users from "./screens/users/User";

const App = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar />
      <Layout>
        <Headerbar />
        <Users />
      </Layout>
    </Layout>
  );
};

export default App;
