import React, { useEffect, useReducer, useRef, useState } from "react";



const StopWatching = () => {
  const [isLoop, setLoop] = useState(false);
  const [count, setCount] = useState(0);
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
      console.log("startTime", startTime);
      intervalRef.current = setInterval(() => {
        console.log("startTime2", Date.now());
        setCount(Date.now() - startTime);
      }, 0);
    }
    setLoop(!isLoop);
  }

  function handleClearClick() {
    clearInterval(intervalRef.current);
    setCount(0);
    setLoop(false);
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
