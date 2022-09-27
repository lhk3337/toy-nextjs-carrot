import type { NextPage } from "next";
import FixedButton from "@components/fixedCircleBtn";
import Layout from "@components/layout";
import Items from "@components/items";
import useUser from "@libs/client/useUser";
const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  console.log(user);
  return (
    <Layout title="Home" hasTabBar>
      <div className="flex flex-col space-y-5 divide-y">
        {Array(12)
          .fill("")
          .map((_, i) => (
            <Items key={i} id={i} title="New iPhone 14" option="Black" price={95} heart={1} comment={1} />
          ))}
        <FixedButton type="add" href="/products/upload" />
      </div>
    </Layout>
  );
};

export default Home;
