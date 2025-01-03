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
  Select,
} from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  PRODUCT,
  CONTENT_TYPE,
  UPLOADS_URL,
  CREDENTIALS,
  COIN,
} from "../../config/constants";
import swal from "sweetalert";
import { UploadOutlined } from "@ant-design/icons";
import { Get } from "../../config/api/get";
import { Post } from "../../config/api/post";
import { Put } from "../../config/api/put";

const { TextArea } = Input;

function AddCoins() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setLoading(true);

    Post(
      COIN.updateCoin,
      {
        userId: id,
        coins: Number(values.coins),
        coinType: values.coinType,
        action: values.action,
      },
      token
    )
      .then((response) => {
        setLoading(false);
        if (response?.status) {
          swal("Success", "Coins added successfully", "success");
          navigate(-1);
        } else {
          swal("Oops!", response?.message || response?.message, "error");
        }
      })
      .catch(() => {
        setLoading(false);
        message.error("An error occurred while adding coins.");
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
              Update Coins
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
                label="Coin Balance"
                name="coins"
                rules={[
                  { required: true, message: "Please input coins balance!" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter Coin Balance"
                  style={{
                    borderRadius: "5px",
                    fontSize: "14px",
                    padding: "10px 20px",
                  }}
                  type="number"
                />
              </Form.Item>

              <Form.Item
                label="Coin Type"
                name="coinType"
                rules={[{ required: true, message: "Please select coin type!" }]}
              >
                <Select
                  size="large"
                  placeholder="Select Coin Type"
                >
                  <Select.Option value="gold">Gold</Select.Option>
                  <Select.Option value="red">Red</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Actioin"
                name="action"
                rules={[{ required: true, message: "Please select action!" }]}
              >
                <Select
                  size="large"
                  placeholder="Select Action"
                >
                  <Select.Option value="add">Add</Select.Option>
                  <Select.Option value="deduct">Deduct</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                >
                  Update Coins
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default AddCoins;
