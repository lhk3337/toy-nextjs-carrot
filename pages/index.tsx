import type { NextPage } from "next";
import Image from "next/image";

const Home: NextPage = () => {
  const imageUrl =
    "https://images.unsplash.com/photo-1532117364815-720cd35ff6e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3000&q=80";
  return (
    <>
      <div className="relative pb-56">
        <Image src={imageUrl} className="bg-slate-300 object-contain" layout="fill" alt="layoutfill" />
      </div>
      <div className="mt-96 flex h-60 w-60 items-center justify-between">
        <Image src={imageUrl} className=" h-16 w-16 rounded-full" width={64} height={64} alt="notlayout" />
      </div>
    </>
  );
};
export default Home;
