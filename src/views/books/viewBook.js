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
import { useNavigate, useParams } from "react-router-dom";
import { FaCaretDown, FaFilter, FaArrowLeft } from "react-icons/fa";
import ImageGrid from "../../components/imagegrid";
import { AiFillDelete } from "react-icons/ai";
import { BOOK, UPLOADS_URL } from "../../config/constants";
import { Get } from "../../config/api/get";
import { Post } from "../../config/api/post";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import dayjs from "dayjs";
import { ImageUrl } from "../../config/functions";

function ViewBook() {
  const handleDeleteButtonClick = () => {
    setModalOpen(true);
  };
  const navigate = useNavigate();
  const { id } = useParams();
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [onlineBook, setOnlineBooks] = useState([
    {
      key: 1,
      title: "Men's Ruby Masonic Ring",
      text: "Lorem Ipsum is simply dummy text of the printing  and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      bottomTitle: "Product Specification",
      images: [
        ImageUrl("productPic.png"),
        ImageUrl("productPic2.png"),
        ImageUrl("productPic3.png"),
      ],
      sizeTitle: "Select Size",
      sizes: ["16mm", "15mm", "14mm", "13mm"],
    },
  ]);

  useEffect(() => {
    if (id) {
      getBookDetails();
    }
  }, []);

  const getBookDetails = async () => {
    setLoading(true);
    const response = await Get(`${BOOK.getBookById}${id}`, token);
    console.log(response, "<<<<");
    if (response.status) {
      setBook(response.data.book);
    }
    setLoading(false);
  };

  const deleteBook = () => {
    Post(BOOK.deleteBook + id, {}, token)
      .then((response) => {
        setLoading(false);
        if (response?.data?.status) {
          swal("Success", "Book deleted successfully", "success");
          navigate(-1);
        } else {
          swal(
            "Oops!",
            response?.data?.message || response?.response?.data?.message,
            "error"
          );
        }
      })
      .catch((e) => {
        console.log(":::;", e);
        setLoading(false);
      });
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
                Book Details
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
              {book && !loading && (
                <Row
                  justify="space-between"
                  alignItems="center"
                  gutter={30}
                  className="info-area padding-y-40 greybg margin-y-40 border-radius-15"
                >
                  <Col
                    xs={22}
                    md={22}
                    lg={11}
                    style={{
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      preview={false}
                      src={UPLOADS_URL + "/" + book?.coverImage}
                      // width={"100%"}
                      height={400}
                      style={{
                        objectFit: "cover",
                        borderRadius: "15px",
                        cursor: "pointer",
                      }}
                    />
                  </Col>
                  <Col xs={22} md={22} lg={12}>
                    <Button
                      className="delete-icn"
                      icon={<AiFillDelete />}
                      onClick={handleDeleteButtonClick}
                    ></Button>

                    <h3 className="product-tital">{book?.title}</h3>
                    <p className="product-bottomtitle">{book?.author}</p>

                    <p className="product-text">{book?.description}</p>
                    <br />

                    <p className="product-text">
                      ${book?.price} / ${book?.ebookPrice}
                    </p>

                    <br />

                    <div>
                      <Button
                        type="primary"
                        shape="round"
                        size={"large"}
                        style={{ padding: "12px 40px", height: "auto" }}
                        className="mainButton primaryButton"
                        onClick={() =>
                          navigate("/library/editlibrary/" + book._id)
                        }
                      >
                        Edit Book
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

      <Modal
        open={modalOpen}
        onOk={() => deleteBook()}
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
      </Modal>
    </>
  );
}

export default ViewBook;
