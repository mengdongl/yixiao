import React, { ReactNode, useContext } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panal";
import { useMount } from "utils";
import { http } from "utils/http";
import { useAsync } from "utils/use-async";
import { FullPageError, FullPageLoading } from 'components/lib'

export interface AuthForm {
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
  const login = (param: AuthForm) => auth.login(param).then((user) => setUser(user));
  const register = (param: AuthForm) => auth.register(param).then((user) => setUser(user));
  const logout = () => auth.logout().then(() => setUser(null));

  const {run,isLoading,isIdel,isError,error,setData:setUser,data:user} = useAsync<User| null>(undefined,{isThrowError:false})

  const getUser = async () => {
    let token = auth.getToken()
    if(token){
     const data = await http('/me',{token: token})
     setUser(data.user)
     return data.user
    }
    return null
  }
  useMount(() => {
    run(getUser())
  })

  if(isLoading || isIdel){
    return <FullPageLoading></FullPageLoading>
  }

  if(isError){
    return <FullPageError error={error}></FullPageError>
  }

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
