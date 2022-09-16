import type { NextPage } from "next";
import React, { useState } from "react";

const Home: NextPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [emailErrors, setEmailErrors] = useState("");
  const onUsernameChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setUsername(value);
    setFormErrors("");
  };

  const onEmailChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setEmail(value);
    setEmailErrors("");
    setFormErrors("");
  };

  const onPasswordChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setPassword(value);
    setFormErrors("");
  };
  const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username === "" || email === "" || password === "") {
      setFormErrors("All fields are required");
    }
    if (!email.includes("@")) {
      setEmailErrors("email is required");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input value={username} type="text" placeholder="Username" onChange={onUsernameChange} required />
      <input value={email} type="email" placeholder="Email" onChange={onEmailChange} required />
      <input value={password} type="password" placeholder="Password" onChange={onPasswordChange} required />
      <input type="submit" value="Create Account" />
      {emailErrors}
      {formErrors}
    </form>
  );
};

export default Home;
