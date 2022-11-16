import Items from "@components/items";
import Layout from "@components/layout";
import { cls } from "@libs/client/utils";
import { User } from "@prisma/client";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { ProductWithCount } from "..";
import useSWR from "swr";

interface Profile {
  userProfile: User;
  sellProducts: ProductWithCount[];
  buyProducts: ProductWithCount[];
}

interface UserProfileResponse {
  ok: boolean;
  Profiles: Profile;
}

const UserProfile: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<UserProfileResponse>(router.query.id ? `/api/users/profile/${router.query.id}` : null);
  const [method, setMethod] = useState<"sell" | "buy">("sell");

  const onSellListClick = () => {
    setMethod("sell");
  };
  const onBuyListClick = () => {
    setMethod("buy");
  };

  return (
    <Layout canGoBack title="User Profile">
      <div className="flex items-center justify-around px-3  py-12 ">
        {data?.Profiles.userProfile.avatar ? (
          <div className="relative -z-10 h-24 w-24">
            <Image
              src={data?.Profiles.userProfile.avatar}
              className="rounded-full object-cover"
              layout="fill"
              alt="avatar"
              priority
            />
          </div>
        ) : (
          <div className="h-24 w-24 rounded-full bg-slate-300" />
        )}
        {!data ? (
          <div className="flex flex-col space-y-3">
            <div className=" rounded-lg border-[1px] bg-slate-200  px-32 py-1" />
            <div className=" rounded-lg border-[1px] bg-slate-200  px-32 py-1" />
            <div className=" rounded-lg border-[1px] bg-slate-200  px-32 py-1" />
          </div>
        ) : (
          <div className=" rounded-lg border-[1px] border-gray-400  px-28 py-2">
            <span className="text-normal font-normal text-black">{data?.Profiles.userProfile.name}</span>
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <div className="grid w-[500px] grid-cols-2 border-b">
          <button
            className={cls(
              "pb-2 font-normal transition duration-500 ",
              method === "sell" ? " border-b-2 border-b-orange-400 text-orange-400" : "border-transparent text-gray-500"
            )}
            onClick={onSellListClick}
          >
            Sell list
          </button>
          <button
            className={cls(
              "pb-2 font-normal transition duration-500 ",
              method === "buy" ? "border-b-2 border-b-orange-400 text-orange-400" : "border-transparent text-gray-500"
            )}
            onClick={onBuyListClick}
          >
            Buy list
          </button>
        </div>
      </div>
      <div className="my-2 px-2 ">
        {method === "sell" && (
          <div className="flex flex-col">
            {!data ? (
              <div className="flex flex-col px-4">
                {Array.from(Array(5).keys()).map((_, i) => {
                  return <div className="my-4 rounded-lg border-[1px] bg-slate-200 py-10" key={i} />;
                })}
              </div>
            ) : (
              <>
                {data?.Profiles.sellProducts.map((product) => (
                  <Items {...product} key={product.id} />
                ))}
              </>
            )}
          </div>
        )}
        {method === "buy" && (
          <div className="flex flex-col">
            {!data ? (
              <div className="flex flex-col px-4">
                {Array.from(Array(5).keys()).map((_, i) => {
                  return <div className="my-4 rounded-lg border-[1px] bg-slate-200 py-10" key={i} />;
                })}
              </div>
            ) : (
              <>
                {data?.Profiles.buyProducts.map((product) => (
                  <Items {...product} key={product.id} />
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserProfile;
