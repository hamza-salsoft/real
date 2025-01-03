import { Avatar, Divider, Modal } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Get } from "../config/api/get";
import { POST, UPLOADS_URL } from "../config/constants";
// import { ImageUrl } from "../config/helper";
import { MdDelete } from "react-icons/md";
import { formatDateTime, ImageUrl } from "../config/functions";
import DeleteCommentModal from "./deleteCommentModal";
import { comment } from "postcss";

const CustomRow = ({ fullName, image, date, comment, postId, commentId }) => {
  const [deleteCommentModal, setDeleteCommentModal] = useState(false);
  return (
    <>
      <div className="flex flex-col items-start justify-center">
        <Divider />
        <div className="flex justify-between items-center w-full">
          <div className="flex justify-center mr-2">
            <Avatar
              size={40}
              src={!image ? ImageUrl("avatar.png") : UPLOADS_URL + "/" + image}
              className="mr-2 self-center"
            />
            <div className="flex flex-col items-start justify-center">
              <h5 className="uppercase font-nunito text-sm max-sm:text-xs font-bold text-black">
                {fullName}
              </h5>
              <p className="font-nunito text-sm max-sm:text-xs text-black">
                {comment}
              </p>
              <p className="font-nunito text-xs max-sm:text-[10px] text-gray-400">
                {formatDateTime(date)}
              </p>
            </div>
          </div>
          <MdDelete
            size={28}
            className="self-center text-red-500 cursor-pointer"
            onClick={() => setDeleteCommentModal(true)}
          />
        </div>
      </div>
      {deleteCommentModal && (
        <DeleteCommentModal
          deleteCommentModal={deleteCommentModal}
          setDeleteCommentModal={setDeleteCommentModal}
          postId={postId}
          commentId={commentId}
        />
      )}
    </>
  );
};

const CommentModal = ({ commentModal = false, setCommentModal, postId }) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const getComments = async () => {
    try {
      setLoading(true);
      const response = await Get(`${POST.getAllCommentsById}${postId}`, token);
      if (response?.status) {
        setComments(response?.data.comments);
        console.log(response?.data.comments);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect((state) => {
    getComments();
  }, []);
  return (
    <div>
      <Modal
        centered
        open={commentModal}
        footer={null}
        onCancel={() => setCommentModal(false)}
      >
        <h3 className="font-nunito text-2xl text-black max-sm:text-lg text-center mt-4">
          Comments
        </h3>
        {loading ? (
          <h3 className="font-nunito text-xl text-black max-sm:text-sm text-center mt-4">
            loading...
          </h3>
        ) : comments.length > 0 ? (
          <div className="overflow-auto h-[200px]">
            {comments?.map((comment) => (
              <CustomRow
                image={comment.image}
                comment={comment.text}
                fullName={comment.author.fullName}
                date={comment.createdAt}
                commentId={comment._id}
                postId={postId}
              />
            ))}
          </div>
        ) : (
          <h3 className="font-nunito text-xl text-black max-sm:text-sm text-center mt-4">
            No Comments Yet
          </h3>
        )}
      </Modal>
    </div>
  );
};

export default CommentModal;
