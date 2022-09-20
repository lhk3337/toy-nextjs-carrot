import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
const Create: NextPage = () => {
  return (
    <Layout canGoBack title="Create Live Stream">
      <div className="space-y-5 py-10 px-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-500" htmlFor="name">
            Name
          </label>
          <div className="relative flex items-center rounded-md shadow-sm">
            <input
              type="text"
              id="name"
              className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-500" htmlFor="price">
            Price
          </label>
          <div className="relative flex items-center rounded-md shadow-sm">
            <div className="items-cetner pointer-events-none absolute left-0 flex justify-center pl-3">
              <span className="text-sm text-gray-500">$</span>
            </div>
            <input
              type="text"
              id="price"
              placeholder="0.00"
              className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 pl-7 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
            <div className="pointer-events-none  absolute right-0 flex items-center pr-3">
              <span className="text-gray-500">USD</span>
            </div>
          </div>
        </div>
        <div>
          <TextArea label="Description" name="desc" rows={4} />
        </div>
        <Button text="Go Live" />
      </div>
    </Layout>
  );
};

export default Create;
