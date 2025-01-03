import { useRef, useState } from "react";
import { Col, Row, Layout, Avatar, Image, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { BASE_URL, UPLOADS_URL, URL } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PostBox from "../../components/PostBox";
import SocialBox from "../../components/SocialBox";
import { ImageUrl } from "../../config/functions";
import { io } from "socket.io-client";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function randomID(len) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

function StartStream() {
  const navigate = useNavigate();
  const roomID = "12345";
  const role = ZegoUIKitPrebuilt.Host;
  let sharedLinks = [];
  if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
    sharedLinks.push({
      name: "Join as co-host",
      url:
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?roomID=" +
        roomID +
        "&role=Cohost",
    });
  }
  // generate Kit Token
  const appID = 797150140;
  const serverSecret = "6e1b3c939306b8f4f2360252854ceeea";

  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomID,
    randomID(5),
    randomID(5)
  );

  // start the call
  let myMeeting = async (element) => {
    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role,
        },
      },
      sharedLinks,
    });
  };
  return (
    // <Layout className="configuration">
    //   <div className="boxDetails">
    //     <Row style={{ padding: "10px 20px" }}>
    //       <Col
    //         xs={24}
    //         md={12}
    //         style={{ display: "flex", alignItems: "center" }}
    //       >
    //         <h1 className="pageTitle" style={{ margin: 0 }}>
    //           You are going live now!
    //         </h1>
    //       </Col>
    //     </Row>
    //     <br />
    //     <>
    //       <Row style={{ justifyContent: "center" }}>
    //         <Col xs={24} md={24}>
    //           <div className="am-box">
    //             {/* <Image
    //               src={ImageUrl("live-strem.png")}
    //               alt="Analytics Image"
    //               preview={false}
    //             /> */}
    //             {/* <video ref={videoRef} autoPlay></video> */}
    //             {/* <div className="a1">
    //               <Button
    //                 type="button"
    //                 size={"large"}
    //                 style={{ padding: "12px 40px", height: "auto" }}
    //                 className="mainButton graden-bg"
    //                 onClick={startStream}
    //               >
    //                 Start Stream
    //               </Button>
    //               <Button
    //                 type="button"
    //                 size={"large"}
    //                 style={{ padding: "12px 40px", height: "auto" }}
    //                 className="mainButton graden-bg"
    //                 onClick={endStream}
    //               >
    //                 End Stream
    //               </Button>
    //             </div> */}
    //           </div>
    //         </Col>
    //       </Row>
    //     </>
    //   </div>
    // </Layout>
    <div
      className="myCallContainer"
      ref={myMeeting}
      //   style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
}
export default StartStream;
