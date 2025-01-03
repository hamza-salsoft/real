import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Input,
  TextArea,
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

import { UploadOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { ImageUrl } from "../../config/functions";

function EditContent() {
  const { TextArea } = Input;
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

  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
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
              Edit Page Details
            </h1>
          </Col>
        </Row>
        <br />
        <Row style={{ padding: "20px" }}>
          <Col xs={24} md={16}>
            <Row style={{ padding: "10px" }}>
              <Col xs={24} md={11}>
                <Form
                  layout="vertical"
                  name="basic"
                  labelCol={{
                    span: 0,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                >
                  <Form.Item
                    label="Page Title"
                    name="page Title"
                    rules={[
                      {
                        type: "text",
                        // warningOnly: true,
                      },
                      {
                        required: true,
                        message: "Please input Page Title!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter Page Title"
                      style={{
                        borderRadius: "5px",
                        background: "white",
                        fontSize: "14px",
                        padding: "10px 20px",
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Upload Image"
                    name="upload Image"
                    rules={[
                      {
                        type: "text",
                        // warningOnly: true,
                      },
                      {
                        required: true,
                        message: "Please Upload Image!",
                      },
                    ]}
                  >
                    <div className="dotted-border">
                      <Upload {...props}>
                        <Button icon={<UploadOutlined />}>+Upload Image</Button>
                      </Upload>
                    </div>
                  </Form.Item>

                  <Form.Item
                    label="Page Description"
                    name="page Description"
                    rules={[
                      {
                        type: "text",
                        // warningOnly: true,
                      },
                      {
                        required: true,
                        message: "Please enter Page Description!",
                      },
                    ]}
                  >
                    <TextArea
                      placeholder="Enter Page Description"
                      autoSize={{
                        minRows: 4,
                        maxRows: 5,
                      }}
                    />
                  </Form.Item>

                  <br />

                  <Row justify="">
                    <Form.Item>
                      <Button
                        type="button"
                        size={"large"}
                        style={{ padding: "12px 40px", height: "auto" }}
                        className="mainButton graden-bg"
                        onClick={handleDeleteButtonClick}
                      >
                        Update
                      </Button>
                    </Form.Item>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>

        <br />
        <br />

        <Modal
          open={modalOpen}
          onOk={() => handleStatus()}
          onCancel={() => setModalOpen(false)}
          footer={[
            <Button
              key="submit"
              type="primary"
              loading={loading}
              className="yes-btn"
            >
              Okay
            </Button>,
          ]}
          cancelButtonProps={false}
          okText="Yes"
          className="StyledModal"
          style={{
            left: 0,
            right: 0,
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
          }}
          okButtonProps={{}}
        >
          <Image
            src={ImageUrl("done.png")}
            preview={false}
            width={74}
            height={74}
          />
          <Typography.Title level={4} style={{ fontSize: "25px" }}>
            System Message!
          </Typography.Title>
          <Typography.Text style={{ fontSize: 16 }}>
            Content Of The Page Has Been Updated Successfully!
          </Typography.Text>
        </Modal>
      </div>
    </Layout>
  );
}
export default EditContent;
