import type { NextPage } from "next";
import Layout from "@components/layout";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Stream } from "@prisma/client";
import Message from "@components/message";

interface StreamResponse {
  ok: true;
  stream: Stream;
}

const LiveDetail: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<StreamResponse>(router.query.id ? `/api/streams/${router.query.id}` : null);
  return (
    <Layout canGoBack>
      <div className="space-y-5 py-10 px-4">
        <div className="aspect-video w-full rounded-md bg-slate-300" />
        <div className="mt-5">
          <h1 className="text-3xl font-bold">{data?.stream?.name}</h1>
          <p className="mt-1 text-2xl">{data?.stream?.price.toLocaleString("ko-KR")}원</p>
          <p className="my-6 font-normal text-slate-700">{data?.stream?.description}</p>
        </div>
        <div className="h-[50vh] space-y-6 overflow-y-scroll px-4 py-10  pb-14 scrollbar-hide">
          <Message message="Hi how much are you selling them for?" />
          <Message message="I want ￦20,000" reversed />
          <Message message="미쳤어" />
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
