import React from "react";
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
  Divider,
} from "antd";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Post } from "../../config/api/post";
import { AUTH } from "../../config/constants";
import { addUser, removeUser } from "../../redux/slice/authSlice";
import swal from "sweetalert";
import { ImageUrl } from "../../config/functions";

// import router from "next/router";

function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = React.useState(false);

  // useEffect if user is already logged in
  React.useEffect(() => {
    if (user && token) {
      navigate("/", { replace: true });
    }
  }, [user, token]);

  const onFinish = (values) => {
    console.log("Success:", values);
    setLoading(true);

    let data = {
      email: values.email,
      password: values.password,
    };
    Post(AUTH.signin, data)
      .then((response) => {
        setLoading(false);
        if (response?.data?.status) {
          dispatch(
            addUser({
              user: response.data?.data?.user,
              token: response.data?.data?.token,
            })
          );
          navigate("/", { replace: true });
        } else {
          swal(
            "Oops!",
            response?.data?.message || response?.response?.data?.message,
            "error"
          );
        }
      })
      .catch((e) => {
        console.log(":::;", e);
        setLoading(false);
      });
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
                    {/* <Image
                      src={ImageUrl("logo.png")}
                      style={{ maxWidth: "200px" }}
                      alt=""
                      preview={false}
                    /> */}
                  </Col>
                </Row>

                <h2 class="authFormHeading">Login To Your Account.</h2>
                <p>Enter Your Email Address To Login</p>
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
                    label="Email Address"
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: "Please input valid email!",
                        // warningOnly: true,
                      },
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter Email Address"
                      style={{
                        borderRadius: "5px",
                        background: "white",
                        fontSize: "14px",
                        padding: "10px 20px",
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
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
                      placeholder="Enter Password"
                      style={{
                        borderRadius: "5px",
                        fontSize: "14px",
                        padding: "10px 20px",
                      }}
                    />
                  </Form.Item>
                  <Row>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="remember"
                        valuePropName="checked"
                        style={{ marginBottom: 0 }}
                      >
                        <Checkbox>Remember me</Checkbox>
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Button
                        type="link"
                        style={{
                          float: "right",
                          color: "#21201E",
                          fontWeight: "bold",
                          fontSize: "14px",
                        }}
                        onClick={() => navigate("/forgot-password")}
                      >
                        Forgot Password?
                      </Button>
                    </Col>
                  </Row>
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
                        {loading ? "Loading..." : "Login"}
                      </Button>
                    </Form.Item>
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
                {/* <Image
                  src={ImageUrl("right-logo.png")}
                  alt=""
                  preview={false}
                  className="right-logo"
                /> */}
                <h2 class="authHeading">Real Money Dragon</h2>
                <p class="text-white p-text">
                  
                </p>
              </div>
              {/* <div className="loginProp loginProp1">
                  <Image src={("lImageUrloginProp1.png"} a)lt="" preview={false} />
                </div>
                <div className="loginProp loginProp2">
                  <Image src={("lImageUrloginProp2.png"} a)lt="" preview={false} />
                </div>
                <div className="loginProp loginProp3">
                  <Image src={("lImageUrloginProp3.png"} a)lt="" preview={false} />
                </div> */}
            </div>
          </Col>
        </Row>
      </Layout>
    </AuthLayout>
  );
}

export default Signin;
