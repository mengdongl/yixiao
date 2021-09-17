import { useEffect, useRef, useState } from "react";
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const cleanObject = (object?: { [index: string]: unknown }) => {
  if(!object){
    return {}
  }
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    if (isVoid(object[key])) {
      delete result[key];
    }
  });
  return result;
};

export const subset = <
  O extends { [key in string]: unknown },
  K extends keyof O
>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
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

export const useMountedRef = () => {
  const mountedRef = useRef(false)

  useEffect(()=>{
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  })

  return mountedRef
}