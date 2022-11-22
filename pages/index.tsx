import type { NextPage } from "next";
import FixedButton from "@components/fixedCircleBtn";
import Layout from "@components/layout";
import Items from "@components/items";
import useUser from "@libs/client/useUser";
import useSWR, { SWRConfig } from "swr";
import { Product } from "@prisma/client";
import client from "@libs/server/client";
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
    <Layout title="Home" hasBottomTabBar seoTitle="Home | Carrot Market">
      <div className="flex flex-col space-y-5 divide-y">
        {data?.products?.map((product) => (
          <Items {...product} key={product.id} />
        ))}
        <FixedButton type="add" href="/products/upload" />
      </div>
    </Layout>
  );
};

const Page: NextPage<{ products: ProductWithCount[] }> = ({ products }) => (
  <SWRConfig
    value={{
      fallback: { "api/products": { ok: true, products } },
    }}
  >
    <Home />
  </SWRConfig>
);

export async function getServerSideProps() {
  const productquerys = await client?.product.findMany({
    include: {
      _count: {
        select: {
          records: {
            where: {
              kind: { equals: "Fav" },
            },
          },
          chats: true,
        },
      },
    },
  });
  const products = productquerys?.map((product) => {
    return { ...product, _count: { liked: product._count.records, chatCount: product._count.chats } };
  });

  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}

export default Page;
