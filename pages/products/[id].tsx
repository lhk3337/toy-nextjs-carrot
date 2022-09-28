import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
const ItemDetail: NextPage = () => {
  const router = useRouter();

  const { data } = useSWR(router.query.id ? `/api/products/${router.query.id}` : null);
  return (
    <Layout canGoBack>
      <div className="py-10 px-4">
        <div className="mb-8">
          <div className="h-96 bg-slate-300" />
          <div className="flex cursor-pointer items-center space-x-3 border-b py-3">
            <div className="h-10 w-10 rounded-full bg-slate-300" />
            <div>
              <p className="text-sm">{data?.product?.user?.name}</p>
              <Link href={`/users/profiles/${data?.product?.user?.id}`}>
                <a className="text-xs text-gray-500">View profile &rarr;</a>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold">{data?.product?.name}</h1>
            <p className="mt-3 text-2xl">{data?.product?.price.toLocaleString("ko-KR")}원</p>
            <p className="my-6">{data?.product?.description}</p>
            <div className="my-4 flex items-center justify-between space-x-2 ">
              <Button large text="Talk to seller" />
              <button className=" rounded-md p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-500 hover:focus:outline-none hover:focus:ring-2 hover:focus:ring-gray-300 hover:focus:ring-offset-2">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold">Similar items</h2>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <div key={i}>
                <div className="mb-4 h-56 w-full bg-slate-300" />
                <h3 className="-mb-1 text-gray-700">Galaxy S60</h3>
                <p className="text-sm font-medium text-gray-900">$6</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
