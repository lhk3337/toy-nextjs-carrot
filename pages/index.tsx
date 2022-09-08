import type { NextPage } from "next";
import Image from "next/image";
const Home: NextPage = () => {
  return (
    <div className="dark grid min-h-screen gap-10 bg-slate-300 p-20 lg:grid-cols-2 xl:grid-cols-3 xl:place-content-center">
      <div className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-2xl dark:bg-black">
        <span className="text-xl font-bold dark:text-white">Select Item</span>
        <div className="my-2 flex justify-between">
          <span className="text-gray-400 dark:text-gray-50">Grey Chair</span>
          <span className="font-semibold dark:text-white">$18</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 dark:text-gray-50">Tooly Table</span>
          <span className="font-semibold dark:text-white">$80</span>
        </div>
        <div className="mt-2 flex justify-between border-t-2 border-dashed pt-2">
          <span className="dark:text-gray-50">Total</span>
          <span className="font-semibold dark:text-white">$98</span>
        </div>
        <div className="mx-auto mt-5 w-1/2 rounded-3xl bg-blue-400 py-3 text-center text-white dark:border dark:border-white dark:bg-black dark:hover:bg-white dark:hover:text-black">
          Checkout
        </div>
      </div>
      <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className=" p-8 pb-14 xl:pb-40 portrait:bg-indigo-600 landscape:bg-teal-500">
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
      <div className="rounded-3xl bg-white p-8 px-6 shadow-2xl lg:col-span-2 xl:col-span-1">
        <div className="mb-5 flex justify-between">
          <span>←</span>
          <div className="flex items-center space-x-3">
            <span>⭐️ 4.9</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg shadow-lg">
              <span>❤️</span>
            </div>
          </div>
        </div>
        <div className="my-5 flex items-center justify-center shadow-2xl shadow-slate-400">
          <Image src="https://i.ibb.co/5963kz8/chair.jpg" width={200} height={300} alt="chair" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-semibold">Swoon Lounge</span>
          <span className="text-sm text-gray-500">Chair</span>
          <div className="mt-3 mb-5 flex items-center justify-between">
            <div className="space-x-2">
              <button className="h-5 w-5 rounded-full bg-yellow-400   ring-yellow-400 ring-offset-2 transition focus:ring-2" />
              <button className="h-5 w-5 rounded-full bg-indigo-400 ring-indigo-400 ring-offset-2 transition focus:ring-2" />
              <button className="h-5 w-5 rounded-full bg-teal-400 ring-teal-400 ring-offset-2 transition focus:ring-2" />
            </div>
            <div className="flex items-center space-x-5">
              <button className="aspect-square w-8 rounded-lg bg-blue-400 p-1.5 text-white">-</button>
              <span>1</span>
              <button className="aspect-square w-8 rounded-lg bg-blue-400 p-1.5 text-white">+</button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-medium">$450</span>
            <button className="rounded-lg bg-blue-400 p-2 px-8 text-center text-sm text-white">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
