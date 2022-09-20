import type { NextPage } from "next";
import Layout from "../../components/layout";

const Live: NextPage = () => {
  return (
    <Layout title="Live" hasTabBar>
      <div className="space-y-4 divide-y-[1px]">
        {Array(5)
          .fill("")
          .map((_, i) => (
            <div key={i} className="px-4 pt-4">
              <div className="aspect-video w-full rounded-md bg-slate-300" />
              <h1 className="mt-2 text-2xl font-bold text-gray-700">Galaxy S50</h1>
            </div>
          ))}
        <button className="fixed bottom-24 right-5 cursor-pointer rounded-full border-transparent bg-orange-400 p-4 text-white shadow-xl transition-colors hover:bg-orange-500">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            ></path>
          </svg>
        </button>
      </div>
    </Layout>
  );
};
export default Live;
