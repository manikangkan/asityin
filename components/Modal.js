import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/material/IconButton";
import { useSession } from "next-auth/react";
import { Avatar } from "@mui/material";
import Form from "./Form";
import { useRecoilValue } from "recoil";
import { getPostState } from "../atoms/postAtom";
import Post from "./Post";
import Image from "next/image";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const gifYouUp = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.15,
      ease: "easeOut",
    },
  },
};

const Modal = ({ handleClose, type }) => {
  const { data: session } = useSession();
  const post = useRecoilValue(getPostState);
  return (
    <Backdrop onClick={handleClose}>
      {type === "dropIn" && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="rounded-md flex flex-col justify-center bg-white dark:bg-[#1D2226] w-full max-w-lg mx-2"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit">
          <div className="flex items-center justify-between border-b dark:border-gray-700 p-2">
            <h4 className="font-semibold pl-4">Create a post</h4>
            <IconButton onClick={handleClose}>
              <CloseRoundedIcon className="h-6 w-6 dark:text-white/75" />
            </IconButton>
          </div>

          <div className="p-4 space-y-8">
            <div className="flex items-center space-x-2 font-semibold">
              <Avatar src={session?.user?.image} className="!h-10 !w-10" />
              <h6>{session?.user?.name}</h6>
            </div>

            <Form />
          </div>
        </motion.div>
      )}

      {type === "gifYouUp" && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="rounded-lg flex flex-col lg:flex-row bg-[#1D2226] max-w-5xl mx-6 overflow-hidden"
          variants={gifYouUp}
          initial="hidden"
          animate="visible"
          exit="exit">
          <motion.img
            src={post.photoUrl}
            alt="modal image"
            className="h-96 object-cover"
            onDoubleClick={handleClose}
          />
          <Post post={post} modalPost />
        </motion.div>
      )}
    </Backdrop>
  );
};

export default Modal;
