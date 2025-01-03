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
import { ORDER, SERVICE_PROVIDERS } from "../../config/constants";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ImageUrl } from "../../config/functions";
import { Put } from "../../config/api/put";
import moment from "moment";
import { useGetAllOrdersQuery } from "../../api/order";
import useDebounce from "../../hooks/useDebounce";

function InventoryManagement() {
  const location = useLocation();
  const pageNumber = location?.state?.pageNumber;
  const returnKeyword = location?.state?.keyword || "";


  const token = useSelector((state) => state.user.userToken);
  const [paginationConfig, setPaginationConfig] = useState({
    pageNumber: pageNumber || 1,
    limit: 10,
    totalPages: 0,
  });
  const { limit, pageNumber: page } = paginationConfig;
  const [search, setSearch] = useState(returnKeyword);
  const debouncedSearch = useDebounce(search, 700);



  const { data: orderData, refetch } = useGetAllOrdersQuery({ page, limit, keyword: debouncedSearch });
  const {docs: orders = []} = orderData ?? {}
  
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  // const [orders, setOrders] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("");
  // const [orders, setOrders] = useState([
  //   {
  //     id: 1,
  //     orderno: "#58795",
  //     customerName: "James Anderson",
  //     amountPaid: "$50",
  //     status: "PENDING",
  //   },
  //   {
  //     id: 2,
  //     orderno: "#58795",
  //     customerName: "Rikki Carter",
  //     amountPaid: "$50",
  //     status: "DELIVERED",
  //   },
  //   {
  //     id: 3,
  //     orderno: "#58795",
  //     customerName: "Fiona Parker",
  //     amountPaid: "$50",
  //     status: "INPROCESS",
  //   },
  //   {
  //     id: 4,
  //     orderno: "#58795",
  //     customerName: "Fiona Parker",
  //     amountPaid: "$50",
  //     status: "DISPATCHED",
  //   },
  //   // Add more user objects as needed
  // ]);

  const navigate = useNavigate();

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
    orderData?.totalDocs
  );
  const message = `Showing records ${endIndex} of ${orderData?.totalDocs}`;

  // useEffect(() => {
  //   getOrders();
  // }, []);

  const handlePageChange = (pageNumber) => {
    setPaginationConfig({
      ...paginationConfig,
      pageNumber: pageNumber,
    });

    // getProducts(pageNumber);
    refetch();

  };

  const handleSearch = (value) => {
    // setFilter({
    //   ...filter,
    //   keyword: value,
    // });
    setSearch(value);
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
    // getOrders(paginationConfig.page, paginationConfig.limit, "", true);
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
    refetch();
    // getProducts(1, pageSize);
  };

  // const getOrders = async (page, pageSize, search, reset = false) => {
  //   setLoading(true);
  //   try {
  //     const response = await Get(ORDER.getAllOrders, token, {
  //       page: page ? page : paginationConfig.page.toString(),
  //       limit: pageSize
  //         ? pageSize.toString()
  //         : paginationConfig.limit.toString(),
  //       status: reset ? "" : filter.status || null,
  //       keyword: search ? search : null,
  //       from: reset ? "" : filter?.from ? filter?.from.toISOString() : "",
  //       to: reset ? "" : filter?.to ? filter?.to.toISOString() : "",
  //     });
  //     setLoading(false);
  //     console.log("response", response);
  //     if (response?.status) {
  //       // setOrders(response?.data?.orders?.docs);
  //       setPaginationConfig({
  //         page: response?.data.page,
  //         limit: response?.data.limit,
  //         totalDocs: response?.data.totalDocs,
  //         totalPages: response?.data.totalPages,
  //       });
  //     } else {
  //       message.error("Something went wrong!");
  //       console.log("error====>", response);
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //     setLoading(false);
  //   }
  // };

  const handleStatus = async () => {
    try {
      const index = orders?.findIndex((user) => user._id == selectedOrder._id);

      console.log(index);
      const response = await Put(
        `${ORDER.updateStatus}${selectedOrder._id}`,
        token,
        { status: currentStatus }
      );
      const newOrders = [...orders];

      console.log(">>>>", newOrders[index].status);
      console.log(">>>>", selectedOrder.status);
      newOrders[index].status = currentStatus;
      setModalOpen(false);
      // setOrders(newOrders);
    } catch (error) {
      console.log(error.message);
    }
  };

  // console.log("paginationConfig", paginationConfig);

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
      title: "Order Number",
      dataIndex: "orderno",
      key: "orderno",
      render: (value, item, index) => <h5>{item._id}</h5>,
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      render: (value, item, index) => (
        <h5>
          {item?.firstName} {item?.lastName}
        </h5>
      ),
    },
    {
      title: "Amount",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (item) => <span>{moment(item).utc().subtract(6, 'hour').format("DD MMM, YYYY hh:mm A")}</span>,
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "payment",
      // render: (value, item, index) => (
      //   <h5>
      //     {item.isPaid ? (
      //       <span className="text-bue-500">true</span>
      //     ) : (
      //       <span className="text-red-500">false</span>
      //     )}
      //   </h5>
      // ),
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (value, item, index) => (
    //     <Select
    //       className={
    //         value == "Pending"
    //           ? "color-yellow"
    //           : value == "Shipped"
    //           ? "color-yellow"
    //           : value == "DELIVERED"
    //           ? "color-green"
    //           : value == "Cancelled"
    //           ? "color-pink"
    //           : "text-red-500"
    //       }
    //       suffixIcon={<FaCaretDown style={{ fontSize: "16px" }} />}
    //       value={value}
    //       bordered={false}
    //       onChange={(option) => {
    //         setModalOpen(true);
    //         setSelectedOrder(orders[index]);
    //         setCurrentStatus(option);
    //       }}
    //       options={[
    //         {
    //           value: "Pending",
    //           label: "Pending",
    //         },
    //         {
    //           value: "Shipped",
    //           label: "Shipped",
    //         },
    //         {
    //           value: "Delivered",
    //           label: "Delivered",
    //         },
    //         {
    //           value: "Cancelled",
    //           label: "Cancelled",
    //         },
    //       ]}
    //     />
    //   ),
    // },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (value, item, index) => (
        <FaEye
          style={{ fontSize: "16px", color: "#C90000", cursor: "pointer" }}
          onClick={() => navigate("/order-management/" + item._id, {state: { pageNumber: paginationConfig.pageNumber ,keyword: search }})}
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
            {
              value: "PENDING",
              label: "Pending",
            },
            {
              value: "PROCESSING",
              label: "Processing",
            },
            {
              value: "DISPATCHED",
              label: "Dispatched",
            },
            {
              value: "DELIVERED",
              label: "Delivered",
            },
            {
              value: "COMPLETED",
              label: "Completed",
            },
            {
              value: "CANCELED",
              label: "Canceled",
            },
          ]}
        />

        <Button
          type="primary"
          shape="round"
          block
          size={"large"}
          style={{ marginBottom: "10px" }}
          className="mainButton primaryButton"
          onClick={() => refetch()}
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
            <h1 className="pageTitle">Order Management</h1>
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
              value={search}
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
                  onClick={() =>{

                    // getOrders(1, paginationConfig.limit, filter.keyword)
                  }
                  }
                />
              }
              onPressEnter={(e) => {

                // getOrders(1, paginationConfig.limit, filter.keyword)
              }
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
              dataSource={orders}
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
              total={orderData?.totalDocs}
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
        <Typography.Title
          level={4}
          style={{ fontSize: "25px" }}
          className="capitalize"
        >
          {currentStatus}
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }} className="capitalize">
          Do You Want To update the status to {currentStatus}?
        </Typography.Text>
      </Modal>
    </Layout>
  );
}

export default InventoryManagement;
