import type { NextPage } from "next";
import Layout from "../../components/layout";
const ChatDetail: NextPage = () => {
  return (
    <Layout canGoBack title="Steve">
      <div className="space-y-6 px-4 pt-8 pb-16">
        {Array(10)
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
        <div className="fixed inset-x-0 bottom-2 mx-auto w-full max-w-md">
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

export default ChatDetail;
