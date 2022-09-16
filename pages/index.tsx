import type { NextPage } from "next";
import { useForm } from "react-hook-form";

const Home: NextPage = () => {
  const { register } = useForm();

  return (
    <form>
      <input {...register("username")} type="text" placeholder="Username" required />
      <input {...register("email")} type="email" placeholder="Email" required />
      <input {...register("password")} type="password" placeholder="Password" required />
      <input type="submit" value="Create Account" />
    </form>
  );
};

export default Home;
