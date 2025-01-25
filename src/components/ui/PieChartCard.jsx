import React from 'react';
import { TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./Card";
import PieChart from "./PieChart";
import { ChartContainer } from "./ChartContainer";

const PieChartCard = ({ title, description, data, totalVisitors }) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer className="mx-auto aspect-square max-h-[15rem]"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <PieChart data={data} totalVisitors={totalVisitors} />
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total calls 
        </div>
      </CardFooter>
    </Card>
  );
};

export default PieChartCard;
