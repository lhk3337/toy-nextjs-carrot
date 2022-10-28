import { ChatwithUser } from "@pages/chats/index";
import Image from "next/image";
import { useState } from "react";

interface ChatImages {
  chatImg: ChatwithUser;
  userId: number | undefined;
}
export default function OtherUser({ chatImg, userId }: ChatImages) {
  const ChatImage = ({ chatImg, userId }: ChatImages): any => {
    if (userId === chatImg.sellerId && chatImg.buyer.avatar) {
      return (
        <div className="relative -z-10 h-8 w-8">
          <Image className="rounded-full object-cover" src={chatImg.buyer.avatar} layout="fill" alt="avatar" priority />
        </div>
      );
    } else if (userId === chatImg.buyerId && chatImg.seller.avatar) {
      return (
        <div className="relative -z-10 h-8 w-8">
          <Image
            className="rounded-full object-cover"
            src={chatImg.seller.avatar}
            layout="fill"
            alt="avatar"
            priority
          />
        </div>
      );
    }
  };
  return (
    <>
      {chatImg.buyer.avatar ? (
        <ChatImage chatImg={chatImg} userId={userId} />
      ) : (
        <div className="h-10 w-10 rounded-full bg-slate-300" />
      )}
      <div>
        <p className="text-gray-700">
          {userId === chatImg.sellerId ? chatImg.buyer.name : userId === chatImg.buyerId ? chatImg.seller.name : ""}
        </p>
        <p className="text-sm text-gray-500">{chatImg?.messages[chatImg.messages?.length - 1]?.message}</p>
      </div>
    </>
  );
}
