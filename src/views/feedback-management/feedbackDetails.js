import { useEffect, useState } from "react";
import {
  Col,
  Row,
  Typography,
  Button,
  Layout,
  Image,
  Modal,
  Skeleton,
} from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { CONTACT, FEEDBACK, USERS } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ImageUrl } from "../../config/functions";
import dayjs from "dayjs";

function FeedbackDetails() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = async () => {
    setLoading(true);
    try {
      const response = await Get(`${CONTACT.getContactById}${id}`, token);
      if (response?.status) {
        setFeedback(response?.data?.contact);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // const handleStatus = async () => {
  //   try {
  //     const response = await Get(
  //       USERS.toggleStatus + "/" + user._id,
  //       token,
  //       {}
  //     );
  //     const newUser = { ...user };

  //     newUser.isActive = !user.isActive;
  //     setModalOpen(false);
  //     setFeedback(newUser);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  // const handleDeleteButtonClick = () => {
  //   setModalOpen(true);
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
              style={{ fontWeight: "bold", fontSize: "20px" }}
              onClick={() => navigate(-1)}
            />
            &emsp;
            <h1 className="pageTitle" style={{ margin: 0 }}>
              View Feedback
            </h1>
          </Col>
        </Row>
        <br />

        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <Skeleton active paragraph={{ rows: 10 }} />
          </div>
        )}

        {!loading && feedback && (
          <>
            <Row style={{ padding: "20px" }}>
              <Col xs={24} md={16}>
                <Row style={{ padding: "10px" }}>
                  <Col xs={24} md={6}>
                    <div>
                      <h4 className="heading-inner-medium">Name:</h4>
                    </div>
                  </Col>
                  <Col xs={24} md={14}>
                    <div>
                      <h5 className="heading-inner-text">{feedback?.name}</h5>
                    </div>
                  </Col>
                </Row>
                <Row style={{ padding: "10px" }}>
                  <Col xs={24} md={6}>
                    <div>
                      <h4 className="heading-inner-medium">Email:</h4>
                    </div>
                  </Col>
                  <Col xs={24} md={14}>
                    <div>
                      <h5 className="heading-inner-text">{feedback?.email}</h5>
                    </div>
                  </Col>
                </Row>
                <Row style={{ padding: "10px" }}>
                  <Col xs={24} md={6}>
                    <div>
                      <h4 className="heading-inner-medium">Subject:</h4>
                    </div>
                  </Col>
                  <Col xs={24} md={14}>
                    <div>
                      <h5 className="heading-inner-text">
                        {feedback?.subject}
                      </h5>
                    </div>
                  </Col>
                </Row>
                <Row style={{ padding: "10px" }}>
                  <Col xs={24} md={6}>
                    <div>
                      <h4 className="heading-inner-medium">Date:</h4>
                    </div>
                  </Col>
                  <Col xs={24} md={14}>
                    <div>
                      <h5 className="heading-inner-text">
                        {dayjs(feedback?.createdAt).format("M/D/YYYY")}
                      </h5>
                    </div>
                  </Col>
                </Row>
                <Row style={{ padding: "10px" }}>
                  <Col xs={24} md={6}>
                    <div>
                      <h4 className="heading-inner-medium">Message:</h4>
                    </div>
                  </Col>
                  <Col xs={24} md={14}>
                    <div>
                      <h5 className="heading-inner-text">
                        {feedback?.message}
                      </h5>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
        )}

        <br />
        <br />

        {/* <Modal
          open={modalOpen}
          onOk={() => handleStatus()}
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
            Are You Sure You Want To Delete This Book?
          </Typography.Text>
        </Modal> */}
      </div>
    </Layout>
  );
}
export default FeedbackDetails;
