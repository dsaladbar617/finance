import { useQuery } from "@tanstack/react-query";
import { UserResponse } from "../types/user";
import { axiosInstance } from "../util/axios";

const Profile = () => {
  // Get the accounts user data to display on the profile page.
  const {
    data: userData,
    isPending,
    status,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axiosInstance.get("profile/");

      return response.data as Promise<UserResponse>;
    },
  });

  // Get the date from the get query above and convert it to locale string.
  let date;
  if (userData?.created_at) {
    date = new Date(userData.created_at.toLocaleString());
  }

  return (
    <div>
      {isPending && <h2>Loading</h2>}
      {status != "error" && (
        <>
          <h2>Name: {`${userData?.first_name} ${userData?.last_name}`}</h2>
          <h2>Username: {userData?.username}</h2>
          <h3>Email: {userData?.email}</h3>
          <h4>Account Created: {date?.toDateString()}</h4>
        </>
      )}
    </div>
  );
};

export default Profile;
