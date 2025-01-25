import React from "react";
export const ChartTooltipContent = ({ hideLabel }) => {
  return (
    <div>
      {!hideLabel && (
        <div className="font-bold text-sm">Details:</div>
      )}
      {/* Tooltip content */}
    </div>
  );
};
