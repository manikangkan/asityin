import Image from "next/image";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HeaderLink from "./HeaderLink";
import GroupIcon from "@mui/icons-material/Group";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

function Header() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme, theme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  console.log("Current theme is", theme);

  return (
    <header className="sticky top-0 z-40 bg-white/60 dark:bg-[#1D2226]/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto grid grid-cols-3 py-2 px-4 xl:px-0">
        {/* Left */}
        <div className="col-span-1 flex items-center space-x-2">
          {mounted && (
            <>
              {resolvedTheme === "dark" ? (
                <Image
                  src="https://rb.gy/bizvqj"
                  width={40}
                  height={40}
                  className="flex-shrink-0"
                />
              ) : (
                <Image
                  src="https://rb.gy/dpmd9s"
                  width={45}
                  height={45}
                  className="flex-shrink-0"
                />
              )}
            </>
          )}

          <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 py-2 px-4 rounded-md md:w-3/4">
            <SearchRoundedIcon className="dark:text-white/50" />
            <input
              type="text"
              placeholder="Search"
              className="hidden md:inline-flex bg-transparent text-sm focus:outline-none placeholder-black/50 dark:placeholder-white/50 flex-grow"
            />
          </div>
        </div>

        {/* Right */}
        <div className="col-span-2 flex justify-end">
          <div className="flex items-center justify-between w-3/4">
            <HeaderLink Icon={HomeRoundedIcon} text="Home" feed active />
            <HeaderLink Icon={GroupIcon} text="My Network" feed />
            <HeaderLink Icon={BusinessCenterIcon} text="Jobs" feed hidden />
            <HeaderLink Icon={ChatIcon} text="Messaging" feed hidden />
            <HeaderLink
              Icon={NotificationsIcon}
              text="Notifications"
              feed
              hidden
            />
            <HeaderLink Icon={Avatar} text="Me" feed avatar />
            <HeaderLink Icon={AppsOutlinedIcon} text="Work" feed hidden />

            {/* Dark mode toggle */}
            {mounted && (
              <div
                className={`bg-gray-600 flex items-center px-0.5 rounded-full h-6 w-12 cursor-pointer flex-shrink-0 relative ${
                  resolvedTheme === "dark" ? "justify-end" : "justify-start"
                }`}
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }>
                <span className="absolute left-0">🌜</span>
                <motion.div
                  className="w-5 h-5 bg-white rounded-full z-40"
                  layout
                  transition={spring}
                />

                <span className="absolute right-0.5">🌞</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
