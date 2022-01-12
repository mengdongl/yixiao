import { useMemo, useState } from "react";
import { URLSearchParamsInit, useSearchParams, useLocation } from "react-router-dom";
import { cleanObject, subset } from "utils";

export const useUrlParams = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  const setUrlParams = useSetUrlParams();
  const [stateKeys] = useState(keys);
  return [
    useMemo(
      () =>
        subset(Object.fromEntries(searchParams), stateKeys) as {
          [key in K]: string;
        },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      setUrlParams(params);
    },
  ] as const;
};

export const useSetUrlParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParams(o);
  };
};

export const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units;
};