"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

const UpdatedCall = () => {
  const [updatedClientsCount, setUpdatedClientsCount] = useState(0); // Default to 0
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch updated clients count
  useEffect(() => {
    const fetchUpdatedClients = async () => {
      try {
        const response = await fetch("https://crm.webbixel.com/clients/api/v1/updates");
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        setUpdatedClientsCount(data.updatedClientsCount || 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUpdatedClients();
  }, []);

  // Chart Data
  const chartData = [
    { name: "Updated Calls", value: updatedClientsCount, fill: "var(--color-safari)" },
  ];

  // Chart Config
  const chartConfig = {
    value: {
      label: "Updated Clients",
    },
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Updated Calls</CardTitle>
        <CardDescription>Client updates tracked in CRM</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
            <RadialBarChart
              data={chartData}
              startAngle={90}
              endAngle={450}
              innerRadius={80}
              outerRadius={110}
            >
              <PolarGrid gridType="circle" radialLines={false} stroke="none" />
              <RadialBar dataKey="value" background cornerRadius={10} />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) =>
                    viewBox && "cx" in viewBox && "cy" in viewBox ? (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan className="fill-foreground text-4xl font-bold">
                          {updatedClientsCount.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Updated Clients
                        </tspan>
                      </text>
                    ) : null
                  }
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total updated clients in CRM
        </div>
      </CardFooter>
    </Card>
  );
};

export default UpdatedCall;
