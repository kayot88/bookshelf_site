import React from "react";
import * as colors from "../../../../styles/colors";

const FullPageErrorFallback = ({ error }) => {
  return (
    <div
      role="alert"
      style={{
        color: colors.danger,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "cengter",
        alignItems: "center",
      }}
    >
      <p> Ohh no.. There1s a problem. Try refreshing the app </p>
      <pre>{error.message}</pre>
    </div>
  );
};

export { FullPageErrorFallback };
