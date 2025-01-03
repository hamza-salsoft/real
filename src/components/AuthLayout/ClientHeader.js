import React, { useState } from "react";
import { Image, Badge, Avatar, Dropdown, Popover, Alert } from "antd";
import { MdMenu } from "react-icons/md";
import { AiFillCaretDown, AiFillApple } from "react-icons/ai";
import { FaBars, FaEllipsisV, FaUser, FaSignOutAlt } from "react-icons/fa";
import {
  Layout,
  Row,
  Col,
  Menu,
  Button,
  Drawer,
  Input,
  Typography,
  message,
} from "antd";
import MainButton from "../MainButton";
import { FiBell } from "react-icons/fi";
import { ImageUrl } from "../../config/functions";

const { Header } = Layout;

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

const ClientHeader = ({ visible, setVisible, visible2, setVisible2 }) => {
  // const [visible, setVisible] = useState(false);
  // const router = useRouter();
  // const [path, setPath] = useState(
  //   router.pathname.slice(1, router.pathname.length)
  //);
  return (
    <>
      <Row>
        <Col xs={0} md={24}>
          <Header
            style={{
              height: "10vh",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "25px 60px",
            }}
          >
            <div>
              <Image
                src={ImageUrl("logo.png")}
                alt="Picture of the author"
                width={140}
                height={50}
                preview={false}
              />
            </div>
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
                  <FiBell style={{ fontSize: "25px" }} />
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
                <p style={{ marginLeft: 10, fontSize: "16px" }}>
                  Masooma Albert <AiFillCaretDown fontSize={12} />{" "}
                </p>
              </Dropdown>
            </div>
          </Header>
        </Col>
      </Row>

      <Row>
        <Col xs={24} md={0}>
          <Header
            style={{
              height: "10vh",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              padding: "15px 35px",
            }}
          >
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaEllipsisV
                  style={{ fontSize: 22, color: "#b78a39" }}
                  onClick={() => setVisible2(!visible2)}
                />
              </Col>
              <Col>
                {/* <Link href={"/"}> */}
                <Image
                  preview={false}
                  alt={"Failed to load image"}
                  src={ImageUrl("logo.png")}
                  style={{ maxWidth: 120 }}
                />
                {/* </Link> */}
              </Col>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaBars
                  style={{ fontSize: 22, color: "#b78a39" }}
                  onClick={() => setVisible(!visible)}
                />
              </Col>
            </Row>
          </Header>
        </Col>
      </Row>
    </>
  );
};

export default ClientHeader;
