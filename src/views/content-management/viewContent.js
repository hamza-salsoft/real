import { useState, useEffect } from "react";
import {
  Col,
  Row,
  Avatar,
  Image,
  Button,
  Layout,
  Skeleton,
  Modal,
  Typography,
} from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaCaretDown, FaFilter, FaArrowLeft } from "react-icons/fa";
import ImageGrid from "../../components/imagegrid";
import { AiFillDelete } from "react-icons/ai";
import { EVENT, UPLOADS_URL } from "../../config/constants";
import { Get } from "../../config/api/get";
import { Post } from "../../config/api/post";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import dayjs from "dayjs";
import { ImageUrl } from "../../config/functions";

function ViewContent() {
  // const handleDeleteButtonClick = () => {
  //   setModalOpen(true);
  // };
  const navigate = useNavigate();
  const { id } = useParams();
  const token = useSelector((state) => state.user.userToken);
  const location = useLocation();
  const { content } = location.state || {};
  // const [modalOpen, setModalOpen] = useState(false);
  // const [event, setEvent] = useState({});
  const [recentContent, setRecentContent] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (content) {
      setRecentContent(content);
    }
  }, []);
  //   const images = [
  //     {ImageUrl("productPic.png")},
  //     {ImageUrl("productPic2.png")},
  //     {ImageUrl("productPic3.png")},
  //   ];
  // const [onlineEvent, setOnlineEvents] = useState([]);

  // useEffect(() => {
  //   if (id) {
  //     getContent();
  //   }
  // }, []);

  // const getContent = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await Get(`${CONTENT.GET}${id}`, token);

  //     if (response.status) {
  //       setEvent(response.data.event);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const deleteEvent = () => {
  //   Post(EVENT.deleteEvent + id, {}, token)
  //     .then((response) => {
  //       setLoading(false);
  //       if (response?.data?.status) {
  //         swal("Success", "Event deleted successfully", "success");
  //         navigate(-1);
  //       } else {
  //         swal(
  //           "Oops!",
  //           response?.data?.message || response?.response?.data?.message,
  //           "error"
  //         );
  //       }
  //     })
  //     .catch((e) => {
  //       console.log(":::;", e);
  //       setLoading(false);
  //     });
  // };

  return (
    <>
      <Layout className="configuration">
        <div className="boxDetails">
          <Row style={{ padding: "20px 30px" }}>
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
                Content Details
              </h1>
            </Col>
          </Row>
          <br />

          <Row
            justify="center"
            className="whitebg"
            style={{ padding: "0px 30px" }}
          >
            <Col xs={24} md={24} xl={24}>
              {loading && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Skeleton active />
                  <br />
                </div>
              )}
              {recentContent && !loading && (
                <Row
                  justify="space-between"
                  gutter={30}
                  className="info-area padding-y-40 greybg margin-y-40 border-radius-15"
                >
                  <Col xs={22} md={22} lg={11} style={{ position: "relative" }}>
                    <Image
                      preview={false}
                      src={UPLOADS_URL + "/" + recentContent?.image}
                      width={"100%"}
                      height={400}
                      style={{
                        objectFit: "cover",
                        borderRadius: "15px",
                        cursor: "pointer",
                      }}
                    />
                    {/* <div
                      style={{
                        background: "#d5af68",
                        display: "inline-flex",
                        color: "white",
                        left: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        padding: "20px",
                        borderRadius: "10px",
                        position: "absolute",
                      }}
                    >
                      <h3
                        className="product-tital"
                        style={{ lineHeight: 1.2, color: "white" }}
                      >
                        {dayjs(event.date).format("DD")}
                      </h3>
                      <h3
                        className="product-tital"
                        style={{ lineHeight: 1.2, color: "white" }}
                      >
                        {dayjs(event.date).format("MMM")}
                      </h3>
                    </div> */}
                  </Col>
                  <Col xs={22} md={22} lg={12}>
                    {/* <Button
                      className="delete-icn"
                      icon={<AiFillDelete />}
                      onClick={handleDeleteButtonClick}
                    ></Button> */}

                    <h3 className="product-tital">{recentContent?.heading}</h3>

                    <p className="product-text">{recentContent?.description}</p>
                    <br />

                    <p className="product-bottomtitle">
                      {recentContent?.location}
                    </p>
                    <p className="product-text">{recentContent?.address}</p>

                    <br />

                    <div>
                      <Button
                        type="primary"
                        shape="round"
                        size={"large"}
                        style={{ padding: "12px 40px", height: "auto" }}
                        className="mainButton primaryButton"
                        onClick={() =>
                          navigate("/events/editEvent/" + recentContent._id)
                        }
                      >
                        Edit Event
                      </Button>
                    </div>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
          <br />
          <br />
        </div>
      </Layout>

      {/* <Modal
        open={modalOpen}
        onOk={() => deleteEvent()}
        onCancel={() => setModalOpen(false)}
        okText="Yes"
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
          preview={false}
          width={74}
          height={74}
        />
        <Typography.Title level={4} style={{ fontSize: "25px" }}>
          System Message!
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
          Are You Sure You Want To Delete This Event?
        </Typography.Text>
      </Modal> */}
    </>
  );
}

export default ViewContent;
