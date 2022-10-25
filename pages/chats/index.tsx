import type { NextPage } from "next";

import Link from "next/link";
import useSWR from "swr";
import Layout from "@components/layout";
import { Chat, Message, User } from "@prisma/client";
import Image from "next/image";

interface ChatwithUser extends Chat {
  buyer: User;
  seller: User;
  messages: Message[];
}
interface ChatResponse {
  ok: boolean;
  chatList: ChatwithUser[];
}
const Chats: NextPage = () => {
  const { data } = useSWR<ChatResponse>("/api/chats");
  return (
    <Layout title="Chat" hasTabBar>
      <div className="divide-y-[1px] pt-1">
        {data?.chatList.map((chat) => {
          return (
            <Link href={`chats/${chat.id}`} key={chat.id}>
              <a className="flex cursor-pointer items-center space-x-3 px-4 py-3">
                {chat.buyer.avatar ? (
                  <div className="relative -z-10 h-8 w-8">
                    <Image className="rounded-full object-cover" layout="fill" src={chat.buyer.avatar} alt="avatar" />
                  </div>
                ) : (
                  <div className="h-10 w-10 rounded-full bg-slate-300" />
                )}

                <div>
                  <p className="text-gray-700">{chat.buyer.name}</p>
                  <p className="text-sm text-gray-500">{chat?.messages[chat.messages?.length - 1]?.message}</p>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </Layout>
  );
};

export default Chats;
