// context
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../constants/routes';

export type User = {
  name: string;
  email: string;
  userType: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

const UserContextProvider = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  if (user === null) {
    navigate(LOGIN);
  }

  return <UserContext.Provider value={{ user, setUser }}> {children}</UserContext.Provider>;
};

export default UserContextProvider;
