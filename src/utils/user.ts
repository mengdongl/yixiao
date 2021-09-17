import { useQuery } from "react-query";
import { User } from "screens/project-list/search-panal";
import { useHttp } from "./http";
export const useUser = (param?: Partial<User>) => {
  const client = useHttp();
  return useQuery(["users", param], () => client("/users", { data: param }));
};
