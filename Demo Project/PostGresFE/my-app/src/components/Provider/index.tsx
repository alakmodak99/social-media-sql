import React, { createContext, useState } from 'react'
import { UserDetailsLocal } from '../utils/apirequests';
interface ContextProviderProps {
  children: React.ReactNode;
}
export const UserDetailsContext = createContext<any>(null);
export const UserDetailsProvider = ({ children }: ContextProviderProps) => {
  const [userDetails, setUserDetails] = useState<any>(UserDetailsLocal());
  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserDetailsContext.Provider>
  );
};