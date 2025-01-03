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
import { ImageUrl } from "../config/functions";

const CustomRow = ({ fullName, image }) => {
  return (
    <div className="flex flex-col items-start justify-center">
      <Divider />
      <div className="flex justify-start w-full mr-2">
        <Avatar
          size={40}
          src={!image ? ImageUrl("avatar.png") : UPLOADS_URL + "/" + image}
          className="mr-2 self-center"
        />
        <div className="flex flex-col items-start justify-center">
          <h5 className="uppercase font-nunito text-sm max-sm:text-xs font-bold text-black">
            {fullName}
          </h5>
        </div>
      </div>
    </div>
  );
};

const LikeModal = ({ likesModal = false, setLikesModal, postId }) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getLikes = async () => {
    try {
      setLoading(true);
      const response = await Get(`${POST.getAllLikesById}${postId}`, token);
      if (response?.status) {
        setLikes(response?.data.likes);
        console.log(response?.data.likes);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect((state) => {
    getLikes();
  }, []);
  return (
    <div>
      <Modal
        centered
        open={likesModal}
        footer={null}
        onCancel={() => setLikesModal(false)}
      >
        <h3 className="font-nunito text-2xl text-black max-sm:text-lg text-center mt-4">
          Likes
        </h3>
        {loading ? (
          <h3 className="font-nunito text-xl text-black max-sm:text-sm text-center mt-4">
            loading...
          </h3>
        ) : likes.length > 0 ? (
          <div className="overflow-auto h-[200px]">
            {likes?.map((like) => (
              <CustomRow image={like.image} fullName={like.fullName} />
            ))}
          </div>
        ) : (
          <h3 className="font-nunito text-xl text-black max-sm:text-sm text-center mt-4">
            No Likes Yet
          </h3>
        )}
      </Modal>
    </div>
  );
};

export default LikeModal;
