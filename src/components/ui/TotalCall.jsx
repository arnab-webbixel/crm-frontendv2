"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Chart Config
const chartConfig = {
  visitors: {
    label: "Calls",
  },
  "warm-call": {
    label: "Warm Calls",
    color: "hsl(var(--chart-1))",
  },
  "follow-up":{
    label: "Follow-ups",
    color: "hsl(var(--chart-4))",
  },
  "warm-call":{
    label: "Hot Calls",
    color: "hsl(var(--chart-5))",
  },
  archive: {
    label: "Archived",
    color: "hsl(var(--chart-2))",
  },
};

export function TotalCall() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://crm.webbixel.com/clients/api/v1/call-counts?period=monthly"
        );
        if (!response.ok) throw new Error('Failed to fetch');
        const json = await response.json();
        
        // Transform API data to match chart format
        const transformedData = json.data.map(item => ({
          browser: item._id,
          visitors: item.count,
          fill: chartConfig[item._id]?.color || "hsl(var(--chart-other))"
        }));
        
        setData(transformedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate total calls
  const totalCalls = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Calls This Month</CardTitle>
        <CardDescription>
          {new Date().toLocaleString('default', { month: 'long' })} - {new Date().getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
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
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalCalls.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Calls
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}