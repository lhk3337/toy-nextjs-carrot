import type { NextPage } from "next";
const Home: NextPage = () => {
  return (
    <div className="flex flex-col space-y-10 bg-slate-300 px-10 py-20">
      <div className="rounded-xl bg-white p-4 shadow-2xl">
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
      <div className="rounded-xl bg-white p-10 shadow-2xl"></div>
      <div className="rounded-xl bg-white p-10 shadow-2xl"></div>
      <div className="rounded-xl bg-white p-10 shadow-2xl"></div>
    </div>
  );
};
export default Home;
