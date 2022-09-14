import type { NextPage } from "next";
import Layout from "../../components/layout";
import Items from "../../components/items";
const Bought: NextPage = () => {
  return (
    <Layout canGoBack title="Buy Detail">
      <div className="flex flex-col space-y-5 divide-y py-5">
        {Array(12)
          .fill("")
          .map((_, i) => (
            <Items key={i} id={i} title="New iPhone 14" option="Black" price={95} heart={1} comment={1} />
          ))}
      </div>
    </Layout>
  );
};

export default Bought;
