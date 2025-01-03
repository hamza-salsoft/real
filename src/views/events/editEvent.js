import React, { useState, useEffect } from "react";
import { Col, Row, Form, Input, Image, Button, Layout, DatePicker } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { Post } from "../../config/api/post";
import { Get } from "../../config/api/get";
import { CATEGORY, CONTENT_TYPE, UPLOADS_URL } from "../../config/constants";
import { Upload } from "antd";
import swal from "sweetalert";
import dayjs from "dayjs";
const { TextArea } = Input;

function CategoryEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = React.useState(false);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (id) {
      getCategoryDetails();
    }
  }, []);

  const getCategoryDetails = async () => {
    setLoading(true);
    const response = await Get(`${CATEGORY.getCategoryById}${id}`, token);
    if (response.status) {
      setCategory(response.data);
    }
    setLoading(false);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    setLoading(true);

    let data = {
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
      CATEGORY.editCategoryById + id,
      formObject,
      token,
      null,
      CONTENT_TYPE.FORM_DATA
    )
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (response?.data?.status) {
          swal("Success", "Category updated successfully", "success");
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
              Edit Category
            </h1>
          </Col>
        </Row>
        <br />
        <Row style={{ padding: "20px" }}>
          <Col xs={24} md={16}>
            <Row style={{ padding: "10px" }}>
              <Col xs={24} md={11}>
                {category && (
                  <Form
                    layout="vertical"
                    name="basic"
                    labelCol={{
                      span: 0,
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    // initialValues={category}
                    onFinish={onFinish}
                  >
                    <Form.Item
                      label="Category Title"
                      name="title"
                      initialValue={category?.title}
                      rules={[
                        {
                          required: true,
                          message: "Please input Category Title!",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="Enter Category Title"
                        style={{
                          borderRadius: "5px",
                          background: "white",
                          fontSize: "14px",
                          padding: "10px 20px",
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Category Image"
                      name="image"
                      initialValue={category?.coverImage}
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
                            src={UPLOADS_URL + "/" + category.coverImage}
                            preview={false}
                            height={120}
                          />
                        </div>
                      </Upload>
                    </Form.Item>

                    <Form.Item
                      label="Category Description"
                      name="description"
                      initialValue={category?.description}
                      rules={[
                        {
                          required: true,
                          message: "Please enter Category Description!",
                        },
                      ]}
                    >
                      <TextArea
                        placeholder="Enter Category Description"
                        autoSize={{
                          minRows: 3,
                          maxRows: 5,
                        }}
                      />
                    </Form.Item>

                    {/* <Form.Item
                      label="Location"
                      name="location"
                      initialValue={category?.location}
                      rules={[
                        {
                          required: true,
                          message: "Please Input category Location!",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="Enter category Location"
                        style={{
                          borderRadius: "5px",
                          background: "white",
                          fontSize: "14px",
                          padding: "10px 20px",
                        }}
                      />
                    </Form.Item> */}

                    {/* <Form.Item
                      label="Address"
                      name="address"
                      initialValue={category?.address}
                      rules={[
                        {
                          required: true,
                          message: "Please enter Address!",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="Enter Address"
                        style={{
                          borderRadius: "5px",
                          background: "white",
                          fontSize: "14px",
                          padding: "10px 20px",
                        }}
                      />
                    </Form.Item> */}
                    {/* <Form.Item
                      label="Date"
                      name="date"
                      initialValue={dayjs(category?.date) || null}
                      rules={[
                        {
                          required: true,
                          message: "Please enter Date!",
                        },
                      ]}
                    >
                      <DatePicker
                        size="large"
                        placeholder="Select Date"
                        style={{
                          borderRadius: "5px",
                          background: "white",
                          fontSize: "14px",
                          padding: "10px 20px",
                          width: "100%",
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
                          Update Category
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
export default CategoryEdit;
