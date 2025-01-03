import { useState } from "react";
import { Col, Row, Layout, Upload, Avatar, Form, Button, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { USER, UPLOADS_URL, AUTH } from "../../config/constants";
import { CONTENT_TYPE } from "../../config/constants";
import swal from "sweetalert";
import { Post } from "../../config/api/post";
import { addUser, removeUser } from "../../redux/slice/authSlice";
import avatar from "../../assets/avatar.png";
import { TbCameraPlus } from "react-icons/tb";
import { RiEdit2Fill } from "react-icons/ri";



function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const user = useSelector((state) => state.user.userData);
  // console.log("this is user from rtk ",user)
  const token = useSelector((state) => state.user.userToken);

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = (values) => {
    setIsLoading(true)
    const formData = new FormData();

      for (const key in values) {
        formData.append(key, values[key]);
      }
      if (image) {
        formData.append("image", image);
      }

    Post(AUTH.updateProfile, formData, token, "application/json",undefined,"patch")
      .then((response) => {
        console.log("updated User",response)
        if (response?.data?.status) {
          dispatch(addUser({ user: response?.data?.data?.user, token: token }));
          swal("Success!", "Profile Updated Successfully", "success");
          setEditMode(false);
          setImage(null);
          setImageUrl("");
        } else {
          swal("Oops!", response.data.message || "something went wrong", "error");
        }
    setIsLoading(false)

      })
      .catch((e) => {
        console.log(e);
        swal("Oops!", e.message || "something went wrong", "error");
    setIsLoading(false)

      });
  };


   const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function handleChange(e) {
    setImage(e.target.files[0]);
    // console.log("this is image :", e.target.files[0])

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result); // Set the image URL from the FileReader result
      };
      reader.readAsDataURL(file); // Read the file as a data URL (base64 encoded)
    }
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
            <h1 className="pageTitle" style={{ margin: 0 }}>
              My Profile
            </h1>
          </Col>
        </Row>
        <br />
        <>
          <Row style={{ padding: "20px" }}>
            <Col xs={24} md={24}>
              <Row style={{ justifyContent: "center", textAlign: "center" }}>
                <Col xs={24} md={20} lg={11}>
                  <Form
                    layout="vertical"
                    name="basic"
                    labelCol={{
                      span: 0,
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    initialValues={user}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                  >
                    <Row justify={"center"}>
                      <Col>


                        <Avatar
                          size={120}
                          src={
                            imageUrl
                              ? imageUrl
                              : !user?.image
                              ? avatar
                              : UPLOADS_URL + user.image
                          }
                        />
                        {editMode && 
                        <RiEdit2Fill 
                        size={24}
                        onClick={() => document.getElementById("file").click()}
                        />
                    
                      }
                          <input
                          type="File"
                          id="file"
                          name="image"
                          style={{ display: "none" }}
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>
                    <br />
                    <br />
                    <Row
                      style={{
                        padding: "10px",
                        justifyContent: "space-between",
                      }}
                    >
                      <Col xs={24} md={11}>
                        {editMode ? (
                          <>
                            <Form.Item
                              label="First Name"
                              name="firstName"
                              initialValue={user?.firstName}
                              rules={[
                                {
                                  type: "text",
                                  // warningOnly: true,
                                },
                                {
                                  required: true,
                                  message: "Please input first name!",
                                },
                              ]}
                            >
                              <Input
                                size="large"
                                placeholder="Bella"
                                style={{
                                  borderRadius: "5px",
                                  background: "white",
                                  fontSize: "14px",
                                  padding: "10px 20px",
                                }}
                              />
                            </Form.Item>
                            <Form.Item
                              label="Last Name"
                              name="lastName"
                              initialValue={user?.lastName}
                              rules={[
                                {
                                  type: "text",
                                  // warningOnly: true,
                                },
                                {
                                  required: true,
                                  message: "Please input last name!",
                                },
                              ]}
                            >
                              <Input
                                size="large"
                                placeholder="Bella"
                                style={{
                                  borderRadius: "5px",
                                  background: "white",
                                  fontSize: "14px",
                                  padding: "10px 20px",
                                }}
                              />
                            </Form.Item>
                          </>
                        ) : (
                          <>
                            {" "}
                            <h5
                              style={{
                                display: "inline",
                                fontSize: 16,
                                fontWeight: "bold",
                              }}
                            >
                              Full Name{" "}
                            </h5>
                            <h5
                              style={{
                                display: "block",
                                fontSize: 16,
                                color: "#7a7e7f",
                              }}
                            >
                              {user?.firstName} {user?.lastName}
                            </h5>
                          </>
                        )}
                      </Col>
                      <Col xs={24} md={11}>
                        {editMode ? (
                          <Form.Item
                            label="Email Address"
                            name="email"
                            rules={[
                              {
                                type: "text",
                                // warningOnly: true,
                              },
                              {
                                required: true,
                                message: "Please input name!",
                              },
                            ]}
                          >
                            <Input
                              size="large"
                              disabled
                              // placeholder="bellaedward@gmail.com"
                              initialValue={user?.email}
                              style={{
                                borderRadius: "5px",
                                background: "white",
                                fontSize: "14px",
                                padding: "10px 20px",
                              }}
                            />
                          </Form.Item>
                        ) : (
                          <>
                            {" "}
                            <h5
                              style={{
                                display: "block",
                                fontSize: 16,
                                fontWeight: "bold",
                              }}
                            >
                              Email Address{" "}
                            </h5>
                            <h5
                              style={{
                                display: "inline",
                                fontSize: 16,
                                color: "#7a7e7f",
                              }}
                            >
                              {user?.email}
                            </h5>
                          </>
                        )}
                      </Col>
                    </Row>

                    <Row justify="center">
                      {editMode && (
                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            size={"large"}
                            style={{ padding: "12px 40px", height: "auto" }}
                            className="mainButton graden-bg"
                            // onClick={() => setEditMode(true)}
                          >
                            {isLoading ?  <div class="w-6 h-6 border-4 border-t-4 border-[#1870e3] border-dashed rounded-full animate-spin"></div> :"Update Profile"}
                          </Button>
                        </Form.Item>
                      )}
                    </Row>
                  </Form>
                </Col>
              </Row>
              {!editMode && (
                <Row justify="center">
                  <Button
                    type="button"
                    size={"large"}
                    style={{ padding: "12px 40px", height: "auto" }}
                    className="mainButton graden-bg"
                    onClick={() => setEditMode(true)}
                  >
                    Edit Profile
                  </Button>
                </Row>
              )}
            </Col>
          </Row>
          <Row justify={"center"}>
            <Col>
              <h5
                className="change-pas-link"
                onClick={() => navigate("/profile/changePassword")}
              >
                Change Password
              </h5>
            </Col>
          </Row>
        </>
        <br />
        <br />
      </div>
    </Layout>
  );
}
export default Profile;
