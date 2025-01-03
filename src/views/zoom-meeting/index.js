// import React, { useEffect } from "react";
// import { ZoomMtg } from "@zoomus/websdk";
// import { Post } from "../../config/api/post";
// import { ZOOMLIVE } from "../../config/constants";
// import { useSelector } from "react-redux";

// // Set the path to the Zoom Web SDK
// ZoomMtg.setZoomJSLib("https://source.zoom.us/2.0.1/lib", "/av");
// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareJssdk();

// const ZoomLive = () => {
//   const token = useSelector((state) => state.user.userToken);

//   // Dummy data for the meeting
//   const meetingNumber = "123456789";
//   const role = 1; // 1 for host, 0 for attendee
//   const userName = "John Doe";
//   const userEmail = "john.doe@example.com";
//   const passWord = "password";
//   const apiKey = "L60loXQHRu6ilZayco3c0A"; // Replace with your actual Zoom API key

//   const getSignature = async () => {
//     try {
//       const response = await Post(
//         ZOOMLIVE.createMeeting,
//         {
//           meetingNumber: meetingNumber,
//           role: role,
//         },
//         token
//       );
//       const signature = response.data.data.signature;
//       if (signature) {
//         startMeeting(signature);
//       }
//     } catch (error) {
//       console.error("Error generating signature:", error);
//     }
//   };

//   useEffect(() => {
//     getSignature();
//   }, []);

//   const startMeeting = (signature) => {
//     if (!apiKey || !signature) {
//       console.error("API key or signature is missing");
//       return;
//     }

//     const meetConfig = {
//       apiKey: apiKey,
//       meetingNumber: meetingNumber,
//       userName: userName,
//       passWord: passWord,
//       leaveUrl: "http://localhost:3000",
//       role: role,
//       userEmail: userEmail,
//     };

//     ZoomMtg.init({
//       leaveUrl: "http://localhost:3000",
//       success: () => {
//         ZoomMtg.join({
//           signature: signature,
//           meetingNumber: meetConfig.meetingNumber,
//           userName: meetConfig.userName,
//           apiKey: meetConfig.apiKey,
//           userEmail: meetConfig.userEmail,
//           passWord: meetConfig.passWord,
//           success: (success) => {
//             console.log(success);
//           },
//           error: (error) => {
//             console.error(error);
//           },
//         });
//       },
//       error: (error) => {
//         console.error(error);
//       },
//     });
//   };

//   return <div id="zoom-meeting"></div>;
// };

// export default ZoomLive;
