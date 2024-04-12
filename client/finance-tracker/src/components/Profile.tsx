// import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import { useLocation } from "wouter";
import { UserResponse } from "../types/user";
import { axiosInstance } from "../util/axios";

const Profile = () => {
  const [location, _setLocation] = useLocation();

  const username = location.split("/")[2];

  const {
    data: userData,
    isSuccess,
    isPending,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axiosInstance.get(`profile/${username}`);

      return response.data as Promise<UserResponse>;
    },
  });

  if (isSuccess) console.log(userData);
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
