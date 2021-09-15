import { useState } from "react";
import { useMountedRef } from "utils";
interface State<D> {
  stat: "idel" | "loading" | "success" | "error";
  data: D | null;
  error: Error | null;
}

const defaultState: State<null> = {
  stat: "idel",
  data: null,
  error: null,
};

const defaultConfig = {
  isThrowError: false,
};

export const useAsync = <D>(
  initialState?: State<D>,
  initalConfig?: typeof defaultConfig
) => {
  const [state, setState] = useState<State<D>>({
    ...defaultState,
    ...initialState,
  });

  const throwConfig = {
    ...defaultConfig,
    ...initalConfig,
  };

  const mountedRef = useMountedRef();

  const setData = (data: D) => {
    setState({
      stat: "success",
      data,
      error: null,
    });
  };

  const setError = (error: Error) => {
    setState({
      stat: "error",
      data: null,
      error,
    });
  };

  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 Promise 类型数据");
    }
    setState({
      stat: "loading",
      data: null,
      error: null,
    });
    return promise
      .then((res) => {
        if (mountedRef.current)
          setData(res)
        return res
      })
      .catch((err: Error) => {
        setError(err);
        if (throwConfig.isThrowError) return Promise.reject(err);
        return err;
      });
  };

  return {
    isIdel: state.stat === "idel",
    isLoading: state.stat === "loading",
    isSuccess: state.stat === "success",
    isError: state.stat === "error",
    run,
    setData,
    setError,
    ...state,
  };
};
