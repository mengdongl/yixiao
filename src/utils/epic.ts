import { useQuery } from "react-query";
import { Epic } from "types/epic";
import { cleanObject } from "utils";
import { useHttp } from "./http";

export const useEpics = (param?: Partial<Epic>) => {
  const client = useHttp();
  return useQuery<Epic[]>(["epics", cleanObject(param)], () =>
    client("/epics", { data: param })
  );
};
