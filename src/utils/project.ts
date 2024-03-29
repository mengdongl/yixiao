import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Project } from "types/project";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "utils/use-optimistic-options";
import { useAsync } from "utils/use-async";
import { useEffect } from "react";
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  // return useQuery<Project[]>(["projects", cleanObject(param)], () =>
  //   client("/projects", { data: param })
  // );
  const { run, ...rest } = useAsync<Project[]>(undefined, {
    isThrowError: true,
  });
  useEffect(() => {
    run(client("/projects", { data: param }));
  }, [param]);
  return {
    ...rest,
  };
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`/projects/${id}`),
    {
      enabled: Boolean(id),
    }
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`/projects`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`/projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`/projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useProjectTypes = () => {
  const client = useHttp();
  return useQuery<{ name: string; id: number }[]>("types", () =>
    client("https://my-json-server.typicode.com/mengdongl/yixiao/projectType")
  );
};
