import type { NextPage } from "next";
import Layout from "../../components/layout";
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
          <label className="mb-1 block text-sm font-medium text-gray-500">Description</label>
          <textarea
            className="bordr-gray-300 mt-1 w-full rounded-md shadow-sm focus:border-orange-500  focus:ring-orange-500"
            rows={4}
          />
        </div>
        <button className=" shaodw-sm w-full rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
          Go Live
        </button>
      </div>
    </Layout>
  );
};

export default Create;
