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
import { Post } from "../../config/api/post";

function EditAboutContent() {
  const { TextArea } = Input;
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [content, setContent] = useState({});
  const [form] = Form.useForm();
  const [fileList1, setFileList1] = useState([]);
  const [fileList2, setFileList2] = useState([]);

  useEffect(() => {
    getAboutContent();
  }, []);

  const getAboutContent = async () => {
    try {
      setLoading(true);
      const response = await Get(`${CONTENT.getAboutContent}${id}`, token);
      if (response?.status) {
        setContent(response?.data);
        form.setFieldsValue({
          heading: response?.data?.heading,
          description: response?.data?.description,
          s1Heading: response?.data?.section1.heading,
          s1Description: response?.data?.section1.description,
          s2Heading: response?.data?.section2.heading,
          s2Description: response?.data?.section2.description,
        });

        setFileList1([
          {
            uid: "-1",
            name: response.data.section1.image,
            status: "done",
            url: `${UPLOADS_URL}/${response.data.section1.image}`,
          },
        ]);

        setFileList2([
          {
            uid: "-1",
            name: response.data.section2.image,
            status: "done",
            url: `${UPLOADS_URL}/${response.data.section2.image}`,
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
      formData.append("heading", values.heading);
      formData.append("description", values.description);
      formData.append("section1.heading", values.s1Heading);
      formData.append("section1.description", values.s1Description);
      formData.append("section2.heading", values.s2Heading);
      formData.append("section2.description", values.s2Description);

      if (fileList1.length > 0 && fileList1[0].originFileObj) {
        formData.append("section1.image", fileList1[0].originFileObj);
      }

      if (fileList2.length > 0 && fileList2[0].originFileObj) {
        formData.append("section2.image", fileList2[0].originFileObj);
      }

      const response = await Post(
        `${CONTENT.editAboutContent}${id}`,
        formData,
        token,
        null,
        CONTENT_TYPE.FORM_DATA
      );

      if (response?.status) {
        setModalOpen(true);
        getAboutContent();
      }
    } catch (error) {
      console.error("Error updating content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadChange1 = ({ fileList }) =>
    setFileList1(fileList.slice(-1));
  const handleUploadChange2 = ({ fileList }) =>
    setFileList2(fileList.slice(-1));

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
              Edit About Details
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
                    label="Page Heading"
                    name="heading"
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

                  <Form.Item
                    label="Page Description"
                    name="description"
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

                  <h2 className="font-bold text-2xl mb-2">Section 1</h2>

                  <Form.Item label="Upload Image" name="s1Image">
                    <Upload
                      fileList={fileList1}
                      listType="picture-card"
                      beforeUpload={(file) => false}
                      onChange={handleUploadChange1}
                    >
                      {fileList1.length < 1 && (
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      )}
                    </Upload>
                  </Form.Item>
                  <Form.Item
                    label="Section 1 Heading"
                    name="s1Heading"
                    rules={[
                      {
                        required: true,
                        message: "Please input section 1 heading!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter section 1 heading"
                      style={{
                        borderRadius: "5px",
                        background: "white",
                        fontSize: "14px",
                        padding: "10px 20px",
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Section 1 Description"
                    name="s1Description"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Section 1 Description!",
                      },
                    ]}
                  >
                    <TextArea
                      placeholder="Enter Section 1 Description"
                      autoSize={{ minRows: 4, maxRows: 5 }}
                    />
                  </Form.Item>

                  <h2 className="font-bold text-2xl mb-2">Section 2</h2>

                  <Form.Item label="Upload Image" name="s2Image">
                    <Upload
                      fileList={fileList2}
                      listType="picture-card"
                      beforeUpload={(file) => false}
                      onChange={handleUploadChange2}
                    >
                      {fileList2.length < 1 && (
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      )}
                    </Upload>
                  </Form.Item>
                  <Form.Item
                    label="Section 2 Heading"
                    name="s2Heading"
                    rules={[
                      {
                        required: true,
                        message: "Please input section 2 heading!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter section 2 heading"
                      style={{
                        borderRadius: "5px",
                        background: "white",
                        fontSize: "14px",
                        padding: "10px 20px",
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Section 2 Description"
                    name="s2Description"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Section 2 Description!",
                      },
                    ]}
                  >
                    <TextArea
                      placeholder="Enter Section 2 Description"
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

export default EditAboutContent;
