import React, { useState } from "react";
import { Col, Row, Form, Input, Button, Layout, message } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Post } from "../../config/api/post";
import { AUTH, USER } from "../../config/constants";
import swal from "sweetalert";

function ChangePass() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("New password and confirm password do not match!");
      return;
    }

    setLoading(true);
    const data = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };

    try {
      const response = await Post(AUTH.changePassword, data, token);
      if (response?.data?.status) {
        swal("Success!", "Password Updated Successfully", "success");
        navigate(-1);
      } else {
        swal("Oops!", "Failed to change password.", "error");
      }
    } catch (error) {
      swal("Oops!", error.message || "Error occurred!", "error");
    } finally {
      setLoading(false);
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
            <FaArrowLeft
              style={{ fontWeight: "bold", fontSize: "20px" }}
              onClick={() => navigate(-1)}
            />
            &emsp;
            <h1 className="pageTitle" style={{ margin: 0 }}>
              Change Password
            </h1>
          </Col>
        </Row>
        <br />
        <Row style={{ padding: "20px", justifyContent: "center" }}>
          <Col xs={24} md={8}>
            <Form
              layout="vertical"
              name="changePassword"
              onFinish={onFinish}
              autoComplete="off"
              initialValues={{
                remember: true,
              }}
            >
              <Form.Item
                label="Old Password"
                name="oldPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your Old Password!",
                  },
                  {
                    type: "string",
                    min: 8,
                    message: "Password must be at least 8 characters!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Enter Old Password"
                  style={{
                    borderRadius: "5px",
                    fontSize: "14px",
                    padding: "10px 20px",
                  }}
                />
              </Form.Item>
              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your New Password!",
                  },
                  {
                    type: "string",
                    min: 8,
                    message: "Password must be at least 8 characters!",
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
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your Confirm Password!",
                  },
                  {
                    type: "string",
                    min: 8,
                    message: "Password must be at least 8 characters!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Enter Confirm Password"
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
                    size="large"
                    style={{ padding: "12px 40px", height: "auto" }}
                    className="mainButton"
                    htmlType="submit"
                    loading={loading}
                  >
                    Save
                  </Button>
                </Form.Item>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default ChangePass;
