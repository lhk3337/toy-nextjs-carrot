import type { NextPage } from "next";
import Layout from "@components/layout";
import FixedButton from "@components/fixedCircleBtn";
import Link from "next/link";
import { Stream } from "@prisma/client";

import useSWRInfinite from "swr/infinite";
import { useEffect } from "react";

import { useInfiniteScroll } from "@libs/client/useInfinite";

interface StreamsResponse {
  ok: boolean;
  streams: Stream[];
  streamCount: number;
}

const getKey = (pageIndex: number, previousPageData: StreamsResponse) => {
  if (pageIndex === 0) return `/api/streams?page=1`;
  if (pageIndex + 1 > previousPageData.streamCount) return null;
  return `/api/streams?page=${pageIndex + 1}`;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Streams: NextPage = () => {
  const page = useInfiniteScroll();

  const { data, setSize } = useSWRInfinite<StreamsResponse>(getKey, fetcher);
  useEffect(() => {
    setSize(page);
  }, [setSize, page]);

  const streams = data
    ?.map((value) => value.streams)
    .reduce(function (acc, cur) {
      return acc.concat(cur);
    });

  return (
    <Layout title="Live" hasTabBar>
      {!data ? (
        <>
          {Array.from(Array(10).keys()).map((_, i) => {
            return <div key={i} className="mt-5 h-[20vh] w-full rounded-md bg-[#EBEBEB] px-2 pt-8" />;
          })}
        </>
      ) : (
        <div className="space-y-4 divide-y-[1px]">
          {streams?.map((stream) => (
            <Link key={stream.id} href={`/streams/${stream.id}`}>
              <a className="block px-2 pt-8">
                <div className="aspect-video w-full rounded-md bg-slate-300" />
                <h1 className="mt-2 text-2xl font-bold text-gray-700">{stream.name}</h1>
              </a>
            </Link>
          ))}
          <FixedButton type="video" href="/streams/create" />
        </div>
      )}
    </Layout>
  );
};
export default Streams;
