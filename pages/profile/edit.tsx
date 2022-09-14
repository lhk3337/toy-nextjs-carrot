import type { NextPage } from "next";
import Layout from "../../components/layout";
import Input from "../../components/input";
const Edit: NextPage = () => {
  return (
    <Layout canGoBack title="Edit Profile">
      <form className="space-y-4 py-10 px-4">
        <div className="flex items-center space-x-4">
          <div className="h-14 w-14 rounded-full bg-slate-500" />
          <label
            htmlFor="picture"
            className="cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-sm font-medium text-gray-700 shadow-md hover:bg-gray-100"
          >
            Change
            <input type="file" className="hidden" id="picture" accept="image/*" />
          </label>
        </div>
        <div className="space-y-1">
          <Input label="Email address" name="email" type="email" placeholder="이메일을 입력해주세요" required />
        </div>
        <div className="space-y-1">
          <Input kind="phone" label="Phone number" name="phone" type="number" required />
        </div>
        <button className=" shaodw-sm mt-5 w-full rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
          Update Profile
        </button>
      </form>
    </Layout>
  );
};
export default Edit;
