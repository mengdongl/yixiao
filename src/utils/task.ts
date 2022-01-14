import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { cleanObject } from "utils";
import { Task } from "types/task";
import { useAddConfig, useEditConfig } from "./use-optimistic-options";
import { useAsync } from "./use-async";
import { useCallback, useEffect } from "react";
export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  // return useQuery<Task[]>(["tasks", cleanObject(param)], () =>
  //   client("/tasks", { data: param })
  // );
  const { run, ...rest } = useAsync<Task[]>(undefined, {
    isThrowError: true,
  });
  useEffect(() => {
    run(client("/tasks", { data: param }));
  }, [param]);

  const refresh = (param?: Partial<Task>) => {
    return run(client("/tasks", { data: param }));
  };
  return {
    refresh,
    ...rest,
  };
};

export const useTask = (id?: number) => {
  const client = useHttp();
  return useQuery<Task>(["tasks", { id }], () => client(`/tasks/${id}`), {
    enabled: Boolean(id),
  });
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();
  // return useMutation(
  //   (params: Partial<Task>) =>
  //     client(`/tasks`, {
  //       data: params,
  //       method: "POST",
  //     }),
  //   useAddConfig(queryKey)
  // );
  const { run, ...rest } = useAsync<Task>(undefined, { isThrowError: true });
  const mutate = (params: Partial<Task>) => {
    return run(
      client(`/tasks`, {
        data: params,
        method: "POST",
      })
    );
  };
  return {
    mutate,
    ...rest,
  };
};

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  // return useMutation(
  //   (params: Partial<Task>) =>
  //     client(`/tasks/${params.id}`, {
  //       method: "PATCH",
  //       data: params,
  //     }),
  //   useEditConfig(queryKey)
  // );
  const { run, isLoading } = useAsync(undefined, { isThrowError: true });

  const mutateAsync = useCallback(
    (params: Partial<Task>) => {
      run(client(`/tasks/${params.id}`, { method: "PATCH", data: params }));
    },
    [run, client]
  );

  return {
    mutateAsync,
    isLoading,
  };
};
