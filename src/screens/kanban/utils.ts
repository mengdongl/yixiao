import { useUrlParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useLocation } from "react-router";
import { useProject } from "utils/project";
import { useDebounce } from "utils";
import { useTask } from "utils/task";
export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useKanbansQueryKey = () => ["kanbans", useKanbanSearchParams()];

export const useTaskSearchParams = () => {
  const [param] = useUrlParams(["name", "typeId", "processorId", "tagId"]);
  const projectId = useProjectIdInUrl();
  const debouncedName = useDebounce(param.name, 200);
  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: debouncedName,
    }),
    [projectId, param, debouncedName]
  );
};

export const useTaskQueryKey = () => ["tasks", useTaskSearchParams()];

export const useTaskModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlParams(["editingTaskId"]);
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));
  const startEdit = useCallback(
    (id: number) => setEditingTaskId({ editingTaskId: id }),
    [setEditingTaskId]
  );
  const close = useCallback(() => setEditingTaskId({ editingTaskId: "" }), [
    setEditingTaskId,
  ]);
  return {
    editingTaskId,
    editingTask,
    isLoading,
    startEdit,
    close
  };
};
