import type { NextPage } from "next";

const Edit: NextPage = () => {
  return (
    <div className="space-y-4 py-10 px-4">
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
        <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-500">
          Email address
        </label>
        <input
          type="email"
          placeholder="이메일을 입력해주세요"
          required
          id="email"
          className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="number" className="mb-2 text-sm font-medium text-gray-500">
          Phone number
        </label>
        <div className="flex rounded-sm shadow-sm">
          <span className="flex select-none items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
            +82
          </span>
          <input
            type="number"
            required
            id="number"
            className="w-full appearance-none rounded-md rounded-l-none border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          />
        </div>
      </div>
      <button className=" shaodw-sm mt-5 w-full rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
        Update Profile
      </button>
    </div>
  );
};
export default Edit;
