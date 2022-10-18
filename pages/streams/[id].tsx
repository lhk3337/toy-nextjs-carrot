import type { NextPage } from "next";
import Layout from "@components/layout";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import { Stream } from "@prisma/client";
import Message from "@components/message";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { useEffect, useRef } from "react";

interface StreamResponse {
  ok: true;
  stream: StreamWithMessage;
}

interface MessageForm {
  message: string;
}

interface StreamMessage {
  message: string;
  id: number;
  user: {
    avatar?: string;
    id: number;
  };
}

interface StreamWithMessage extends Stream {
  messages: StreamMessage[];
}

const StreamDetail: NextPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const { data, mutate } = useSWR<StreamResponse>(router.query.id ? `/api/streams/${router.query.id}` : null, {
    refreshInterval: 1000,
  });
  const [sendMessage, { loading, data: sendMessageData }] = useMutation(`/api/streams/${router.query.id}/message`);
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const onValid = (form: MessageForm) => {
    if (loading) return;
    reset();
    mutate(
      (prev) =>
        prev && {
          ...prev,
          stream: {
            ...prev.stream,
            messages: [...prev.stream.messages, { id: Date.now(), message: form.message, user: { ...user } }],
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
  return (
    <Layout canGoBack>
      <div className="space-y-5 py-6 px-4 pb-10">
        <div className="aspect-video w-full rounded-md bg-slate-300" />
        <div className="mt-5">
          <h1 className="text-3xl font-bold">{data?.stream?.name}</h1>
          <p className="mt-1 text-2xl">{data?.stream?.price.toLocaleString("ko-KR")}원</p>
          <p className="my-6 font-normal text-slate-700">{data?.stream?.description}</p>
        </div>
        <div className="h-[40vh] space-y-4 overflow-y-scroll px-4 py-8 scrollbar-hide">
          {data?.stream.messages.map((message) => (
            <div key={message.id} ref={scrollRef}>
              <Message message={message.message} img={message.user.avatar} reversed={message.user.id === user?.id} />
            </div>
          ))}
        </div>
        <div className="fixed inset-x-0 bottom-3 mx-auto mt-2 w-full max-w-md">
          <form onSubmit={handleSubmit(onValid)} className="relative flex items-center">
            <input
              {...register("message", { required: true })}
              type="text"
              className="w-full appearance-none rounded-full  border border-gray-300  pr-12 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
              <button className="flex cursor-pointer appearance-none items-center rounded-full bg-orange-500 px-5 text-sm text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                &rarr;
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default StreamDetail;
