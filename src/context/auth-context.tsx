import React, { ReactNode, useContext } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panal";
import { useMount } from "utils";
import { http } from "utils/http";
import { useAsync } from "utils/use-async";
import { FullPageError, FullPageLoading } from 'components/lib'
import { useDispatch, useSelector } from "react-redux";
import { sleectUser } from "store/auth.slice";
import * as authStore from 'store/auth.slice'

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

export const bootstrapUser = async () => {
  let token = auth.getToken()
  if(token){
   const data = await http('/me',{token: token})
   return data.user
  }
  return null
}

export const AuthProvider = ({ children }: {children: ReactNode}) => {
  const {run,isLoading,isIdel,isError,error} = useAsync<User| null>(undefined,{isThrowError:false})
  const dispatch:(...args:unknown[])=> Promise<User> = useDispatch()
  useMount(() => {
    run(dispatch(authStore.bootstrap()))
  })

  if(isLoading || isIdel){
    return <FullPageLoading></FullPageLoading>
  }

  if(isError){
    return <FullPageError error={error}></FullPageError>
  }

return <div>{children}</div>
};

// export const useAuth = () => {
//     const context = useContext(AuthContext)
//     if(!context){
//         throw new Error('useAuth only used in AuthProvider')
//     }
//     return context
// }

export const useAuth = () => {
  const user = useSelector(sleectUser)
  const dispatch:(...args:unknown[]) => Promise<User> = useDispatch()

  const login = (data:AuthForm) => dispatch(authStore.login(data))
  const register = (data:AuthForm) => dispatch(authStore.register(data))
  const logout = () => dispatch(authStore.logout())
  
  return {user,login,register,logout}
}
