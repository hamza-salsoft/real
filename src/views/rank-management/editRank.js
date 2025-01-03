import React, { useState, useEffect } from "react";
import { Col, Row, Form, Input, Button, Layout, Upload, Space } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { CONTENT_TYPE, RANK, UPLOADS_URL } from "../../config/constants";
import swal from "sweetalert";
import { Get } from "../../config/api/get";
import { Post } from "../../config/api/post";

const { TextArea } = Input;

function EditRank() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = useState(false);
  const [rank, setRank] = useState(null);
  const [form] = Form.useForm();
  const [imageFileList, setImageFileList] = useState([]);
  const [coverImageFileList, setCoverImageFileList] = useState([]);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (id) {
      getRankDetails();
    }
  }, [id]);

  const getRankDetails = async () => {
    setLoading(true);
    const response = await Get(`${RANK.getRankById}/${id}`, token);
    if (response.status) {
      const rankData = response.data;
      const optionsArray = Object.entries(rankData.questionnaire.options).map(
        ([text, weight]) => ({ text, weight })
      );
      rankData.questionnaire.options = optionsArray;
      setRank(rankData);
      setImageFileList([
        {
          uid: "-1",
          name: rankData.image,
          status: "done",
          url: `${UPLOADS_URL}/${rankData.image}`,
        },
      ]);
      setCoverImageFileList([
        {
          uid: "-1",
          name: rankData.book.coverImage,
          status: "done",
          url: `${UPLOADS_URL}/${rankData.book.coverImage}`,
        },
      ]);
      setFileList([
        {
          uid: "-1",
          name: rankData.book.file,
          status: "done",
          url: `${UPLOADS_URL}/${rankData.book.file}`,
        },
      ]);
      form.setFieldsValue(rankData);
    }
    setLoading(false);
  };

  const onFinish = async (values) => {
    setLoading(true);
    const optionsObject = values.questionnaire.options.reduce(
      (acc, option) => ({ ...acc, [option.text]: option.weight }),
      {}
    );
    const formObject = new FormData();

    formObject.append("rank", values.rank);
    formObject.append("degree", values.degree);
    formObject.append("rankName", values.rankName);
    formObject.append(
      "questionnaire",
      JSON.stringify({
        ...values.questionnaire,
        options: optionsObject,
      })
    );
    formObject.append("topic", JSON.stringify(values.topic));


    if (imageFileList.length && imageFileList[0].originFileObj) {
      formObject.append("image", imageFileList[0].originFileObj);
    }
    if (coverImageFileList.length && coverImageFileList[0].originFileObj) {
      formObject.append("coverImageBook", coverImageFileList[0].originFileObj);
    }
    if (fileList.length && fileList[0].originFileObj) {
      formObject.append("book", fileList[0].originFileObj);
    }
    formObject.append("bookTitle", values.book.title);
    formObject.append("bookAuthor", values.book.author);
    formObject.append("bookDescription", values.book.description);
    formObject.append("bookPrice", values.book.price);
    formObject.append("ebookPrice", values.book.ebookPrice);

    try {
      const response = await Post(
        `${RANK.editRank}${id}`,
        formObject,
        token,
        null,
        CONTENT_TYPE.FORM_DATA
      );

      setLoading(false);

      if (response?.status) {
        swal("Success", "Rank updated successfully", "success");
        navigate(-1);
      } else {
        swal(
          "Oops!",
          response?.message || response?.response?.data?.message,
          "error"
        );
      }
    } catch (error) {
      console.error("Error updating rank:", error);
      setLoading(false);
      swal("Error", "Failed to update rank", "error");
    }
  };

  const handleImageUploadChange = ({ fileList }) =>
    setImageFileList(fileList.slice(-1));

  const handleCoverImageUploadChange = ({ fileList }) =>
    setCoverImageFileList(fileList.slice(-1));

  const handleFileUploadChange = ({ fileList }) =>
    setFileList(fileList.slice(-1));

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
              Edit Rank
            </h1>
          </Col>
        </Row>
        <br />
        <Row style={{ padding: "20px" }}>
          <Col xs={24} md={16}>
            <Row style={{ padding: "10px" }}>
              <Col xs={24} md={11}>
                {rank && (
                  <Form
                    layout="vertical"
                    form={form}
                    initialValues={rank}
                    onFinish={onFinish}
                  >
                    <Form.Item label="Rank Image" name="image">
                      <Upload
                        fileList={imageFileList}
                        listType="picture-card"
                        beforeUpload={(file) => false}
                        onChange={handleImageUploadChange}
                      >
                        {imageFileList.length < 1 && (
                          <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                          </div>
                        )}
                      </Upload>
                    </Form.Item>
                    <Form.Item
                      label="Rank"
                      name="rank"
                      rules={[
                        { required: true, message: "Please input Rank!" },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="Enter Rank"
                        style={{
                          borderRadius: "5px",
                          background: "white",
                          fontSize: "14px",
                          padding: "10px 20px",
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Degree"
                      name="degree"
                      rules={[
                        { required: true, message: "Please input Degree!" },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="Enter Degree"
                        style={{
                          borderRadius: "5px",
                          background: "white",
                          fontSize: "14px",
                          padding: "10px 20px",
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Rank Name"
                      name="rankName"
                      rules={[
                        { required: true, message: "Please input Rank Name!" },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="Enter Rank Name"
                        style={{
                          borderRadius: "5px",
                          background: "white",
                          fontSize: "14px",
                          padding: "10px 20px",
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Question"
                      name={["questionnaire", "question"]}
                      rules={[
                        { required: true, message: "Please input Question!" },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="Enter Question"
                        style={{
                          borderRadius: "5px",
                          background: "white",
                          fontSize: "14px",
                          padding: "10px 20px",
                        }}
                      />
                    </Form.Item>

                    <Form.List name={["questionnaire", "options"]}>
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(
                            ({ key, name, fieldKey, ...restField }) => (
                              <Space key={key} align="baseline">
                                <Form.Item
                                  {...restField}
                                  label="Option"
                                  name={[name, "text"]}
                                  fieldKey={[fieldKey, "text"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing option text",
                                    },
                                  ]}
                                >
                                  <Input placeholder="Option text" />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  label="Weight"
                                  name={[name, "weight"]}
                                  fieldKey={[fieldKey, "weight"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing weight",
                                    },
                                  ]}
                                >
                                  <Input placeholder="Weight" />
                                </Form.Item>
                                <Button onClick={() => remove(name)}>
                                  Remove
                                </Button>
                              </Space>
                            )
                          )}
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                            >
                              Add Option
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>

                    <Form.Item
                      label="Passing Score"
                      name={["questionnaire", "passingScore"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input Passing Score!",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="Enter Passing Score"
                        style={{
                          borderRadius: "5px",
                          background: "white",
                          fontSize: "14px",
                          padding: "10px 20px",
                        }}
                      />
                    </Form.Item>

                    <Form.List name="topic">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(
                            ({ key, name, fieldKey, ...restField }) => (
                              <Space
                                key={key}
                                align="baseline"
                                direction="vertical"
                              >
                                <Form.Item
                                  {...restField}
                                  label="Topic ID"
                                  name={[name, "topicId"]}
                                  fieldKey={[fieldKey, "topicId"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing Topic ID",
                                    },
                                  ]}
                                >
                                  <Input placeholder="Topic ID" />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  label="Heading"
                                  name={[name, "heading"]}
                                  fieldKey={[fieldKey, "heading"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing heading",
                                    },
                                  ]}
                                >
                                  <Input placeholder="Topic heading" />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  label="Content"
                                  name={[name, "content"]}
                                  fieldKey={[fieldKey, "content"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing content",
                                    },
                                  ]}
                                >
                                  <TextArea
                                    placeholder="Topic content"
                                    autoSize={{ minRows: 3, maxRows: 5 }}
                                  />
                                </Form.Item>
                                <Button onClick={() => remove(name)}>
                                  Remove Topic
                                </Button>
                              </Space>
                            )
                          )}
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                            >
                              Add Topic
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>

                    <Form.Item
                      label="Book Title"
                      name={["book", "title"]}
                      rules={[
                        { required: true, message: "Please input Book Title!" },
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
                      label="Book Description"
                      name={["book", "description"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input Book Description!",
                        },
                      ]}
                    >
                      <TextArea
                        placeholder="Enter Book Description"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                        style={{
                          borderRadius: "5px",
                          background: "white",
                          fontSize: "14px",
                          padding: "10px 20px",
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Book Author"
                      name={["book", "author"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input Book Author!",
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

                    <Form.Item
                      label="Hard-copy Book Price"
                      name={["book", "price"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input hard-copy book price!",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="Enter Hard-copy Book Price"
                        style={{
                          borderRadius: "5px",
                          background: "white",
                          fontSize: "14px",
                          padding: "10px 20px",
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      label="EBook Price"
                      name={["book", "ebookPrice"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input eBook Price!",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="Enter eBook Price"
                        style={{
                          borderRadius: "5px",
                          background: "white",
                          fontSize: "14px",
                          padding: "10px 20px",
                        }}
                      />
                    </Form.Item>

                    <Form.Item label="Cover Image" name="coverImageBook">
                      <Upload
                        fileList={coverImageFileList}
                        listType="picture-card"
                        beforeUpload={(file) => false}
                        onChange={handleCoverImageUploadChange}
                      >
                        {coverImageFileList.length < 1 && (
                          <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                          </div>
                        )}
                      </Upload>
                    </Form.Item>

                    <Form.Item label="Book File" name={["book", "file"]}>
                      <Upload
                        fileList={fileList}
                        beforeUpload={(file) => false}
                        onChange={handleFileUploadChange}
                      >
                        {fileList.length < 1 && (
                          <Button icon={<UploadOutlined />}>
                            Click to Upload
                          </Button>
                        )}
                      </Upload>
                    </Form.Item>
                    <br />

                    <Row>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          size="large"
                          style={{ padding: "12px 40px", height: "auto" }}
                          className="mainButton graden-bg"
                        >
                          Update Rank
                        </Button>
                      </Form.Item>
                    </Row>
                  </Form>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default EditRank;
