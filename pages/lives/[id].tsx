import type { NextPage } from "next";
import Layout from "../../components/layout";

const LiveDetail: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="space-y-5 py-10 px-4">
        <div className="aspect-video w-full rounded-md bg-slate-300" />
        <div className="mt-5">
          <h1 className="text-3xl font-bold">Galaxy S50</h1>
          <p className="mt-1 text-2xl">$140</p>
          <p className="my-2">
            My money&apos;s in that office, right? If she start giving me some bullshit about it ain&apos;t there, and
            we got to go someplace else and get it, I&apos;m gonna shoot you in the head then and there. Then I&apos;m
            gonna shoot that bitch in the kneecaps, find out where my goddamn money is. She gonna tell me too. Hey, look
            at me when I&apos;m talking to you, motherfucker. You listen: we go in there, and that ni**a Winston or
            anybody else is in there, you the first motherfucker to get shot. You understand?
          </p>
        </div>
        <div className="h-[50vh] space-y-6 overflow-y-scroll px-4 py-10  pb-14 scrollbar-hide">
          {Array(8)
            .fill("")
            .map((_, i) => (
              <>
                <div className="flex-start flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-slate-300" />
                  <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm  text-gray-500">
                    <p>Hi how much are you selling them for?</p>
                  </div>
                </div>
                <div className="flex-start flex flex-row-reverse items-center space-x-2 space-x-reverse">
                  <div className="h-8 w-8 rounded-full bg-slate-300" />
                  <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm  text-gray-500">
                    <p>I want ￦20,000</p>
                  </div>
                </div>
                <div className="flex-start flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-slate-300" />
                  <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm  text-gray-500">
                    <p>미쳤어</p>
                  </div>
                </div>
              </>
            ))}
        </div>
        <div className="fixed inset-x-0 bottom-3 mx-auto mt-2 w-full max-w-md">
          <div className="relative flex items-center">
            <input
              type="text"
              className="w-full appearance-none rounded-full  border border-gray-300  pr-12 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
              <button className="flex cursor-pointer appearance-none items-center rounded-full bg-orange-500 px-5 text-sm text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ">
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default LiveDetail;
