import type { NextPage } from "next";
import Layout from "../../components/layout";

const Write: NextPage = () => {
  return (
    <Layout canGoBack title="Write Post">
      <form className="px-4 py-6">
        <textarea
          rows={8}
          placeholder="Answer this question!"
          className="bordr-gray-300 mt-1 w-full rounded-md shadow-sm focus:border-orange-500  focus:ring-orange-500"
        />
        <button className=" shaodw-sm mt-5 w-full rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
          Submit
        </button>
      </form>
    </Layout>
  );
};
export default Write;
