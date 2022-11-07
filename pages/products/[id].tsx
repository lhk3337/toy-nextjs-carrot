import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import { Chat, Product, User } from "@prisma/client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import Image from "next/image";
import React, { useEffect } from "react";
import useUser from "@libs/client/useUser";
import { useForm } from "react-hook-form";
import ProductStateText from "@components/productStateText";
import { isSelectDealState } from "@libs/client/isSelectDealState";

interface ProductWithUser extends Product {
  productSeller: User;
}
interface ItemDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  isLiked: boolean;
  chatId: number;
  relatedProducts: Product[];
}

interface DeletePost {
  ok: boolean;
  delPost: Product;
}

interface CreateChatResponse {
  ok: boolean;
  createChat: Chat;
}

const ProductDetail: NextPage = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { user } = useUser();
  const { register, setValue } = useForm();
  const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );
  const [deletepost, { loading, data: delPostData }] = useMutation<DeletePost>(
    `/api/products/${router.query.id}/delete`
  ); // product detail 삭제하기

  const [toggleFev] = useMutation(`/api/products/${router.query.id}/fav`); // 좋아요 클릭시 1 카운트

  const [chat, { loading: chatLoading, data: chatData }] = useMutation<CreateChatResponse>("/api/chats"); // chatting 만들기

  const [productState] = useMutation(`/api/products/${router.query.id}`); //상품 상태 변경하기

  const onFavClick = () => {
    if (!data) return;
    boundMutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
    // mutate("/api/users/me", (prev: any) => prev && { ok: !prev.ok }, false);
    toggleFev({}); // fav model에 레코드가 있으면 삭제 없으면 생성
  };

  const onDelPostClick = () => {
    if (window.confirm("삭제 하시겠습니까?") === true) {
      if (!loading) {
        deletepost({});
      }
    } else {
    }
  };
  const onCreateChatClick = () => {
    if (data?.product.productSellerId === user?.id) {
      alert("판매자이기 때문에 채팅을 할 수 없습니다.");
    } else {
      chat({ id: router.query.id });
    }
  };

  const onValid = (e: any) => {
    boundMutate((prev) => prev && { ...prev, product: { ...prev.product, sellState: e.target.value } }, false);
    productState({ sellState: e.target.value });
  };
  useEffect(() => {
    if (delPostData?.ok) {
      router.push("/");
    }
  }, [router, delPostData]);

  useEffect(() => {
    if (chatData?.ok) {
      router.push(`/chats/${chatData.createChat.id}`);
    }
  }, [router, chatData]);

  useEffect(() => {
    if (chatData?.ok === false) {
      router.push(`/chats/${data?.chatId}`);
    }
  }, [chatData?.ok, data?.chatId, router]);
  useEffect(() => {
    if (data?.product.sellState) setValue("sellState", data?.product.sellState);
  }, [data?.product, setValue]);

  return (
    <Layout canGoBack>
      <div className="py-10 px-4">
        <div className="mb-8">
          {!data ? (
            <Skeleton height={384} />
          ) : data?.product?.imageUrl ? (
            <div className="relative -z-10 pb-80">
              <Image
                src={data.product.imageUrl}
                layout="fill"
                className="rounded-sm object-contain"
                alt="detailProductImage"
                priority
              />
            </div>
          ) : (
            <div className="h-80 rounded-sm bg-slate-300" />
          )}
          {!data ? (
            <Skeleton height={50} className="mt-3" />
          ) : (
            <div className="flex  items-center justify-between border-b py-3 pr-3">
              <div className="flex cursor-pointer items-center space-x-3">
                {data?.product?.productSeller.avatar ? (
                  <div className="relative -z-10 h-10 w-10">
                    <Image
                      className="rounded-full"
                      layout="fill"
                      src={data.product.productSeller.avatar}
                      alt="avatar"
                      priority
                    />
                  </div>
                ) : (
                  <div className="h-10 w-10 rounded-full bg-slate-300" />
                )}
                <div>
                  <p className="text-sm">{data?.product?.productSeller?.name}</p>
                  <Link href={`/users/profiles/${data?.product?.productSeller?.id}`}>
                    <a className="text-xs text-gray-500">View profile &rarr;</a>
                  </Link>
                </div>
              </div>
              <div className=" right-2 ">
                {data?.product.productSellerId === user?.id ? (
                  <Button text="삭제" small onClick={onDelPostClick} alertColor />
                ) : null}
              </div>
            </div>
          )}
          <div className="mt-5">
            {!data ? (
              <Skeleton height={40} count={4} />
            ) : (
              <>
                {data?.product.productSellerId === user?.id ? (
                  <select {...register("sellState", { onChange: (e) => onValid(e) })} className="mb-3">
                    {isSelectDealState.map((el, i) => (
                      <option key={i} value={el.value}>
                        {el.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <ProductStateText data={data?.product.sellState} />
                )}
                <h1 className="text-3xl font-bold">{data?.product?.name}</h1>
                <p className="mt-3 text-2xl">{data?.product?.price.toLocaleString("ko-KR")}원</p>
                <p className="my-6">{data?.product?.description}</p>
                <div className="my-4 flex items-center justify-between space-x-2 ">
                  {data?.product.sellState === "sold" ? (
                    <Button sold large text="판매 완료 된 상품 입니다." />
                  ) : data.product.sellState === "reserve" ? (
                    <Button reserve large text="예약 중인 상품 입니다." />
                  ) : (
                    <Button large text="Talk to seller" onClick={onCreateChatClick} />
                  )}

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
                    {product.imageUrl ? (
                      <div className="relative -z-10 h-56">
                        <Image
                          className="object-cover"
                          layout="fill"
                          src={product.imageUrl}
                          alt="productImg"
                          priority
                        />
                      </div>
                    ) : (
                      <div className="mb-4 h-56 w-full bg-slate-300" />
                    )}
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
