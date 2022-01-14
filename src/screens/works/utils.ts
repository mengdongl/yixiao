import { useMemo } from "react";
import { useUrlParams } from "utils/url";
export const useWorksSearchParams = () => {
  const [param] = useUrlParams(["taskFrom", "status", "typeId"]);
  return useMemo(
    () => ({
      taskFrom: param.taskFrom,
      typeId: Number(param.typeId) || undefined,
      status: Number(param.status) || undefined,
    }),
    [param]
  );
};

export const useWorkQueryKey = () => ["taska", useWorksSearchParams()];
