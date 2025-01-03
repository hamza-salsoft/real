import React, { useState,useEffect } from "react";
import {
  Col,
  Row, Form,
  Input,
  Image,
  Button, Layout,DatePicker, InputNumber
} from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { Post } from "../../config/api/post";
import { Get } from "../../config/api/get";
import { CONTENT_TYPE,BOOK, UPLOADS_URL } from "../../config/constants";
import { Upload } from "antd";
import swal from "sweetalert";
import dayjs from 'dayjs'
const { TextArea } = Input;


function BookEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const { id } = useParams();
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = React.useState(false);
  const [book, setBook] = useState(null);


    useEffect(() => {
    if (id) {
      getBookDetails();
    }
  }, []);

  const getBookDetails = async () => {
    setLoading(true);
    const response = await Get(`${BOOK.getBookById}${id}`, token);
    if(response.status){
      setBook(response.data.book)
    }
    setLoading(false);
  };


  const onFinish = (values) => {
    console.log("Success:", values);
    setLoading(true);


    let data = {
      price: values.price,
      ebookPrice: values.ebookPrice,
      author: values.author,
      title: values.title,
      description: values.description,
    };

       
    const formObject = new FormData();

    for (const key in data) {
      const item = values[key];
      formObject.append(key, item);
    }


    if(values?.image?.fileList){
      formObject.append("image",values.image.fileList[0].originFileObj);
    }



    Post(BOOK.updateBook+id, formObject,token,null,CONTENT_TYPE.FORM_DATA)
      .then((response) => {
        setLoading(false);
        console.log(response)
        if (response?.data?.status) {
          swal("Success","Book updated successfully","success");
          navigate(-1)
        } else {
          swal("Oops!", response?.data?.message || response?.response?.data?.message, "error");
        }
      })
      .catch((e) => {
        console.log(":::;", e);
        setLoading(false);
      });
  };


  console.log("book",book?.title)

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
              Edit Book
            </h1>
          </Col>
        </Row>
        <br />
        <Row style={{ padding: "20px" }}>
          <Col xs={24} md={16}>
            <Row style={{ padding: "10px" }}>
              <Col xs={24} md={11}>
               {book && <Form
                  layout="vertical"
                  name="basic"
                  labelCol={{
                    span: 0,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  // initialValues={book}
                  onFinish={onFinish}
                >
                  <Form.Item
                    label="Book Title"
                    name="title"
                    initialValue={book?.title}
                    rules={[
                      {
                        required: true,
                        message: "Please input Book Title!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter Book Title"
                      style={{
                        borderRadius: "5px",
                        background: "white",
                        fontSize: "14px",
                        padding: "10px 20px",
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Book Cover Image"
                    name="image"
                    initialValue={book?.coverImage}
                    rules={[
                      
                      {
                                                required: true,
                        message: "Please Upload Image!",
                      },
                    ]}
                  >
                  
                      <Upload className="uploadBtn"  beforeUpload={(file) => {
                                    // setImageNew(URL.createObjectURL(file));
                                    return false;
                                  }}>
                                      <div className="dotted-border" style={{height:"auto",padding:"10px"}}>

                                      <Image
          src={UPLOADS_URL + "/" + book.coverImage}
          preview={false}
          height={120}
        />
                                      </div>
                      </Upload>
                    
                  </Form.Item>

                  <Form.Item
                    label="Book Description"
                    name="description"
                    initialValue={book?.description}
                    rules={[
                      
                      {
                        required: true,
                        message: "Please enter Book Description!",
                      },
                    ]}
                  >
                    <TextArea
                      placeholder="Enter Book Description"
                      autoSize={{
                        minRows: 3,
                        maxRows: 5,
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Price"
                    name="price"
                    initialValue={book?.price}
                    rules={[
                      
                      {
                        required: true,
                        message: "Please Input Book Price!",
                      },
                    ]}
                  >
                    <InputNumber
                      size="small"
                      placeholder="Enter Book Price"
                      style={{
                        borderRadius: "5px",
                        background: "white",
                        fontSize: "14px",
                        width:"100%",
                        padding: "10px 20px",
                      }}
                    />
                  </Form.Item>

                
                  <Form.Item
                    label="Ebook Price"
                    name="ebookPrice"
                    initialValue={book?.ebookPrice}
                    rules={[
                      
                      {
                        required: true,
                        message: "Please Input Book Price!",
                      },
                    ]}
                  >
                    <InputNumber
                      size="small"
                      placeholder="Enter Book Price"
                      style={{
                        borderRadius: "5px",
                        background: "white",
                        fontSize: "14px",
                        width:"100%",
                        padding: "10px 20px",
                      }}
                    />
                  </Form.Item>


                  <Form.Item
                    label="Author"
                    name="author"
                    initialValue={book?.author}
                    rules={[
                      
                      {
                        required: true,
                        message: "Please enter Author!",
                      },
                    ]}
                  >
                   <Input
                      size="large"
                      placeholder="Enter Book Author"
                      style={{
                        borderRadius: "5px",
                        background: "white",
                        fontSize: "14px",
                        padding: "10px 20px",
                      }}
                    />
                  </Form.Item>
                  <br />

                  <Row justify="">
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        size={"large"}
                        style={{ padding: "12px 40px", height: "auto" }}
                        className="mainButton graden-bg"
                       
                      >
                        Update Book
                      </Button>
                    </Form.Item>
                  </Row>
                </Form>}

                
              </Col>
            </Row>
          </Col>
        </Row>


      </div>
    </Layout>
  );
}
export default BookEdit;



