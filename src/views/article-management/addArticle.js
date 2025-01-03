// import React, { useEffect, useState } from "react";
// import {
//   Col,
//   Row,
//   Typography,
//   List,
//   Form,
//   Input,
//   Button,
//   Popover,
//   Layout,
//   Avatar,
//   Tabs,
//   Table,
//   Select,
//   Upload,
//   Image,
//   message,
//   Modal,
//   Skeleton,
// } from "antd";
// import dayjs from "dayjs";
// import { UserOutlined,LoadingOutlined, PlusOutlined } from "@ant-design/icons";
// import { FaCaretDown, FaFilter, FaArrowLeft } from "react-icons/fa";
// import { Get } from "../../config/api/get";
// import { Post } from "../../config/api/post";
// import { UPLOADS_URL, ARTICLE } from "../../config/constants";
// import { useNavigate, useParams } from "react-router-dom";
// import {AiFillPlusCircle} from 'react-icons/ai'
// import { useSelector } from "react-redux";

// function ArticleDetails() {
//   const { TextArea } = Input;
//   const navigate = useNavigate();
//   const token = useSelector((state) => state.user.userToken);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const { id } = useParams();
//   const [imageUrl, setImageUrl] = useState();
//   const [article, setArticle] = useState(null);
//   const [formData, setFormData] = useState({
//     picture: null,
//     image : null,
//   });


//   useEffect(() => {
//     if(id){
//       getArticle();
//     }
//   }, []);

//   const addArticle = () => {
//     if(!article?.title){
//       message.error('Please enter article title')
//       return
//     }
     

//     Post(ARTICLE.add, article, token).then((response) => {
//       console.log(response);
//       if (response.status) {

//         message.success('Category added successfully!')
//         navigate(-1)
//       }
//       else {
//         message.error(response.message)
//       }
//     })
//   }


//   const getArticle = async () => {
//     setLoading(true);
//     const _article = await Get(`${ARTICLE.getOne}${id}`, token);
//     setArticle(_article);
//     setLoading(false);
//   };

//   const updateCategory = () => {
//     Post(`${ARTICLE.edit}${id}`,article, token).then((response) => {
//       console.log(response);
//       if (response.status) {
//           message.success('Category updated successfully!')
//           navigate(-1)
//       }
//       else {
//           message.error(response.message)
//       }
//   })




//     console.log(formData);
//   }


//   return (
//     <Layout className="configuration">
//       <div className="boxDetails">
//         <Row style={{ padding: "10px 20px" }}>
//           <Col
//             xs={24}
//             md={12}
//             style={{ display: "flex", alignItems: "center" }}
//           >
//             <FaArrowLeft
//               style={{ fontWeight: "bold", fontSize: "20px" }}
//               onClick={() => navigate(-1)}
//             />
//             &emsp;
//             <h1 className="pageTitle" style={{ margin: 0 }}>
//               {"Add Article"}
//             </h1>
//           </Col>
//         </Row>
//         <br />

//         {loading && (
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               height: "50vh",
//             }}
//           >
//             <Skeleton active paragraph={{ rows: 10 }} />
//           </div>
//         )}

//         {/* ==================================================== View Mode =====================================================  */}
//         {!loading  && (
//           <>
//   <Row style={{ padding: "5px 20px" }}>
//               <Col
//                 xs={24}
//                 md={12}
//                 style={{
//                   display: "flex",
//                   alignItems: "left",
//                   flexDirection: "column",
//                 }}
//               >
//                 <h5
//                   className="pageTitle"
//                   style={{
//                     fontSize: "16px",
//                     margin: 10,
//                     textTransform: "capitalize",
//                     fontWeight: "normal",
//                   }}
//                 >
//                   title
//                 </h5>
//                 <Input
//                   style={{ width: "100%" }}
//                   className="mainInput dashInput"
//                   placeholder="Enter Title"
//                   value={article?.title}
//                   onChange={(e) =>
//                     setArticle({ ...article, title: e.target.value })
//                   }
//                 />
//               </Col>
//             </Row>
//             <Row style={{ padding: "5px 20px" }}>
//               <Col
//                 xs={24}
//                 md={12}
//                 style={{
//                   display: "flex",
//                   alignItems: "left",
//                   flexDirection: "column",
//                 }}
//               >
//                 <h5
//                   className="pageTitle"
//                   style={{
//                     fontSize: "16px",
//                     margin: 10,
//                     textTransform: "capitalize",
//                     fontWeight: "normal",
//                   }}
//                 >
//                   Description
//                 </h5>
//                 <TextArea
//                   className="mainInput dashInput"
//                   rows={4}
//                   placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
//                   value={article?.description}
//                   onChange={(e) =>
//                     setArticle({ ...article, article: e.target.value })
//                   }
//                 />
//               </Col>
//             </Row>
//             <Row style={{ padding: "5px 20px" }}>
//               <Col
//                 xs={24}
//                 md={12}
//                 style={{
//                   display: "flex",
//                   alignItems: "left",
//                   flexDirection: "column",
//                 }}
//               >
//                 <h5
//                   className="pageTitle"
//                   style={{
//                     fontSize: "16px",
//                     margin: 10,
//                     textTransform: "capitalize",
//                     fontWeight: "normal",
//                   }}
//                 >
//                   Description
//                 </h5>
//                 <Select
//           className={value ? "greenSelect" : "redSelect"}
//           suffixIcon={<FaCaretDown style={{ fontSize: "16px" }} />}
//           value={value}
//           bordered={false}
//           onChange={() => {setModalOpen(true); setSelectedCategory(categories[index])}}
//           options={[
//             {
//               value: true,
//               label: "Active",
//             },
//             {
//               value: false,
//               label: "Inactive",
//             },
//           ]}
//         />
//               </Col>
//             </Row>

     


//             <br/>
           
//             <Row style={{ padding: "10px 20px" }}>
//             <Button
//               type="primary"
//               shape="round"
//               size={"large"}
//               style={{ padding: "12px 40px", height: "auto" }}
//               className="mainButton primaryButton"
//               onClick={() => addArticle()}
          
//             >
//              Add Article
//             </Button>
//             </Row>
//           </>
//         )}


    

//         <br />
//         <br />
//       </div>
//       <br />
//       <br />
//     </Layout>
//   );
// }
// export default ArticleDetails;
