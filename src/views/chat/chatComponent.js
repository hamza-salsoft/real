import { useEffect, useMemo, useRef, useState } from "react";

// Icons
import { AiOutlineSend } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { PiDotsThreeOutlineThin, PiWarningCircleLight } from "react-icons/pi";
import { RiEditBoxLine } from "react-icons/ri";

// Api Imports
import {
  useCreateChatMutation,
  useGetAllChatMsgQuery,
  useGetAllUserQuery,
  useGetMyChatsQuery,
  useSendMessageMutation,
} from "./chatApiSlice";

// Emoji Mart
import Picker from "@emoji-mart/react";

// modal for searching new User
import { Modal } from "antd";
import { useSelector } from "react-redux";
import useSocket from "./useSocket";
import { UPLOADS_URL } from "../../config/constants";

// ChatBubble component
const ChatBubble = ({ message, isSent, myImage, selectedUserAvatar }) => (
  <div
    className={`flex ${isSent ? "justify-end" : "justify-start"} space-x-3 `}
  >
    {!isSent && (
      <div className="flex-shrink-0 ">
        <img
          src={selectedUserAvatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt0XikLERJ8A3kTEC6_j9lMiLFu7-27j_AyA&s"}
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    )}
    <div
      className={`max-w-72 sm:max-w-96 p-3 ml-28 rounded-lg font-semibold  ${
        isSent
          ? "bg-[#1870e3] text-white rounded-br-none "
          : "bg-gray-300 text-black rounded-bl-none"
      } whitespace-pre-wrap break-words`}
    >
      {message}
    </div>
    {isSent && (
      <div className="flex-shrink-0">
        <img
          src={myImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt0XikLERJ8A3kTEC6_j9lMiLFu7-27j_AyA&s"}
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    )}
  </div>
);

// Main Chat Component
const ChatComponent = () => {
  const user = useSelector((state) => state.user.userData);
  const { _id: userId ,image : myImage} = user;
  const [searchValue, setSearchValue] = useState("");
  const { data: myChats, refetch: refetchMyChats } = useGetMyChatsQuery();

  const [selectedChat, setSelectedChat] = useState(myChats ? myChats[0] : null); // comes from API

  const { messages: socketMsg, sendMessage } = useSocket({
    chatId: selectedChat?._id,
  });
  
  const { data: allUsers, refetch: refetchUsers } = useGetAllUserQuery();



  const filteredUsers = useMemo(() => {
    return allUsers?.filter((user) => {
      const searchQuery = searchValue.toLowerCase();
      return (
        user.firstName.toLowerCase().startsWith(searchQuery) ||
        user.lastName.toLowerCase().startsWith(searchQuery) ||
        user.email.toLowerCase().startsWith(searchQuery)
      );
    });
  }, [allUsers, searchValue]);

  // Create Chat Mutation
  const [createChat, { data: createdChatData }] = useCreateChatMutation();
  const [sendMsg, { data: sentMsg }] = useSendMessageMutation();

  const { data: allMsgs = [], refetch: refetchMessages ,isLoading} =
    useGetAllChatMsgQuery(selectedChat?._id);
  const [content, setContent] = useState("");

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const userAvatar =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt0XikLERJ8A3kTEC6_j9lMiLFu7-27j_AyA&s"; // comes from login users data

  const [isPickerVisible, setIsPickerVisible] = useState(false);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    refetchUsers();
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEmojiSelect = (emoji) => {
    setContent(content + " " + emoji.native);
  };

  const handleSendMessage = async () => {
    const newMessage = { chatId: selectedChat?._id, sender: user, content };
    sendMessage(newMessage);
    setContent("");
  };

  function searchUser(e) {
    const { value } = e.target;
    setSearchValue(value);
  }

  useEffect(() => {
    // Scroll to the last message
    if (messagesEndRef?.current) {
      messagesEndRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
    // Active the Input field
    inputRef?.current?.focus();

  }, [selectedChat, socketMsg, allMsgs]);

  useEffect(() => {
    refetchMyChats();
  }, [socketMsg]);


  async function createNewChat(id) {
    const {
      data: {
        status,
        data: {
          chat: { _id },
        },
      },
    } = await createChat(id);
    if (status) {
      let { data } = await refetchMyChats();
      
      setSelectedChat(data.find((chat) => chat._id === _id));
    }
  }


  return (
    <div className="flex flex-col lg:flex-row  items-center mt-5 md:mt-0 xl:mt-0 mx-5 md:gap-[2px] w-[97vw] lg:w-auto">
      <Modal
        className="w-full"
        title="Find User"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <input
          onChange={searchUser}
          className="w-full outline-none border-b-[1px] text-xl bg-white font-semibold border-black"
          placeholder="Type name to search"
          type="text"
          value={searchValue}
        />
        <div className="mt-4 overflow-y-auto h-[500px]">
          {filteredUsers?.length > 0  && searchValue ? (
            filteredUsers.map((user, i) => (
              <div
                className="flex items-center gap-5  lg:hover:bg-gray-200 rounded-md w-full p-2"
                onClick={() => {
                  createNewChat(user._id);
                  setIsModalOpen(false);
                }}
                key={i}
              >
                <img
                  className="rounded-full h-10 w-10"
                  src={user?.image ? UPLOADS_URL+user?.image :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt0XikLERJ8A3kTEC6_j9lMiLFu7-27j_AyA&s"}
                  alt="user"
                />
                <div className="flex flex-col gap-0">
                  <h1 className="whitespace-nowrap">
                    {`${user?.firstName + " " + user?.lastName} ${user?.isAdmin ? "(Admin)" : ""}`}
                  </h1>
                </div>
              </div>
            ))
          ) : (
            <>
             {searchValue &&  <p>No User Found!</p> }
            </>
          )}
        </div>
      </Modal>

      {/*  Side Bar */}
      <div className="bg-white text-black h-44 w-full md:w-[500px] lg:h-[500px]   lg:w-[300px]   xl:h-[450px] 2xl:h-[620px]  rounded-md overflow-hidden ">
        <div className="flex items-center justify-between px-2 my-1">
          <h1 className="text-2xl p-4">
            Chat (<span>{myChats?.length}</span>)
          </h1>
          <div className="flex items-center gap-2">
            <PiDotsThreeOutlineThin
              className="hover:text-gray-500 "
              size={24}
            />
            <RiEditBoxLine
              className="hover:text-gray-500 "
              onClick={showModal}
              size={30}
            />
          </div>
        </div>
        <div className="w-full h-[1px] bg-black"></div>
        {/* List of user */}
        <div className="flex lg:flex-col items-start ml-4 lg:ml-0 gap-3 lg:gap-3 lg:pb-44 pr-20 lg:pr-0  mt-4 overflow-y-auto h-full scrollbar-hidden ">
          {myChats?.length > 0 ? (
            myChats?.map((val, i) => {
              return (
                <div
                  className={`flex items-center gap-5 mx-2 lg:mx-0 pr-14 lg:pr-0 lg:hover:bg-gray-300 w-full p-2 rounded-lg ${
                    selectedChat?._id === val._id ? "bg-gray-300" : ""
                  }`}
                  onClick={() => {
                    setSelectedChat(val)
                    console.log("this is val",val)
                  }}
                  key={i}
                >
                  <img
                    className="rounded-full h-10 w-10"
                    src={val?.users[1]?.image? UPLOADS_URL+val.users[1].image :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt0XikLERJ8A3kTEC6_j9lMiLFu7-27j_AyA&s"}
                    alt="val"
                  />
                  <div className="flex flex-col gap-0">
                    <h1 className="whitespace-nowrap">{val?.name}</h1>
                    <p className="text-xs">{val.status}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* Chat Component */}
      <div className="flex flex-col w-full relative h-[700px] md:w-[500px] md:h-[600px]   lg:h-[500px]   lg:w-[600px]    xl:w-[700px]  xl:h-[450px] 2xl:h-[620px]  mx-auto bg-white text-black rounded-lg shadow-lg">
        {/* Chat Header */}

        {selectedChat && (
          <div className="bg-white text-black box-border  border-t-[0.1px] border-b-[0.1px] border-t-white border-b-black  p-4 rounded-t-lg flex justify-between items-center">
            <div className="font-semibold flex items-center  gap-2">
              <img
                className="rounded-full h-10 w-10"
                src={selectedChat?.users[1]?.image? UPLOADS_URL+selectedChat.users[1].image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt0XikLERJ8A3kTEC6_j9lMiLFu7-27j_AyA&s"}
                alt="avatar"
              />
              <div className="flex flex-col justify-center items-start gap-0">
                <p>{selectedChat.name}</p>

                {/* Code for active and inActive */}
                {/* <did className="text-xs flex items-center gap-1">
                  <div
                    className={`${
                      selectedUser.status === "active" ? "block" : "hidden"
                    } w-1 h-1 bg-green-400`}
                  ></div>{" "}
                  {selectedUser.status === "active" && "Active"}
                </did> */}
              </div>
            </div>

            <div className="flex justify-center items-center gap-5">
              {/* <FiPhone className="hover:text-gray-500" size={24} />
              <IoVideocamOutline className="hover:text-gray-500" size={24} /> */}
              <PiWarningCircleLight className="hover:text-gray-500" size={24} />
            </div>
          </div>
        )}

        {/* Messages Section */}
        <div className="flex-1 p-4 overflow-y-auto scrollbar-hidden space-y-4">
        {(allMsgs?.length > 0 || socketMsg?.length > 0) ? (
          [...allMsgs, ...socketMsg].map((val, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <ChatBubble
                message={val?.content}
                isSent={val?.sender?._id === userId}
                myImage={user?.image && UPLOADS_URL+myImage}
                selectedUserAvatar={selectedChat?.users[1]?.image && UPLOADS_URL+selectedChat.users[1].image }
              />
              <div
                className={`w-full mt-1 flex ${
                  val?.sender === "user" ? "justify-end" : "justify-start"
                } space-x-3 text-xs text-gray-500`}
              >
                {val?.timestamp}
              </div>
            </div>
          ))
        ) : <>
          {isLoading? 
          <div class="flex gap-2 justify-center items-center">
          <div class="w-8 h-8 border-4 border-t-4 border-[#1870e3] border-dashed rounded-full animate-spin"></div>
          <div className="font-semibold"> Loading Chats</div>
        </div>
              :
            <>
            {selectedChat ? <>
              <p className="text-center text-gray-500 text-xl">No conversation</p>
            </> : <>
              <p className="text-center text-gray-500 text-xl">Select Chat to Start the conversation</p>
            </>

            }
            </>
          }
          </> }

        <div ref={messagesEndRef} />
        </div>

        {/* Input Section */}
        {selectedChat && (
          <div className="p-4 bg-white text-black rounded-b-lg flex items-center space-x-4">
            <input
              ref={inputRef}
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type your message"
              className="w-full p-2 bg-white rounded-lg border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => {
                if (e.key === "Enter" && content.trim()) {
                  e.preventDefault();
                  handleSendMessage();
                  // sendMessage();
                }
              }}
            />

            {/* EMOJI PICKER */}
            <div className="relative">
              {isPickerVisible && (
                <div
                  className={`${
                    isPickerVisible ? "block" : "hidden"
                  } h-52 w-52 absolute bottom-72 right-24`}
                >
                  <MdCancel
                    size={24}
                    onClick={() => setIsPickerVisible(false)}
                  />
                  <Picker
                    data={createdChatData}
                    onEmojiSelect={handleEmojiSelect}
                  />
                </div>
              )}
              <BsEmojiSmile
                className="hover:text-gray-500 "
                onClick={() => setIsPickerVisible(!isPickerVisible)}
                size={30}
              />
            </div>

            {/* Send Icon */}
            <AiOutlineSend
              size={36}
              onClick={handleSendMessage}
              className="hover:text-gray-500 cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;