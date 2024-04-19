import { useQuery } from "@tanstack/react-query";
import { UserResponse } from "../types/user";
import { axiosInstance } from "./axios";

// type GetUserDataParams = {
//   username?: string;
// };

const useGetUserData = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axiosInstance.get(`profile`);

      return response.data as Promise<UserResponse>;
    },
  });

export default useGetUserData;
