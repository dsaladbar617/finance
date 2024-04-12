import { Dispatch, SetStateAction, createContext } from "react";

type AuthContext = {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContext>({
  isAuth: false,
  setIsAuth: () => {},
});
