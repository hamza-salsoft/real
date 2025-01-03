import React, { useEffect, useLayoutEffect, useState } from "react";
// import Head from "next/head";
// import Image from "next/image";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

// import router from "next/router";
import { Breadcrumb, Layout, Menu, theme, Row, Col, Drawer, Image, Modal, message, Typography } from "antd";
import { AiFillCaretDown, AiFillApple } from "react-icons/ai";
import { Badge, Avatar, Dropdown, Popover, Alert, Button } from "antd";
import { FaBars, FaEllipsisV, FaUser, FaSignOutAlt } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { AUTH, SITE_NAME } from "../../config/constants";
import "../../styles/Home.module.css";
import ClientHeader from "./ClientHeader";
import { ImageUrl } from "../../config/functions";
import { SiGoogleforms } from "react-icons/si";
import { useSelector } from "react-redux";
import { Get } from "../../config/api/get";
import { useDispatch } from "react-redux";
import { removeUser } from "../../redux/slice/authSlice";

const { Header, Content, Sider } = Layout;

const ClientLayout = ({ children, head }) => {
  const [logoutModal, setLogoutModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [selectedItem, setSelectedItem] = useState("1");
  const navigate = useNavigate();
  const {isSuperAdmin} = useSelector((state) => state.user.userData);
  const [sideNavItems, setSideNavItems] = useState([]);
  const token = useSelector((state) => state.user.userToken);
  const dispatch = useDispatch();

  const logout = () => {
    setLogoutModal(true);

    Get(AUTH.logout, token)
      .then((response) => {
        console.log(">><><>", response);
        if (response?.response?.status === 401) {
          message.error(
            response.response.data.message || "Something went wrong"
          );
        } else {
          dispatch(removeUser());
          navigate("/signin");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const navItems = [
    {
      key: 1,
      icon: ImageUrl("/dside-icon/1.png"),
      label: "Dashboard",
      path: "/",
    },
    {
      key: 2,
      icon: ImageUrl("/dside-icon/2.png"),
      label: "User Management",
      path: "/user-management",
    },
    {
      key: 10,
      icon: ImageUrl("dside-icon/10.png"),
      label: "Inventory Management",
      path: "/inventory-management",
      role: "superAdmin",
    },
    {
      key: 11,
      icon: ImageUrl("dside-icon/11.png"),
      label: "Order Management",
      path: "/order-management",
    },
    {
      key: 9,
      icon: ImageUrl("/dside-icon/12.png"),
      label: "Paypal Credentials",
      path: "/paypal-credentials",
      role: "superAdmin",
    },
    {
      key: 12,
      icon: ImageUrl("dside-icon/13.png"),
      label: "Bank Payouts",
      path: "/bank-payouts",
    },
    {
      key: 13,
      icon: ImageUrl("dside-icon/13.png"),
      label: "Incomming Gold Coins",
      path: "/incomming-gold-coins",
    },
    {
      key: 14,
      icon: ImageUrl("dside-icon/13.png"),
      label: "Red Coin Requests",
      path: "/coin-requests",
    },
    {
      key: 15,
      icon: ImageUrl("dside-icon/13.png"),
      label: "Email Change Requests",
      path: "/email-requests",
    },
    {
      key: 16,
      icon: ImageUrl("dside-icon/13.png"),
      label: "Post Management",
      path: "/post-management",
    },
    {
      key: 17,
      icon: ImageUrl("dside-icon/13.png"),
      label: "Chat",
      path: "/chat",
    },
  ].map((item, index) => {
    return {
      key: item.key,
      icon: (
        <Image
          src={item.icon}
          alt="Picture of the author"
          preview={false}
          style={{ paddingRight: "10px" }}
        />
      ),
      label: item.label,
      path: item.path,
      role: item.role,
    };
  });
  
  const items = [
    {
      key: "1",
      label: (
        <div
          className="headerDropdown"
          style={{
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            padding: "5px 12px",
          }}
          onClick={() => navigate("/profile")}
        >
          <FaUser style={{ fontSize: "16px" }} /> &nbsp; My Profile
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          style={{
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            padding: "5px 12px",
          }}
          onClick={() => setLogoutModal(true)}
        >
          <FaSignOutAlt style={{ fontSize: "16px" }} />
          &nbsp; Logout
        </div>
      ),
    },
  ];
  
  const content = (
    <div style={{ width: "350px" }}>
      <div
        style={{
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Notifications</h3>
        <Alert
          message="5 New"
          type="success"
          style={{ fontSize: "12px", padding: "2px 10px", color: "green" }}
        />
      </div>
      <hr
        style={{
          borderLeft: "none",
          borderBottom: "none",
          borderRight: "none",
          borderTop: "1px solid rgb(0 0 0 / 15%)",
        }}
      />
      <div style={{ height: "250px", overflow: "auto" }}>
        <div style={{ padding: 10 }}>
          <Row style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Col xs={3}>
              <div
                style={{
                  padding: "10px 10px 10px 10px",
                  width: "35px",
                  display: "flex",
                  backgroundColor: "#b78a39",
                  borderRadius: "5px",
                }}
              >
                <FiBell style={{ fontSize: "16px", margin: 0, color: "white" }} />
              </div>
            </Col>
            <Col xs={20}>
              <h6 class="notificationHeading">
                Lorem Ipsum is simply dummy text
              </h6>
              <p class="notificationText">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id nam
                veniam aperiam eveniet mollitia quos nemo! Officiis voluptates
                illo delectus.
              </p>
            </Col>
          </Row>
        </div>
  
        <div style={{ padding: 10 }}>
          <Row style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Col xs={3}>
              <div
                style={{
                  padding: "10px 10px 10px 10px",
                  width: "35px",
                  display: "flex",
                  backgroundColor: "#b78a39",
                  borderRadius: "5px",
                }}
              >
                <FiBell style={{ fontSize: "16px", margin: 0, color: "white" }} />
              </div>
            </Col>
            <Col xs={20}>
              <h6 class="notificationHeading">
                Lorem Ipsum is simply dummy text
              </h6>
              <p class="notificationText">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id nam
                veniam aperiam eveniet mollitia quos nemo! Officiis voluptates
                illo delectus.
              </p>
            </Col>
          </Row>
        </div>
  
        <div style={{ padding: 10 }}>
          <Row style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Col xs={3}>
              <div
                style={{
                  padding: "10px 10px 10px 10px",
                  width: "35px",
                  display: "flex",
                  backgroundColor: "#b78a39",
                  borderRadius: "5px",
                }}
              >
                <FiBell style={{ fontSize: "16px", margin: 0, color: "white" }} />
              </div>
            </Col>
            <Col xs={20}>
              <h6 class="notificationHeading">
                Lorem Ipsum is simply dummy text
              </h6>
              <p class="notificationText">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id nam
                veniam aperiam eveniet mollitia quos nemo! Officiis voluptates
                illo delectus.
              </p>
            </Col>
          </Row>
        </div>
      </div>
  
      <hr
        style={{
          borderLeft: "none",
          borderBottom: "none",
          borderRight: "none",
          borderTop: "1px solid rgb(0 0 0 / 15%)",
        }}
      />
  
      <div
        style={{
          padding: "10px 20px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button type="link">View All</Button>
      </div>
    </div>
  );

  useEffect(()=>{
    if (isSuperAdmin) {
      setSideNavItems(navItems);
    } else {
      let items = [...navItems?.filter((item) => item.role !== "superAdmin")];
      setSideNavItems([...items]);
    }
  },[isSuperAdmin])

  useLayoutEffect(() => {
    // get the path and set selected item to key of the path that matches
    const path = window.location.pathname;
    const item = sideNavItems.find((item) => item.path == path);
    if (item) {
      setSelectedItem(item.key.toString());
    }
  }, []);

  let title = head?.title ? head?.title : "";
  if (title) {
    title = `${SITE_NAME} | ${title}`;
  } else {
    title = SITE_NAME;
  }

  // set the page title
  useEffect(() => {
    document.title = title;
  }, [title]);

  const containerStyle = {
    position: "relative",
    height: 200,
    padding: 48,
    overflow: "hidden",
    textAlign: "center",
  };

  return (
    <Layout
      style={{
        backgroundColor: "white",
        scrollBehavior: "smooth",
        height: "100vh",
      }}
    >
      <Modal
        visible={logoutModal}
        onOk={() => logout()}
        onCancel={() => setLogoutModal(false)}
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
          width={80}
          height={80}
        />
        <Typography.Title level={4} style={{ fontSize: "25px" }}>
          System Message!
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
          Are You Sure You Want To Logout?
        </Typography.Text>
      </Modal>
      <ClientHeader
        visible={visible}
        setVisible={setVisible}
        visible2={visible2}
        setVisible2={setVisible2}
      />

      <Layout style={{ height: "90vh" }}>
        <Row
          style={{
            background: "#000",
          }}
        >
          <Col xs={0} md={24}>
            <Sider
              width={280}
              style={{
                background: "white",
              }}
              className="mainSider"
            >
              <Menu
                mode="inline"
                selectedKeys={[selectedItem]}
                style={{
                  height: "100%",
                  borderRight: 0,
                  background: "#000",
                }}
              >
                {sideNavItems.map((item) => (
                  <Menu.Item
                    key={item.key}
                    icon={item.icon}
                    onClick={() => {
                      navigate(item.path);
                      setSelectedItem(item.key.toString());
                    }}
                  >
                    {item.label}
                  </Menu.Item>
                ))}
              </Menu>
            </Sider>
          </Col>
        </Row>

        <Layout
          style={{
            padding: "30px",
            overflow: "auto",
            backgroundColor: "#f4f7fe",
            position: "relative",
            outline: "none",
          }}
        >
          {visible2 && (
            <div
              style={{
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex:99,
              }}
            >
              <Row style={{ alignItems: "flex-end" }}>
                <Col xs={24} md={0}>
                  <div
                    style={{
                      backgroundColor: "#b78a39",
                      padding: "20px",
                      display: "flex",
                      justifyContent: "flex-end",
                      transition: "all 0.5s ease-in-out",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Popover
                        content={content}
                        placement="bottomRight"
                        arrow={false}
                        className="headerPopover"
                      >
                        <Badge count={5} style={{ backgroundColor: "#b78a39" }}>
                          <FiBell
                            style={{ fontSize: "25px", color: "white" }}
                          />
                        </Badge>
                      </Popover>
                      &emsp; &emsp;
                      <Avatar size={40} src={ImageUrl("avatar.png")} />
                      <Dropdown
                        menu={{
                          items,
                        }}
                        trigger={["click"]}
                        placement="bottomRight"
                      >
                        <p
                          style={{
                            marginLeft: 10,
                            fontSize: "16px",
                            color: "white",
                          }}
                        >
                          Masooma Albert <AiFillCaretDown fontSize={12} />{" "}
                        </p>
                      </Dropdown>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          )}

          {children}

          <Drawer
            className="drawer"
            placement={"left"}
            size={"default"}
            closable={false}
            onClose={() => setVisible(false)}
            visible={visible}
            getContainer={false}
            key={"drawer"}
          >
            <Menu
              mode="inline"
              selectedKeys={[selectedItem]}
              style={{
                height: "100%",
                borderRight: 0,
                backgroundColor: "rgb(0, 0, 0)",
              }}
            >
              {sideNavItems.map((item) => (
                <Menu.Item
                  key={item.key}
                  icon={item.icon}
                  onClick={() => {
                    navigate(item.path);
                    setSelectedItem(item.key.toString());
                  }}
                >
                  {item.label}
                </Menu.Item>
              ))}
            </Menu>
          </Drawer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ClientLayout;
