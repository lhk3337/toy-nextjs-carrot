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
import { Chat, Product, User } from "@prisma/client";
import React, { useEffect, useRef } from "react";
import Button from "@components/button";
import { isSelectDealState } from "@libs/client/isSelectDealState";

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
  product: Product;
  messages: ChatMessage[];
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

  const [sendMessage, { loading, data: sendMessageData }] = useMutation<any>(`/api/chats/${router.query.id}/message`);
  const [productState] = useMutation(`/api/chats/${router.query.id}`);

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
    router.push("/review");
  };

  const onDealStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    productState({ sellState: e.target.value });
  };

  useEffect(() => {
    if (data?.chat.product.sellState) setValue("sellState", data.chat.product.sellState);
  }, [data?.chat.product, setValue]);
  return (
    <Layout
      canGoBack
      title={
        user?.id === data?.chat.sellerId
          ? data?.chat.buyer.name
          : user?.id === data?.chat.buyerId
          ? data?.chat.seller.name
          : ""
      }
    >
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
            </div>
            {user?.id === data?.chat.sellerId ? (
              <select
                {...register("sellState", { onChange: (e) => onDealStateChange(e) })}
                className="mt-3 ml-4 rounded-lg border border-gray-300 bg-gray-50 text-sm"
              >
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
        </div>
      )}
    </Layout>
  );
};

export default ChatDetail;
