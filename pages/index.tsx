import type { NextPage } from "next";
const Home: NextPage = () => {
  return (
    <div className="flex flex-col space-y-10 bg-slate-300 p-20">
      <div className="rounded-3xl bg-white p-8 shadow-2xl">
        <span className="text-xl font-bold">Select Item</span>
        <div className="my-2 flex justify-between">
          <span className="text-gray-400">Grey Chair</span>
          <span className="font-semibold">$18</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Tooly Table</span>
          <span className="font-semibold">$80</span>
        </div>
        <div className="mt-2 flex justify-between border-t-2 border-dashed pt-2">
          <span>Total</span>
          <span className="font-semibold">$98</span>
        </div>
        <div className="mx-auto mt-5 w-1/2 rounded-3xl bg-blue-400 py-3 text-center text-white">Checkout</div>
      </div>
      <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="bg-blue-400 p-8 pb-14">
          <span className="text-xl font-medium text-white">Profile</span>
        </div>
        <div className="relative -top-8 rounded-3xl bg-white p-6">
          <div className="relative  -top-16 flex items-end justify-between">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-400">Orders</span>
              <span className=" font-medium">$340</span>
            </div>
            <div className="h-24 w-24 rounded-full bg-[#E1EFFF]" />
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-400">Spent</span>
              <span className=" font-medium">$340</span>
            </div>
          </div>
          <div className="relative -mb-5 -mt-10 flex flex-col items-center">
            <span className="text-lg font-bold">Tony Molloy</span>
            <span className="text-sm text-gray-400">USA</span>
          </div>
        </div>
      </div>
      <div className="rounded-xl bg-white p-10 shadow-2xl"></div>
      <div className="rounded-xl bg-white p-10 shadow-2xl"></div>
    </div>
  );
};
export default Home;
