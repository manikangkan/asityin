import { useSession, signOut } from "next-auth/react";

function HeaderLink({ Icon, text, feed, active, avatar, hidden }) {
  const { data: session } = useSession();

  return (
    <div
      className={`cursor-pointer flex flex-col justify-center items-center space-y-2 ${
        hidden && "hidden sm:inline-flex"
      } ${
        feed
          ? "text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white"
          : "text-gray-500 hover:text-gray-700"
      } ${active && "!text-black dark:!text-white"}`}
      onClick={() => avatar && signOut()}>
      {avatar ? (
        <Icon className="!h-7 !w-7 lg:!-mb-1" src={session?.user?.image} />
      ) : (
        <Icon />
      )}

      <h4
        className={`text-sm ${
          feed && "hidden lg:flex justify-center w-full mx-auto"
        }`}>
        {text}
      </h4>

      {/* {active && (
        <span className="hidden lg:inline-flex h-0.5 w-[calc(100%+20px)] bg-black dark:bg-white rounded-t-full" />
      )} */}
    </div>
  );
}

export default HeaderLink;
