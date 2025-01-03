import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Layout,
  DatePicker,
  message,
} from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Post } from "../../config/api/post";
import { CATEGORY, CONTENT_TYPE, PRODUCT } from "../../config/constants";
import { Upload } from "antd";
import swal from "sweetalert";
import { Get } from "../../config/api/get";
import { AiFillDelete, AiFillPlusCircle } from "react-icons/ai";
import { UploadOutlined } from "@ant-design/icons";
import SizeQuantitySelector from "./SizeQuantitySelector";

const { TextArea } = Input;

function ProductAdd() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const [categories, setCategories] = useState([]);
  const [variations, setVariations] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   getCategories();
  // }, []);

  // const getCategories = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await Get(CATEGORY.getAllCategories, token);
  //     setLoading(false);
  //     if (response?.status) {
  //       setCategories(response?.data?.docs || []);
  //     } else {
  //       message.error("Something went wrong!");
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     message.error(error.message);
  //   }
  // };

  const onFinish = (values) => {
    setLoading(true);
    const formObject = new FormData();
    const data = {
      title: values.title,
      description: values.description,
      price: values.price,
      quantity: values.quantity,
      type: values.type,
      coins: values.coins,
    };

    for (const key in data) {
      formObject.append(
        key,
        Array.isArray(data[key]) ? JSON.stringify(data[key]) : data[key]
      );
    }
    if (values.image) {
      formObject.append(`image`, values.image.fileList[0].originFileObj);
    }

    Post(PRODUCT.addProduct, formObject, token, null, CONTENT_TYPE.FORM_DATA)
      .then((response) => {
        setLoading(false);
        if (response?.data?.success) {
          swal("Success", "Product added successfully", "success");
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
        setLoading(false);
        message.error("An error occurred while adding the product.");
      });
  };
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
              Add New Product
            </h1>
          </Col>
        </Row>
        <br />
        <Row style={{ padding: "20px" }}>
          <Col xs={24} md={16}>
            <Form
              layout="vertical"
              name="product-add"
              onFinish={onFinish}
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
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
                  { required: true, message: "Please Input Product Type!" },
                ]}
              >
                <Input
                  placeholder="Enter Product Type"
                  style={{
                    borderRadius: "5px",
                    fontSize: "14px",
                    width: "100%",
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
                type="number"
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
                type="number"
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
                type="number"
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


                  {/* Add Image */}
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
            Upload Image
          </Button>
        </Upload>
      </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{ width: "100%", marginTop: 16 }}
                >
                  Add Product
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default ProductAdd;
