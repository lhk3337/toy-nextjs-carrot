import type { NextPage } from "next";
import Layout from "@components/layout";
import useSWR from "swr";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { MessageForm } from "@pages/streams/[id]";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import Items from "@components/items";
import Message from "@components/message";
import { Chat, Product, Review, User } from "@prisma/client";
import React, { useEffect, useRef } from "react";
import Button from "@components/button";
import { isSelectDealState } from "@libs/client/isSelectDealState";
import { ProductWithCount } from "..";

interface ChatMessage {
  message: string;
  id: number;
  createdAt: Date;
  user: {
    avatar?: string;
    id: number;
  };
}
interface ChatWithMessage extends Chat {
  buyer: User;
  seller: User;
  product: ProductWithCount;
  messages: ChatMessage[];
  review: Review;
}
interface ChatResponse {
  ok: true;
  chat: ChatWithMessage;
}

interface ChatForm extends MessageForm {
  sellState: string;
}

const ChatDetail: NextPage = () => {
  const router = useRouter();
  const { user } = useUser();

  const { data, mutate } = useSWR<ChatResponse>(router.query.id ? `/api/chats/${router.query.id}` : null, {
    refreshInterval: 1000,
  });

  const [sendMessage, { loading, data: sendMessageData }] = useMutation(`/api/chats/${router.query.id}/message`);
  const [productState] = useMutation(`/api/chats/${router.query.id}`);

  const [review, { loading: reviewLoading, data: reviewData }] = useMutation("/api/reviews");
  // 리뷰쓰기 버튼 누르면 review db 생성

  const { register, handleSubmit, reset, setValue } = useForm<ChatForm>();
  const onValid = (form: MessageForm) => {
    if (loading) return;
    reset();
    mutate(
      (prev) =>
        prev && {
          ...prev,
          chat: {
            ...prev.chat,
            messages: [
              ...prev.chat.messages,
              {
                id: Date.now(),
                createdAt: Date.now(),
                message: form.message,
                user: { ...user },
              },
            ],
          } as any,
        },
      false
    );
    sendMessage(form);
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef?.current?.scrollIntoView();
  });
  const onReviewClick = () => {
    review({ chatId: data?.chat.id });
  };

  const onDealStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    productState({ sellState: e.target.value });
  };

  useEffect(() => {
    if (data?.chat.product.sellState) setValue("sellState", data.chat.product.sellState);
  }, [data?.chat.product, setValue]);

  useEffect(() => {
    if (reviewData?.ok) {
      router.push(`/reviews/${reviewData.reviews.id}`);
    }
  });
  // 해당 review 데이터가 없을 경우, review db를 생성이 될때 이때 만들어진 review id값을 가져옴

  useEffect(() => {
    if (reviewData?.ok === false) {
      router.push(`/reviews/${data?.chat.review.id}`);
    }
  });
  const chatUser = () => {
    if (!user?.id || !data?.chat.sellerId || !data?.chat.buyerId) {
      return "Loading";
    } else {
      if (user?.id === data?.chat.sellerId) {
        return `with ${data?.chat.buyer.name}`;
      }

      if (user?.id === data?.chat.buyerId) {
        return `with ${data?.chat.seller.name}`;
      }
    }
  };
  // 해당 review 데이터가 있다면 chat와 relation된 review id를 가져 옴
  return (
    <Layout canGoBack title={chatUser()} seoTitle={`chat  ${chatUser()}  | Carrot Market`}>
      {!data ? (
        <div className=" mt-5 h-[90vh] w-full  rounded-lg bg-slate-200" />
      ) : (
        <div className="space-y-6 px-4 pt-2 pb-8">
          <div className="flex flex-col items-start">
            <div className="flex w-full items-center justify-between">
              <Items {...data?.chat.product} id={0} />
              {data?.chat.product.productBuyerId === user?.id && (
                <Button text="리뷰남기기" reviewBtnStyle small onClick={onReviewClick} />
              )}
              {/* 구매 상태가 완료 되면 리뷰 남기기 버튼 생성 */}
            </div>
            {user?.id === data?.chat.sellerId ? (
              <select
                {...register("sellState", { onChange: (e) => onDealStateChange(e) })}
                className="mt-3 ml-4 rounded-lg border border-gray-300 bg-gray-50 text-sm"
              >
                {/* 판매자만 판매 상태를 설정 할 수 있음 */}
                {isSelectDealState.map((el, i) => (
                  <option key={i} value={el.value}>
                    {el.name}
                  </option>
                ))}
              </select>
            ) : (
              ""
            )}
          </div>
          <div className="h-[73vh] space-y-4 overflow-y-scroll px-4 pt-2  scrollbar-hide">
            {data?.chat.messages.map((message) => (
              <div key={message.id} ref={scrollRef}>
                <Message
                  message={message.message}
                  sendTime={message.createdAt}
                  img={message.user.avatar}
                  reversed={message.user.id === user?.id}
                />
              </div>
            ))}
          </div>
          {/* 판매 상태가 완료 되면 메시지창 비활성화 */}
          {data.chat.product.sellState !== "sold" && (
            <div className="fixed inset-x-0 bottom-2 mx-auto w-full max-w-md">
              <form onSubmit={handleSubmit(onValid)} className="relative flex items-center">
                <input
                  {...register("message", { required: true })}
                  type="text"
                  className="w-full appearance-none rounded-full  border border-gray-300  pr-12 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
                />
                <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                  <button className="flex cursor-pointer appearance-none items-center rounded-full bg-orange-500 px-5 text-sm text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ">
                    &rarr;
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};
// chat detail page
export default ChatDetail;
