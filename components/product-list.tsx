import { ProductWithCount } from "pages";
import useSWR from "swr";
import Items from "./items";

interface Record {
  id: number;
  product: ProductWithCount;
}
interface ProductListResponse {
  [key: string]: Record[];
}

interface ProductListProps {
  kind: "Sale" | "Fav" | "Purchase";
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(`/api/users/me/records?kind=${kind}`);
  return data ? (
    <>
      {data[kind]?.map((record: any) => (
        <Items
          id={record.product.id}
          key={record.id}
          title={record.product.name}
          price={record.product.price}
          heart={record.product._count.liked}
          comment={1}
        />
      ))}
    </>
  ) : null;
}
