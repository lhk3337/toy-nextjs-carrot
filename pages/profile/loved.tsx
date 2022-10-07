import type { NextPage } from "next";
import Layout from "@components/layout";
import ProductList from "@components/product-list";

const Loved: NextPage = () => {
  return (
    <Layout title="Liked list" canGoBack>
      <div className="flex flex-col space-y-5 divide-y py-5">
        <ProductList kind="Fav" />
      </div>
    </Layout>
  );
};

export default Loved;
