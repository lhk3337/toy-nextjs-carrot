import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import useSWR from "swr";
import { Review, User } from "@prisma/client";
import { cls } from "@libs/client/utils";
import Button from "@components/button";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface ReviewWithUser extends Review {
  createdBy: User;
}

interface ReviewResponse {
  ok: boolean;
  reviews: ReviewWithUser[];
}

interface logoutMutationType {
  ok: boolean;
}

const Profile: NextPage = () => {
  const { user } = useUser();
  const { data } = useSWR<ReviewResponse>("/api/reviews");
  const [logout, { loading, data: logoutData }] = useMutation<logoutMutationType>("/api/users/logout");
  const router = useRouter();
  const onLogoutClick = () => {
    if (!loading) {
      logout({});
    }
  };
  useEffect(() => {
    if (logoutData?.ok) {
      router.push("/enter");
    }
  }, [logoutData, router]);
  return (
    <Layout title="User" hasTabBar>
      <div className="px-4">
        <div className="flex items-center justify-between px-4 pt-4">
          <div className="mt-4 flex items-center space-x-3">
            <div className="h-16 w-16 rounded-full bg-slate-500" />
            <div className="flex flex-col">
              <span className="font-medium text-gray-900">{user?.name}</span>
              <Link href="/profile/edit">
                <a className="text-sm font-medium text-gray-500">Edit profile &rarr;</a>
              </Link>
            </div>
          </div>
          <Button text="Logout" small onClick={onLogoutClick} />
        </div>
        <div className="mt-10 flex justify-around">
          <Link href="/profile/sold">
            <a className="flex cursor-pointer flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white hover:bg-orange-600">
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <span className="mt-2 text-sm font-medium text-gray-500">Sold Detail</span>
            </a>
          </Link>
          <Link href="/profile/bought">
            <a className="flex cursor-pointer flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white hover:bg-orange-600">
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  ></path>
                </svg>
              </div>
              <span className="mt-2 text-sm font-medium text-gray-500">Buy Detail</span>
            </a>
          </Link>
          <Link href="/profile/loved">
            <a className="flex cursor-pointer flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white hover:bg-orange-600">
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <span className="mt-2 text-sm font-medium text-gray-500">Liked list</span>
            </a>
          </Link>
        </div>
        {data?.reviews?.map((review) => {
          return (
            <div className="mt-12" key={review.id}>
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-slate-500" />
                <div className="flex space-x-2">
                  <h4 className="text-sm font-bold text-gray-800">{review.createdBy.name}</h4>
                  <div className="flex items-center">
                    {Array(5)
                      .fill(1)
                      .map((_, star) => {
                        return (
                          <svg
                            key={star}
                            className={cls("h-5 w-5", review.score >= star ? "text-yellow-300" : "text-slate-300")}
                            /*
                            review.score가 4, 첫번째 star가 1이면 조건이 true 되어 text-yellow-300 출력
                            review.score가 4, 두번째 star가 2이면 조건이 true 되어 text-yellow-300 출력
                            review.score가 4, 세번째 star가 3이면 조건이 true 되어 text-yellow-300 출력
                            review.score가 4, 네번째 star가 4이면 조건이 true 되어 text-yellow-300 출력
                            review.score가 4, 다번째 star가 5이면 조건이 false 되어 text-slate-300 출력
                             */
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-900">
                <p>{review.review}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Profile;
