import type { NextPage } from "next";
import Layout from "@components/layout";
import FixedButton from "@components/fixedCircleBtn";
import Link from "next/link";
import { Stream } from "@prisma/client";
import useSWR from "swr";
import { useState } from "react";
import { cls } from "@libs/client/utils";
import { useRouter } from "next/router";

import Skeleton from "react-loading-skeleton";
import { useInfiniteScroll } from "@libs/client/useInfinite";

interface StreamsResponse {
  ok: boolean;
  streams: Stream[];
  streamCount: Number;
}

const Streams: NextPage = () => {
  const [page, setPage] = useState(1);
  const onClick = (value: number) => {
    setPage(value);
  };
  const { data } = useSWR<StreamsResponse>(`/api/streams?page=${page}`);
  const router = useRouter();
  const scroll = useInfiniteScroll();

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
          {data?.streams.map((stream) => (
            <Link key={stream.id} href={`/streams/${stream.id}`}>
              <a className="block px-2 pt-8">
                <div className="aspect-video w-full rounded-md bg-slate-300" />
                <h1 className="mt-2 text-2xl font-bold text-gray-700">{stream.name}</h1>
              </a>
            </Link>
          ))}
          <FixedButton type="video" href="/streams/create" />
          <div className="grid w-full grid-cols-10 ">
            {Array.from(Array(data?.streamCount).keys()).map((value, i) => {
              const page = value + 1;
              return (
                <Link href={`/streams?page=${page}`} key={i}>
                  <a
                    className={cls(
                      "block cursor-pointer py-2 text-center",
                      router.query.page === String(page) ? "font-bold text-red-500" : ""
                    )}
                    onClick={() => onClick(page)}
                  >
                    {`${page}`}
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </Layout>
  );
};
export default Streams;
