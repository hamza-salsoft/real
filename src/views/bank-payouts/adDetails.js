import { useEffect, useState } from "react";
import {
  Col,
  Row,
  Input,
  Image,
  Button,
  Layout,
  TextArea,
  Modal,
  Typography,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { FaCaretDown, FaFilter, FaArrowLeft } from "react-icons/fa";
import ImageGrid from "../../components/imagegrid";
import { AiFillDelete } from "react-icons/ai";
import { ImageUrl } from "../../config/functions";
import { Get } from "../../config/api/get";
import { AD } from "../../config/constants";
import { useSelector } from "react-redux";
import { Put } from "../../config/api/put";

function AdvertiseBusiness() {
  const { TextArea } = Input;
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [disapproveModalOpen, setDisapproveModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [ad, setAd] = useState({});
  const { id } = useParams();
  const token = useSelector((state) => state.user.userToken);

  const getAd = async () => {
    try {
      const response = await Get(`${AD.getAdById}${id}`, token);
      if (response?.status) {
        setAd(response?.data.ad);
        setStatus(response?.data?.ad?.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAd();
  }, []);

  const handleStatus = async () => {
    try {
      let response;
      if (status !== "APPROVED") {
        response = await Put(AD.toggleStatus + id, token, {
          status: "APPROVED",
        });
      } else {
        response = await Put(AD.toggleStatus + id, token, {
          status: "DISAPPROVED",
          rejectionReason: rejectionReason,
        });
      }

      if (response?.status) {
        setApproveModalOpen(false);
        setDisapproveModalOpen(false);
        setRejectionReason("");
        setStatus(response?.data?.ad?.status);
      }
    } catch (error) {
      console.log(error.message);
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
                style={{ fontWeight: "bold", fontSize: "20px" }}
                onClick={() => navigate(-1)}
              />
              &emsp;
              <h1 className="pageTitle" style={{ margin: 0 }}>
                Ad Details
              </h1>
            </Col>
          </Row>
          <br />

          <Row justify="center" className="whitebg">
            <Col xs={24} md={24} xl={24}>
              <Row
                justify="space-between"
                gutter={30}
                className="info-area padding-y-40 greybg margin-y-40 border-radius-15"
                // key={index}
              >
                <Col xs={22} md={22} lg={11}>
                  <ImageGrid smallImages={ad?.images} />
                </Col>
                <Col xs={22} md={22} lg={12}>
                  <div className="flex justify-between items-center">
                    <h3 className="product-tital">{ad?.title}</h3>
                    <p
                      className={`${
                        status === "APPROVED"
                          ? "text-green-500"
                          : "text-red-500"
                      } font-bold`}
                    >
                      {status}
                    </p>
                  </div>

                  <p className="product-text">{ad?.description}</p>
                  <h5 className="product-bottomtitle">Contact Details:</h5>
                  <p>
                    <span className="font-bold">Phone:</span> {ad?.phone}
                  </p>
                  <p>
                    <span className="font-bold">Email:</span> {ad?.email}
                  </p>
                  <div className="my-4">
                    <Button
                      type="primary"
                      shape="round"
                      size={"large"}
                      style={{ padding: "12px 40px", height: "auto" }}
                      className="mainButton primaryButton"
                      onClick={() => {
                        setApproveModalOpen(true);
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      type="primary"
                      shape="round"
                      size={"large"}
                      style={{
                        padding: "12px 40px",
                        height: "auto",
                        marginLeft: "15px",
                      }}
                      className="mainButton secondaryButton"
                      onClick={() => {
                        setDisapproveModalOpen(true);
                      }}
                    >
                      Disapprove
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <br />
          <br />
        </div>
      </Layout>

      <Modal
        visible={approveModalOpen}
        onOk={() => handleStatus()}
        onCancel={() => setApproveModalOpen(false)}
        okText="Approve"
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
          style: {
            border: "2px solid #b78a39",
            color: "#b78a39",
            height: "auto",
            padding: "6px 35px",
            borderRadius: "50px",
            fontSize: "16px",
            marginTop: "15px",
          },
        }}
        okButtonProps={{
          style: {
            backgroundColor: "#b78a39",
            color: "white",
            marginTop: "15px",
            height: "auto",
            padding: "5px 35px",
            borderRadius: "50px",
            fontSize: "16px",
            border: "2px solid #b78a39",
          },
        }}
      >
        <Image
          src={ImageUrl("question.png")}
          preview={false}
          width={100}
          height={120}
        />
        <Typography.Title level={4} style={{ fontSize: "25px" }}>
          APPROVE!
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
          Do You Want To APPROVE This Ad?
        </Typography.Text>
      </Modal>

      <Modal
        open={disapproveModalOpen}
        // onOk={() => handleStatus()}
        onCancel={() => setDisapproveModalOpen(false)}
        okText="Submit & Disapprove"
        onOk={() => handleStatus()}
        className="StyledModal"
        style={{
          left: 0,
          right: 0,
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
        }}
        cancelText="Cancel"
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
          Are You Sure You Want To Disapprove This?
          <TextArea
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Please Write A Reason Here"
            autoSize={{
              minRows: 5,
              maxRows: 5,
            }}
          />
        </Typography.Text>
      </Modal>
    </>
  );
}

export default AdvertiseBusiness;
