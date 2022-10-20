import type { NextPage } from "next";
import Image from "next/image";
import riceCake from "../public/local.jpeg";

const Home: NextPage = () => {
  return (
    <div>
      <Image src={riceCake} placeholder="blur" />
    </div>
  );
};
export default Home;
