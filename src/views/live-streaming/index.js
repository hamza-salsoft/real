import { useState } from "react";
import { Col, Row, Layout, Avatar, Image, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UPLOADS_URL } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PostBox from "../../components/PostBox";
import SocialBox from "../../components/SocialBox";
import { ImageUrl } from "../../config/functions";

function LiveStreaming() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    id: 1,
    name: "John Doe",
    email: "bellaedward@gmail.com",
  });

  return (
    <Layout className="configuration">
      <div className="boxDetails">
        <Row style={{ padding: "10px 20px" }}>
          <Col
            xs={24}
            md={12}
            style={{ display: "flex", alignItems: "center" }}
          >
            <h1 className="pageTitle" style={{ margin: 0 }}>
              Live Streaming
            </h1>
          </Col>
        </Row>
        <br />
        <>
          <Row style={{ justifyContent: "center" }}>
            <Col xs={24} md={24}>
              <div className="am-box">
                <Image
                  src={ImageUrl("live-strem.png")}
                  alt="Analytics Image"
                  preview={false}
                />
                <div className="a1">
                  <Button
                    type="button"
                    size={"large"}
                    style={{ padding: "12px 40px", height: "auto" }}
                    className="mainButton graden-bg"
                    onClick={() => navigate("/start-stream")}
                  >
                    Go Live
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </>
      </div>
    </Layout>
  );
}
export default LiveStreaming;
