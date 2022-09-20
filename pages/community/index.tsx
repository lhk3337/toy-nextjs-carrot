import type { NextPage } from "next";
import FixedButton from "../../components/fixedCircleBtn";
import Layout from "../../components/layout";

const Community: NextPage = () => {
  return (
    <Layout title="DN Life" hasTabBar>
      <div className="space-y-4 divide-y-[1px]">
        {Array(5)
          .fill("")
          .map((_, i) => (
            <div key={i} className="flex cursor-pointer flex-col items-start pt-4">
              <span className="ml-4 flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                동네질문
              </span>
              <div className="mt-2 px-4 text-gray-700">
                <span className="font-medium text-orange-500">Q.</span> What is the best mandu restaurant?
              </div>
              <div className="mt-5 flex w-full items-center justify-between px-4 text-xs text-gray-500">
                <span>니꼬</span>
                <span>18시간 전</span>
              </div>
              <div className="mt-3 flex w-full space-x-5 border-t px-4 py-2.5 text-gray-700">
                <span className="flex items-center space-x-2 text-sm">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>궁금해요 1</span>
                </span>
                <span className="flex items-center space-x-2 text-sm">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                  <span>답변 1</span>
                </span>
              </div>
            </div>
          ))}
        <FixedButton type="write" href="/community/write" />
      </div>
    </Layout>
  );
};

export default Community;
