import React from "react";
import { PieChart, Pie, Label, Cell, Tooltip } from "recharts";  // Importing required components
import { ChartTooltipContent } from "./ChartTooltipContent";

const PieChartComponent = ({ data, totalVisitors }) => {
  
  return (
    // Wrapping PieChart component in a div to prevent overflow and control size
    <div className="pie-chart-container" style={{
      maxWidth: '100%',
      overflow: 'hidden',
      margin: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <PieChart width={250} height={250}>
        {/* Tooltip content for the chart */}
        <Tooltip content={<ChartTooltipContent hideLabel />} cursor={false} />
        
        {/* Pie chart data */}
        <Pie
          data={data}
          dataKey="visitors"
          nameKey="browser"
          innerRadius={60}  // Inner radius of the donut chart
          outerRadius={100} // Outer radius to define the size of the pie
          strokeWidth={3}
        >
          {/* Rendering the pie chart segments with custom colors */}
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
          
          {/* Label inside the pie chart */}
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {/* Displaying total visitors in the center of the pie */}
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {totalVisitors.toLocaleString()}
                    </tspan>
                    {/* Displaying the "Visitors" label below the total visitors */}
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Customers
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
