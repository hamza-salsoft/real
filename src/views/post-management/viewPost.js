import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Layout,
  Modal,
  Row,
  Skeleton,
  Typography,
  Upload,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";

// import { RiDeleteBack2Fill } from "react-icons/ri";

import { TiDelete } from "react-icons/ti";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { Delete } from "../../config/api/delete";
import { Get } from "../../config/api/get";
import { Post } from "../../config/api/post";
import { CONTENT_TYPE, UPLOADS_URL } from "../../config/constants";
import { ImageUrl } from "../../config/functions";
import JoditEditor from "jodit-react";

const { Title, Text } = Typography;

function ViewPost() {
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(true);

  useEffect(() => {
    getPost();
  }, [id]);

  const handleDeleteButtonClick = () => {
    setModalOpen(true);
  };

  const deletePost = async () => {
    setLoading(true);
    try {
      const response = await Delete(`/post/${id}`, token);
      if (response?.status) {
        message.success("Post deleted successfully!");
        navigate(-1);
      } else {
        message.error("Something went wrong!");
      }
    } catch (error) {
      message.error("An error occurred while deleting the post.");
    } finally {
      setLoading(false);
      setModalOpen(false);
    }
  };

  const getPost = async () => {
    setLoading(true);
    try {
      const response = await Get("/post/" + id, token);
      if (response?.status) {
        setPost(response?.data || {});
        setFileListImage(response?.data?.images || []);
        setFileListVideo(response?.data?.videos || []);
      } else {
        message.error("Failed to fetch post details.");
      }
    } catch (error) {
      message.error("An error occurred while fetching post details.");
    } finally {
      setLoading(false);
    }
  };

  const [fileListVideo, setFileListVideo] = useState([]);
  const [fileListImage, setFileListImage] = useState([]);

  const [newFileListVideo, setNewFileListVideo] = useState([]);
  const [newFileListImage, setNewFileListImage] = useState([]);
  const handleImageChange = ({ fileList }) => setNewFileListImage(fileList);
  const handleVideoChange = ({ fileList }) => setNewFileListVideo(fileList);

  const onFinish = (values) => {
    setLoading(true);
    const formObject = new FormData();

    const data = {
      title: values.postTitle,
      description: values.postDescription,
    };

    for (const key in data) {
      formObject.append(
        key,
        Array.isArray(data[key]) ? JSON.stringify(data[key]) : data[key]
      );
    }


    // old images and videos
    if (fileListImage.length > 0) {
      const stringOfImages = fileListImage.join("|");
      formObject.append("images", stringOfImages);
    }

    if (fileListVideo.length > 0) {
      const stringOfVideo = fileListVideo.join("|");
      formObject.append("videos", stringOfVideo); // Append each video file
    }
    // formObject.append("image", new-image-1); // Append each video file
    // formObject.append("video", new-video-1); // Append each video file
    // formObject.append("video", new-video-2); // Append each video file

    // images = "link 1, link 2, link 3";
    // videos = "link 1, link 2, link 3";

    // Append image files individually
    if (newFileListImage.length > 0) {
      newFileListImage.forEach((file) => {
        formObject.append("image", file.originFileObj); // Append each image file
      });
    }

    // Append video files individually
    if (newFileListVideo.length > 0) {
      newFileListVideo.forEach((file) => {
        formObject.append("video", file.originFileObj); // Append each video file
      });
    }

    Post("/post/" + id, formObject, token, null, CONTENT_TYPE.FORM_DATA)
      .then((response) => {
        setLoading(false);
        // console.log(response.data.status)

        if (response?.data?.status) {
          swal("Success", "Post added successfully", "success");
          navigate(-1);
          setIsEdit(!isEdit);
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

  

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function deleteVedio(index) {
    // alert("deleting")
    let newFileListVideo = fileListVideo.filter((_, i) => i !== index);
    setFileListVideo(newFileListVideo);
    // console.log(newFileListVideo)
  }

  function deleteImage(index) {
    let newFileListImage = fileListImage.filter((_, i) => i !== index);
    setFileListImage(newFileListImage);
    // console.log(newFileListImage)
  }

  const config = {
    readonly: isEdit,
    placeholder: "Enter Post Description",
  };

  return (
    <>
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
              <Title level={1} style={{ margin: 0 }}>
                Post Details
              </Title>
            </Col>
          </Row>
          <br />


          
          <Row justify="center" className="whitebg" style={{ padding: "20px" }}>
            <Col xs={24} md={24} xl={24}>
              {loading ? (
                <Skeleton active />
              ) : (
                post && (
                  <Row
                    justify="center"
                    gutter={30}
                    className="info-area padding-y-40 greybg margin-y-40 border-radius-15 "
                  >
                    <Col xs={24} md={24} lg={24}>
                      <Form
                        name="basic"
                        labelCol={{
                          span: 8,
                        }}
                        wrapperCol={{
                          span: 16,
                        }}
                        style={{
                          maxWidth: 1100,
                        }}
                        initialValues={{
                          postTitle: post.title,
                          postDescription: post.description,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                      >
                        <Form.Item
                        
                          label="Post Title"
                          name="postTitle"
                          rules={[
                            {
                              required: true,
                              // message: "Please input your username!",
                            },
                          ]}
                        >
                         {isEdit ? <p className="text-lg ml-2 ">{post.title}</p>:
                          <Input disabled={isEdit} value={post.title} />}
                        </Form.Item>

                        <Form.Item
                          label="Post Description"
                          name="postDescription"
                          
                          rules={[
                            {
                              required: true,
                              // message: "Please input your password!",
                            },
                          ]}
                        >
                          {!isEdit ? (
                            <JoditEditor className="ml-2" config={config}/> 
                          ):
                          <div className="p-2  shadow-xl border-[1px] border-slate-200">
                            <div className="ml-2"  dangerouslySetInnerHTML={{ __html: post.description }} />
                         </div>}
                        </Form.Item>

                        {!isEdit && (
                          <>
                            {/* Post Image Upload */}
                            <Form.Item label="Post Image" name="image">
                              <Upload
                                listType="picture"
                                fileList={newFileListImage}
                                onChange={handleImageChange}
                                accept="image/*" 

                              >
                                <Button
                                  type="primary"
                                  icon={<UploadOutlined />}
                                >
                                  Upload Image
                                </Button>
                              </Upload>
                            </Form.Item>

                            {/* Post Video Upload */}
                            <Form.Item label="Post Video" name="video">
                              <Upload
                                listType="picture"
                                fileList={newFileListVideo}
                                onChange={handleVideoChange}
                                accept="video/*" 
                              >
                                <Button
                                  type="primary"
                                  icon={<UploadOutlined />}
                                >
                                  Upload Video
                                </Button>
                              </Upload>
                            </Form.Item>
                          </>
                        )}

                        <Form.Item
                          name="remember"
                          valuePropName="checked"
                          label={null}
                        ></Form.Item>

                        <Form.Item label={null}>
                          <Button
                            type="primary"
                            shape="round"
                            size="large"
                            style={{ padding: "12px 40px", height: "auto" }}
                            onClick={() => setIsEdit(!isEdit)}
                          >
                            {!isEdit ? "Cancel" : "Edit Post"}
                          </Button>
                        </Form.Item>

                        <Form.Item className={!isEdit ? "block" : "hidden"}>
                          <Button
                            type="primary"
                            htmlType="submit"
                            shape="round"
                            size="large"
                            style={{ padding: "12px 40px", height: "auto" }}
                          >
                            Save Post
                          </Button>
                        </Form.Item>
                      </Form>

                      <Button
                        className="delete-icn"
                        icon={<AiFillDelete size={32} />}
                        onClick={handleDeleteButtonClick}
                        type="danger"
                      ></Button>

                      <Row >
                        <Col xs={24} md={24} lg={12}>
                          
                      {fileListImage?.length > 0 &&
                        fileListImage.map((image, index) => (
                          <>
                            {!isEdit && (
                              <div className="my-2 relative top-14 left-2 right-0 z-20">
                                <TiDelete
                                  onClick={() => deleteImage(index)}
                                  className=" cursor-pointer bg-slate-600"
                                  size={36}
                                />
                              </div>
                            )}

                            <Image
                              key={index}
                              preview={false}
                              alt="image"
                              className="W-52"
                              src={UPLOADS_URL+image}
                              width={"100%"}
                              height={400}
                              style={{
                                objectFit: "cover",
                              }}
                            />
                          </>
                        ))}

                      {fileListVideo?.length > 0 &&
                        fileListVideo.map((video, index) => (
                          <>
                            {!isEdit && (
                              <div className="my-2 relative top-14 left-2 right-0">
                                <TiDelete
                                  onClick={() => deleteVedio(index)}
                                  className=" cursor-pointer bg-slate-600"
                                  size={36}
                                />
                              </div>
                            )}
                            <div key={index} style={{ marginBottom: "20px" }}>
                              <iframe
                                width="100%"
                                height="400"
                                src={UPLOADS_URL+video}
                                title={`video-${index}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                          </>
                        ))}
                        </Col>
                       </Row>
                        
                    </Col>
                  </Row>
                )
              )}
            </Col>
          </Row>
          <br />
          <br />
        </div>
      </Layout>

      <Modal
        open={modalOpen}
        // onOk={() => handleStatus()}
        onCancel={() => setModalOpen(false)}
        okText="Yes"
        onOk={deletePost}
        className="StyledModal"
        style={{
          left: 0,
          right: 0,
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
        }}
        cancelText="No"
        cancelButtonProps={{
          className: "no-btn",
        }}
        okButtonProps={{
          className: "yes-btn",
        }}
      >
        <Image
          src={ImageUrl("question.png")}
          alt="Image"
          preview={false}
          width={74}
          height={74}
        />
        <Typography.Title level={4} style={{ fontSize: "25px" }}>
          System Message!
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
          Are You Sure You Want To Delete This Post?
        </Typography.Text>
      </Modal>
    </>
  );
}

export default ViewPost;
