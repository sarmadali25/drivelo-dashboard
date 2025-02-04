import { Layout, Table, Tag, Badge, Modal, Spin } from "antd";
import { useState, useMemo } from "react";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  FolderViewOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  usePaymentRequest,
  useApprovePaymentRequest,
} from "../../hooks/usePaymentRequest";
import Loader from "../../components/Loader";

const { Content } = Layout;

const PAYMENT_STATUES = {
  approved: "Approved",
  in_progress: "In Progress",
};

const PaymentRequests = () => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [sorter, setSorter] = useState({ field: null, order: null });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { data, isLoading, isFetching, refetch } = usePaymentRequest({
    page: pagination.current,
    limit: pagination.pageSize,
  });

  const { mutate, isLoading: isUpdating } = useApprovePaymentRequest();

  const sortedData = useMemo(() => {
    if (!data?.result?.transactions) return [];
    let transactions = [...data.result.transactions];
    if (sorter.field) {
      transactions.sort((a, b) => {
        const valueA = a[sorter.field];
        const valueB = b[sorter.field];
        return typeof valueA === "string"
          ? sorter.order === "ascend"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA)
          : sorter.order === "ascend"
          ? valueA - valueB
          : valueB - valueA;
      });
    }
    return transactions;
  }, [data, sorter]);

  const dataSource = useMemo(() => {
    return sortedData.map((transaction) => ({
      id: transaction.id,
      key: transaction.id,
      amount: transaction.amount,
      transaction_type: transaction.transaction_type,
      is_approved: transaction.is_approved,
      createdAt: transaction?.createdAt,
      status: transaction.status,
      signedProofUrl: transaction.signedProofUrl,
    }));
  }, [sortedData]);

  const handleIconClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  const handleApprovePayment = (id) => {
    const transactionId = id;
    const status = "approve";

    mutate(
      { transaction_id: transactionId, status },
      {
        onSuccess: () => refetch(),
      }
    );
  };

  const columns = [
    {
      title: "Transaction Id",
      dataIndex: "id",
      key: "id",
      sorter: true,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: true,
    },
    {
      title: "Transaction Type",
      dataIndex: "transaction_type",
      key: "transaction_type",
    },
    {
      title: "Tran. Date",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={status === "approved" ? "green" : "red"}
          icon={
            status === "approved" ? (
              <CheckCircleOutlined />
            ) : (
              <CloseCircleOutlined />
            )
          }
        >
          {status === "approved" ? "Approved" : status || "Not Specified"}
        </Tag>
      ),
    },
    {
      title: "Fee Status",
      dataIndex: "is_approved",
      key: "is_approved",
      render: (paid, record) => (
        <Badge
          count={
            paid ? (
              <button
                style={{
                  backgroundColor: "#40c41c",
                  color: "white",
                  padding: "6px 12px",
                  border: "1px solid white",
                  cursor: "pointer",
                  borderRadius: "50px",
                  fontSize: "14px",
                }}
                disabled={paid}
              >
                <CheckCircleOutlined /> {PAYMENT_STATUES[record.status]}
              </button>
            ) : (
              <button
                style={{
                  backgroundColor: "#f5111d",
                  color: "white",
                  padding: "6px 12px",
                  border: "1px solid white",
                  cursor: "pointer",
                  borderRadius: "50px",
                  fontSize: "14px",
                }}
                onClick={() => handleApprovePayment(record.id)}
              >
                <div style={{ display: "flex", gap: "4px" }}>
                  {isUpdating ? (
                    <Spin
                      style={{ color: "white" }}
                      indicator={<LoadingOutlined spin />}
                      size="small"
                    />
                  ) : (
                    <CloseCircleOutlined />
                  )}
                  {PAYMENT_STATUES[record.status]}
                </div>
              </button>
            )
          }
          style={{ marginLeft: "8px" }}
        />
      ),
    },
    {
      title: "Show Transaction",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <FolderViewOutlined
          style={{ cursor: "pointer", fontSize: "18px", color: "#1890ff" }}
          onClick={() => handleIconClick(record.signedProofUrl)}
        />
      ),
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
    setSorter(
      sorter.order
        ? { field: sorter.field, order: sorter.order }
        : { field: null, order: null }
    );
  };

  return (
    <Content>
      <div style={{ padding: "24px", background: "#fff" }}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Payment Requests
            </h1>
            <p
              style={{
                fontSize: "16px",
                color: "#8c8c8c",
                margin: "4px 0 0",
              }}
            >
              Hi, Admin. Welcome back to Payment Requests!
            </p>
            <h3 style={{ marginBottom: "16px", marginTop: "16px" }}>
              Transactions List
            </h3>
            <Table
              dataSource={dataSource}
              columns={columns}
              loading={isFetching}
              pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: data?.result?.pagination?.totalRecords || 0,
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
        visible={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
        centered
      >
        <div style={{ textAlign: "center" }}>
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Transaction Proof"
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "contain",
                cursor: "zoom-in",
              }}
              onClick={(e) => {
                e.target.style.transform =
                  e.target.style.transform === "scale(1.5)"
                    ? "scale(1)"
                    : "scale(1.5)";
                e.target.style.transition = "transform 0.3s ease";
              }}
            />
          ) : (
            <p>No Image Available</p>
          )}
        </div>
      </Modal>
    </Content>
  );
};

export default PaymentRequests;
