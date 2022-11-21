import type { NextPage } from "next";
import FixedButton from "@components/fixedCircleBtn";
import Layout from "@components/layout";
import Items from "@components/items";
import useUser from "@libs/client/useUser";
import useSWR from "swr";
import { Product } from "@prisma/client";

export interface ProductWithCount extends Product {
  _count: {
    liked: number;
    chatCount: number;
  };
}
interface ProductResponse {
  ok: boolean;
  products: ProductWithCount[];
}

const Home: NextPage = () => {
  const { data, error } = useSWR<ProductResponse>("api/products");

  return (
    <Layout title="Home" hasBottomTabBar seoTitle="Home">
      <div className="flex flex-col space-y-5 divide-y">
        {data?.products?.map((product) => (
          <Items {...product} key={product.id} />
        ))}
        <FixedButton type="add" href="/products/upload" />
      </div>
    </Layout>
  );
};

export default Home;
