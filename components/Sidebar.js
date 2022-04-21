import { Avatar } from "@mui/material";
import Image from "next/image";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { signOut, useSession } from "next-auth/react";

function Sidebar() {
  const { data: session } = useSession();

  return (
    <div className="col-span-1 mb-2">
      <div className="space-y-4 sticky top-20">
        {/* Top section*/}
        <section className="bg-white dark:bg-[#1D2226] md:rounded-md overflow-hidden relative flex flex-col items-center text-center dark:border-none">
          <div className="relative w-full h-16">
            <Image src="https://rb.gy/i26zak" layout="fill" priority />
          </div>
          <Avatar
            onClick={signOut}
            src={session?.user?.image}
            className="!h-16 !w-16 !border-4 !border-white dark:!border-[#1D2226] !absolute !top-8 !cursor-pointer"
          />

          {/* step 1 */}
          <div className="my-12 md:mb-0 w-full">
            <h4 className="font-semibold">{session?.user?.name}</h4>
            <p className="text-black/60 dark:text-white/75 text-xs">
              {session?.user?.email}
            </p>
          </div>

          {/* step 2 */}
          <div className="hidden md:block text-left dark:text-white/75 text-sm space-y-6 w-full p-6">
            <div className="font-semibold sidebarButton space-y-2">
              <div className="flex justify-between">
                <h4>Who viewed your profile</h4>
                <p className="text-blue-500">321</p>
              </div>
              <div className="flex justify-between">
                <h4>Views of your post</h4>
                <p className="text-blue-500">1,892</p>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs">Access exclusive tools & insights</h4>
              <div className="sidebarButton flex items-center">
                <div className="w-4 h-4 bg-gradient-to-tr from-yellow-700 to-yellow-200 inline-block rounded-sm"></div>
                <h4 className="dark:text-white font-semibold flex items-center ml-2">
                  Try Premium for free
                </h4>
              </div>

              <div className="sidebarButton flex items-center -ml-1">
                <BookmarkOutlinedIcon />
                <h4 className="dark:text-white font-semibold ml-1">My items</h4>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom section */}
        <section className="hidden md:flex flex-col bg-white dark:bg-[#1D2226] text-black/70 dark:text-white/75 rounded-md overflow-hidden space-y-4 sticky top-20 dark:border-none p-6 w-full">
          <p className="sidebarLink">Groups</p>
          <div className="flex items-center justify-between">
            <p className="sidebarLink">Events</p>
            <AddRoundedIcon className="!h-4" />
          </div>
          <p className="sidebarLink">Followed Hashtags</p>
          <div className="sidebarButton text-center">
            <h4 className="dark:text-white font-semibold text-sm">
              Discover More
            </h4>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Sidebar;
