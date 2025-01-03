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
} from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { PRODUCT, CONTENT_TYPE, UPLOADS_URL } from "../../config/constants";
import swal from "sweetalert";
import { UploadOutlined } from "@ant-design/icons";
import { Get } from "../../config/api/get";
import { Post } from "../../config/api/post";
import { Put } from "../../config/api/put";

const { TextArea } = Input;

function EditProduct() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) getProductDetails();
  }, []);

  const getProductDetails = async () => {
    setLoading(true);
    try {
      const response = await Get(PRODUCT.getProductById + id, token);
      setLoading(false);
      if (response?.success) {
        const productData = response?.product;
        setProduct(productData);
        setImagePreview(`${UPLOADS_URL}/${productData.image}`); // Set initial image preview
        form.setFieldsValue({
          ...productData,
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
      PRODUCT.editProduct + id,
      formObject,
      token,
      null,
      CONTENT_TYPE.FORM_DATA
    )
      .then((response) => {
        setLoading(false);
        if (response?.data?.success) {
          swal("Success", "Product updated successfully", "success");
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
        message.error("An error occurred while updating the product.");
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
  
  const handleImageChange = ({ fileList }) => setFileListImage(fileList);
  const [fileListImage, setFileListImage] = useState([]);
  
  
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
              Edit Product
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
                label="Product Title"
                name="title"
                rules={[
                  { required: true, message: "Please input Product Title!" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter Product Title"
                  style={{
                    borderRadius: "5px",
                    fontSize: "14px",
                    padding: "10px 20px",
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Product Type"
                name="type"
                rules={[
                  { required: true, message: "Please input Product Type!" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter Product Type"
                  style={{
                    borderRadius: "5px",
                    fontSize: "14px",
                    padding: "10px 20px",
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Product Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please enter Product Description!",
                  },
                ]}
              >
                <TextArea
                  placeholder="Enter Product Description"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </Form.Item>

              <Form.Item
                label="Price"
                name="price"
                rules={[
                  { required: true, message: "Please Input Product Price!" },
                ]}
              >
                <InputNumber
                  placeholder="Enter Product Price"
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
                  { required: true, message: "Please Input Product Coins!" },
                ]}
              >
                <InputNumber
                  placeholder="Enter Product Coins"
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
                  { required: true, message: "Please Input Product Quantity!" },
                ]}
              >
                <InputNumber
                  placeholder="Enter Product Quantity"
                  style={{
                    borderRadius: "5px",
                    fontSize: "14px",
                    width: "100%",
                    padding: "10px 20px",
                  }}
                />
              </Form.Item>

              {/* <Form.Item label="Product Image" name="image">
                {imagePreview && (
                  <Image
                    width={200}
                    src={imagePreview}
                    alt="Product Image"
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
                label="Product Image"
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
                label="Product Image"
                name="image"
                rules={[
                  {
                    required: true,
                    message: "Please Upload Image!",
                  },
                ]}
              >
                {/* <Upload
                  className="uploadBtn"
                  beforeUpload={(file) => {
                    // setImageNew(URL.createObjectURL(file));
                    return false;
                  }}
                  maxCount={1}
                > */}
                  <div
                    className="dotted-border"
                    style={{ height: "auto", padding: "10px" }}
                  >
                    <Image
                      src={UPLOADS_URL + product?.image}
                      preview={false}
                      height={120}
                    />
                  </div>
                {/* </Upload> */}
              </Form.Item>


                                {/* Change Image */}
                <Form.Item
                  label="Product Image"
                  name="image"
                  rules={[
                    {
                      required: true,
                      message: "Please Upload Image!",
                    },
                  ]}
                >
                  <Upload
                    listType="picture"
                    fileList={fileListImage}
                    onChange={handleImageChange}
                    accept="image/*" 
                    maxCount={1} 
                    beforeUpload={(file) => {
                      return false;
                    }}
                  >
                    <Button type="primary" icon={<UploadOutlined />}>
                      Update Image
                    </Button>
                  </Upload>
                </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                >
                  Update Product
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default EditProduct;
