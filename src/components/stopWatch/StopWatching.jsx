import React, { useEffect, useReducer, useRef, useState } from "react";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "START_CLICK":
      return {
        ...state,
        count: payload.now - payload.startTime,
      };
    case "SETLOOP":
      return {
        ...state,
        isLoop: !state.isLoop,
      };
    case "CLEAR":
      return {
        ...state,
        isLoop: false,
        count: 0
      };

    default:
      return state;
  }
};

const StopWatching = () => {
  const [{ isLoop, count }, dispatch] = useReducer(reducer, {
    isLoop: false,
    count: 0,
  });
  const intervalRef = useRef();
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  function handleStopClick() {
    if (isLoop) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - count;
      intervalRef.current = setInterval(() => {
        dispatch({
          type: "START_CLICK",
          payload: { now: Date.now(), startTime },
        });
      }, 0);
    }
    dispatch({type: "SETLOOP"})
  }

  function handleClearClick() {
    clearInterval(intervalRef.current);
    dispatch({type:"CLEAR"})
  }
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItms: "center" }}
    >
      <label>{count}ms</label>
      <button onClick={handleStopClick} style={{ width: "100px" }}>
        {isLoop ? "Stop" : "Start"}
      </button>
      <button onClick={handleClearClick} style={{ width: "100px" }}>
        Clear
      </button>
    </div>
  );
};
export default StopWatching;
