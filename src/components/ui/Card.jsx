import React from "react";

// Card component with an optional className prop
export const Card = ({ children, className = "" }) => {
  return <div className={`bg-white shadow-lg p-4 rounded-md ${className}`}>{children}</div>;
};

// CardHeader component with an optional className prop
export const CardHeader = ({ children, className = "" }) => {
  return <div className={`border-b-2 pb-4 ${className}`}>{children}</div>;
};

// CardTitle component with an optional className prop
export const CardTitle = ({ children, className = "" }) => {
  return <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>;
};

// CardDescription component with an optional className prop
export const CardDescription = ({ children, className = "" }) => {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
};

// CardContent component with an optional className prop
export const CardContent = ({ children, className = "" }) => {
  return <div className={`pt-4 ${className}`}>{children}</div>;
};

// CardFooter component with an optional className prop
export const CardFooter = ({ children, className = "" }) => {
  return <div className={`pt-4 text-sm ${className}`}>{children}</div>;
};
