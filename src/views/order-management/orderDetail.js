import { useEffect, useState } from "react";
import { Col, Row, Layout, Image, Table, Skeleton, message } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import OrderSummary from "../../components/orderSummary";
import { ImageUrl } from "../../config/functions";
import { Get } from "../../config/api/get";
import { ORDER, UPLOADS_URL } from "../../config/constants";
import dayjs from "dayjs";
// import image1 from "../../../pubImageUrlli(cproduct.png");
import { IoMdArrowRoundBack } from "react-icons/io";


function OrderDetails({ subTotal = 0, tax = 0 }) {
  const navigate = useNavigate();
  const location= useLocation()
  const pageNumber = location?.state?.pageNumber || 1
  const keyword = location?.state?.keyword || ""


  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.user.userToken);
  const [editMode, setEditMode] = useState(false);
  const [order, setOrder] = useState({});
  // const [orders, setOrders] = useState([
  //   {
  //     _id: 1,
  //     image: ImageUrl("product.png"),
  //     product: "Abc Product",
  //     quantity: 10,
  //     unitPrice: "180",
  //     size: "Small",
  //     color: "Silver",
  //     totalPrice: 100,
  //   },
  //   {
  //     _id: 2,
  //     image: ImageUrl("product.png"),
  //     product: "Abc Product",
  //     quantity: 10,
  //     unitPrice: "180",
  //     size: "Small",
  //     color: "Silver",
  //     totalPrice: 100,
  //   },
  // ]);
  const { id } = useParams();

  const getOrder = async () => {
    try {
      const response = await Get(`${ORDER.getOrderById}${id}`, token);
      if (response?.success) {
        setOrder(response?.order);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 100,
      render: (value, item, index) => (
        <Image
          preview={false}
          src={UPLOADS_URL + "/" + item?.product?.image}
          width={"48px"}
          height={"48px"}
          style={{ objectFit: "contain" }}
        />
      ),
    },
    {
      title: "PRODUCT",
      dataIndex: "product",
      key: "product",
      render: (value, item, index) => <h5>{item?.product?.title}</h5>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (value, item, index) => <span>{item.product?.type}</span>,
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "UNIT PRICE",
      dataIndex: "unitPrice",
      key: "unitPrice",
      render: (value, item, index) => <span>${item.product?.price}</span>,
    },
    {
      title: "Total",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (value, item, index) => (
        <span>${item?.product?.price * item.quantity}</span>
      ),
    },
  ];

  return (
    <Layout className="configuration">
      <div className="boxDetails">
        <Row style={{ padding: "10px 20px" }}>
          <Col
            xs={24}
            md={12}
            style={{ display: "flex", alignItems: "center" }}
          >
            <FaArrowLeft
              style={{ fontWeight: "bold", fontSize: "20px" }}
              onClick={() => navigate(-1)}
            />
            &emsp;
            <div className="flex gap-5 items-center">
            <IoMdArrowRoundBack
            onClick={() => {
              navigate("/order-management",{state: { pageNumber ,keyword}});
            }}
            size={30} className="text-black hover:cursor-pointer"/>
           <h1 className="pageTitle" style={{ margin: 0 }}>
              Order Details
            </h1>
            </div>
            
          </Col>
          <Col
            xs={24}
            md={12}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          ></Col>
        </Row>
        <br />
        <>
          <Row gutter={30}>
            <Col xs={24} style={{ textAlign: "right" }}>
              <h6 className="font-bold">Payment Status</h6>
              <span className="orderstatus">{order?.paymentStatus}</span>
            </Col>
            <Col xs={24} md={15} lg={17} className="order-detail-box">
              <h3>Order Information</h3>
              <h4>Order ID: {order?._id}</h4>
              <h5>Order Date: {dayjs(order?.createdAt).format("M/D/YYYY")}</h5>

              <h3>Account Information</h3>
              <h5>
                Customer Name: {order?.firstName} {order?.lastName}
              </h5>
              <h5>Email Address: {order?.email}</h5>

              <h3>Shipping Address</h3>
              <p>
                {order?.shippingDetails?.address} {order?.shippingDetails?.city}{" "}
                {order?.shippingDetails?.state}{" "}
                {order?.shippingDetails?.country}
              </p>

              <h3>Payment Information</h3>
              <h5>Payment Method: Card</h5>
            </Col>
            <Col xs={24} md={9} lg={7}>
              <OrderSummary subTotal={order?.totalPrice} tax={0} />
            </Col>
          </Row>
          <div className="boxDetails">
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
                  className="styledTable2"
                  dataSource={order?.products}
                  columns={columns}
                  pagination={false}
                />
              )}
            </Row>
          </div>
        </>
      </div>
    </Layout>
  );
}
export default OrderDetails;
