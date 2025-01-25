import React from "react";
import { ErrorBoundary } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <div className="max-w-lg p-6 bg-white rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-3xl font-semibold text-red-600 mb-4">
          Something went wrong.
        </h2>
        <p className="text-xl text-gray-700 mb-4">Please try again later.</p>
        <details
          className="mt-4 p-4 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-600"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {error.message}
        </details>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
          onClick={resetErrorBoundary}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

const FunctionalErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset any necessary state or logic here
        console.log("Resetting error boundary");
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default FunctionalErrorBoundary;
