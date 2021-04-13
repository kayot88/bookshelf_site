import React, { PureComponent } from 'react'

import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function WrapperErrorBoundary(props) {
  return <ErrorBoundary FallbackComponent={ErrorFallback} {...props} />;
}

export { WrapperErrorBoundary };
