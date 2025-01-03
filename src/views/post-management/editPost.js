import {
  Button,
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  Layout,
  message,
  Row,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { Get } from "../../config/api/get";
import { Post } from "../../config/api/post";
import { CONTENT_TYPE, UPLOADS_URL } from "../../config/constants";

const { TextArea } = Input;

function EditPost() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) getPostDetails();
  }, []);

  const getPostDetails = async () => {
    setLoading(true);
    try {
      const response = await Get('/post' + id, token);
      setLoading(false);
      if (response?.success) {
        const postData = response?.post;
        setPost(postData);
        setImagePreview(`${UPLOADS_URL}${postData.image}`); // Set initial image preview
        form.setFieldsValue({
          ...postData,
        });
      } else {
        message.error("Something went wrong!");
      }
    } catch (error) {
      setLoading(false);
      message.error(error.message);
    }
  };

  const onFinish = (values) => {
    setLoading(true);
    const formObject = new FormData();

    // Append other fields to FormData
    const data = {
      title: values.title,
      description: values.description,
      price: values.price,
      quantity: values.quantity,
      type: values.type,
      coins: values.coins,
    };

    for (const key in data) {
      formObject.append(key, data[key]);
    }

    if (values?.image?.fileList) {
      formObject.append("image", values.image.fileList[0].originFileObj);
    }

    Post(
      '/post' + id,
      formObject,
      token,
      null,
      CONTENT_TYPE.FORM_DATA
    )
      .then((response) => {
        setLoading(false);
        if (response?.data?.success) {
          swal("Success", "Post updated successfully", "success");
          navigate(-1);
        } else {
          swal(
            "Oops!",
            response?.data?.message || response?.response?.data?.message,
            "error"
          );
        }
      })
      .catch(() => {
        setLoading(false);
        message.error("An error occurred while updating the post.");
      });
  };

  // const handleImageChange = ({ fileList }) => {
  //   if (fileList && fileList.length > 0) {
  //     const file = fileList[0].originFileObj;
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setImagePreview(reader.result); // Show image preview
  //     };
  //     // Set image URL or base64 string in form values
  //     form.setFieldsValue({
  //       image: file, // Set as base64 string or URL
  //     });
  //     reader.readAsDataURL(file); // Read the file as base64
  //   } else {
  //     setImagePreview(null);
  //     form.setFieldsValue({
  //       image: null, // Clear form value if no image
  //     });
  //   }
  // };
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
              Edit Post
            </h1>
          </Col>
        </Row>
        <br />
        <Row style={{ padding: "20px" }}>
          <Col xs={24} md={16}>
            <Form
              layout="vertical"
              name="post-edit"
              onFinish={onFinish}
              form={form}
            >
              <Form.Item
                label="Post Title"
                name="title"
                rules={[
                  { required: true, message: "Please input Post Title!" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter Post Title"
                  style={{
                    borderRadius: "5px",
                    fontSize: "14px",
                    padding: "10px 20px",
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Post Type"
                name="type"
                rules={[
                  { required: true, message: "Please input Post Type!" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter Post Type"
                  style={{
                    borderRadius: "5px",
                    fontSize: "14px",
                    padding: "10px 20px",
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Post Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please enter Post Description!",
                  },
                ]}
              >
                <TextArea
                  placeholder="Enter Post Description"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </Form.Item>

              <Form.Item
                label="Price"
                name="price"
                rules={[
                  { required: true, message: "Please Input Post Price!" },
                ]}
              >
                <InputNumber
                  placeholder="Enter Post Price"
                  style={{
                    borderRadius: "5px",
                    fontSize: "14px",
                    width: "100%",
                    padding: "10px 20px",
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Coins"
                name="coins"
                rules={[
                  { required: true, message: "Please Input Post Coins!" },
                ]}
              >
                <InputNumber
                  placeholder="Enter Post Coins"
                  style={{
                    borderRadius: "5px",
                    fontSize: "14px",
                    width: "100%",
                    padding: "10px 20px",
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Quantity"
                name="quantity"
                rules={[
                  { required: true, message: "Please Input Post Quantity!" },
                ]}
              >
                <InputNumber
                  placeholder="Enter Post Quantity"
                  style={{
                    borderRadius: "5px",
                    fontSize: "14px",
                    width: "100%",
                    padding: "10px 20px",
                  }}
                />
              </Form.Item>

              {/* <Form.Item label="Post Image" name="image">
                {imagePreview && (
                  <Image
                    width={200}
                    src={imagePreview}
                    alt="Post Image"
                    style={{ marginBottom: "10px" }}
                  />
                )}
                <Upload
                  className="uploadBtn"
                  beforeUpload={() => false}
                  maxCount={1}
                  onChange={handleImageChange}
                >
                  <Button icon={<UploadOutlined />}>+ Upload New Image</Button>
                </Upload>
              </Form.Item> */}

              {/* <Form.Item
                label="Post Image"
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
                    return false;
                  }}
                  maxCount={1} // Restrict to only one image
                >
                  <div className="dotted-border">
                    <Button icon={<UploadOutlined />}>+Upload Image</Button>
                  </div>
                </Upload>
              </Form.Item> */}
              <Form.Item
                label="Post Image"
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
                  maxCount={1}
                >
                  <div
                    className="dotted-border"
                    style={{ height: "auto", padding: "10px" }}
                  >
                    <Image
                      src={UPLOADS_URL + post?.image}
                      preview={false}
                      height={120}
                    />
                  </div>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                >
                  Update Post
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default EditPost;
