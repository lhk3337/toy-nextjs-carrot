import type { NextPage } from "next";
import Image from "next/image";
const Home: NextPage = () => {
  return (
    <div className="bg-[url('/vercel.svg')] dark:md:hover:bg-teal-400">
      <h2 className="text-[110px] text-[#000]">Hello</h2>
    </div>
  );
};
export default Home;
