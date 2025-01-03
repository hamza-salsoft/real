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
import { PRODUCT, UPLOADS_URL } from "../../config/constants";
import { Delete } from "../../config/api/delete";
import { Get } from "../../config/api/get";
import { ImageUrl } from "../../config/functions";

const { Title, Text } = Typography;

function AdvertiseBusiness() {
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getProduct();
  }, [id]);

  const handleDeleteButtonClick = () => {
    setModalOpen(true);
  };

  const deleteProduct = async () => {
    setLoading(true);
    try {
      const response = await Delete(`${PRODUCT.deleteProduct}${id}`, token);
      if (response?.success) {
        message.success("Product deleted successfully!");
        navigate(-1);
      } else {
        message.error("Something went wrong!");
      }
    } catch (error) {
      message.error("An error occurred while deleting the product.");
    } finally {
      setLoading(false);
      setModalOpen(false);
    }
  };

  const getProduct = async () => {
    setLoading(true);
    try {
      const response = await Get(PRODUCT.getProductById + id, token);
      if (response?.success) {
        setProduct(response?.product || {});
      } else {
        message.error("Failed to fetch product details.");
      }
    } catch (error) {
      message.error("An error occurred while fetching product details.");
    } finally {
      setLoading(false);
    }
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
                Product Details
              </Title>
            </Col>
          </Row>
          <br />
          <Row justify="center" className="whitebg" style={{ padding: "20px" }}>
            <Col xs={24} md={24} xl={24}>
              {loading ? (
                <Skeleton active />
              ) : (
                product && (
                  <Row
                    justify="space-between"
                    gutter={30}
                    className="info-area padding-y-40 greybg margin-y-40 border-radius-15"
                  >
                    <Col xs={24} md={24} lg={12}>
                      {product.image && (
                        // <ImageGrid smallImages={product} />
                        <Image
                          preview={false}
                          src={UPLOADS_URL + product.image}
                          width={"100%"}
                          height={400}
                          style={{
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </Col>
                    <Col xs={24} md={24} lg={12}>
                      <Button
                        className="delete-icn"
                        icon={<AiFillDelete />}
                        onClick={handleDeleteButtonClick}
                        type="danger"
                      ></Button>
                      <Title level={3} className="product-title">
                        {product.title}
                      </Title>
                      <Title level={5} className="product-bottomtitle">
                        Product Specification
                      </Title>
                      <Text className="product-text">
                        {product.description}
                      </Text>
                      <br />

                      <br />
                      <Button
                        type="primary"
                        shape="round"
                        size="large"
                        style={{ padding: "12px 40px", height: "auto" }}
                        onClick={() =>
                          navigate(`/inventory-management/editProduct/${id}`)
                        }
                      >
                        Edit Product
                      </Button>
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
        onOk={deleteProduct}
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
          Are You Sure You Want To Delete This Product?
        </Typography.Text>
      </Modal>
    </>
  );
}

export default AdvertiseBusiness;
