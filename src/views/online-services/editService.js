import React, { useState, useEffect } from "react";
import { Col, Row, Form, Input, Image, Button, Layout } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { Post } from "../../config/api/post";
import { Get } from "../../config/api/get";
import { CONTENT_TYPE, SERVICE, UPLOADS_URL } from "../../config/constants";
import { Upload } from "antd";
import swal from "sweetalert";
const { TextArea } = Input;

function ServiceEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = React.useState(false);
  const [service, setService] = useState(null);

  useEffect(() => {
    if (id) {
      getServiceDetails();
    }
  }, []);

  const getServiceDetails = async () => {
    setLoading(true);
    const response = await Get(`${SERVICE.getServiceById}${id}`, token);
    if (response.status) {
      setService(response.data.service);
    }
    setLoading(false);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    setLoading(true);

    let data = {
      email: values.email,
      phone: values.phone,
      title: values.title,
      description: values.description,
    };

    const formObject = new FormData();

    for (const key in data) {
      const item = values[key];
      formObject.append(key, item);
    }

    if (values?.image?.fileList) {
      formObject.append("image", values.image.fileList[0].originFileObj);
    }

    Post(
      SERVICE.updateService + id,
      formObject,
      token,
      null,
      CONTENT_TYPE.FORM_DATA
    )
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (response?.data?.status) {
          swal("Success", "Service updated successfully", "success");
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

  console.log("service", service?.title);

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
              Edit Service
            </h1>
          </Col>
        </Row>
        <br />
        <Row style={{ padding: "20px" }}>
          <Col xs={24} md={16}>
            <Row style={{ padding: "10px" }}>
              <Col xs={24} md={11}>
                {service && (
                  <Form
                    layout="vertical"
                    name="basic"
                    labelCol={{
                      span: 0,
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    initialValues={service}
                    onFinish={onFinish}
                  >
                    <Form.Item
                      label="Service Title"
                      name="title"
                      initialValue={service?.title}
                      rules={[
                        {
                          required: true,
                          message: "Please input Service Title!",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="Enter Service Title"
                        style={{
                          borderRadius: "5px",
                          background: "white",
                          fontSize: "14px",
                          padding: "10px 20px",
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Service Image"
                      name="image"
                      rules={[
                        {
                          required: true,
                          message: "Please Upload Image!",
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
                        <div
                          className="dotted-border"
                          style={{ height: "auto", padding: "10px" }}
                        >
                          <Image
                            src={UPLOADS_URL + "/" + service.image}
                            preview={false}
                            height={120}
                          />
                        </div>
                      </Upload>
                    </Form.Item>

                    <Form.Item
                      label="Service Description"
                      name="description"
                      initialValue={service?.description}
                      rules={[
                        {
                          required: true,
                          message: "Please enter Service Description!",
                        },
                      ]}
                    >
                      <TextArea
                        placeholder="Enter Service Description"
                        autoSize={{
                          minRows: 3,
                          maxRows: 5,
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Phone"
                      name="phone"
                      initialValue={service?.phone}
                      rules={[
                        {
                          required: true,
                          message: "Please Input Service Contact!",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="Enter Service Contact"
                        style={{
                          borderRadius: "5px",
                          background: "white",
                          fontSize: "14px",
                          padding: "10px 20px",
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Email"
                      name="email"
                      initialValue={service?.email}
                      rules={[
                        {
                          required: true,
                          message: "Please enter Email!",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="Enter Email"
                        style={{
                          borderRadius: "5px",
                          background: "white",
                          fontSize: "14px",
                          padding: "10px 20px",
                        }}
                      />
                    </Form.Item>

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
                          Update Service
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
export default ServiceEdit;
