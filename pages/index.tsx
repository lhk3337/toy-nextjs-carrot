import type { NextPage } from "next";
import { FieldErrors, useForm } from "react-hook-form";

interface LoginForm {
  password: string;
  username: string;
  email: string;
  errors?: string;
}

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "onChange" });
  const onValid = (data: LoginForm) => {
    console.log("valid");
    setError("errors", { message: "Sorry, BackEnd Down Errors" });
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };
  setValue("username", "hello");

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
      <input
        {...register("email", {
          required: "email is required",
          validate: {
            notGmail: (value) => !value.includes("@gmail.com") || "Gmail is not allowed",
          },
        })}
        type="email"
        placeholder="Email"
      />
      {errors.email?.message}
      <input {...register("password", { required: "password is required" })} type="password" placeholder="Password" />
      <input type="submit" value="Create Account" />
      {errors.errors?.message}
    </form>
  );
};

export default Home;
