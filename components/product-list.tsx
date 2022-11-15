import { ProductWithCount } from "pages";
import useSWR from "swr";
import Items from "./items";
import { Record } from "@prisma/client";

interface Records extends Record {
  product: ProductWithCount;
}
interface ProductListResponse {
  [key: string]: Records[];
}

interface ProductListProps {
  kind: "Sale" | "Fav" | "Purchase";
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(`/api/users/me/records?kind=${kind}`);
  return !data ? (
    <>
      {Array.from(Array(20).keys()).map((_, i) => {
        return <div key={i} className="mt-5 h-[12vh] w-full rounded-md bg-[#EBEBEB] px-2 pt-8" />;
      })}
    </>
  ) : (
    <>
      {data[kind]?.map((record: Records) => (
        <Items {...record.product} key={record.product.id} />
      ))}
    </>
  );
}
