import type { NextPage } from "next";
import Image from "next/image";
const Home: NextPage = () => {
  return (
    <form className="flex flex-col space-y-2 p-5">
      <input type="text" placeholder="username" required className="peer rounded-md border border-gray-400 p-1" />
      <span className="hidden peer-invalid:block peer-invalid:text-red-600">This input is invalid.</span>
      <span className="hidden peer-valid:block peer-valid:text-teal-600">Aewsome username.</span>
      <input type="submit" className="bg-white" value="Login" />
    </form>
  );
};
export default Home;
