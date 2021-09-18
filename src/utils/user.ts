import { useQuery } from "react-query";
import { User } from "types/User";
import { useHttp } from "./http";
export const useUser = (param?: Partial<User>) => {
  const client = useHttp();
  return useQuery(["users", param], () => client("/users", { data: param }));
};
