import { useState, useEffect } from "react";
import {
  Col,
  Row,
  Image,
  Button,
  Layout,
  Skeleton,
  Modal,
  Typography,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { RANK, UPLOADS_URL } from "../../config/constants";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { ImageUrl } from "../../config/functions";
import { Get } from "../../config/api/get";

const { Title, Text } = Typography;

function ViewRank() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = useSelector((state) => state.user.userToken);
  const [rank, setRank] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      getRankDetails();
    }
  }, [id]);

  const getRankDetails = async () => {
    setLoading(true);
    try {
      const response = await Get(`${RANK.getRankById}/${id}`, token);
      if (response?.status) {
        setRank(response?.data);
      } else {
        swal("Error", "Rank not found", "error");
      }
    } catch (error) {
      console.error("Error fetching rank:", error);
      swal("Error", "Failed to fetch rank details", "error");
    } finally {
      setLoading(false);
    }
  };

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
                Rank Details
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
              {rank && !loading && (
                <Row
                  justify="space-between"
                  gutter={30}
                  className="info-area padding-y-40 greybg margin-y-40 border-radius-15"
                >
                  <Col xs={22} md={22} lg={11}>
                    <Image
                      preview={false}
                      src={UPLOADS_URL + "/" + rank?.image}
                      width={"100%"}
                      height={400}
                      style={{
                        objectFit: "cover",
                        borderRadius: "15px",
                        cursor: "pointer",
                      }}
                    />
                  </Col>
                  <Col xs={22} md={22} lg={12}>
                    <h3 className="product-tital">{rank?.rank}</h3>
                    <p className="product-text">
                      Rank Name:{" "}
                      <span className="font-bold text-2xl">
                        {rank?.rankName}
                      </span>
                    </p>
                    {/* <p className="product-text">Degree: {rank?.degree}</p> */}
                    <br />

                    {rank?.questionnaire && (
                      <>
                        <h5 className="product-bottomtitle">Questionnaire</h5>
                        <p className="product-text">
                          Question: {rank?.questionnaire.question}
                        </p>
                        <ul>
                          {Object.entries(rank?.questionnaire.options).map(
                            ([option, weight], index) => (
                              <li key={index}>
                                {option}: {weight}
                              </li>
                            )
                          )}
                        </ul>
                        <p className="product-text">
                          Passing Score: {rank?.questionnaire.passingScore}
                        </p>
                        <br />
                      </>
                    )}

                    {rank?.topic?.length > 0 && (
                      <>
                        <h5 className="product-bottomtitle">Topics</h5>
                        {rank.topic.map((topic, index) => (
                          <div key={index}>
                            <p className="product-text">
                              <strong>{topic.heading}</strong>
                            </p>
                          </div>
                        ))}
                        <br />
                      </>
                    )}

                    <div>
                      <Button
                        type="primary"
                        shape="round"
                        size={"large"}
                        style={{ padding: "12px 40px", height: "auto" }}
                        className="mainButton primaryButton"
                        onClick={() =>
                          navigate("/rank-management/edit-rank/" + rank._id)
                        }
                      >
                        Edit Rank
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
    </>
  );
}

export default ViewRank;
