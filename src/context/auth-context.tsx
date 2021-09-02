import React, { ReactNode, useContext, useLayoutEffect, useState } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panal";
import { useMount } from "utils";
import { http } from "utils/http";

interface AuthForm {
  username: string;
  password: string;
}
interface Context {
  user: User | null;
  login: (param: AuthForm) => Promise<void>;
  register: (param: AuthForm) => Promise<void>;
  logout: ()=> Promise<void>
}
const AuthContext = React.createContext<Context | undefined>(undefined);
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const login = (param: AuthForm) => auth.login(param).then((user) => setUser(user));
  const register = (param: AuthForm) => auth.register(param).then((user) => setUser(user));
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(async () => {
    let token = auth.getToken()
    if(token){
     const data = await http('/me',{token: token})
     setUser(data.user)
    }
  })

  return (
    <AuthContext.Provider children={children} value={{ user, login, register, logout }}/>
  );
};

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error('useAuth only used in AuthProvider')
    }
    return context
}
