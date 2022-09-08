import type { NextPage } from "next";
import Image from "next/image";
const Home: NextPage = () => {
  return (
    <div className="flex flex-col space-y-2 p-5">
      <details className="select-none open:bg-indigo-300 open:text-white">
        <summary className="cursor-pointer">What is my fav. food.</summary>
        <span>kimchi</span>
      </details>
    </div>
  );
};
export default Home;
