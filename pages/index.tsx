import type { NextPage } from "next";
import { FieldErrors, useForm } from "react-hook-form";

interface LoginForm {
  password: string;
  username: string;
  email: string;
}

const Home: NextPage = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const onValid = (data: LoginForm) => {
    console.log("valid");
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };
  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        {...register("username", {
          required: "username is required",
          minLength: {
            message: "5 than more",
            value: 5,
          },
        })}
        type="text"
        placeholder="Username"
      />
      <input {...register("email", { required: "email is required" })} type="email" placeholder="Email" />
      <input {...register("password", { required: "password is required" })} type="password" placeholder="Password" />
      <input type="submit" value="Create Account" />
    </form>
  );
};

export default Home;
