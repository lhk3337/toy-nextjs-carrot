import type { NextPage } from "next";
import Layout from "@components/layout";
import FixedButton from "@components/fixedCircleBtn";
import Link from "next/link";
const Live: NextPage = () => {
  return (
    <Layout title="Live" hasTabBar>
      <div className="space-y-4 divide-y-[1px]">
        {Array(5)
          .fill("")
          .map((_, i) => (
            <Link key={i} href={`/streams/${i}`}>
              <a className="px-4 pt-4">
                <div className="aspect-video w-full rounded-md bg-slate-300" />
                <h1 className="mt-2 text-2xl font-bold text-gray-700">Galaxy S50</h1>
              </a>
            </Link>
          ))}
        <FixedButton type="video" href="/streams/create" />
      </div>
    </Layout>
  );
};
export default Live;
