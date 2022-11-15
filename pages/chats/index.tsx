import type { NextPage } from "next";

import Link from "next/link";
import useSWR from "swr";
import Layout from "@components/layout";
import { Chat, Message, Product, User } from "@prisma/client";
import Image from "next/image";
import useUser from "@libs/client/useUser";
import OtherUser from "@components/otherUser";

export interface ChatwithUser extends Chat {
  buyer: User;
  seller: User;
  product: Product;
  messages: Message[];
}
interface ChatResponse {
  ok: boolean;
  chatList: ChatwithUser[];
}

const Chats: NextPage = () => {
  const { data } = useSWR<ChatResponse>("/api/chats");
  const { user } = useUser();

  return (
    <Layout title="Chat" hasBottomTabBar>
      <div className="divide-y-[1px] pt-1">
        {data?.chatList.map((chat) => {
          return (
            <Link href={`chats/${chat.id}`} key={chat.id}>
              <a className="flex cursor-pointer items-center space-x-3 px-4 py-3">
                <OtherUser chatImg={chat} userId={user?.id} />
              </a>
            </Link>
          );
        })}
      </div>
    </Layout>
  );
};

export default Chats;
