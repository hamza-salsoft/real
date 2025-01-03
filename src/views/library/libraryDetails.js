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
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ImageUrl } from "../../config/functions";

function UserDetails() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([
    {
      id: 1,
      fullname: "John Doe",
      bookPrice: "$50",
      hardcopy: "$60",
    },
    {
      id: 2,
      fullname: "Jane Smith",
      fullname: "John Doe",
      bookPrice: "$50",
      hardcopy: "$60",
    },
    {
      id: 3,
      fullname: "Bob Johnson",
      fullname: "John Doe",
      bookPrice: "$50",
      hardcopy: "$60",
    },
    // Add more user objects as needed
  ]);

  useEffect(() => {
    getUser();
  }, []);

  console.log("JJJJJ", window.location);

  const getUser = async () => {
    setLoading(true);
    // const user = await Get(`${USERS.getOne}${id}`, token);
    // setUser(user);

    let _user = users.find((item) => item.id == id);

    console.log("_user", _user);
    setUser(_user);
    setLoading(false);
  };

  const handleStatus = async () => {
    try {
      const response = await Get(
        USERS.toggleStatus + "/" + user._id,
        token,
        {}
      );
      const newUser = { ...user };

      newUser.isActive = !user.isActive;
      setModalOpen(false);
      setUser(newUser);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDeleteButtonClick = () => {
    setModalOpen(true);
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
            <FaArrowLeft
              style={{ fontWeight: "bold", fontSize: "20px" }}
              onClick={() => navigate(-1)}
            />
            &emsp;
            <h1 className="pageTitle" style={{ margin: 0 }}>
              Book Details
            </h1>
          </Col>
          {/* <Col
            xs={24}
            md={12}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {user && (
              <Select
                className={user?.isActive ? "greenSelect" : "redSelect"}
                suffixIcon={<FaCaretDown style={{ fontSize: "16px" }} />}
                value={user?.isActive ? "active" : "inactive"}
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
            )}
          </Col> */}
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
            <Row style={{ padding: "20px" }}>
              <Col xs={24} md={16}>
                <Row style={{ padding: "10px" }}>
                  <Col xs={24} md={9}>
                    <Image
                      src={ImageUrl("labry-pic.png")}
                      alt="Analytics Image"
                      preview={false}
                    />
                  </Col>
                  <Col xs={24} md={12}>
                    <div>
                      <h4 className="sub-heading">Masonic Union of 1813 </h4>
                      <h5 className="heading-inner-text">{user?.fullname}</h5>
                    </div>
                    <div>
                      <h4 className="heading-inner-medium">Ebook Price</h4>
                      <h5 className="heading-inner-text">{user?.bookPrice}</h5>
                    </div>
                    <div>
                      <h4 className="heading-inner-medium">Hardcopy Price</h4>
                      <h5 className="heading-inner-text">{user?.hardcopy}</h5>
                    </div>
                    <div>
                      <Button
                        type="button"
                        size={"large"}
                        style={{ padding: "12px 40px", height: "auto" }}
                        className="mainButton primaryButton"
                        onClick={handleDeleteButtonClick}
                      >
                        Delete
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
        )}

        <br />
        <br />

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
            Are You Sure You Want To Delete This Book?
          </Typography.Text>
        </Modal>
      </div>
    </Layout>
  );
}
export default UserDetails;
