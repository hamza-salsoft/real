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
import { USERS } from "../../config/constants";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ImageUrl } from "../../config/functions";

function UserManagement() {

  const navigate = useNavigate();
  const location = useLocation();
  const pageNumber = location?.state?.pageNumber;
  const returnKeyword = location?.state?.keyword || "";
  console.log("returnKeyword",returnKeyword)

  const token = useSelector((state) => state.user.userToken);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [paginationConfig, setPaginationConfig] = useState({
    pageNumber: pageNumber || 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 0,
  });


  const [filter, setFilter] = useState({
    status: null,
    keyword: returnKeyword,
    from: null,
    to: null,
  });

  const startIndex =
    (paginationConfig.pageNumber - 1) * paginationConfig.limit + 1;
  const endIndex = Math.min(
    startIndex + paginationConfig.limit - 1,
    paginationConfig.totalDocs
  );
  const message = `Showing records ${endIndex} of ${paginationConfig.totalDocs}`;


  useEffect(() => {
    getUsers();
  }, []);

  const handlePageChange = (pageNumber) => {
    setPaginationConfig({
      ...paginationConfig,
      pageNumber: pageNumber,
    });

    getUsers(pageNumber);
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
    getUsers(paginationConfig.pageNumber, paginationConfig.limit, "", true);
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

    getUsers(1, pageSize);
  };

  // const handleStatus = async () => {
  //   try {
  //     const index = users.findIndex((user) => user.id == selectedUser.id);
  //     const newUsers = [...users];

  //     console.log(index)

  //     newUsers[index].isActive = !selectedUser.isActive;
  //     setModalOpen(false);
  //     setUsers(newUsers);
  //   } catch (error) {
  //     console.log(error.message);
  //   }

  // };

  const handleStatus = async () => {
    try {
      const index = users.findIndex((user) => user._id == selectedUser._id);

      console.log(index);
      const response = await Get(
        USERS.toggleStatus + selectedUser._id,
        token,
        {}
      );
      const newUsers = [...users];

      newUsers[index].status =
        newUsers[index].status == "ACTIVE" ? "INACTIVE" : "ACTIVE";
      setModalOpen(false);
      setUsers(newUsers);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(
    "users",
    users.map((item) => item.isActive)
  );


  // Function to get users

  // getUsers(1, paginationConfig.limit, filter.keyword)

  const getUsers = async (pageNumber, pageSize, search, reset = false) => {
    setLoading(true);
    try {
      const response = await Get(USERS.getAllUsers, token, {
        page: pageNumber
          ? pageNumber.toString()
          : paginationConfig.pageNumber.toString(),
        limit: pageSize
          ? pageSize.toString()
          : paginationConfig.limit.toString(),
        status: reset ? "" : filter.status || null,
        keyword: search ? search : filter?.keyword ? filter?.keyword : null,
        from: reset ? "" : filter?.from ? filter?.from.toISOString() : "",
        to: reset ? "" : filter?.to ? filter?.to.toISOString() : "",
      });
      setLoading(false);
      console.log("response", response);
      if (response?.status) {
        setUsers(response?.data?.docs);
        setPaginationConfig({
          pageNumber: response?.data?.page,
          limit: response?.data?.limit,
          totalDocs: response?.data?.totalDocs,
          totalPages: response?.data?.totalPages,
        });
      } else {
        message.error("Something went wrong!");
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
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
      title: "S. No.	",
      dataIndex: "key",
      key: "key",
      width: 100,
      render: (value, item, index) => (index < 10 && "0") + (index + 1),
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (value, item, index) => (
        <p>
          {item.firstName} {item.lastName}
        </p>
      ),
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Red Coins",
      dataIndex: "redCoins",
      key: "redCoins",
    },
    {
      title: "Gold Coins",
      dataIndex: "goldCoins",
      key: "goldCoins",
    },
    {
      title: "Register On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (item) => <span>{dayjs(item).format("M/D/YYYY")}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value, item, index) => (
        <Select
          className={value == "ACTIVE" ? "greenSelect" : "redSelect"}
          suffixIcon={<FaCaretDown style={{ fontSize: "16px" }} />}
          value={value}
          bordered={false}
          onChange={() => {
            setModalOpen(true);
            setSelectedUser(users[index]);
          }}
          options={[
            {
              value: "active",
              label: "Active",
            },
            {
              value: "inactive",
              label: "Inactive",
            },
          ]}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (value, item, index) => (
        <FaEye
          style={{ fontSize: "16px", color: "#C90000", cursor: "pointer" }}
          onClick={() => {
            console.log(item._id);
            navigate("/user-management/" + item._id, 
            {state: { pageNumber: paginationConfig.pageNumber, keyword: filter.keyword }}
            );
          }}
        />
      ),
    },
    {
      title: "Logs",
      dataIndex: "logs",
      key: "logs",
      render: (value, item, index) => (
        <FaEye
          style={{ fontSize: "16px", color: "#C90000", cursor: "pointer" }}
          onClick={() => {
            console.log(item._id);
            navigate("/transaction-logs/" + item._id,
            {state: { 
              pageNumber: paginationConfig.pageNumber,
               keyword: filter.keyword
               }}
            );
          }}
        />
      ),
    },
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
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ]}
        />

        <Button
          type="primary"
          shape="round"
          block
          size={"large"}
          style={{ marginBottom: "10px" }}
          className="mainButton primaryButton"
          onClick={() => getUsers()}
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
          <h1 className="pageTitle">User Management</h1>
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
              value={filter.keyword}
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
                    getUsers(1, paginationConfig.limit, filter.keyword)
                  }
                />
              }
              onPressEnter={(e) =>
                getUsers(1, paginationConfig.limit, filter.keyword)
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
            <Table
              className="styledTable"
              dataSource={users}
              columns={columns}
              pagination={false}
            />
          )}
        </Row>
        <Row style={{ padding: "10px 20px" }}>
          <Col xs={24} md={12}>
            <p>{message}</p>
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
        visible={modalOpen}
        onOk={() => handleStatus()}
        onCancel={() => setModalOpen(false)}
        okText="Yes"
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
          {selectedUser?.status == "ACTIVE" ? "Deactivate" : "Activate"}
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
          Do You Want To{" "}
          {selectedUser?.status == "ACTIVE" ? "Deactivate" : "Activate"} This
          User?
        </Typography.Text>
      </Modal>
    </Layout>
  );
}

export default UserManagement;
