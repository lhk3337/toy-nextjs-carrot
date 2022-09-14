import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/layout";

const Chats: NextPage = () => {
  return (
    <Layout title="Chat" hasTabBar>
      <div className="divide-y-[1px] pt-1">
        {Array(5)
          .fill("")
          .map((_, i) => (
            <Link key={i} href={`chats/${i}`}>
              <a className="flex cursor-pointer items-center space-x-3 px-4 py-3">
                <div className="h-10 w-10 rounded-full bg-slate-300" />
                <div>
                  <p className="text-gray-700">Steve Jebs</p>
                  <p className="text-sm text-gray-500">See you tomorrow in the corner at 2pm!</p>
                </div>
              </a>
            </Link>
          ))}
      </div>
    </Layout>
  );
};

export default Chats;
