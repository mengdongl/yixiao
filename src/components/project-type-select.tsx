import React from "react";
import { useProjectTypes } from "utils/project";
import { IdSelect } from "./id-select";

export const ProjectTypeSelect = (props:React.ComponentProps<typeof IdSelect>) => {
  const { data: types } = useProjectTypes<{ name: string; id: number }[]>();
  if (types) {
    return <IdSelect options={types} {...props}></IdSelect>;
  } else {
    return null
  }
};
