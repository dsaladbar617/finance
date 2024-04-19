import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { LogInInputs, LogInResponse } from "../types/user";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const useLoginMutation = () => {
  const nav = useNavigate();
  const { setIsAuth } = useContext(AuthContext);

  return useMutation({
    mutationFn: async (data: LogInInputs) => {
      const response = await axios
        .post("http://localhost:8080/account/login", data)
        .then((res) => res.data as LogInResponse);
      return response;
    },
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);
      setIsAuth(true);
      nav("/profile");
    },
  });
};
