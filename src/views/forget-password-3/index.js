import React, { useEffect, useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Layout,
  Input,
  Button,
  Checkbox,
  Tabs,
  Table,
  Image,
  Modal,
  Divider,
} from "antd";
import Link from "antd/es/typography/Link";
import { ImageUrl } from "../../config/functions";

// import router from "next/router";

function ForgetPassword() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const handleStatus = async () => {};
  const handleDeleteButtonClick = () => {
    setModalOpen(true);
  };
  return (
    <AuthLayout
      head={{ title: "User Management", description: "Some Description." }}
    >
      <Layout style={{ backgroundColor: "#fff" }}>
        <Row
          style={{
            minHeight: "100vh",
            padding: "30px",
            justifyContent: "center",
          }}
        >
          <Col xs={24} md={10} className="formMainWrap">
            <Row style={{ width: "100%", justifyContent: "center" }}>
              <Col xs={20} md={20} className="formWrap">
                <Row style={{ width: "100%", textAlign: "center" }}>
                  <Col xs={24} md={0}>
                    <Image
                      src={ImageUrl("logo.png")}
                      style={{ maxWidth: "200px" }}
                      alt=""
                      preview={false}
                    />
                  </Col>
                </Row>

                <h2 class="authFormHeading">Reset Password</h2>
                <p>Enter New Password</p>
                <br />
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
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="New Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your new password!",
                      },
                      {
                        type: "string",
                        min: 8,
                        message: "password must be atleast 8 characters!",
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Enter New Password"
                      style={{
                        borderRadius: "5px",
                        fontSize: "14px",
                        padding: "10px 20px",
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Confirm Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Confirm Password!",
                      },
                      {
                        type: "string",
                        min: 8,
                        message: "password must be atleast 8 characters!",
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Confirm Password"
                      style={{
                        borderRadius: "5px",
                        fontSize: "14px",
                        padding: "10px 20px",
                      }}
                    />
                  </Form.Item>
                  <br />

                  <Row justify="center">
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        onClick={handleDeleteButtonClick}
                        style={{
                          fontSize: "16px",
                          minWidth: "300px",
                          background:
                            "linear-gradient(#d5af68 0%, #a77721 100%)",
                          padding: "10px",
                          height: "auto",
                          borderRadius: "5px",
                        }}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Row>
                  <Row justify="center">
                    <Link to={"/signin"} className="back-login">
                      Back to login
                    </Link>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Col>
          <Col xs={0} sm={0} md={10}>
            <div
              className="loginScreenContentWrapper"
              style={{ position: "relative" }}
            >
              <div class="loginScreenContent">
                <Image
                  src={ImageUrl("right-logo.png")}
                  alt=""
                  preview={false}
                  className="right-logo"
                />
                <h2 class="authHeading">Real Money Dragon</h2>
                <p class="text-white p-text">
                  
                </p>
              </div>
              {/* <div className="loginProp loginProp1">
                <Image src={"loginProp1.png"} alt="" preview={false} />
              </div>
              <div className="loginProp loginProp2">
                <Image src={"loginProp2.png"} alt="" preview={false} />
              </div>
              <div className="loginProp loginProp3">
                <Image src={"loginProp3.png"} alt="" preview={false} />
              </div> */}
            </div>
          </Col>
        </Row>

        <Modal
          open={modalOpen}
          onOk={() => handleStatus()}
          onCancel={() => setModalOpen(false)}
          footer={[
            <Button key="submit" type="primary" className="yes-btn">
              Okay
            </Button>,
          ]}
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
            src="..done.png"
            preview={false}
            width={100}
            height={100}
          />
          <Typography.Title level={4} style={{ fontSize: "25px" }}>
            System Message!
          </Typography.Title>
          <Typography.Text style={{ fontSize: 16 }}>
            Your Password Has Been Reset. Please Login To Continue
          </Typography.Text>
        </Modal>
      </Layout>
    </AuthLayout>
  );
}

export default ForgetPassword;
