import React, { useEffect, useReducer, useRef, useState } from "react";

const reducer = (prevStates, newState) => {
  return { ...prevStates, ...newState };
};

const StopWatching = () => {
  const [{ isLoop, count }, setState] = useReducer(reducer, {
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
        setState({
          count: Date.now() - startTime,
        });
      }, 0);
    }
    setState({ isLoop: !isLoop });
  }

  function handleClearClick() {
    clearInterval(intervalRef.current);
    setState({
      isLoop: false,
      count: 0,
    });
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
