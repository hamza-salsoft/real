// import router from "next/router";
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
import { ImEarth } from "react-icons/im";
import { AiFillLike } from "react-icons/ai";
import { BsFillChatDotsFill, BsFillShareFill } from "react-icons/bs";
import { UPLOADS_URL, UPLOADS_URL2 } from "../../config/constants";
import moment from "moment";
import { ImageUrl } from "../../config/functions";
import { useEffect, useState } from "react";
import CommentModal from "../../modals/CommentModal";
import LikeModal from "../../modals/LikeModal";
import parse from "html-react-parser";
import "./social.css";

function SocialBox({ post }) {
  const [commentModal, setCommentModal] = useState(false);
  const [likesModal, setLikesModal] = useState(false);

  return (
    <>
      {post && (
        <div className="social-post-box">
          <Row>
            <Col xs={24} md={24}>
              <div className="for-d-flex" style={{ alignItems: "center" }}>
                <div className="for-flex-shrink-0">
                  <Image
                    src={ImageUrl("profilepicture.png")}
                    alt="Analytics Image"
                    preview={false}
                  />
                </div>
                <div className="for-flex-grow">
                  <h5 className="poster-name">
                    {post?.author.isAdmin ? "Admin" : post?.author.fullName}{" "}
                    <ImEarth />
                  </h5>
                  <h6 className="posting-date">
                    {" "}
                    Posted {moment(post.createdAt).fromNow()}
                  </h6>
                </div>
              </div>
            </Col> 
            {post.images.length > 0 && (
              <Col xs={24} md={24}>
                <div
                  className="post-pic-box"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={UPLOADS_URL2 + post.images[0]}
                    alt="Analytics Image"
                    preview={false}
                    className="abc"
                    width={200}
                  />
                </div>
              </Col>
            )}
            <Col xs={24} md={24}>
              <p className="post-text">{parse(post?.title)}</p>
            </Col>
          </Row>
          <Row style={{ justifyContent: "center" }}>
            <Col xs={24} md={23}>
              <Row>
                <Col xs={12} md={12}>
                  <div
                    className="like-box cursor-pointer"
                    onClick={() => setLikesModal(true)}
                  >
                    <div className="like-box-iner">
                      <AiFillLike />
                      {post.likes.length} Likes
                    </div>
                  </div>
                </Col>
                <Col xs={12} md={12} style={{ textAlign: "end" }}>
                  <div
                    className="like-box cursor-pointer"
                    onClick={() => setCommentModal(true)}
                  >
                    <div className="like-box-iner">
                      <BsFillChatDotsFill />
                      {post.comments.length} Comments
                    </div>
                  </div>
                </Col>
              </Row>
              {/* <div className="for-line"></div>
            <Row>
              <div className="linke-comment-share">
                <div>
                  <AiFillLike /> Likes
                </div>
                <div className="">
                  <BsFillChatDotsFill /> Comments
                </div>
                <div className="">
                  <BsFillShareFill /> Share
                </div>
              </div>
            </Row> */}
            </Col>
          </Row>
        </div>
      )}
      {commentModal && (
        <CommentModal
          commentModal={commentModal}
          setCommentModal={setCommentModal}
          postId={post._id}
        />
      )}
      {likesModal && (
        <LikeModal
          likesModal={likesModal}
          setLikesModal={setLikesModal}
          postId={post._id}
        />
      )}
    </>
  );
}

export default SocialBox;
