import type { NextPage } from "next";
import Image from "next/image";
const Home: NextPage = () => {
  return (
    <form className="flex flex-col space-y-3 bg-blue-500 p-5 focus-within:bg-blue-100">
      <input
        type="text"
        placeholder="username"
        disabled
        className="border-violet-400 required:border-4 disabled:opacity-0"
      />
      <input
        type="text"
        required
        placeholder="Email"
        className="placeholder:text-white placeholder-shown:bg-teal-500"
      />
      <input type="password" placeholder="Password" required className="border-red-500 invalid:border-4" />
      <input type="submit" className="bg-white" value="Login" />
    </form>
  );
};
export default Home;
