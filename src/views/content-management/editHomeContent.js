import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Typography,
  Form,
  Input,
  Button,
  Layout,
  Image,
  Modal,
  Upload,
  message,
} from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { Get } from "../../config/api/get";
import { CONTENT, CONTENT_TYPE, UPLOADS_URL } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { ImageUrl } from "../../config/functions";
import { Put } from "../../config/api/put";
import { Post } from "../../config/api/post";

function EditHomeContent() {
  const { TextArea } = Input;
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [content, setContent] = useState({});
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    getHomeContent();
  }, []);

  const getHomeContent = async () => {
    try {
      setLoading(true);
      const response = await Get(`${CONTENT.getHomeContent}${id}`, token);
      if (response?.status) {
        setContent(response?.data);
        form.setFieldsValue({
          pageTitle: response.data.heading,
          pageDescription: response.data.description,
        });
        setFileList([
          {
            uid: "-1",
            name: response.data.image,
            status: "done",
            url: `${UPLOADS_URL}/${response.data.image}`,
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("heading", values.pageTitle);
      formData.append("description", values.pageDescription);
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      }

      const response = await Post(
        `${CONTENT.editHomeContent}${id}`,
        formData,
        token,
        null,
        CONTENT_TYPE.FORM_DATA
      );

      if (response?.status) {
        setModalOpen(true);
        getHomeContent();
      }
    } catch (error) {
      console.error("Error updating content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadChange = ({ fileList }) => setFileList(fileList.slice(-1));

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
              Edit Homepage Details
            </h1>
          </Col>
        </Row>
        <br />
        <Row style={{ padding: "20px" }}>
          <Col xs={24} md={16}>
            <Row style={{ padding: "10px" }}>
              <Col xs={24} md={11}>
                <Form
                  form={form}
                  layout="vertical"
                  name="basic"
                  labelCol={{ span: 0 }}
                  wrapperCol={{ span: 24 }}
                  onFinish={onFinish}
                  initialValues={{ remember: true }}
                >
                  <Form.Item
                    label="Page Title"
                    name="pageTitle"
                    rules={[
                      { required: true, message: "Please input Page Title!" },
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

                  <Form.Item label="Upload Image" name="image">
                    <Upload
                      fileList={fileList}
                      listType="picture-card"
                      beforeUpload={(file) => false}
                      onChange={handleUploadChange}
                    >
                      {fileList.length < 1 && (
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      )}
                    </Upload>
                  </Form.Item>

                  <Form.Item
                    label="Page Description"
                    name="pageDescription"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Page Description!",
                      },
                    ]}
                  >
                    <TextArea
                      placeholder="Enter Page Description"
                      autoSize={{ minRows: 4, maxRows: 5 }}
                    />
                  </Form.Item>

                  <Row justify="">
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        size={"large"}
                        style={{ padding: "12px 40px", height: "auto" }}
                        loading={loading}
                        className="mainButton graden-bg"
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

        <Modal
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          footer={[
            <Button
              key="submit"
              type="primary"
              loading={loading}
              className="yes-btn"
              onClick={() => setModalOpen(false)}
            >
              Okay
            </Button>,
          ]}
          cancelButtonProps={{ style: { display: "none" } }}
          okText="Yes"
          className="StyledModal"
          style={{
            left: 0,
            right: 0,
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
          }}
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

export default EditHomeContent;
