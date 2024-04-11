import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { UserResponse } from "../types/user";
import { useLoginMutation } from "../util/useLogin";

type Inputs = {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutate: logInMutate } = useLoginMutation();
  const { mutate, isPending, isSuccess, data } = useMutation({
    mutationFn: async (inputs: Inputs) => {
      const response = await axios.post(
        "http://localhost:8080/account/create",
        inputs
      );
      return response.data as Promise<UserResponse>;
    },
    onSuccess: (data, variables) => {
      console.log(variables.password);
      const loginArg = {
        username: data.username,
        password: variables.password,
      };
      logInMutate(loginArg);
    },
  });

  if (isSuccess) {
    console.log(data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit((data) => mutate(data))}>
        <input
          {...register("first_name", { required: "First Name is required." })}
          placeholder="First Name"
        />
        <p>{errors.first_name?.message}</p>
        <input
          {...register("last_name", { required: "Last Name is required." })}
          placeholder="Last Name"
        />
        <p>{errors.last_name?.message}</p>
        <input
          {...register("username", { required: "Username is required." })}
          placeholder="Username"
        />
        <p>{errors.username?.message}</p>
        <input
          {...register("email", {
            required: "Valid Email Address is required.",
          })}
          placeholder="Email"
        />
        <p>{errors.email?.message}</p>
        <input
          {...register("password", {
            required: "Valid Password is required.",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long.",
            },
          })}
          placeholder="Password"
          type="password"
        />
        <p>{errors.password?.message}</p>
        <input type="submit" value="Sign Up" />
      </form>
      {isPending && <p>Creating account...</p>}
    </div>
  );
};

export default SignUp;
