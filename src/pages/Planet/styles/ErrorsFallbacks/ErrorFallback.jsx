import React from "react";
import * as colors from "../../../../styles/colors";
const ErrorFallback = ({ error }) => {
  return (
    <ErrorMessage
      error={error}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
};

const errorVariants = {
  stacked: { display: "block" },
  inline: { display: "inline-block" },
};

const ErrorMessage = ({ error, variant = "stacked", ...props }) => {
  return (
    <div
      role="alert"
      style={[
        {
          color: colors.danger,
        },
        errorVariants[variant],
      ]}
      {...props}
    >
      <span>There was an error</span>
      <pre
        style={[
          {
            whiteSpace: "break-spaces",
            margin: "0",
            marginBottom: -5,
          },
          errorVariants[variant],
        ]}
      >
        {error.message}
      </pre>
    </div>
  );
};

export default ErrorFallback;
