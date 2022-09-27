import type { NextPage } from "next";
import FixedButton from "@components/fixedCircleBtn";
import Layout from "@components/layout";
import Items from "@components/items";
import useUser from "@libs/client/useUser";
import useSWR from "swr";
import { Product } from "@prisma/client";

interface ProductResponse {
  ok: boolean;
  products: Product[];
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const { data, error } = useSWR<ProductResponse>("api/products");
  return (
    <Layout title="Home" hasTabBar>
      <div className="flex flex-col space-y-5 divide-y">
        {data?.products?.map((product) => (
          <Items key={product.id} id={product.id} title={product.name} price={product.price} heart={1} comment={1} />
        ))}
        <FixedButton type="add" href="/products/upload" />
      </div>
    </Layout>
  );
};

export default Home;
