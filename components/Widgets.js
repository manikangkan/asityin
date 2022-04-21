import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import Image from "next/image";
import TimeAgo from "timeago-react";

function Widgets({ articles }) {
  return (
    <div className="hidden xl:block col-span-1">
      <div className="space-y-4 sticky top-20">
        {/* News */}
        <div className="bg-white dark:bg-[#1D2226] py-4 rounded-lg overflow-hidden dark:border-none sticky top-20">
          {/* top */}
          <div className="flex items-center justify-between font-semibold px-4 mb-2">
            <h4>LinkedIn News</h4>
            <InfoRoundedIcon className="h-4 w-4" />
          </div>
          {/* articles */}
          {articles.slice(0, 5).map((article) => (
            <article
              className="flex items-center w-full cursor-pointer hover:bg-gray-100 dark:hover:bg-black/20 space-y-4 p-4"
              key={article.url}>
              <div className="flex items-center space-x-4">
                <FiberManualRecordRoundedIcon className="!h-2 !w-2" />
                <div>
                  <h5 className="font-medium text-sm w-1/3 truncate">
                    {article.title}
                  </h5>
                  <TimeAgo
                    datetime={article.publishedAt}
                    className="text-xs dark:text-white/75 opacity-80"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
        {/* Ads */}
        <div className="bg-white dark:bg-[#1D2226] h-64 rounded-md dark:border-none overflow-hidden relative">
          <Image
            src="https://rb.gy/kbfeaa"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default Widgets;
