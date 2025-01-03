import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Input,
  Modal,
  Button,
  Popover,
  Layout,
  Checkbox,
  Skeleton,
  Table,
  Spin,
  Select,
  Image,
  Pagination,
  DatePicker,
  message,
} from "antd";
import dayjs from "dayjs";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { FaSearch, FaFilter, FaCaretDown, FaEye } from "react-icons/fa";
import ClientLayout from "../../components/ClientLayout";
import { Get } from "../../config/api/get";
import { AD, COIN, SERVICE_PROVIDERS } from "../../config/constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ImageUrl } from "../../config/functions";
import TextArea from "antd/es/input/TextArea";
import { Put } from "../../config/api/put";
import { Post } from "../../config/api/post";
import swal from "sweetalert";
import { useGetPaypalTransactionsQuery } from "../../api/paypal";

function BankPayouts() {
  const token = useSelector((state) => state.user.userToken);
  const {data: transactions} = useGetPaypalTransactionsQuery();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedRequests, setSelectedRequests] = useState(null);
  const [requests, setRequests] = useState([]);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [disapproveModalOpen, setDisapproveModalOpen] = useState(false);
  const [paginationConfig, setPaginationConfig] = useState({
    pageNumber: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 0,
  });
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    status: null,
    keyword: "",
    from: null,
    to: null,
  });

  const startIndex =
    (paginationConfig.pageNumber - 1) * paginationConfig.limit + 1;
  const endIndex = Math.min(
    startIndex + paginationConfig.limit - 1,
    paginationConfig.totalDocs
  );
  // const message = `Showing records ${endIndex} of ${paginationConfig.totalDocs}`;

  useEffect(() => {
    getAllRequests();
  }, []);

  const handlePageChange = (pageNumber) => {
    setPaginationConfig({
      ...paginationConfig,
      pageNumber: pageNumber,
    });

    getAllRequests(pageNumber);
  };

  const handleSearch = (value) => {
    setFilter({
      ...filter,
      keyword: value,
    });
  };

  const handleStatusChange = (value) => {
    setFilter({
      ...filter,
      status: value,
    });
  };

  const resetFilter = () => {
    setFilter({
      status: null,
      keyword: "",
      from: null,
      to: null,
    });
    getAllRequests(
      paginationConfig.pageNumber,
      paginationConfig.limit,
      "",
      true
    );
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleFrom = (date) => {
    setFilter({
      ...filter,
      from: date,
    });
  };

  const handleTo = (date) => {
    setFilter({
      ...filter,
      to: date,
    });
  };

  const handleLimitChange = (pageSize) => {
    setPaginationConfig({
      ...paginationConfig,
      limit: pageSize,
      current: 1,
    });

    getAllRequests(1, pageSize);
  };

  const getAllRequests = async () => {
    setLoading(true);
    try {
      const response = await Get(COIN.redeemRequests + "?type=red", token);
      setLoading(false);
      console.log("response", response);
      if (response) {
        setRequests(response);
      } else {
        message.error("Something went wrong!");
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const handleStatus = async () => {
    try {
      const index = requests?.docs?.findIndex(
        (request) => request._id == selectedRequests.request._id
      );

      console.log(index);
      let response = await Post(
        COIN.requestStatus,
        {
          requestId: selectedRequests.request._id,
          status: selectedRequests.newStatus,
        },
        token
      );
      const msg = response?.response?.data?.message;
      const paypalError = response?.response?.data?.error;
      if (msg.includes("Request status updated")) {
        setApproveModalOpen(false);
        setDisapproveModalOpen(false);
        message.success("Status updated successfully");
        getAllRequests();
      } else {
        setApproveModalOpen(false);
        if (msg.includes("PayPal")) {
          swal("Oops!", paypalError?.name, "error");
        } else {
          swal("Oops!", msg, "error");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log("paginationConfig", paginationConfig);

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };

  const columns = [
    {
      title: "S.no",
      dataIndex: "key",
      key: "key",
      width: 100,
      render: (value, item, index) => (index < 10 && "0") + (index + 1),
    },
    {
      title: "Trnx ID",
      dataIndex: "transaction_info.transaction_id",
      key: "transaction_info.transaction_id",
      // render: (value, item, index) => (
      //   <p>{item?.user?.firstName + " " + item?.user.lastName}</p>
      // ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (item) => <span>{dayjs(item).format("M/D/YYYY")}</span>,
    },
    {
      title: "Coin Type",
      dataIndex: "type",
      key: "type",
      render: (value, item, index) => <p>{item?.type.toUpperCase()}</p>,
    },
    {
      title: "Balance",
      dataIndex: "amount",
      key: "amount",
      render: (value, item, index) => <p>{item?.amount}</p>,
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      render: (value, item, index) => <p>{item?.note || "-"}</p>,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (value, item, index) =>
        item.status === "PENDING" ? (
          <Select
            className={item.status === "APPROVED" ? "greenSelect" : "redSelect"}
            suffixIcon={<FaCaretDown style={{ fontSize: "16px" }} />}
            value={item.status}
            bordered={false}
            onChange={(status) => {
              if (status === "APPROVED") {
                setApproveModalOpen(true);
              } else {
                setDisapproveModalOpen(true);
              }
              // setModalOpen(true);
              setSelectedRequests({
                request: requests?.docs?.[index],
                newStatus: status,
              });
            }}
            options={[
              {
                value: "APPROVED",
                label: "Approved",
              },
              {
                value: "REJECTED",
                label: "Rejected",
              },
            ]}
          />
        ) : (
          <p
            className={`${
              item.status === "APPROVED" ? "text-green-600" : "text-red-600"
            }`}
          >
            {item?.status}
          </p>
        ),
    },
    // {
    //   title: "Action",
    //   dataIndex: "id",
    //   key: "id",
    //   render: (value, item, index) => (
    //     <div
    //       className="view-link"
    //       onClick={() => navigate("/requests-management/" + item._id)}
    //     >
    //       View Details
    //     </div>
    //   ),
    // },
  ];

  const filterContent = (
    <div className="filterDropdown">
      <div>
        <p className="mainLabel" style={{ padding: "10px" }}>
          Filter
        </p>
      </div>
      <hr style={{ margin: 0 }} />

      <div className="filterDropdownBody">
        <p className="mainLabel">Creation Date:</p>
        <DatePicker
          className="mainInput filterInput"
          value={filter.from}
          onChange={(e) => handleFrom(e)}
        />
        <DatePicker
          className="mainInput filterInput"
          value={filter.to}
          onChange={(e) => handleTo(e)}
        />

        <p className="mainLabel">Filter by Status:</p>

        <Select
          size={"large"}
          className="filterSelectBox"
          placeholder="Select Status"
          value={filter.status}
          onChange={(e) => handleStatusChange(e)}
          style={{
            width: "100%",
            marginBottom: "10px",
            textAlign: "left",
          }}
          options={[
            { value: "APPROVED", label: "Approved" },
            { value: "DISAPPROVED", label: "Disapproved" },
          ]}
        />

        <Button
          type="primary"
          shape="round"
          block
          size={"large"}
          style={{ marginBottom: "10px" }}
          className="mainButton primaryButton"
          onClick={() => getAllRequests()}
        >
          Apply
        </Button>
        <Button
          type="primary"
          shape="round"
          block
          size={"large"}
          className="mainButton primaryButton2"
          onClick={() => resetFilter()}
        >
          Clear All
        </Button>
      </div>
    </div>
  );

  return (
    <Layout className="configuration">
      <div className="boxDetails">
        <Row style={{ padding: "10px 20px" }}>
          <Col
            xs={24}
            md={24}
            style={{ display: "flex", alignItems: "center" }}
          >
            <h1 className="pageTitle">Bank Payouts</h1>
          </Col>
        </Row>

        <Row style={{ padding: "10px 20px" }}>
          <Col xs={24} md={12}>
            <h5 style={{ display: "inline", fontSize: 16 }}>Show : </h5>
            <Select
              size={"large"}
              className="chartSelectBox"
              defaultValue={paginationConfig.limit}
              onChange={(e) => handleLimitChange(e)}
              style={{
                width: 70,
                textAlign: "left",
              }}
              options={[
                { value: 10, label: "10" },
                { value: 20, label: "20" },
                { value: 30, label: "30" },
                { value: 40, label: "40" },
                { value: 50, label: "50" },
              ]}
            />
            &emsp;
            <h5 style={{ display: "inline", fontSize: 16 }}>Entries</h5>
          </Col>
          <Col
            xs={24}
            md={12}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Input
              style={{ width: "250px" }}
              className="mainInput dashInput"
              placeholder="Search"
              onChange={(e) => handleSearch(e.target.value)}
              suffix={
                <FaSearch
                  style={{
                    color: "#3c5a92",
                    fontSize: 16,
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    getAllRequests(1, paginationConfig.limit, filter.keyword)
                  }
                />
              }
              onPressEnter={(e) =>
                getAllRequests(1, paginationConfig.limit, filter.keyword)
              }
            />
            &emsp;
            <Popover
              content={filterContent}
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}
              placement="bottomRight"
              arrow={false}
            >
              <Button
                style={{
                  padding: "10px 15px",
                  height: "auto",
                  // backgroundColor: "#3c5a92",
                }}
                className="fltr-btn"
              >
                <FaFilter style={{ fontSize: "16px", color: "white" }} />
              </Button>
            </Popover>
          </Col>
        </Row>

        <Row style={{ padding: 20, overflow: "auto" }}>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Skeleton active />
              <br />
            </div>
          ) : (
            <>
            <Table
              className="styledTable"
              dataSource={requests?.docs}
              columns={columns}
              pagination={false}
              />
              </>
          )}
        </Row>
        <Row style={{ padding: "10px 20px" }}>
          <Col xs={24} md={12}>
          </Col>
          <Col
            xs={24}
            md={12}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Pagination
              className="styledPagination"
              onChange={(e) => handlePageChange(e)}
              current={parseInt(paginationConfig.pageNumber)}
              pageSize={paginationConfig.limit}
              total={paginationConfig.totalDocs}
              itemRender={itemRender}
            />
          </Col>
        </Row>
        <br />
      </div>
      <br />
      <br />

      <Modal
        visible={approveModalOpen}
        onOk={() => handleStatus()}
        onCancel={() => setApproveModalOpen(false)}
        okText="Approve"
        className="StyledModal"
        style={{
          left: 0,
          right: 0,
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
        }}
        cancelText="No"
        cancelButtonProps={{
          style: {
            border: "2px solid #b78a39",
            color: "#b78a39",
            height: "auto",
            padding: "6px 35px",
            borderRadius: "50px",
            fontSize: "16px",
            marginTop: "15px",
          },
        }}
        okButtonProps={{
          style: {
            backgroundColor: "#b78a39",
            color: "white",
            marginTop: "15px",
            height: "auto",
            padding: "5px 35px",
            borderRadius: "50px",
            fontSize: "16px",
            border: "2px solid #b78a39",
          },
        }}
      >
        <Image
          src={ImageUrl("question.png")}
          preview={false}
          width={100}
          height={120}
        />
        <Typography.Title level={4} style={{ fontSize: "25px" }}>
          APPROVE!
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
          Do You Want To APPROVE This Request?
        </Typography.Text>
      </Modal>

      <Modal
        open={disapproveModalOpen}
        // onOk={() => handleStatus()}
        onCancel={() => setDisapproveModalOpen(false)}
        okText="Reject"
        onOk={() => handleStatus()}
        className="StyledModal"
        style={{
          left: 0,
          right: 0,
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
        }}
        cancelText="Cancel"
        cancelButtonProps={{
          className: "no-btn",
        }}
        okButtonProps={{
          className: "yes-btn",
        }}
      >
        <Image
          src={ImageUrl("question.png")}
          preview={false}
          width={74}
          height={74}
        />
        <Typography.Title level={4} style={{ fontSize: "25px" }}>
          System Message!
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
          Are You Sure You Want To Reject this Request?
          {/* <TextArea
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Please Write A Reason Here"
            autoSize={{
              minRows: 5,
              maxRows: 5,
            }}
          /> */}
        </Typography.Text>
      </Modal>
    </Layout>
  );
}

export default BankPayouts;
