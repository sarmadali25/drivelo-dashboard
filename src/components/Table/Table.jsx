import { Avatar, Table, Switch } from "antd";

const dataSource = Array.from({ length: 10 }, (_, index) => ({
  key: index + 1,
  userId: "TR-001",
  name: "Mouse Blue Pro",
  dob: "Dec 22, 2023",
  mobile: "+912 1236 366",
  email: "user@gmail.com",
  dateOfReg: "Dec 22, 2023",
  company: "360 Cargo",
  balance: "AED 145",
}));

const columns = [
  {
    title: "User ID",
    dataIndex: "userId",
    key: "userId",
    render: (text) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <input type="checkbox" style={{ marginRight: "8px" }} />
        {text}
      </div>
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar
          src="https://via.placeholder.com/150"
          style={{ marginRight: "8px" }}
        />
        {text}
      </div>
    ),
  },
  {
    title: "D.O.B",
    dataIndex: "dob",
    key: "dob",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
    key: "mobile",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Date of Reg.",
    dataIndex: "dateOfReg",
    key: "dateOfReg",
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "company",
  },
  {
    title: "Balance",
    dataIndex: "balance",
    key: "balance",
  },
  {
    title: "Status",
    key: "status",
    render: () => (
      <Switch
        defaultChecked
        checkedChildren={null}
        unCheckedChildren={null}
        className="custom-switch"
      />
    ),
  },
  {
    title: "Actions",
    key: "actions",
    render: () => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <a href="#" style={{ marginRight: "16px", color: "#1890ff" }}>
          View Profile
        </a>
      </div>
    ),
  },
];

const AntTable = () => {
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={{ pageSize: 10, total: 100, showSizeChanger: false }}
      bordered
      scroll={{ x: "max-content" }}
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    />
  );
};

export default AntTable;
