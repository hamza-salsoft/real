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
import { CATEGORIES, CATEGORY, EVENT } from "../../config/constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ImageUrl } from "../../config/functions";

function CategoryManagement() {
  const token = useSelector((state) => state.user.userToken);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [modalOpen, setModalOpen] = useState(false);
  // const [selectedIndex, setSelectedIndex] = useState(null);
  // const [selectedEvent, setSelectedEvent] = useState(null);
  const [categories, setCategories] = useState([]);
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
  const message = `Showing records ${endIndex} of ${paginationConfig.totalDocs}`;

  useEffect(() => {
    getCategories();
  }, []);

  const handlePageChange = (pageNumber) => {
    setPaginationConfig({
      ...paginationConfig,
      pageNumber: pageNumber,
    });

    getCategories(pageNumber);
  };

  const handleSearch = (value) => {
    setFilter({
      ...filter,
      keyword: value,
    });
  };

  // const handleStatusChange = (value) => {
  //   setFilter({
  //     ...filter,
  //     status: value,
  //   });
  // };

  const resetFilter = () => {
    setFilter({
      status: null,
      keyword: "",
      from: null,
      to: null,
    });
    getCategories(
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

    getCategories(1, pageSize);
  };

  // const handleStatus = async () => {
  //   try {
  //     const index = categories.findIndex((user) => user._id == selectedEvent._id);

  //     console.log(index);
  //     const response = await Get(
  //       EVENT.toggleStatus + "/" + selectedEvent._id,
  //       token,
  //       {}
  //     );
  //     const newEvent = [...categories];

  //     console.log(">>>>", newEvent[index].isActive);
  //     console.log(">>>>", selectedEvent.isActive);
  //     newEvent[index].status =
  //       newEvent[index].status == "ACTIVE" ? "INACTIVE" : "ACTIVE";
  //     setModalOpen(false);
  //     setCategories(newEvent);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const getCategories = async (pageNumber, pageSize, search, reset = false) => {
    setLoading(true);
    try {
      const response = await Get(CATEGORY.getAllCategories, token, {
        page: pageNumber
          ? pageNumber.toString()
          : paginationConfig.pageNumber.toString(),
        limit: pageSize
          ? pageSize.toString()
          : paginationConfig.limit.toString(),
        status: reset ? "" : filter.status || null,
        keyword: search ? search : null,
        from: reset ? "" : filter?.from ? filter?.from.toISOString() : "",
        to: reset ? "" : filter?.to ? filter?.to.toISOString() : "",
      });
      setLoading(false);
      console.log("response", response);
      if (response?.status) {
        setCategories(response?.data?.docs);
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
      title: "C-ID	",
      dataIndex: "key",
      key: "key",
      width: 100,
      render: (value, item, index) => (index < 10 && "0") + (index + 1),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    // {
    //   title: "Location",
    //   dataIndex: "location",
    //   key: "location",
    // },
    // {
    //   title: "Address",
    //   dataIndex: "address",
    //   key: "address",
    // },
    {
      title: "Creation Date",
      dataIndex: "date",
      key: "date",
      render: (item) => <span>{dayjs(item).format("M/D/YYYY")}</span>,
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (value, item, index) => (
    //     <Select
    //       className={value == "ACTIVE" ? "greenSelect" : "redSelect"}
    //       suffixIcon={<FaCaretDown style={{ fontSize: "16px" }} />}
    //       value={value}
    //       bordered={false}
    //       onChange={() => {
    //         setModalOpen(true);
    //         setSelectedEvent(categories[index]);
    //       }}
    //       options={[
    //         {
    //           value: "active",
    //           label: "Active",
    //         },
    //         {
    //           value: "inactive",
    //           label: "Inactive",
    //         },
    //       ]}
    //     />
    //   ),
    // },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (item) => (
        <FaEye
          style={{ fontSize: "16px", color: "#C90000", cursor: "pointer" }}
          onClick={() => navigate("/category-management/" + item)}
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
{/* 
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
        /> */}

        <Button
          type="primary"
          shape="round"
          block
          size={"large"}
          style={{ marginBottom: "10px" }}
          className="mainButton primaryButton"
          onClick={() => getCategories()}
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
            md={12}
            style={{ display: "flex", alignItems: "center" }}
          >
            <h1 className="pageTitle">Category Management</h1>
          </Col>
          <Col
            xs={24}
            md={12}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Button
              type="primary"
              shape="round"
              size={"large"}
              style={{ padding: "12px 40px", height: "auto" }}
              className="mainButton primaryButton"
              onClick={() => navigate("/category-management/addCategory")}
            >
              Add Category
            </Button>
          </Col>
        </Row>
        {/* <Row style={{ padding: "10px 20px" }}>
          <h1 className="pageTitle">Movies</h1>
        </Row> */}

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
                    getCategories(1, paginationConfig.limit, filter.keyword)
                  }
                />
              }
              onPressEnter={(e) =>
                getCategories(1, paginationConfig.limit, filter.keyword)
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
              dataSource={categories}
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
      {/* <Modal
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
          {selectedEvent?.status == "ACTIVE" ? "Deactivate" : "Activate"}
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
          Do You Want To{" "}
          {selectedEvent?.status == "ACTIVE" ? "Deactivate" : "Activate"} This
          Event?
        </Typography.Text>
      </Modal> */}
    </Layout>
  );
}

export default CategoryManagement;