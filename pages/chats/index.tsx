import type { NextPage } from "next";

import Link from "next/link";
import useSWR from "swr";
import Layout from "@components/layout";
import { Chat, Message, User } from "@prisma/client";
import Image from "next/image";
import useUser from "@libs/client/useUser";

interface ChatwithUser extends Chat {
  buyer: User;
  seller: User;
  messages: Message[];
}
interface ChatResponse {
  ok: boolean;
  chatList: ChatwithUser[];
}

interface ChatImages {
  chatImg: ChatwithUser;
  userId: number | undefined;
}

const Chats: NextPage = () => {
  const { data } = useSWR<ChatResponse>("/api/chats");
  const { user } = useUser();

  const ChatImage = ({ chatImg, userId }: ChatImages): any => {
    if (userId === chatImg.sellerId && chatImg.buyer.avatar) {
      return (
        <Image className="rounded-full object-cover" src={chatImg.buyer.avatar} layout="fill" alt="avatar" priority />
      );
    } else if (userId === chatImg.buyerId && chatImg.seller.avatar) {
      return (
        <Image className="rounded-full object-cover" src={chatImg.seller.avatar} layout="fill" alt="avatar" priority />
      );
    }
  };

  return (
    <Layout title="Chat" hasTabBar>
      <div className="divide-y-[1px] pt-1">
        {data?.chatList.map((chat) => {
          return (
            <Link href={`chats/${chat.id}`} key={chat.id}>
              <a className="flex cursor-pointer items-center space-x-3 px-4 py-3">
                {chat.buyer.avatar ? (
                  <div className="relative -z-10 h-8 w-8">
                    <ChatImage chatImg={chat} userId={user?.id} />
                  </div>
                ) : (
                  <div className="h-10 w-10 rounded-full bg-slate-300" />
                )}

                <div>
                  <p className="text-gray-700">
                    {user?.id === chat.sellerId ? chat.buyer.name : user?.id === chat.buyerId ? chat.seller.name : ""}
                  </p>
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
