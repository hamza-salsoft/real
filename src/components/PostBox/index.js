// import router from "next/router";
import react, { useState } from "react";
import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Input,
  Button,
  Popover,
  Layout,
  Avatar,
  Tabs,
  Table,
  Select,
  Image,
  Modal,
  Skeleton,
  message,
  Upload,
} from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import { Post } from "../../config/api/post";
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import { POST, UPLOADS_URL } from "../../config/constants";
import { CONTENT_TYPE } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import avatar from "../../assets/avatar.png";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import parse from "html-react-parser";

function PostBox({ isMasonic, getAllPosts }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const createPost = () => {
    if (parse(editorContent.trim()) === "") {
      message.error("Post content cannot be empty");
      return;
    }

    const formObject = new FormData();
    if (image) {
      formObject.append("image", image);
    }
    formObject.append("title", editorContent);
    formObject.append("isMasonic", isMasonic);

    Post(POST.addPost, formObject, token, null, CONTENT_TYPE.FORM_DATA)
      .then((response) => {
        if (response?.data?.status || response?.response?.data?.status) {
          swal("Success!", "Post Added Successfully", "success");
          getAllPosts();
          setImage(null);
          setImageUrl(null);
          setTitle("");
          setEditorContent("");
        } else {
          swal(
            "Oops!",
            response?.data?.message || response?.response?.data?.message,
            "error"
          );
        }
      })
      .catch((e) => {
        swal(
          "Error!",
          e.response?.data?.message || e.response?.response?.data?.message,
          "error"
        );
        console.log(">>>>", e);
      });
  };

  return (
    <>
      <div className="post-box">
        <Row>
          <Col xs={24} md={24}>
            <div className="for-d-flex">
              <div className="for-flex-shrink-0">
                {/* <Image
                  src={"/images/profilepicture.png"}
                  alt="Analytics Image"
                  preview={false}
                /> */}
                <Avatar
                  size={50}
                  src={!user.image ? avatar : UPLOADS_URL + "/" + user.image}
                />
              </div>
              <div className="for-flex-grow editor-container">
                {/* <Input
                  size="medium"
                  placeholder="Would you like to post something"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    borderRadius: "100px",
                    background: "#fff",
                    fontSize: "14px",
                    padding: "14px 20px",
                  }}
                /> */}
                <ReactQuill
                  value={editorContent}
                  onChange={handleEditorChange}
                  modules={PostBox.modules}
                  formats={PostBox.formats}
                  placeholder="Compose your post here..."
                  style={{ height: "200px" }} // Adjust the height as needed
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
              onClick={() => createPost()}
            >
              Post
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
}

PostBox.modules = {
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

PostBox.formats = [
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

export default PostBox;
