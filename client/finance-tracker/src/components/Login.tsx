import { useForm } from "react-hook-form";
import { LogInInputs } from "../types/user";
import { useLoginMutation } from "../util/useLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInInputs>();

  const { mutate, isPending } = useLoginMutation();

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          // console.log(data);
          return mutate(data);
        })}
      >
        <input
          {...register("username", { required: "Username is required." })}
          placeholder="Username"
        />
        <p>{errors.username?.message}</p>
        <input
          {...register("password", { required: "Password is required." })}
          placeholder="Password"
          type="password"
        />
        <p>{errors.password?.message}</p>
        <input type="submit" value="Log In" />
      </form>
      {isPending && <p>Logging into account...</p>}
    </div>
  );
};

export default Login;
