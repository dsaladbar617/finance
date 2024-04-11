export type LogInInputs = {
  username: string;
  password: string;
};

export type UserResponse = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: Date;
};

export type LogInResponse = {
  session_id: string;
  access_token: string;
  access_token_expires_at: Date;
  refresh_token: string;
  refresh_token_expires_at: Date;
  user: UserResponse;
};
