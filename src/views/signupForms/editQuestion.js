import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Form,
  Input,
  Image,
  Button,
  Layout,
  DatePicker,
  InputNumber,
} from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { Post } from "../../config/api/post";
import { Get } from "../../config/api/get";
import { QUESTION } from "../../config/constants";
import { Upload } from "antd";
import swal from "sweetalert";
import dayjs from "dayjs";
import { Put } from "../../config/api/put";
const { TextArea } = Input;

function EditQuestion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = React.useState(false);
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    if (id) {
      getQuestionDetails();
    }
  }, []);

  const getQuestionDetails = async () => {
    setLoading(true);
    try {
      const response = await Get(`${QUESTION.getSingleQuestion}${id}`, token);
      if (response.status) {
        setQuestion(response.data.question);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    setLoading(true);

    let data = {
      step: values.step,
      question: values.question,
    };

    console.log(data);

    Post(QUESTION.editQuestion + id, data, token)
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (response?.data?.status) {
          swal("Success", "Question updated successfully", "success");
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

  console.log("question", question?.title);

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
              Edit Question
            </h1>
          </Col>
        </Row>
        <br />
        <Row style={{ padding: "20px" }}>
          <Col xs={24} md={16}>
            <Row style={{ padding: "10px" }}>
              <Col xs={24} md={11}>
                {question && (
                  <Form
                    layout="vertical"
                    name="basic"
                    labelCol={{
                      span: 0,
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    // initialValues={question}
                    onFinish={onFinish}
                  >
                    <Form.Item
                      label="Updated Step"
                      name="step"
                      initialValue={question?.step}
                      rules={[
                        {
                          required: true,
                          message: "Please input Step!",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        type="number"
                        min={1}
                        max={30}
                        placeholder="Enter Updated Step"
                        style={{
                          borderRadius: "5px",
                          background: "white",
                          fontSize: "14px",
                          padding: "10px 20px",
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Updated Question"
                      name="question"
                      initialValue={question?.question}
                      rules={[
                        {
                          required: true,
                          message: "Please enter question!",
                        },
                      ]}
                    >
                      <TextArea
                        placeholder="Enter Updated Question"
                        autoSize={{
                          minRows: 3,
                          maxRows: 5,
                        }}
                      />
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
                          Update Question
                        </Button>
                      </Form.Item>
                    </Row>
                  </Form>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}
export default EditQuestion;
