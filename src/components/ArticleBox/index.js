import React, { useState } from "react";
import { Col, Row, Avatar, Button, Image, Upload, message } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import { Post } from "../../config/api/post";
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import { ARTICLE, UPLOADS_URL, CONTENT_TYPE } from "../../config/constants";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/avatar.png";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import parse from "html-react-parser";

function ArticleBox({ type, getAllArticles }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const createArticle = async () => {
    if (parse(editorContent.trim()) === "") {
      message.error("Post content cannot be empty");
      return;
    }

    try {
      const formObject = new FormData();
      if (image) {
        formObject.append("image", image);
      } else {
        return message.error("Article image is required");
      }
      formObject.append("content", editorContent);
      formObject.append("type", type);

      const response = await Post(
        ARTICLE.addPremuimArticle,
        formObject,
        token,
        null,
        CONTENT_TYPE.FORM_DATA
      );

      if (response?.status) {
        swal("Success!", "Post Added Successfully", "success");
        getAllArticles();
        setImage(null);
        setImageUrl(null);
        setEditorContent("");
      } else {
        swal("Oops!", response?.message, "error");
      }
    } catch (error) {
      swal(
        "Error!",
        error.response?.data?.message ||
          error.response?.response?.data?.message,
        "error"
      );
    }
  };

  return (
    <>
      <div className="post-box">
        <Row>
          <Col xs={24} md={24}>
            <div className="for-d-flex">
              <div className="for-flex-shrink-0">
                <Avatar
                  size={50}
                  src={!user.image ? avatar : UPLOADS_URL + "/" + user.image}
                />
              </div>
              <div className="for-flex-grow editor-container">
                <ReactQuill
                  value={editorContent}
                  onChange={handleEditorChange}
                  modules={ArticleBox.modules}
                  formats={ArticleBox.formats}
                  placeholder="Compose your post here..."
                />
              </div>
            </div>
            <br />
            {imageUrl && (
              <div className="post-pic-box">
                <Image
                  src={imageUrl}
                  alt="Analytics Image"
                  preview={false}
                  className="abc"
                />
              </div>
            )}
            <div className="for-line"></div>
          </Col>
        </Row>
        <Row>
          <Col xs={24} md={12}>
            <Upload
              name="image"
              showUploadList={false}
              style={{ position: "relative" }}
              beforeUpload={(file) => {
                setImageUrl(URL.createObjectURL(file));
                setImage(file);
                return false;
              }}
            >
              <Button className="img-upload-btn" icon={<FileImageOutlined />}>
                Image Upto (5MB)
              </Button>
            </Upload>
          </Col>
          <Col xs={24} md={12} style={{ textAlign: "end" }}>
            <Button
              type="button"
              size={"large"}
              style={{ padding: "12px 40px", height: "auto" }}
              className="mainButton graden-bg"
              onClick={() => createArticle()}
            >
              Post
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
}

ArticleBox.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};

ArticleBox.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default ArticleBox;
