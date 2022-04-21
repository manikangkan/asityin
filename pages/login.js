import Image from "next/image";
import HeaderLink from "../components/HeaderLink";
import ExploreIcon from "@mui/icons-material/Explore";
import GroupIcon from "@mui/icons-material/Group";
import OndemandVideoSharpIcon from "@mui/icons-material/OndemandVideoSharp";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Head from "next/head";
import { getProviders, signIn } from "next-auth/react";

function Login({ providers }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        <title>AsityIn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-white">
        <div className="max-w-6xl grid grid-cols-3 mx-auto px-12 xl:px-0">
          {/* logo */}
          <Image
            src="https://rb.gy/vtbzlp"
            width={142}
            height={72}
            layout="fixed"
            objectFit="contain"
            className="col-span-1"
          />
          {/* links */}
          <div className="col-span-2 w-full flex justify-end">
            <div className="flex items-center justify-end lg:justify-between lg:w-full xl:w-3/4">
              <div className="hidden lg:flex justify-around items-center w-3/4">
                <HeaderLink Icon={ExploreIcon} text="Discover" />
                <HeaderLink Icon={GroupIcon} text="People" />
                <HeaderLink Icon={OndemandVideoSharpIcon} text="Learning" />
                <HeaderLink Icon={BusinessCenterIcon} text="Jobs" />
              </div>
              <div>
                {Object.values(providers).map((provider) => (
                  <div key={provider.name}>
                    <button
                      className="text-blue-700 font-semibold rounded-full border border-blue-700 px-6 py-2 transition-all hover:bg-blue-700 hover:text-white"
                      onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
                      Sign in
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="lg:grid grid-cols-2 max-w-6xl mx-auto mt-32 lg:px-12 xl:px-0">
        <div className="col-span-1 space-y-16 w-3/4 mx-auto lg:mx-0">
          <h1 className="text-5xl text-amber-800/80 text-center lg:text-left">
            Welcome to your professional community
          </h1>
          <div className="space-y-2">
            <div className="intent">
              <h2 className="font-semibold">Search for a job</h2>
              <ArrowForwardIosRoundedIcon className="!text-sm" />
            </div>
            <div className="intent">
              <h2 className="font-semibold">Find a person you know</h2>
              <ArrowForwardIosRoundedIcon className="!text-sm" />
            </div>
            <div className="intent">
              <h2 className="font-semibold">Learn a new skill</h2>
              <ArrowForwardIosRoundedIcon className="!text-sm" />
            </div>
          </div>
        </div>

        <div className="relative w-full col-span-1">
          <Image src="https://rb.gy/vkzpzt" layout="fill" priority />
        </div>
      </main>
      <p className="text-center mt-64">
        LinkedIn 2.0 developed by{" "}
        <a
          href="https://www.instagram.com/themanikangkandas/"
          className="text-blue-700 font-semibold">
          Manikangkan Das
        </a>
      </p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default Login;
