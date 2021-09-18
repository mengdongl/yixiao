import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { cleanObject } from "utils";
import { Task } from "types/task";
import { useAddConfig, useEditConfig } from "./use-optimistic-options";
export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  return useQuery<Task[]>(["tasks", cleanObject(param)], () =>
    client("/tasks", { data: param })
  );
};

export const useTask = (id?: number) => {
  const client = useHttp();
  return useQuery<Task>(["tasks", { id }], () => client(`/tasks/${id}`), {
    enabled: Boolean(id),
  });
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`/tasks`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditTask = (queryKey:QueryKey) => {
    const client = useHttp()
    return useMutation(
      (params: Partial<Task>) =>
        client(`/tasks/${params.id}`, {
          method: "PATCH",
          data: params,
        }),
      useEditConfig(queryKey)
    );
  }
