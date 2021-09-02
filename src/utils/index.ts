import { useEffect, useState } from "react";

const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const cleanObject = (object: { [index: string]: unknown }) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    if (isFalsy(object[key])) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useDebounce = <T>(value: T, delay?: number) => {
  const [paramValue, setParamValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setParamValue(value);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return paramValue;
};

export const useArray = <T>(value: T[]) => {
  const [resultValue,setResultValue] = useState(value);
  const clear = () => setResultValue([])
  const removeIndex = (index: number) => {
    const array = [...resultValue]
    array.splice(index,1)
    setResultValue(array)
  };
  const add = (value: T) => setResultValue([...resultValue,value])
  return { value: resultValue, clear, removeIndex, add };
};
