import { Avatar, IconButton } from "@mui/material";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import { useRecoilState } from "recoil";
import { handlePostState, getPostState } from "../atoms/postAtom";
import { useState } from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import { modalState, modalTypeState } from "../atoms/modalAtom";
import TimeAgo from "timeago-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

function Post({ post, modalPost }) {
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [postState, setPostState] = useRecoilState(getPostState);
  const [showInput, setShowInput] = useState(false);
  const [liked, setLiked] = useState(false);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);

  const truncate = (string, n) =>
    string?.length > n ? string.substr(0, n - 1) : string;

  const deletePost = async () => {
    const response = await fetch(`/api/posts/${post._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    setHandlePost(true);
    setModalOpen(false);
  };

  return (
    <div
      className={`bg-white dark:bg-[#1D2226] ${
        modalPost ? "rounded-r-md" : "rounded-md"
      } py-4 dark:border-none`}>
      <div className="flex items-center justify-between px-4 cursor-pointer">
        <div className="flex items-center">
          <Avatar src={post.userImg} className="!h-10 !w-10 cursor-pointer" />
          <div className="ml-4">
            <h6 className="font-semibold hover:text-blue-500">
              {post.username}
            </h6>
            <TimeAgo
              datetime={post.createdAt}
              className="text-xs dark:text-white/75 opacity-80"
            />
          </div>
        </div>
        {modalPost ? (
          <IconButton onClick={() => setModalOpen(false)}>
            <CloseRoundedIcon className="dark:text-white/75 h-6 w-6" />
          </IconButton>
        ) : (
          <IconButton>
            <MoreHorizRoundedIcon className="dark:text-white/75 h-6 w-6" />
          </IconButton>
        )}
      </div>

      {post.input && (
        <div className="p-4 leading-relaxed">
          {modalPost || showInput ? (
            <p onClick={() => setShowInput(false)}>{post.input}</p>
          ) : (
            <p onClick={() => setShowInput(true)}>
              {truncate(post.input, 150)}
              {post.input.length > 150 && (
                <span className="font-semibold cursor-pointer text-gray-400">
                  ...see more
                </span>
              )}
            </p>
          )}
        </div>
      )}

      {post.photoUrl && !modalPost && (
        <Image
          src={post.photoUrl}
          alt="posted image"
          width={100}
          height={100}
          layout="responsive"
          objectFit="cover"
          className="cursor-pointer"
          onClick={() => {
            setModalOpen(true);
            setModalType("gifYouUp");
            setPostState(post);
          }}
        />
      )}

      <div className="flex justify-evenly items-center border-t border-gray-100 dark:border-gray-700 pt-4 mx-4 text-black/60 dark:text-white/75  text-sm">
        <button
          className={`postButton ${liked && "text-blue-500"}`}
          onClick={() => setLiked(!liked)}>
          {liked ? (
            <ThumbUpOffAltRoundedIcon className="" />
          ) : (
            <ThumbUpOffAltOutlinedIcon className="" />
          )}

          <h4>Like</h4>
        </button>{" "}
        <button className="postButton">
          <CommentOutlinedIcon />
          <h4>Comment</h4>
        </button>
        {session?.user?.email === post.email ? (
          <button
            className="postButton focus:text-red-400"
            onClick={deletePost}>
            <DeleteRoundedIcon />
            <h4>Delete post</h4>
          </button>
        ) : (
          <button className="postButton ">
            <ReplyRoundedIcon className="-scale-x-100" />
            <h4>Share</h4>
          </button>
        )}
      </div>
    </div>
  );
}

export default Post;
