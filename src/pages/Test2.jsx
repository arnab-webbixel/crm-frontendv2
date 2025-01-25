"use client";

import React from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Typewriter from 'typewriter-effect'


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  Pie,
  PieChart,
} from "recharts";

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
import { logo } from "../assets";

import Calender from "@/components/calender/Calender";
import RescheduleTimeline from "@/components/ui/RescheduleTimeline";
import { events } from "@/utils/constants";
import useDarkMode from "@/hooks/useDarkMode";



ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const chartData = [
  { browser: "chrome", visitors: 275, fill: "#4285F4" },
  { browser: "safari", visitors: 200, fill: "#FF8C00" },
  { browser: "firefox", visitors: 287, fill: "#FF4500" },
  { browser: "edge", visitors: 173, fill: "#1E90FF" },
  { browser: "other", visitors: 190, fill: "#32CD32" },
];

const radialChartData = [
  { name: "Desktop", value: 1260, fill: "#4e73df" },
  { name: "Mobile", value: 570, fill: "#1cc88a" },
  { name: "Web", value: 570, fill: "#ffa500" },
];
const staticChartData = [
  { browser: "Archive", visitors: 150, fill: "#E9D4FE" },
  { browser: "Hot-Call", visitors: 100, fill: "#4b0082" },
  { browser: "Warm-Call", visitors: 80, fill: "#EC4899" },
];
const colorMap = {
  archive: "#E9D4FE",
  "hot-call": "#4b0082",
  "warm-call": "#EC4899",
};
const Dashboard = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const transformedChartData = staticChartData.map((item) => ({
    browser: item.browser,
    visitors: item.visitors,
    fill: colorMap[item.browser] || "#BDBDBD",
  }));

  const totalVisitors = staticChartData.reduce(
    (acc, curr) => acc + curr.visitors,
    0
  );

  const radialTotalVisitors = radialChartData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="bg-[#0f2b32] min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <img
          src={logo}
          alt="Webbixel Logo"
          style={{ height: "50px", width: "160px" }}
        />
      </header>

      {/* Main Dashboard */}
      <div className="flex bg-[#086277]">
        {/* Sidebar */}
        <aside className="bg-white w-64 min-h-screen p-6">
          <nav className="space-y-4">
            <a
              href="#"
              className="flex items-center space-x-4 text-[#14758d] font-medium"
            >
              <i className="fas fa-th-large"></i>
              <span>Dashboard</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-4 text-gray-600 hover:text-[#14758d]"
            >
              <i className="fas fa-users"></i>
              <span>Staff Info</span>
            </a>
          </nav>
        </aside>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">

          <div
            className="flex justify-end items-center gap-2 mr-0 cursor-pointer">
            <div className= "w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center">
              <NotificationsNoneIcon
              className="w-8 h-8"/>
            </div>
            <div className="w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center"
             
            >
              <PersonOutlineIcon className="w-8 h-8" />
            </div>

         
            <div className="w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center">
               <EmailOutlinedIcon className="w-8 h-8" />
          </div>

            <div></div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 font-sans">
            <Typewriter onInit ={(typewriter)=>{
              typewriter.typeString('Hi paromita')
              .pauseFor(1000)
              .start()

            }}/></h1>
          {/* Overview Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="bg-[#103c47] p-4 shadow rounded-lg">
                  <h3 className="text-white-600">Lorem Ipsum</h3>
                  <p className="text-2xl font-bold">{800 * (index + 1)}</p>
                  <p className="text-gray-400 text-sm">Lorem Ipsum 2000</p>
                </div>
              ))}
          </div>

          {/* Charts */}

          <div className="grid grid-cols-3 gap-4">
            {/* Card 1 */}
            <Card className="flex flex-col">
              <CardHeader className="items-center pb-0">
                <CardTitle>Pie Chart - Donut with Text</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-0">
                <ChartContainer className="mx-auto aspect-square max-h-[250px]">
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                      data={chartData}
                      dataKey="visitors"
                      nameKey="browser"
                      innerRadius={60}
                      strokeWidth={5}
                    >
                      <Label
                        content={({ viewBox }) =>
                          viewBox && (
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
                                {totalVisitors.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy + 24}
                                className="fill-muted-foreground"
                              >
                                Visitors
                              </tspan>
                            </text>
                          )
                        }
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Trending up by 5.2% this month{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
              </CardFooter>
            </Card>

            {/* Card 2 */}
            <Card className="flex flex-col">
              <CardHeader className="items-center pb-0">
                <CardTitle>Radial Chart - Stacked</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 items-center pb-0">
                <div className="mx-auto w-full max-w-[300px] h-[300px]">
                  <RadialBarChart
                    width={300}
                    height={300}
                    data={radialChartData}
                    innerRadius="30%"
                    outerRadius="90%"
                    startAngle={180}
                    endAngle={0}
                  >
                    <PolarRadiusAxis tick={false} axisLine={false} />
                    {radialChartData.map((data, index) => (
                      <RadialBar
                        key={index}
                        dataKey="value"
                        cornerRadius={10}
                        fill={data.fill}
                        name={data.name}
                      />
                    ))}
                    <Label
                      content={({ viewBox }) =>
                        viewBox && (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy - 16}
                              className="text-xl font-bold"
                            >
                              {radialTotalVisitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy + 4}
                              className="text-sm"
                            >
                              Visitors
                            </tspan>
                          </text>
                        )
                      }
                    />
                  </RadialBarChart>
                </div>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="flex flex-col">
              {/* <RescheduleTimeline events={events} /> */}
              <Calender />
            </Card>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white py-4 text-center">
        <p className="text-gray-500 text-sm">
          &copy; 2024 Webbixel. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
