import { Modal } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Delete } from "../config/api/delete";
import { POST } from "../config/constants";
import { ImageUrl } from "../config/functions";

const DeleteCommentModal = ({
  deleteCommentModal = false,
  setDeleteCommentModal,
  postId,
  commentId,
}) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);

  const handleCancel = () => {
    setDeleteCommentModal(false);
  };

  const handleDelete = async () => {
    try {
      const response = await Delete(
        `${POST.deleteComment}${postId}/${commentId}`,
        token
      );
      if (response?.status) {
        setDeleteCommentModal(false);
        navigate(`/non-masonic-community/post/${postId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        centered
        open={deleteCommentModal}
        footer={null}
        onCancel={() => setDeleteCommentModal(false)}
      >
        <div className="flex flex-col justify-center items-center bg-white py-4">
          <img src={ImageUrl("warning.png")} alt="warning" />
          <h3 className="font-nunito text-3xl text-customBlack max-desktop:text-xl text-center mt-4 font-normal">
            Delete Confirmation
          </h3>
          <h5 className="mt-2 mb-4 text-center font-euclid text-sm font-semibold text-black">
            Are you sure you want to delete this comment?
          </h5>
          <div className="flex flex-col items-center justify-center w-44 2xl:w-52">
            <button
              className="mainButton primaryButton mb-2 w-full"
              onClick={handleDelete}
            >
              YES
            </button>
            <button
              className="uppercase bg-[#243340] py-4 text-white rounded-lg text-sm font-bold max-sm:text-xs max-md:px-4  w-full"
              onClick={handleCancel}
            >
              no
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteCommentModal;
