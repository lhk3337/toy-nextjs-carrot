import type { NextPage } from "next";
import { useForm } from "react-hook-form";

const Home: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const onValid = () => {
    console.log("valid");
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input {...register("username", { required: "error" })} type="text" placeholder="Username" />
      <input {...register("email", { required: true })} type="email" placeholder="Email" />
      <input {...register("password", { required: true })} type="password" placeholder="Password" />
      <input type="submit" value="Create Account" />
    </form>
  );
};

export default Home;
