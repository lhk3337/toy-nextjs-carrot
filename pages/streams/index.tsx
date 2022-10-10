import type { NextPage } from "next";
import Layout from "@components/layout";
import FixedButton from "@components/fixedCircleBtn";
import Link from "next/link";
import { Stream } from "@prisma/client";
import useSWR from "swr";

interface StreamsResponse {
  ok: boolean;
  streams: Stream[];
}

const Streams: NextPage = () => {
  const { data } = useSWR<StreamsResponse>("/api/streams");
  return (
    <Layout title="Live" hasTabBar>
      <div className="space-y-4 divide-y-[1px]">
        {data?.streams.map((stream) => (
          <Link key={stream.id} href={`/streams/${stream.id}`}>
            <a className="px-4 pt-4">
              <div className="aspect-video w-full rounded-md bg-slate-300" />
              <h1 className="mt-2 text-2xl font-bold text-gray-700">{stream.name}</h1>
            </a>
          </Link>
        ))}
        <FixedButton type="video" href="/streams/create" />
      </div>
    </Layout>
  );
};
export default Streams;
