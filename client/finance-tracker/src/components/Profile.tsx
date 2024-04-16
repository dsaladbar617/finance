import { useQuery } from "@tanstack/react-query";
import { UserResponse } from "../types/user";
import { axiosInstance } from "../util/axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const params = useParams();

  const { data: userData, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axiosInstance.get(`profile/${params.username}`);

      return response.data as Promise<UserResponse>;
    },
  });

  return (
    <div>
      {isPending && <h2>Loading</h2>}
      <h2>Name: {`${userData?.first_name} ${userData?.last_name}`}</h2>
      <h2>Username: {userData?.username}</h2>
      <h3>Email: {userData?.email}</h3>
      <h4>Account Created: {userData?.created_at.toLocaleString()}</h4>
    </div>
  );
};

export default Profile;
