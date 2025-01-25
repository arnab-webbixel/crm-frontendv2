"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { RadialBarChart, RadialBar, PolarGrid, PolarRadiusAxis, Label } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./Card";
import { ChartContainer } from "./Chart";

function RadialChartCard() {
  const chartData = [
    { name: "Today Calls", totalCalls: 200, fill: "#EC4899" } 
  ];
  const totalCalls = chartData[0].totalCalls;
  const trend = 5.2; 
  return (
    <Card className="flex flex-col">
      {/* Card Header */}
      <CardHeader className="items-center pb-0">
        <CardTitle>Today's Call</CardTitle>
        <CardDescription>Total calls as of {new Date().toLocaleDateString()}</CardDescription>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          className="mx-auto aspect-square max-h-[250px]"
          style={{ width: 250, height: 250 }}
        >
          <RadialBarChart
            data={chartData}
            startAngle={90} // Adjust for radial appearance
            endAngle={450}
            innerRadius={80}
            outerRadius={110}
            barSize={20}
            width={250}
            height={250}
          >
            {/* Circle grid for radial appearance */}
            <PolarGrid
              gridType="circle"
              radialLines={false}
              polarRadius={[70, 110]}
              stroke="none"
            />
            {/* Radial bar */}
            <RadialBar
              dataKey="totalCalls"
              fill={chartData[0].fill}
              cornerRadius={10}
              background={{ fill: "#E0E0E0" }}
            />
            {/* Center label */}
            <PolarRadiusAxis tick={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox?.cx && viewBox?.cy) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-primary text-4xl font-bold"
                        >
                          {totalCalls.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy + 24}
                          className="fill-muted-foreground"
                        >
                          Calls
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      {/* Card Footer */}
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total call's last 24 hours
        </div>
      </CardFooter>
    </Card>
  );
}

export default RadialChartCard;
