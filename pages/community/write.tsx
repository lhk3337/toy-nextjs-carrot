import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
const Write: NextPage = () => {
  return (
    <Layout canGoBack title="Write Post">
      <form className="space-y-4 px-4 py-6">
        <TextArea rows={8} placeholder="Answer this question!" />
        <Button text="Submit" />
      </form>
    </Layout>
  );
};
export default Write;
