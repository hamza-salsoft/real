import React from "react";
import AuthLayout from "../../components/AuthLayout";
import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Input,
  Button,
  Checkbox,
  Tabs,
  Table,
  Image,
  Divider,
  Layout,
} from "antd";
import { useNavigate } from "react-router";
import Link from "antd/es/typography/Link";
import { ImageUrl } from "../../config/functions";

// import router from "next/router";




function ForgetPassword() {
   
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const onFinish = (values) => {
    console.log("Success:", values);
    navigate("/forgot-password-3")
    // router.push("/forget-password-2")
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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

              <h2 class="authFormHeading">Forgot Password</h2>
              <p>An Email Has Been Sent To You With A Verification Code. Please Enter It Here.</p>
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
                  label="Verification Code"
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Verification Code",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Enter Verification Code"
                    style={{
                      borderRadius: "5px",
                      background: "white",
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
                      Continue
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
                <Image src={ImageUrl"loginProp1.png"} a)lt="" preview={false} />
              </div>
              <div className="loginProp loginProp2">
                <Image src={ImageUrl"loginProp2.png"} a)lt="" preview={false} />
              </div>
              <div className="loginProp loginProp3">
                <Image src={ImageUrl"loginProp3.png"} a)lt="" preview={false} />
              </div> */}
          </div>
        </Col>
      </Row>
    </Layout>
  </AuthLayout>
  );
}

export default ForgetPassword;
