import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import { Product, User } from "@prisma/client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";

interface ProductWithUser extends Product {
  user: User;
}
interface ItemDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  isLiked: boolean;
  relatedProducts: Product[];
}

const ProductDetail: NextPage = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );

  const [toggleFev] = useMutation(`/api/products/${router.query.id}/fav`);
  const onFavClick = () => {
    if (!data) return;
    boundMutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
    // mutate("/api/users/me", (prev: any) => prev && { ok: !prev.ok }, false);
    toggleFev({}); // fav model에 레코드가 있으면 삭제 없으면 생성
  };
  return (
    <Layout canGoBack>
      <div className="py-10 px-4">
        <div className="mb-8">
          {!data ? (
            <Skeleton height={384} />
          ) : data?.product.imageUrl ? (
            <img src={data.product.imageUrl} className="h-96 rounded-md" />
          ) : (
            <div className="h-96 bg-slate-300" />
          )}
          {!data ? (
            <Skeleton height={50} className="mt-3" />
          ) : (
            <div className="flex cursor-pointer items-center space-x-3 border-b py-3">
              {data.product.user.avatar ? (
                <img className="h-10 w-10 rounded-full" src={data.product.user.avatar} />
              ) : (
                <div className="h-10 w-10 rounded-full bg-slate-300" />
              )}
              <div>
                <p className="text-sm">{data?.product?.user?.name}</p>
                <Link href={`/users/profiles/${data?.product?.user?.id}`}>
                  <a className="text-xs text-gray-500">View profile &rarr;</a>
                </Link>
              </div>
            </div>
          )}
          <div className="mt-5">
            {!data ? (
              <Skeleton height={40} count={4} />
            ) : (
              <>
                <h1 className="text-3xl font-bold">{data?.product?.name}</h1>
                <p className="mt-3 text-2xl">{data?.product?.price.toLocaleString("ko-KR")}원</p>
                <p className="my-6">{data?.product?.description}</p>
                <div className="my-4 flex items-center justify-between space-x-2 ">
                  <Button large text="Talk to seller" />
                  <button
                    onClick={onFavClick}
                    className={cls(
                      "rounded-md p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-500 hover:focus:outline-none hover:focus:ring-2 hover:focus:ring-gray-300 hover:focus:ring-offset-2",
                      data.isLiked
                        ? "text-[red] hover:bg-red-200 hover:text-[red] hover:focus:ring-red-500"
                        : "text-gray-400 hover:text-gray-400"
                    )}
                  >
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill={data.isLiked ? "red" : "none"}
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
              </>
            )}
          </div>
        </div>
        {!data ? (
          <Skeleton height={340} />
        ) : (
          <div>
            <h2 className="text-xl font-bold">Similar items</h2>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {data?.relatedProducts?.map((product) => (
                <Link href={`/products/${product?.id}`} key={product.id}>
                  <a>
                    <div className="mb-4 h-56 w-full bg-slate-300" />
                    <h3 className="-mb-1 text-gray-700">{product.name}</h3>
                    <p className="mt-2 text-sm font-medium text-gray-900">{product.price.toLocaleString("ko-KR")}원</p>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
