import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  message,
  Image,
  Button,
  Layout,
  Skeleton,
  Modal,
  Typography,
} from "antd";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ImageGrid from "../../components/imagegrid";
import { AiFillDelete } from "react-icons/ai";
import { CREDENTIALS, PRODUCT, UPLOADS_URL } from "../../config/constants";
import { Delete } from "../../config/api/delete";
import { Get } from "../../config/api/get";
import { ImageUrl } from "../../config/functions";
import { useGetPaypalKeysQuery } from "../../api/paypal";

const { Title, Text } = Typography;

function PaypalCredentials() {
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = useState(true);
  const {data: keys} = useGetPaypalKeysQuery();
  const navigate = useNavigate();

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
                Paypal Credentials
              </Title>
            </Col>
          </Row>
          <br />
          <Row justify="center" className="whitebg" style={{ padding: "20px" }}>
            <Col xs={24} md={24} xl={24}>
              <Row
                justify="space-between"
                gutter={30}
                className="info-area padding-y-40 greybg margin-y-40 border-radius-15"
              >
                {/* <Col xs={24} md={24} lg={12}>
                      {product.image && (
                        // <ImageGrid smallImages={product} />
                        <Image
                          preview={false}
                          src={UPLOADS_URL + "/" + product.image}
                          width={"100%"}
                          height={400}
                          style={{
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </Col> */}
                <Col xs={24} md={24} lg={12}>
                  {/* <Button
                        className="delete-icn"
                        icon={<AiFillDelete />}
                        onClick={handleDeleteButtonClick}
                        type="danger"
                      ></Button> */}
                  <Title level={5} className="product-bottomtitle">
                    Client Id
                  </Title>
                  <Text level={3} className="product-text">
                    {keys?.clientId ? keys?.clientId : "-"}
                  </Text>
                  <Title level={5} className="product-bottomtitle">
                    Client Secret
                  </Title>
                  <Text className="product-text">
                    {keys?.clientSecret
                      ? keys?.clientSecret
                      : "-"}
                  </Text>
                  <br />

                  <br />
                  <Button
                    type="primary"
                    shape="round"
                    size="large"
                    style={{ padding: "12px 40px", height: "auto" }}
                    onClick={() =>
                      navigate("/paypal-credentials/edit-credentials")
                    }
                  >
                    Edit Credentials
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <br />
          <br />
        </div>
      </Layout>
    </>
  );
}

export default PaypalCredentials;
