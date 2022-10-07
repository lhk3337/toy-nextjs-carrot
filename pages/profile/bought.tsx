import type { NextPage } from "next";
import Layout from "@components/layout";
import ProductList from "@components/product-list";

const Bought: NextPage = () => {
  return (
    <Layout canGoBack title="Buy Detail">
      <div className="flex flex-col space-y-5 divide-y py-5">
        <ProductList kind="Purchase" />
      </div>
    </Layout>
  );
};

export default Bought;
