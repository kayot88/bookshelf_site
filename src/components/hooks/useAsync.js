import React, { useCallback, useReducer, useRef } from "react";

function useSafeDispatch(dispatch) {
  const mounted = useRef(false);
  React.useLayoutEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  }, []);
  return useCallback(
    (...args) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch]
  );
}

const defaultInitialStates = { data: null, status: "idle", error: null };

const useAsync = (initState) => {
  const refInitialStates = useRef({
    ...defaultInitialStates,
    ...initState,
  });

  const [{ data, status, error }, setState] = useReducer(
    (states, actions) => ({ ...states, ...actions }),
    refInitialStates.current
  );

  const safeSetState = useSafeDispatch(setState);

  const setData = useCallback(
    (data) => safeSetState({ data, status: "resolved" }),
    [safeSetState]
  );
  const setError = useCallback(
    (error) => safeSetState({ error, status: "rejected" }),
    [safeSetState]
  );
  const reset = () => safeSetState(refInitialStates.current);

  const run = useCallback(
    (promise) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise`
        );
      }
      safeSetState({ status: "pending" });
      return promise.then(
        (data) => {
          setData(data);
          return data;
        },
        (error) => {
          setError(error);
          return Promise.reject(error);
        }
      );
    },
    [safeSetState, setData, setError]
  );
  return {
    isIdle: status === "idle",
    isLoading: status === "pending",
    isError: status === "rejected",
    isSuccess: status === "resolved",

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  };
};
export { useAsync };
