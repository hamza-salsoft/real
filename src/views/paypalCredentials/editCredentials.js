import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Form,
  Input,
  InputNumber,
  Button,
  Layout,
  message,
  Image,
  Upload,
} from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  PRODUCT,
  CONTENT_TYPE,
  UPLOADS_URL,
  CREDENTIALS,
} from "../../config/constants";
import swal from "sweetalert";
import { UploadOutlined } from "@ant-design/icons";
import { Get } from "../../config/api/get";
import { Post } from "../../config/api/post";
import { Put } from "../../config/api/put";
import { useGetPaypalKeysQuery } from "../../api/paypal";

const { TextArea } = Input;

function EditCredentials() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const {data: keys} = useGetPaypalKeysQuery();

  useEffect(() => {
    try {
      form.setFieldsValue({
        ...keys
      });
    } catch (error) {
      console.log(error);
    }
  }, [keys]);

  const onFinish = (values) => {
    setLoading(true);

    Put(
      CREDENTIALS.updateCredentials,
      token,
      {
        clientId: values.clientId,
        clientSecret: values.clientSecret,
      },
      null
    )
      .then((response) => {
        setLoading(false);
        if (response?.status) {
          swal("Success", "Credentials updated successfully", "success");
          navigate(-1);
        } else {
          swal("Oops!", response?.message || response?.message, "error");
        }
      })
      .catch(() => {
        setLoading(false);
        message.error("An error occurred while updating the credentials.");
      });
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
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={() => navigate(-1)}
            />
            &emsp;
            <h1 className="pageTitle" style={{ margin: 0 }}>
              Edit Credentials
            </h1>
          </Col>
        </Row>
        <br />
        <Row style={{ padding: "20px" }}>
          <Col xs={24} md={16}>
            <Form
              layout="vertical"
              name="product-edit"
              onFinish={onFinish}
              form={form}
            >
              <Form.Item
                label="Client Id"
                name="clientId"
                rules={[{ required: true, message: "Please input Client Id!" }]}
              >
                <Input
                  size="large"
                  placeholder="Enter Client Id"
                  style={{
                    borderRadius: "5px",
                    fontSize: "14px",
                    padding: "10px 20px",
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Client Secret"
                name="clientSecret"
                rules={[
                  { required: true, message: "Please input client secret!" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter Client Secret"
                  style={{
                    borderRadius: "5px",
                    fontSize: "14px",
                    padding: "10px 20px",
                  }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                >
                  Update Credentials
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default EditCredentials;
