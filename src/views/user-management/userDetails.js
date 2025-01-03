import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Input,
  Button,
  Popover,
  Layout,
  Avatar,
  Tabs,
  Table,
  Select,
  Image,
  Modal,
  Skeleton,
} from "antd";
import dayjs from "dayjs";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { FaCaretDown, FaFilter, FaArrowLeft } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { UPLOADS_URL, USERS } from "../../config/constants";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ImageUrl } from "../../config/functions";
import swal from "sweetalert";
import { IoMdArrowRoundBack } from "react-icons/io";

function UserDetails() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [user, setUser] = useState({});
  const {isSuperAdmin} = useSelector((state) => state.user.userData);

  const location = useLocation();
  const pageNumber = location?.state?.pageNumber || 1;
  const keyword = location?.state?.keyword;

  console.log("keyword",keyword)

  useEffect(() => {
    getUser();
  }, []);

  console.log("JJJJJ", window.location);

  const getUser = async () => {
    setLoading(true);
    try {
      const response = await Get(`${USERS.getUserById}${id}`, token);
      if (response?.status) {
        setUser(response?.data);
        console.log(response?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    // let _user = users.find((item) => item.id == id);

    // console.log("_user", _user);
    // setUser(_user);
  };

  const handleStatus = async () => {
    try {
      const response = await Get(USERS.toggleStatus + user._id, token, {});
      if (response?.status) {
        setModalOpen(false);
        setUser(response?.data);
      }
    } catch (error) {
      console.log(error.message);
      swal("Oops!", error.message || "Error occurred!", "error");
    }
  };

  return (
    <Layout className="configuration">
      <div className="boxDetails">
        <Row style={{ padding: "10px 20px" }}>
          <Col
            xs={24}
            md={12}
            style={{ display: "flex", alignItems: "center" }}
          >
          <div className="flex gap-5 items-center">
            <IoMdArrowRoundBack
            onClick={() => {
              navigate("/user-management",{state: { pageNumber ,keyword}});
            }}
            size={30} className="text-black hover:cursor-pointer"/>
            <h1 className="pageTitle" style={{ margin: 0 }}>
              User Details
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
          >
            {user && (
              <>
                <Select
                  className={
                    user?.status === "ACTIVE" ? "greenSelect" : "redSelect"
                  }
                  suffixIcon={<FaCaretDown style={{ fontSize: "16px" }} />}
                  value={user?.status === "ACTIVE" ? "active" : "inactive"}
                  onChange={() => setModalOpen(true)}
                  style={{
                    fontSize: 16,
                  }}
                  bordered={false}
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
                {isSuperAdmin  ? <Button
                  type="primary"
                  shape="round"
                  size={"large"}
                  style={{ padding: "12px 40px", height: "auto" }}
                  className="mainButton primaryButton"
                  onClick={() => navigate("/user-management/update-coins/" + id)}
                >
                  Update Coins
                </Button> : null}
              </>
            )}
          </Col>
        </Row>
        <br />

        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <Skeleton active paragraph={{ rows: 10 }} />
          </div>
        )}

        {!loading && user && (
          <>
            <Row style={{ padding: "10px 20px" }}>
              <Col
                xs={24}
                md={12}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Avatar
                  size={100}
                  icon={
                    !user?.image ? (
                      <UserOutlined />
                    ) : (
                      <Avatar size={40} src={UPLOADS_URL + user.image} />
                    )
                  }
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />{" "}
                &emsp;
                <h1
                  className="pageTitle"
                  style={{ margin: 0, textTransform: "capitalize" }}
                >
                  {}
                </h1>
              </Col>
              {/* <Col
                xs={24}
                md={12}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                <h1 className="pageTitle" style={{ margin: 0 }}>
                  {user?.followers || 0}{" "}
                </h1>
                <p>Followers</p>
              </Col> */}
            </Row>
            <Row style={{ padding: "20px" }}>
              <Col xs={24} md={16}>
                <Row style={{ padding: "10px" }}>
                  <Col xs={24} md={12}>
                    <h5
                      style={{
                        display: "inline",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                      className="text-black"
                    >
                      Name{" "}
                    </h5>
                    <h5
                      style={{
                        display: "block",
                        fontSize: 16,
                        color: "#7a7e7f",
                      }}
                    >
                      {user?.firstName} {user?.lastName}
                    </h5>
                  </Col>
                  <Col xs={24} md={12}>
                    <h5
                      style={{
                        display: "block",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                      className="text-black"

                    >
                      Email Address{" "}
                    </h5>
                    <h5
                      style={{
                        display: "inline",
                        fontSize: 16,
                        color: "#7a7e7f",
                      }}
                    >
                      {user?.email}
                    </h5>
                  </Col>
                </Row>
                <Row style={{ padding: "10px" }}>
                  <Col xs={24} md={12}>
                    <h5
                      style={{
                        display: "inline",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                      className="text-black"

                    >
                      Phone Number{" "}
                    </h5>
                    <h5
                      style={{
                        display: "block",
                        fontSize: 16,
                        color: "#7a7e7f",
                      }}
                    >
                      {user?.phone ? user?.phone : "-"}
                    </h5>
                  </Col>
                  <Col xs={24} md={12}>
                    <h5
                      style={{
                        display: "block",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                      className="text-black"

                    >
                      Registered On{" "}
                    </h5>
                    <h5
                      style={{
                        display: "inline",
                        fontSize: 16,
                        color: "#7a7e7f",
                      }}
                    >
                      {dayjs(user?.createdAt).format("M/D/YYYY")}
                    </h5>
                  </Col>
                </Row>
              </Col>
            </Row>
            {/* {user?.experiances?.length > 0 &&
        <>
        <Row style={{ padding: "10px 20px" }}>
          <Col
            xs={24}
            md={12}
            style={{ display: "flex", alignItems: "center" }}
          >
            <h1 className="pageTitle" style={{ margin: 0 }}>
              Experiance
            </h1>
          </Col>
        </Row>

        <Row style={{ padding: "20px" }}>
          <Col xs={24} md={16}>
            {user?.experiances.map((item, index) => {
                return (
                  <Row style={{ padding: "10px" }}>
                    <Col xs={24} md={12}>
                      <h5
                        style={{
                          display: "inline",
                          fontSize: 16,
                          fontWeight: "bold",
                        }}
                      >
                        {item?.jobTitle}
                      </h5>
                    </Col>
                    <Col xs={24} md={12}>
                      <h5 style={{ fontSize: 16, color: "#7a7e7f" }}>
                        ABC Technologies (Pvt) Ltd
                      </h5>
                      <h5 style={{ fontSize: 16, color: "#7a7e7f" }}>
                        Sep 2021 - Present · 1 yr 5 mos
                      </h5>
                    </Col>
                  </Row>
                );
              })}
          </Col>
        </Row>
        </>}
        

        <Row style={{ padding: "10px 20px" }}>
          <Col
            xs={24}
            md={12}
            style={{ display: "flex", alignItems: "center" }}
          >
            <h1 className="pageTitle" style={{ margin: 0 }}>
              Availability
            </h1>
          </Col>
        </Row>

        <Row style={{ padding: "10px 20px" }}>
          <Col
            xs={24}
            md={12}
            style={{ display: "flex", alignItems: "center" }}
          >
            <table
              className="table"
              style={{ border: "1px solid #dee2e6", width: "100%" }}
            >
              <thead
                style={{
                  backgroundColor: "#b78a39",
                  color: "white",
                  textAlign: "center",
                  fontSize: "20px",
                }}
              >
                <tr>
                  <th>Days</th>
                  <th>From</th>
                  <th>To</th>
                </tr>
              </thead>
              <tbody
                style={{
                  color: "#a49a92",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                <tr>
                  <td>Monday</td>
                  <td>9:00 am</td>
                  <td>5:00 pm</td>
                </tr>
                <tr>
                  <td>Tuesday</td>
                  <td>9:00 am</td>
                  <td>5:00 pm</td>
                </tr>
                <tr>
                  <td>Thursday</td>
                  <td>9:00 am</td>
                  <td>5:00 pm</td>
                </tr>
                <tr>
                  <td>Friday</td>
                  <td>9:00 am</td>
                  <td>5:00 pm</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row> */}
          </>
        )}

        <br />
        <br />
      </div>

      <Modal
        open={modalOpen}
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
          {user?.status === "ACTIVE" ? "Deactivate" : "Activate"}
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
          Do You Want To {user?.status === "ACTIVE" ? "Deactivate" : "Activate"}{" "}
          This User?
        </Typography.Text>
      </Modal>

      <br />
      <br />
    </Layout>
  );
}
export default UserDetails;
