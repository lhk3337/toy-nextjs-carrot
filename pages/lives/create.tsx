import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import Input from "@components/input";

const Create: NextPage = () => {
  return (
    <Layout canGoBack title="Create Live Stream">
      <form className="space-y-5 py-10 px-4">
        <div>
          <Input name="name" label="Name" type="text" required />
        </div>
        <div>
          <Input name="price" label="Price" type="text" kind="price" placeholder="0.00" required />
        </div>
        <div>
          <TextArea label="Description" name="desc" rows={4} required />
        </div>
        <Button text="Go Live" />
      </form>
    </Layout>
  );
};

export default Create;
