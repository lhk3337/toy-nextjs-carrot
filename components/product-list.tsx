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
  return (
    data && (
      <>
        {data[kind]?.map((record: Records) => (
          <Items
            id={record.product.id}
            key={record.id}
            title={record.product.name}
            price={record.product.price}
            heart={record.product._count.liked}
            imgurl={record.product.imageUrl}
            comment={1}
          />
        ))}
      </>
    )
  );
}
