import React, { useEffect, useReducer, useRef, useState } from "react";

const reducer = (prevStates, newState) => {
  return { ...prevStates, ...newState };
};

const useStopWatching = () => {
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
  return { handleStopClick, handleClearClick, isLoop, count };
};

const StopWatching = () => {
  const componentOne = useStopWatching();
  const componentTwo = useStopWatching();

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItms: "center" }}
    >
      <label>{componentOne.count}ms</label>
      <button onClick={componentOne.handleStopClick} style={{ width: "100px" }}>
        {componentOne.isLoop ? "Stop" : "Start"}
      </button>
      <button
        onClick={componentOne.handleClearClick}
        style={{ width: "100px" }}
      >
        Clear
      </button>
      <strong> diff between counts</strong>
      <span>{componentTwo.count - componentOne.count}</span>
      <button onClick={componentTwo.handleStopClick} style={{ width: "100px" }}>
        {componentTwo.isLoop ? "Stop" : "Start"}
      </button>
      <button
        onClick={componentTwo.handleClearClick}
        style={{ width: "100px" }}
      >
        Clear
      </button>
    </div>
  );
};
export default StopWatching;
