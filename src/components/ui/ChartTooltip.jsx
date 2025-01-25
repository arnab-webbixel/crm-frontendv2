import React from "react";

export const ChartTooltip = ({ active, payload, label, content }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        {content}
      </div>
    );
  }

  return null;
};
