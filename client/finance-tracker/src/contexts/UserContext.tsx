import { ReactNode, createContext, useState } from "react";

type ProviderProps = {
  children?: ReactNode;
};

type UserContext = {
  username: string;
  setUsername: (newState: string) => void;
  name: string;
  setName: (newState: string) => void;
  email: string;
  setEmail: (newState: string) => void;
  dateCreated: Date;
  setDateCreated: (newState: Date) => void;
};

const initialValue = {
  username: "",
  setUsername: () => {},
  name: "",
  setName: () => {},
  email: "",
  setEmail: () => {},
  dateCreated: new Date(),
  setDateCreated: () => {},
};

const UserContext = createContext<UserContext>(initialValue);

const UserProvider = ({ children }: ProviderProps) => {
  const [username, setUsername] = useState(initialValue.username);
  const [name, setName] = useState(initialValue.name);
  const [email, setEmail] = useState(initialValue.email);
  const [dateCreated, setDateCreated] = useState(initialValue.dateCreated);

  return (
    <UserContext.Provider
      value={{
        username,
        name,
        email,
        dateCreated,
        setUsername,
        setName,
        setEmail,
        setDateCreated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
