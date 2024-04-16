import { ReactNode, createContext, useState } from "react";

type ProviderProps = {
  children?: ReactNode;
};

type AuthContext = {
  isAuth: boolean;
  setIsAuth: (newState: boolean) => void;
};

const initialValue = {
  isAuth: !!localStorage.getItem("accessToken"),
  setIsAuth: () => {},
};

const AuthContext = createContext<AuthContext>(initialValue);

const AuthProvider = ({ children }: ProviderProps) => {
  const [isAuth, setIsAuth] = useState(initialValue.isAuth);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
