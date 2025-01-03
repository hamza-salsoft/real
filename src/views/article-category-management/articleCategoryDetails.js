import React, { useEffect, useState } from "react";
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
  Upload,
  Image,
  message,
  Modal,
  Skeleton,
} from "antd";
import dayjs from "dayjs";
import { UserOutlined,LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { FaCaretDown, FaFilter, FaArrowLeft } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { Post } from "../../config/api/post";
import { UPLOADS_URL, ARTICLECATEGORIES } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import {AiFillPlusCircle} from 'react-icons/ai'
import { useSelector } from "react-redux";

function CategoryDetails() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState();
  const [category, setCategory] = useState(null);
  const [formData, setFormData] = useState({
    picture: null,
    image : null,
  });


  useEffect(() => {
    if(id){
      getCategory();
    }
  }, []);

  const addcategory = () => {
    if(!category?.name){
      message.error('Please enter category name')
      return
    }
     

    Post(ARTICLECATEGORIES.add, category, token).then((response) => {
      console.log(response);
      if (response.status) {

        message.success('Category added successfully!')
        navigate(-1)
      }
      else {
        message.error(response.message)
      }
    })
  }


  const getCategory = async () => {
    setLoading(true);
    const _category = await Get(`${ARTICLECATEGORIES.getOne}${id}`, token);
    setCategory(_category);
    setLoading(false);
  };

  const updateCategory = () => {
    Post(`${ARTICLECATEGORIES.edit}${id}`,category, token).then((response) => {
      console.log(response);
      if (response.status) {
          message.success('Category updated successfully!')
          navigate(-1)
      }
      else {
          message.error(response.message)
      }
  })




    console.log(formData);
  }


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
              {id ? "Edit Article Category" : "Add Article Category"}
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

        {/* ==================================================== View Mode =====================================================  */}
        {!loading  && (
          <>
  <Row style={{ padding: "5px 20px" }}>
              <Col
                xs={24}
                md={12}
                style={{
                  display: "flex",
                  alignItems: "left",
                  flexDirection: "column",
                }}
              >
                <h5
                  className="pageTitle"
                  style={{
                    fontSize: "16px",
                    margin: 10,
                    textTransform: "capitalize",
                    fontWeight: "normal",
                  }}
                >
                  Category Name
                </h5>
                <Input
                  style={{ width: "100%" }}
                  className="mainInput dashInput"
                  placeholder="category ABC"
                  value={category?.name}
                  onChange={(e) =>
                    setCategory({ ...category, name: e.target.value })
                  }
                />
              </Col>
            </Row>
            <Row style={{ padding: "5px 20px" }}>
              <Col
                xs={24}
                md={12}
                style={{
                  display: "flex",
                  alignItems: "left",
                  flexDirection: "column",
                }}
              >
                <h5
                  className="pageTitle"
                  style={{
                    fontSize: "16px",
                    margin: 10,
                    textTransform: "capitalize",
                    fontWeight: "normal",
                  }}
                >
                  Category Description
                </h5>
                <Input
                  style={{ width: "100%" }}
                  className="mainInput dashInput"
                  placeholder="category description"
                  value={category?.description}
                  onChange={(e) =>
                    setCategory({
                      ...category,
                      description: e.target.value,
                    })
                  }
                />
              </Col>
            </Row>
            <br/>
           
            <Row style={{ padding: "10px 20px" }}>
            <Button
              type="primary"
              shape="round"
              size={"large"}
              style={{ padding: "12px 40px", height: "auto" }}
              className="mainButton primaryButton"
              onClick={() => {id ? updateCategory() :addcategory()}}
          
            >
             {id ? "Update Category" : "Add Category"}
            </Button>
            </Row>
          </>
        )}


    

        <br />
        <br />
      </div>
      <br />
      <br />
    </Layout>
  );
}
export default CategoryDetails;
