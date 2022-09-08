import type { NextPage } from "next";
import Image from "next/image";
const Home: NextPage = () => {
  return (
    <div className="flex flex-col space-y-2 p-10">
      <input
        type="file"
        className="file:cursor-pointer file:rounded-xl file:border-0 file:bg-purple-400 file:px-5 file:py-1  file:text-white  file:hover:border file:hover:border-purple-400 file:hover:bg-white file:hover:text-purple-500"
      />
    </div>
  );
};
export default Home;
