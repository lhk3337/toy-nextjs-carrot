import type { NextPage } from "next";
import Layout from "@components/layout";
import ProductList from "@components/product-list";

const Sold: NextPage = () => {
  return (
    <Layout canGoBack title="Sold Detail">
      <div className="flex flex-col space-y-5 divide-y py-5">
        <ProductList kind="Sale" />
      </div>
    </Layout>
  );
};

export default Sold;
