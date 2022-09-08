import type { NextPage } from "next";
import Image from "next/image";
const Home: NextPage = () => {
  return (
    <div className="flex flex-col space-y-2 p-10">
      <p className="first-letter:text-7xl first-letter:hover:text-purple-500">Lorem ipsum dolor sit amet.</p>
    </div>
  );
};
export default Home;
