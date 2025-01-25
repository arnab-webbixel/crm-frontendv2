// Chart.jsx

import React from 'react';

// ChartConfig - Displays custom config for the chart
export const ChartConfig = ({ config }) => {
  if (!config || typeof config !== "object") return null; // Guard against invalid config

  return (
    <div>
      {Object.keys(config).map((key) => (
        <div key={key}>
          <strong>{key}</strong>: {config[key]?.label || "N/A"}
        </div>
      ))}
    </div>
  );
};


// ChartContainer - Container for chart with layout/styling options
export const ChartContainer = ({ children, className = "", config }) => {
  return (
    <div
      className={`chart-container ${className}`}
      style={{
        maxWidth: "100%",
        display: "flex", // Ensure centering of the chart
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};
// ChartTooltip - A placeholder tooltip component
export const ChartTooltip = ({ cursor, content }) => {
  return (
    <div
      style={{
        background: "rgba(0, 0, 0, 0.75)",
        color: "white",
        padding: "5px 10px",
        borderRadius: "4px",
        pointerEvents: "none",
        fontSize: "12px",
      }}
    >
      {content || "Tooltip content here"}
    </div>
  );
};


// ChartTooltipContent - Tooltip content customization
export const ChartTooltipContent = ({ hideLabel, nameKey, value }) => {
  return (
    <div>
      {!hideLabel && <strong>{nameKey || "Browser"}</strong>}
      {value && <div>{value} Visitors</div>}
    </div>
  );
};
