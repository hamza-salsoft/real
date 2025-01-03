import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  message,
  Row,
  Upload
} from "antd";
import React, { useState,useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { Post } from "../../config/api/post";
import { CONTENT_TYPE } from "../../config/constants";
import "../../index.css";
import JoditEditor from "jodit-react";




const { TextArea } = Input;

function PostAdd() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const [categories, setCategories] = useState([]);
  const [variations, setVariations] = useState([]);
  const [loading, setLoading] = useState(false);


  const editor = useRef(null)
  const [content, setContent] = useState('')
  const config = {
    placeholder:"Enter Post Description",
  }
   

  const [fileListVideo, setFileListVideo] = useState([]);
  const [fileListImage, setFileListImage] = useState([]);
  const handleImageChange = ({ fileList }) => setFileListImage(fileList);
  const handleVideoChange = ({ fileList }) => setFileListVideo(fileList);


  const onFinish = (values) => {
    setLoading(true);
    const formObject = new FormData();

    
    const data = {
      title: values.title,
      description: values.description,
    };

    for (const key in data) {
      formObject.append(
        key,
        Array.isArray(data[key]) ? JSON.stringify(data[key]) : data[key]
      );
    }

  // Append image files individually
  if (fileListImage.length > 0) {
    fileListImage.forEach((file) => {
      formObject.append('image', file.originFileObj); // Append each image file
    });
  }

  // Append video files individually
  if (fileListVideo.length > 0) {
    fileListVideo.forEach((file) => {
      formObject.append('video', file.originFileObj); // Append each video file
    });
  }

    console.log(fileListImage,fileListVideo)

    Post("/post", formObject, token, null, CONTENT_TYPE.FORM_DATA)
      .then((response) => {
        setLoading(false);
          // console.log(response.data.status)


        if (response?.data?.status) {
          swal("Success", "Post added successfully", "success");
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
        message.error("An error occurred while adding the post.");
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
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={() => navigate(-1)}
            />
            &emsp;
            <h1 className="pageTitle" style={{ margin: 0 }}>
              Add New Post
            </h1>
          </Col>
        </Row>
        <br />
        <Row style={{ padding: "20px" }}>
          <Col xs={24} md={16}>



          <Form
      layout="vertical"
      name="post-add"
      onFinish={onFinish}
      onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
    >
      <Form.Item
        label="Post Title"
        name="title"
        rules={[
          { required: true, message: 'Please input Post Title!' },
        ]}
      >
        <Input
          size="large"
          placeholder="Enter Post Title"
          style={{
            borderRadius: '5px',
            fontSize: '14px',
            padding: '10px 20px',
          }}
        />
      </Form.Item>

      <Form.Item
        label="Post Description"
        name="description"
        rules={[
          { required: true, message: 'Please enter Post Description!' },
        ]}
      >
        <JoditEditor config={config}/>
      </Form.Item>

      {/* Post Image Upload */}
      <Form.Item
        label="Post Image"
        name="image"
        // rules={[
        //   { message: 'Please upload an image!' },
        // ]}
      >
        <Upload
          listType="picture"
          fileList={fileListImage}
          onChange={handleImageChange}
          accept="image/*" 
          // beforeUpload={beforeUploadImage}
        >
          <Button type="primary" icon={<UploadOutlined />}>
            Upload Image
          </Button>
        </Upload>
      </Form.Item>

      {/* Post Video Upload */}
      <Form.Item
        label="Post Video"
        name="video"
        // rules={[
        //   { message: 'Please upload a video!' },
        // ]}
      >
        <Upload
          listType="picture"
          fileList={fileListVideo}
          onChange={handleVideoChange}
          accept="video/*" 
          
          // beforeUpload={beforeUploadVideo}
        >
          <Button type="primary" icon={<UploadOutlined />}>
            Upload Video
          </Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          style={{ width: '100%', marginTop: 16 }}
        >
          Add Post
        </Button>
      </Form.Item>
    </Form>












          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default PostAdd;
