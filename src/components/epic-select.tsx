import React from "react";
import { useEpics } from "utils/epic";
import { IdSelect } from "./id-select";

export const EpicSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: epics } = useEpics();
  return <IdSelect options={epics} {...props} />;
};
