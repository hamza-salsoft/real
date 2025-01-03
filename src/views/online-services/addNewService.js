import React, { useState } from "react";
import {
  Col,
  Row, Form,
  Input,
  Button, Layout
} from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { Post } from "../../config/api/post";
import { CONTENT_TYPE,SERVICE } from "../../config/constants";
import { Upload } from "antd";
import swal from "sweetalert";
const { TextArea } = Input;

function Serviceadd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = React.useState(false);


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
    formObject.append("image",values.image.fileList[0].originFileObj);



    Post(SERVICE.addService, formObject,token,null,CONTENT_TYPE.FORM_DATA)
      .then((response) => {
        setLoading(false);
        console.log(response)
        if (response?.data?.status) {
          swal("Success","Service added successfully","success");
          navigate(-1)
        } else {
          swal("Oops!", response?.data?.message || response?.response?.data?.message, "error");
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
              Add New Service
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
                    label="Service Title"
                    name="title"
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
                  
                      <Upload className="uploadBtn"  beforeUpload={(file) => {
                                    // setImageNew(URL.createObjectURL(file));
                                    return false;
                                  }}>
                                      <div className="dotted-border">

                        <Button icon={<UploadOutlined />}>+Upload Image</Button>
                                      </div>
                      </Upload>
                    
                  </Form.Item>

                  <Form.Item
                    label="Service Description"
                    name="description"
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
                        Add Service
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
export default Serviceadd;
