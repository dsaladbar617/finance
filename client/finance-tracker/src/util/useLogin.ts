import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { navigate } from "wouter/use-browser-location";
import { LogInInputs, LogInResponse } from "../types/user";

export const useLoginMutation = () =>
  useMutation({
    mutationFn: (data: LogInInputs) =>
      axios
        .post("http://localhost:8080/account/login", data)
        .then((res) => res.data as LogInResponse),
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);
      navigate(`/profile/${data.user.username}`);
    },
  });

// export default useLoginMutation;
