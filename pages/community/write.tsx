import type { NextPage } from "next";

const Write: NextPage = () => {
  return (
    <form className="px-4 py-10">
      <textarea
        rows={4}
        placeholder="Answer this question!"
        className="bordr-gray-300 mt-1 w-full rounded-md shadow-sm focus:border-orange-500  focus:ring-orange-500"
      />
      <button className=" shaodw-sm mt-2 w-full rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
        Submit
      </button>
    </form>
  );
};
export default Write;
