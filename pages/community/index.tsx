import type { NextPage, NextPageContext } from "next";
import Link from "next/link";
import FixedButton from "@components/fixedCircleBtn";
import Layout from "@components/layout";
import useSWR from "swr";
import { Post, User } from "@prisma/client";
import useCoords from "@libs/client/useCoords";
import Time from "@components/time";
import client from "@libs/server/client";
interface PostwithUser extends Post {
  user: User;
  _count: {
    wonderings: number;
    answers: number;
  };
}

interface PostResponse {
  ok: boolean;
  posts: PostwithUser[];
}

const Community: NextPage<PostResponse> = ({ posts }) => {
  // const { latitude, longitude } = useCoords();
  // const { data } = useSWR<PostResponse>(
  //   latitude && longitude ? `/api/posts?latitude=${latitude}&longitude=${longitude}` : null
  // );
  return (
    <Layout title="DN Life" hasBottomTabBar seoTitle="DN Life | Carrot Market">
      <div className="space-y-4 divide-y-[1px]">
        {posts?.map((post) => {
          const createTime = new Date(post.createdAt);

          return (
            <Link key={post.id} href={`/community/${post.id}`}>
              <a className="flex cursor-pointer flex-col items-start pt-4">
                <span className="ml-4 flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                  동네질문
                </span>
                <div className="mt-2 px-4 text-gray-700">
                  <span className="font-medium text-orange-500">Q.</span> {post.question}
                </div>
                <div className="mt-5 flex w-full items-center justify-between px-4 text-xs text-gray-500">
                  <span>{post.user.name}</span>
                  <Time time={createTime} />
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
                    <span>궁금해요 {post._count?.wonderings}</span>
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
                    <span>답변 {post._count?.answers}</span>
                  </span>
                </div>
              </a>
            </Link>
          );
        })}
        <FixedButton type="write" href="/community/write" />
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const posts = await client.post.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      _count: {
        select: {
          wonderings: true,
          answers: true,
        },
      },
    },
  });
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
    revalidate: 10,
  };
}

export default Community;
