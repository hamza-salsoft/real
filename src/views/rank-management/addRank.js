import React, { useState } from "react";
import { Col, Row, Form, Input, Button, Layout, Upload } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Post } from "../../config/api/post";
import { CONTENT_TYPE, RANK, SERVICE } from "../../config/constants";
import swal from "sweetalert";

const { TextArea } = Input;

function AddRank() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    console.log("Success:", values);
    setLoading(true);

    const formData = new FormData();
    formData.append("rank", values.rank);
    formData.append("questionnaire", JSON.stringify(values.questionnaire));
    formData.append("topic", JSON.stringify(values.topic));
    formData.append("degree", values.degree);
    formData.append("rankName", values.rankName);
    formData.append("image", values.image.fileList[0].originFileObj);

    Post(RANK.createRank, formData, token, null, CONTENT_TYPE.FORM_DATA)
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (response?.data?.status) {
          swal("Success", "Rank created successfully", "success");
          navigate(-1);
        } else {
          swal(
            "Oops!",
            response?.data?.message || response?.response?.data?.message,
            "error"
          );
        }
      })
      .catch((e) => {
        console.log("Error:", e);
        setLoading(false);
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
              style={{ fontWeight: "bold", fontSize: "20px" }}
              onClick={() => navigate(-1)}
            />
            &emsp;
            <h1 className="pageTitle" style={{ margin: 0 }}>
              Add New Rank
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
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    label="Rank"
                    name="rank"
                    rules={[{ required: true, message: "Please input Rank!" }]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter Rank"
                      style={{
                        borderRadius: "5px",
                        background: "white",
                        fontSize: "14px",
                        padding: "10px 20px",
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Questionnaire"
                    name="questionnaire"
                    rules={[
                      {
                        required: true,
                        message: "Please input Questionnaire!",
                      },
                    ]}
                  >
                    <TextArea
                      placeholder="Enter Questionnaire"
                      autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Topic"
                    name="topic"
                    rules={[{ required: true, message: "Please input Topic!" }]}
                  >
                    <TextArea
                      placeholder="Enter Topic"
                      autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Degree"
                    name="degree"
                    rules={[
                      { required: true, message: "Please input Degree!" },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter Degree"
                      style={{
                        borderRadius: "5px",
                        background: "white",
                        fontSize: "14px",
                        padding: "10px 20px",
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Rank Name"
                    name="rankName"
                    rules={[
                      { required: true, message: "Please input Rank Name!" },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter Rank Name"
                      style={{
                        borderRadius: "5px",
                        background: "white",
                        fontSize: "14px",
                        padding: "10px 20px",
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Image"
                    name="image"
                    rules={[
                      { required: true, message: "Please upload an Image!" },
                    ]}
                  >
                    <Upload className="uploadBtn" beforeUpload={() => false}>
                      <div className="dotted-border">
                        <Button icon={<UploadOutlined />}>+Upload Image</Button>
                      </div>
                    </Upload>
                  </Form.Item>

                  <Row justify="">
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        size={"large"}
                        style={{ padding: "12px 40px", height: "auto" }}
                        className="mainButton graden-bg"
                      >
                        Add Rank
                      </Button>
                    </Form.Item>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default AddRank;
