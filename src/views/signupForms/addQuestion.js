import React, { useState } from "react";
import {
  Col,
  Row,
  Form,
  Input,
  Button,
  InputNumber,
  Layout,
  DatePicker,
} from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { Post } from "../../config/api/post";
import { CONTENT_TYPE, BOOK, QUESTION } from "../../config/constants";
import { Upload } from "antd";
import swal from "sweetalert";
const { TextArea } = Input;

function AddQuestion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = React.useState(false);

  const onFinish = (values) => {
    console.log("Success:", values);
    setLoading(true);

    let data = {
      step: values.step,
      question: values.question,
    };

    // const formObject = new FormData();

    // for (const key in data) {
    //   const item = values[key];
    //   formObject.append(key, item);
    // }

    // formObject.append("image", values.image.fileList[0].originFileObj);
    // formObject.append("video", values.bookFile.fileList[0].originFileObj);

    Post(QUESTION.addQuestion, data, token)
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (response?.data?.status) {
          swal("Success", "Question added successfully", "success");
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
        console.log(":::;", e);
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
              Add New Question
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
                  onFinish={onFinish}
                >
                  <Form.Item
                    label="Step"
                    name="step"
                    rules={[
                      {
                        required: true,
                        message: "Please input step!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      type="number"
                      min={1}
                      max={30}
                      placeholder="Enter Step"
                      style={{
                        borderRadius: "5px",
                        background: "white",
                        fontSize: "14px",
                        padding: "10px 20px",
                      }}
                    />
                  </Form.Item>

                  {/* <Form.Item
                    label="Book Cover"
                    name="image"
                    rules={[
                      {
                        required: true,
                        message: "Please Upload Cover!",
                      },
                    ]}
                  >
                    <Upload
                      className="uploadBtn"
                      beforeUpload={(file) => {
                        // setImageNew(URL.createObjectURL(file));
                        return false;
                      }}
                    >
                      <div className="dotted-border">
                        <Button icon={<UploadOutlined />}>+Upload Image</Button>
                      </div>
                    </Upload>
                  </Form.Item>

                  <Form.Item
                    label="Book File"
                    name="bookFile"
                    rules={[
                      {
                        required: true,
                        message: "Please Upload File!",
                      },
                    ]}
                  >
                    <Upload
                      className="uploadBtn"
                      beforeUpload={(file) => {
                        // setImageNew(URL.createObjectURL(file));
                        return false;
                      }}
                    >
                      <div className="dotted-border">
                        <Button icon={<UploadOutlined />}>+Upload Image</Button>
                      </div>
                    </Upload>
                  </Form.Item> */}

                  {/* <Form.Item
                    label="Book Author"
                    name="author"
                    rules={[
                      {
                        required: true,
                        message: "Please input Book Author!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter Book Author"
                      style={{
                        borderRadius: "5px",
                        background: "white",
                        fontSize: "14px",
                        padding: "10px 20px",
                      }}
                    />
                  </Form.Item> */}

                  <Form.Item
                    label="New Question"
                    name="question"
                    rules={[
                      {
                        required: true,
                        message: "Please enter question!",
                      },
                    ]}
                  >
                    <TextArea
                      placeholder="Enter New Question"
                      autoSize={{
                        minRows: 3,
                        maxRows: 5,
                      }}
                    />
                  </Form.Item>

                  {/* <Form.Item
                    label="Hard Copy Price"
                    name="price"
                    rules={[
                      {
                        required: true,
                        message: "Please Input Book Price!",
                      },
                    ]}
                  >
                    <InputNumber
                      size="small"
                      placeholder="Enter Book Price"
                      style={{
                        borderRadius: "5px",
                        background: "white",
                        fontSize: "14px",
                        width: "100%",
                        padding: "10px 20px",
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="EBook Price"
                    name="ebookPrice"
                    rules={[
                      {
                        required: true,
                        message: "Please Input EBook Price!",
                      },
                    ]}
                  >
                    <InputNumber
                      size="small"
                      placeholder="Enter EBook Price"
                      style={{
                        borderRadius: "5px",
                        background: "white",
                        fontSize: "14px",
                        width: "100%",
                        padding: "10px 20px",
                      }}
                    />
                  </Form.Item> */}

                  <br />

                  <Row justify="">
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        size={"large"}
                        style={{ padding: "12px 40px", height: "auto" }}
                        className="mainButton graden-bg"
                      >
                        Add Question
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
export default AddQuestion;
