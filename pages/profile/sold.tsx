import type { NextPage } from "next";
import Layout from "@components/layout";
import ProductList from "@components/product-list";

const Sold: NextPage = () => {
  return (
    <Layout canGoBack title="Sold Detail" seoTitle="sold List | Carrot Market">
      <div className="flex flex-col space-y-5 divide-y py-5">
        <ProductList kind="Sale" />
      </div>
    </Layout>
  );
};

export default Sold;
